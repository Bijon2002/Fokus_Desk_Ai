import asyncio
import os
import edge_tts

TIME_GREETINGS = {
    "morning": "Good morning",
    "afternoon": "Good afternoon",
    "evening": "Good evening",
    "night": "Good night"
}

CHARACTER_LINES = {
    "ironman": {
        "rest": "Power at 400% capacity. Arc Reactor stabilized.",
        "voice": "en-GB-RyanNeural",
        "pitch": "-2Hz",
        "rate": "+5%"
    },
    "jd": {
        "rest": "Master mode activated. Full power, all systems online.",
        "voice": "en-US-GuyNeural",
        "pitch": "-4Hz",
        "rate": "+0%"
    },
    "spiderman": {
        "rest": "Spider-Sense is tingling! Ready to swing into action.",
        "voice": "en-US-EricNeural",
        "pitch": "+6Hz",
        "rate": "+15%"
    },
    "batman": {
        "rest": "Batcomputer surveillance online. I am vengeance. I am the night.",
        "voice": "en-US-ChristopherNeural",
        "pitch": "-18Hz",
        "rate": "-12%"
    },
    "superman": {
        "rest": "Solar flux at maximum. Metropolis airspace is secure.",
        "voice": "en-US-GuyNeural",
        "pitch": "-6Hz",
        "rate": "-3%"
    },
    "flash": {
        "rest": "Tachyon accelerator synced! Speed Force active at Mach 12!",
        "voice": "en-US-BrianNeural",
        "pitch": "+4Hz",
        "rate": "+25%"
    },
    "deadpool": {
        "rest": "Maximum effort! Did somebody order extra chimichangas?",
        "voice": "en-US-AndrewNeural",
        "pitch": "+8Hz",
        "rate": "+12%"
    },
    "thor": {
        "rest": "Feel the thunder of Asgard! Mjolnir is primed for battle!",
        "voice": "en-AU-WilliamNeural",
        "pitch": "-12Hz",
        "rate": "-6%"
    },
    "cyberpunk": {
        "rest": "Wake up. ICE breached. Sandevistan buffer overclocked.",
        "voice": "en-US-SteffanNeural",
        "pitch": "-4Hz",
        "rate": "+8%"
    },
    "matrix": {
        "rest": "Construct initialized. Free your mind. There is no spoon.",
        "voice": "en-US-RogerNeural",
        "pitch": "-14Hz",
        "rate": "-10%"
    },
    "dark": {
        "rest": "Stealth protocols engaged. Low-observable silence confirmed.",
        "voice": "en-US-ChristopherNeural",
        "pitch": "-10Hz",
        "rate": "-5%"
    },
    "light": {
        "rest": "Daylight lumens protocol active. Clarity of mind verified.",
        "voice": "en-US-JennyNeural",
        "pitch": "+0Hz",
        "rate": "+0%"
    }
}

async def generate_single(theme_key, slot, greeting_phrase, cfg, semaphore):
    async with semaphore:
        text = f"Hi Bijohn! {greeting_phrase}! {cfg['rest']}"
        out_path = f"public/audio/{theme_key}_{slot}.mp3"
        print(f"Generating [{slot.upper()}] for {theme_key}: '{text}'...")
        communicate = edge_tts.Communicate(
            text=text,
            voice=cfg["voice"],
            pitch=cfg["pitch"],
            rate=cfg["rate"]
        )
        await communicate.save(out_path)
        print(f"Saved {out_path} ({os.path.getsize(out_path)} bytes)")

        # Also mirror afternoon / evening to default {theme_key}.mp3
        if slot == "afternoon":
            default_path = f"public/audio/{theme_key}.mp3"
            communicate_default = edge_tts.Communicate(
                text=text,
                voice=cfg["voice"],
                pitch=cfg["pitch"],
                rate=cfg["rate"]
            )
            await communicate_default.save(default_path)

async def generate_all():
    os.makedirs("public/audio", exist_ok=True)
    semaphore = asyncio.Semaphore(5)
    tasks = []
    for theme_key, cfg in CHARACTER_LINES.items():
        for slot, greeting_phrase in TIME_GREETINGS.items():
            tasks.append(generate_single(theme_key, slot, greeting_phrase, cfg, semaphore))

    await asyncio.gather(*tasks)
    print("All dynamic character voice transmissions starting with 'Hi Bijohn!' generated successfully!")

if __name__ == "__main__":
    asyncio.run(generate_all())
