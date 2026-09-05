import sys
import asyncio
import edge_tts
import os
import re

VOICES = {
    "ironman": {"voice": "en-GB-RyanNeural", "pitch": "-2Hz", "rate": "+0%"},
    "marvel": {"voice": "en-GB-RyanNeural", "pitch": "-2Hz", "rate": "+0%"},
    "jd": {"voice": "en-US-GuyNeural", "pitch": "-4Hz", "rate": "+0%"},
    "spiderman": {"voice": "en-US-EricNeural", "pitch": "+4Hz", "rate": "+2%"},
    "batman": {"voice": "en-US-ChristopherNeural", "pitch": "-16Hz", "rate": "-8%"},
    "superman": {"voice": "en-US-GuyNeural", "pitch": "-4Hz", "rate": "-2%"},
    "flash": {"voice": "en-US-BrianNeural", "pitch": "+2Hz", "rate": "+5%"},
    "deadpool": {"voice": "en-US-AndrewNeural", "pitch": "+5Hz", "rate": "+2%"},
    "thor": {"voice": "en-AU-WilliamNeural", "pitch": "-10Hz", "rate": "-4%"},
    "cyberpunk": {"voice": "en-US-SteffanNeural", "pitch": "-3Hz", "rate": "+0%"},
    "matrix": {"voice": "en-US-RogerNeural", "pitch": "-12Hz", "rate": "-6%"},
    "dark": {"voice": "en-US-ChristopherNeural", "pitch": "-8Hz", "rate": "-4%"},
    "light": {"voice": "en-US-JennyNeural", "pitch": "+0Hz", "rate": "+0%"}
}

def humanize_text(text: str) -> str:
    """Format speech text cleanly with zero front gaps or stuttering."""
    if not text:
        return ""
    # Smooth conversational salutation without unnatural 1-second pause gaps
    text = re.sub(r'Hi\s+Bijohn[!.]*\s*', 'Hi Bijohn, ', text, flags=re.IGNORECASE)
    text = re.sub(r'Good\s+(morning|afternoon|evening|night)[!.]*\s*', r'good \1. ', text, flags=re.IGNORECASE)
    # Remove artificial ellipses and excessive breaks at the front
    text = text.replace("...", ". ").replace("..", ". ")
    
    # Clean up multiple newlines to single line breaks so edge-tts keeps continuous natural flow
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    return ". ".join(paragraphs)

def trim_front_silence(filepath: str):
    """Trim leading silence so audio starts speaking on the first millisecond."""
    import subprocess
    tmp = filepath + ".raw.mp3"
    try:
        if os.path.exists(filepath):
            os.replace(filepath, tmp)
            cmd = [
                "ffmpeg", "-y", "-i", tmp,
                "-af", "silenceremove=start_periods=1:start_duration=0.01:start_threshold=-30dB",
                "-c:a", "libmp3lame", "-b:a", "64k",
                filepath
            ]
            subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            if os.path.exists(tmp):
                os.remove(tmp)
    except Exception as err:
        if os.path.exists(tmp) and not os.path.exists(filepath):
            os.replace(tmp, filepath)

async def main():
    if len(sys.argv) < 3:
        print("Usage: speak_character.py <themeKey> <outputFile> [optional text]")
        return
    
    theme_key = sys.argv[1]
    out_file = sys.argv[2]
    
    if len(sys.argv) > 3:
        text = " ".join(sys.argv[3:])
    else:
        # Read from stdin with UTF-8 encoding
        text = sys.stdin.read().strip()
        
    if not text:
        print("Empty text provided")
        return
        
    cfg = VOICES.get(theme_key, VOICES["ironman"])
    os.makedirs(os.path.dirname(os.path.abspath(out_file)), exist_ok=True)
    
    spoken_text = humanize_text(text)
    
    communicate = edge_tts.Communicate(
        text=spoken_text,
        voice=cfg["voice"],
        pitch=cfg["pitch"],
        rate=cfg["rate"]
    )
    await communicate.save(out_file)
    trim_front_silence(out_file)
    print(f"SUCCESS: {out_file} ({os.path.getsize(out_file)} bytes)")

if __name__ == "__main__":
    asyncio.run(main())
