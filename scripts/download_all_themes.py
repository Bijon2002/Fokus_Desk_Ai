import os
import subprocess
import yt_dlp

TRACKS = {
    "ironman": {
        "url": "https://www.youtube.com/watch?v=I9PhfUsFvj0",  # Driving With The Top Down (Iron Man Mark III Suit Up Theme)
        "start": 32.0,
        "duration": 14.0
    },
    "spiderman": {
        "url": "https://www.youtube.com/watch?v=Rp6Xkd2TnEc",
        "start": 58.0,
        "duration": 13.0
    },
    "batman": {
        "url": "https://www.youtube.com/watch?v=BdnkbXA_piI",
        "start": 68.0,
        "duration": 13.0
    },
    "superman": {
        "url": "https://www.youtube.com/watch?v=AAqtW-gsOHg",
        "start": 82.0,
        "duration": 14.0
    },
    "flash": {
        "url": "https://www.youtube.com/watch?v=8D4ThTcvTDo",
        "start": 18.0,
        "duration": 13.0
    },
    "deadpool": {
        "url": "https://www.youtube.com/watch?v=4wD5tamhwXo",
        "start": 15.0,
        "duration": 13.0
    },
    "thor": {
        "url": "https://www.youtube.com/watch?v=MPMzKsnCmTc",
        "start": 48.0,
        "duration": 13.0
    },
    "cyberpunk": {
        "url": "https://www.youtube.com/watch?v=bhF3O1xCBW4",
        "start": 45.0,
        "duration": 13.0
    },
    "matrix": {
        "url": "https://www.youtube.com/watch?v=C7-vezH4DPc",
        "start": 36.0,
        "duration": 13.0
    },
    "dark": {
        "url": "https://www.youtube.com/watch?v=FK6_o1tcIj0",
        "start": 33.0,
        "duration": 13.0
    },
    "light": {
        "url": "https://www.youtube.com/watch?v=vPA6T0la6uI",
        "start": 40.0,
        "duration": 13.0
    }
}

def process_track(key, cfg):
    os.makedirs("scratch_audio", exist_ok=True)
    os.makedirs("public/audio/music", exist_ok=True)
    temp_template = f"scratch_audio/{key}.%(ext)s"
    out_mp3 = f"public/audio/music/{key}.mp3"

    print(f"\n=========================================")
    print(f"Processing theme for: {key.upper()}")
    print(f"URL: {cfg['url']}")
    print(f"Target: {out_mp3}")
    print(f"=========================================")

    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': temp_template,
        'noplaylist': True,
        'quiet': True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(cfg['url'], download=True)
        ext = info.get('ext', 'webm')
        raw_file = f"scratch_audio/{key}.{ext}"

    if not os.path.exists(raw_file):
        # Fallback check
        for f in os.listdir("scratch_audio"):
            if f.startswith(key + "."):
                raw_file = os.path.join("scratch_audio", f)
                break

    start = cfg['start']
    duration = cfg['duration']
    fade_out_start = duration - 2.5

    af_filter = f"afade=t=in:ss=0:d=0.5,afade=t=out:st={fade_out_start}:d=2.5,loudnorm=I=-16:TP=-1.5:LRA=11"

    cmd = [
        "ffmpeg", "-y",
        "-ss", str(start),
        "-t", str(duration),
        "-i", raw_file,
        "-af", af_filter,
        "-b:a", "192k",
        out_mp3
    ]

    subprocess.run(cmd, check=True)
    size = os.path.getsize(out_mp3)
    print(f"[OK] Saved {out_mp3} ({size} bytes, ~{duration}s)")

if __name__ == "__main__":
    for key, cfg in TRACKS.items():
        try:
            process_track(key, cfg)
        except Exception as e:
            print(f"[ERROR] Failed {key}: {e}")
