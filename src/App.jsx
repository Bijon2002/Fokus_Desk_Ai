import { useState, useEffect, useRef } from 'react';
import {
  Cpu, Crosshair, Shield, Moon, Sun, ChevronDown, ChevronUp, RefreshCw,
  Calendar, CheckSquare, FileText, Video, ExternalLink,
  Trash2, Plus, Check, Sliders, Mail, Inbox, AlertCircle, Target, CheckCircle2,
  Sparkles, Zap, Flame, ListFilter, Trophy, MapPin, Palette, Cloud, CloudSun, CloudRain, Droplets,
  Terminal, Compass, Radio, Volume2, Award
} from 'lucide-react';

/* ────────── THEMES DEFINITION (RICH HERO ATTRIBUTES & POWERS) ────────── */
const THEMES = {
  ironman: {
    name: 'IRON MAN // J.A.R.V.I.S.',
    character: 'Tony Stark / J.A.R.V.I.S.',
    icon: <Cpu className="w-4 h-4" />,
    tagline: 'MARK LXXXV // J.A.R.V.I.S.',
    badge: 'STARK TECH // ARC REACTOR ONLINE',
    heroPower: {
      name: 'Avengers Assemble & Repulsor',
      icon: '⚡',
      desc: 'Deploy Stark nanotech grid and Avengers titlecard fanfare to lock in ultimate focus and cognitive capacity.',
      statusMsg: 'MARK LXXXV ENGAGED // ARC REACTOR 100% ONLINE'
    },
    quote: '"Part of the journey is the end. Sometimes you gotta run before you can walk."',
    coreStat: { label: 'ARC REACTOR', value: '100%', detail: 'TITANIUM NANOTECH' },
    taskActionLabel: '+ Stark Directive',
    taskPlaceholder: 'Initialize Mark LXXXV protocol...',
    notesHeader: 'STARK SECURE WORKBENCH',
    notesPlaceholder: 'Record Mark LXXXV schematics and Jarvis telemetry...',
    timerLabel: 'STARK FOCUS PROTOCOL',
    heroPerk: 'Marvel Avengers Titlecard Fanfare & Arc Reactor Shield',
    bg: 'linear-gradient(180deg, #030712 0%, #081528 50%, #150810 100%)',
    headerBorder: 'rgba(56, 189, 248, 0.35)',
    logoBg: '#0f172a', logoBorder: '#38bdf8',
    text: '#ffffff', textMuted: '#93c5fd', textDim: '#38bdf8',
    accent: '#38bdf8', accentLight: '#bae6fd',
    secondary: '#ef4444', secondaryLight: '#fca5a5',
    cardBg: 'rgba(15, 23, 42, 0.85)', cardBorder: 'rgba(56, 189, 248, 0.35)',
    urgentBg: 'rgba(69, 10, 10, 0.55)', urgentBorder: 'rgba(239, 68, 68, 0.65)',
    urgentText: '#ffffff', urgentDot: '#38bdf8',
    timerBg: 'linear-gradient(180deg, #030712 0%, #0f172a 100%)',
    timerBorder: 'rgba(56, 189, 248, 0.45)',
    timerActive: '#38bdf8', timerIdle: '#ef4444',
    btnPrimary: '#38bdf8', btnSecondary: 'rgba(15, 23, 42, 0.9)',
    floatBg: 'rgba(3, 7, 18, 0.96)', floatBorder: 'rgba(56, 189, 248, 0.45)',
    cpuColor: '#38bdf8', cpuHigh: '#7dd3fc',
    memColor: '#ef4444', memHigh: '#fca5a5',
    cpuGlow: 'rgba(56, 189, 248, 0.9)', memGlow: 'rgba(239, 68, 68, 0.9)',
  },
  jd: {
    name: 'JD // DAILY FOCUS',
    character: 'J.D. / Thalapathy Vijay',
    icon: <Award className="w-4 h-4" />,
    tagline: 'DAILY BRIEFING',
    badge: 'JD ASSISTANT // ONLINE',
    heroPower: {
      name: 'Daily Briefing',
      icon: '✦',
      desc: 'Say hello, share today\'s tasks, and keep the day moving.',
      statusMsg: 'HELLO BIJON // TODAY\'S TASKS ARE READY'
    },
    quote: '"I am waiting..."',
    coreStat: { label: 'FOCUS', value: '100%', detail: 'DAILY ENERGY' },
    taskActionLabel: '+ New Task',
    taskPlaceholder: 'Add something for today...',
    notesHeader: 'JD DAILY NOTES',
    notesPlaceholder: 'Write down plans, reminders, or a quick thought...',
    timerLabel: 'DAILY FOCUS',
    heroPerk: 'Daily Briefing & Focus Support',
    bg: 'linear-gradient(180deg, #061b1b 0%, #0b2928 52%, #132321 100%)',
    headerBorder: 'rgba(45, 212, 191, 0.42)',
    logoBg: '#0f3d3b', logoBorder: '#2dd4bf',
    text: '#f0fdfa', textMuted: '#a7f3d0', textDim: '#5eead4',
    accent: '#2dd4bf', accentLight: '#ccfbf1',
    secondary: '#fb7185', secondaryLight: '#fecdd3',
    cardBg: 'rgba(7, 32, 31, 0.9)', cardBorder: 'rgba(45, 212, 191, 0.34)',
    urgentBg: 'rgba(127, 29, 48, 0.48)', urgentBorder: 'rgba(251, 113, 133, 0.72)',
    urgentText: '#fff1f2', urgentDot: '#2dd4bf',
    timerBg: 'linear-gradient(180deg, #061b1b 0%, #103633 100%)',
    timerBorder: 'rgba(45, 212, 191, 0.46)',
    timerActive: '#2dd4bf', timerIdle: '#fb7185',
    btnPrimary: '#2dd4bf', btnSecondary: 'rgba(10, 61, 57, 0.92)',
    floatBg: 'rgba(4, 24, 24, 0.97)', floatBorder: 'rgba(45, 212, 191, 0.46)',
    cpuColor: '#2dd4bf', cpuHigh: '#99f6e4',
    memColor: '#fb7185', memHigh: '#fda4af',
    cpuGlow: 'rgba(45, 212, 191, 0.9)', memGlow: 'rgba(251, 113, 133, 0.85)',
  },
  spiderman: {
    name: 'SPIDER-SUIT HUD',
    character: 'Peter Parker / Web-Slinger',
    icon: <Crosshair className="w-4 h-4" />,
    tagline: 'QUEENS NYC',
    badge: 'PETER PARKER // PROTOCOL 17-A',
    heroPower: {
      name: 'Spider-Sense',
      icon: '🕷️',
      desc: 'Trigger hyper-sensory radar to illuminate urgent deadlines and high-alert tasks.',
      statusMsg: 'SPIDER-SENSE ENGAGED // REFLEXES AT MAXIMUM SENSITIVITY'
    },
    quote: '"My spider-sense is tingling! Time to swing into action."',
    coreStat: { label: 'WEB FLUID', value: '300 PSI', detail: 'CARTRIDGE #2' },
    taskActionLabel: '+ Patrol Queens',
    taskPlaceholder: 'Thwip a new web mission into the queue...',
    notesHeader: 'DAILY BUGLE & LAB ARCHIVES',
    notesPlaceholder: 'Jot down chemistry formulas and Queens patrol notes...',
    timerLabel: 'SPIDER PATROL VIGIL',
    heroPerk: 'Acoustic Spider-Sense Ping & Web Telemetry',
    bg: 'linear-gradient(180deg, #050b1e 0%, #16153b 50%, #3b0a0a 100%)',
    headerBorder: 'rgba(239, 68, 68, 0.35)',
    logoBg: '#dc2626', logoBorder: '#ef4444',
    text: '#ffffff', textMuted: '#93c5fd', textDim: '#60a5fa',
    accent: '#ef4444', accentLight: '#fca5a5',
    secondary: '#3b82f6', secondaryLight: '#93c5fd',
    cardBg: 'rgba(15, 23, 42, 0.85)', cardBorder: 'rgba(239, 68, 68, 0.35)',
    urgentBg: 'rgba(127, 29, 29, 0.45)', urgentBorder: 'rgba(239, 68, 68, 0.65)',
    urgentText: '#ffffff', urgentDot: '#ef4444',
    timerBg: 'linear-gradient(180deg, #050b1e 0%, #290d19 100%)',
    timerBorder: 'rgba(239, 68, 68, 0.45)',
    timerActive: '#ef4444', timerIdle: '#3b82f6',
    btnPrimary: '#dc2626', btnSecondary: 'rgba(30, 58, 138, 0.8)',
    floatBg: 'rgba(5, 11, 30, 0.96)', floatBorder: 'rgba(239, 68, 68, 0.45)',
    cpuColor: '#ef4444', cpuHigh: '#f87171',
    memColor: '#3b82f6', memHigh: '#60a5fa',
    cpuGlow: 'rgba(239, 68, 68, 0.85)', memGlow: 'rgba(59, 130, 246, 0.85)',
  },
  batman: {
    name: 'WAYNE ENTERPRISES',
    character: 'Bruce Wayne / The Dark Knight',
    icon: <Shield className="w-4 h-4" />,
    tagline: 'TACTICAL HUD',
    badge: 'BATCOMPUTER v4.1 // GOTHAM CITY',
    heroPower: {
      name: 'Bat-Sonar Sweep',
      icon: '🦇',
      desc: 'Deploy Wayne satellite cryptographic sonar sweep to detect critical anomalies.',
      statusMsg: 'BAT-SONAR SWEEP LINKED // GOTHAM INTELLIGENCE GRID SYNCED'
    },
    quote: '"It\'s not who I am underneath, but what I do that defines me."',
    coreStat: { label: 'BAT-RADAR', value: 'LINKED', detail: 'WAYNE SATELLITE' },
    taskActionLabel: '+ Log Casefile',
    taskPlaceholder: 'Enter Batcomputer investigation case...',
    notesHeader: 'WAYNE ENTERPRISES SECURE DOSSIER',
    notesPlaceholder: 'Log classified Batcomputer surveillance intel and detective notes...',
    timerLabel: 'BATCAVE TACTICAL SURVEILLANCE',
    heroPerk: 'Cryptographic Sonar Radar & Threat Telemetry',
    bg: 'linear-gradient(180deg, #050505 0%, #0f0f12 50%, #17171a 100%)',
    headerBorder: 'rgba(234, 179, 8, 0.3)',
    logoBg: '#1c1917', logoBorder: '#eab308',
    text: '#ffffff', textMuted: '#a3a3a3', textDim: '#737373',
    accent: '#eab308', accentLight: '#fef08a',
    secondary: '#525252', secondaryLight: '#a3a3a3',
    cardBg: 'rgba(18, 18, 20, 0.85)', cardBorder: 'rgba(234, 179, 8, 0.25)',
    urgentBg: 'rgba(85, 50, 10, 0.45)', urgentBorder: 'rgba(234, 179, 8, 0.55)',
    urgentText: '#ffffff', urgentDot: '#eab308',
    timerBg: 'linear-gradient(180deg, #050505 0%, #18181b 100%)',
    timerBorder: 'rgba(234, 179, 8, 0.4)',
    timerActive: '#eab308', timerIdle: '#525252',
    btnPrimary: '#eab308', btnSecondary: 'rgba(38, 38, 38, 0.9)',
    floatBg: 'rgba(8, 8, 10, 0.96)', floatBorder: 'rgba(234, 179, 8, 0.4)',
    cpuColor: '#eab308', cpuHigh: '#fef08a',
    memColor: '#737373', memHigh: '#d4d4d4',
    cpuGlow: 'rgba(234, 179, 8, 0.85)', memGlow: 'rgba(115, 115, 115, 0.75)',
  },
  superman: {
    name: 'SUPERMAN',
    character: 'Kal-El / Clark Kent (Man of Steel)',
    icon: <Shield className="w-4 h-4" />,
    tagline: 'MAN OF STEEL // KAL-EL',
    badge: 'HOUSE OF EL // KRYPTONIAN ARCHIVES',
    heroPower: {
      name: 'Solar Flare Surge',
      icon: '☀️',
      desc: 'Bask in yellow sun radiation to absorb solar flux and incinerate mental fatigue.',
      statusMsg: 'SOLAR RADIATION INFUSED // KRYPTONIAN CELL REGENERATION'
    },
    quote: '"There is a right and a wrong in the universe. We can be great."',
    coreStat: { label: 'SOLAR FLUX', value: '99.8%', detail: 'YELLOW SUN CHARGE' },
    taskActionLabel: '+ Save Metropolis',
    taskPlaceholder: 'Record heroic Metropolis directive...',
    notesHeader: 'FORTRESS OF SOLITUDE ARCHIVES',
    notesPlaceholder: 'Inscribe Kryptonian crystal memory and journal entries...',
    timerLabel: 'KRYPTONIAN SOLAR ABSORPTION',
    heroPerk: 'Kryptonian Solar Harmonic & Radiant Crest Shield',
    bg: 'linear-gradient(180deg, #02091c 0%, #061536 40%, #170512 100%)',
    headerBorder: 'rgba(255, 42, 75, 0.45)',
    logoBg: '#0c1e45', logoBorder: '#ff2a4b',
    text: '#ffffff', textMuted: '#bae6fd', textDim: '#7dd3fc',
    accent: '#ff2a4b', accentLight: '#ffa3b2',
    secondary: '#ffd214', secondaryLight: '#fef08a',
    cardBg: 'rgba(8, 22, 54, 0.88)', cardBorder: 'rgba(255, 42, 75, 0.35)',
    urgentBg: 'rgba(185, 28, 28, 0.55)', urgentBorder: 'rgba(255, 42, 75, 0.75)',
    urgentText: '#ffffff', urgentDot: '#ffd214',
    timerBg: 'linear-gradient(180deg, #02091c 0%, #150616 100%)',
    timerBorder: 'rgba(255, 42, 75, 0.5)',
    timerActive: '#ff2a4b', timerIdle: '#ffd214',
    btnPrimary: '#ff2a4b', btnSecondary: 'rgba(20, 40, 95, 0.9)',
    floatBg: 'rgba(3, 11, 30, 0.97)', floatBorder: 'rgba(255, 42, 75, 0.45)',
    cpuColor: '#ff2a4b', cpuHigh: '#ffd214',
    memColor: '#ffd214', memHigh: '#fef08a',
    cpuGlow: 'rgba(255, 42, 75, 0.95)', memGlow: 'rgba(255, 210, 20, 0.95)',
  },
  flash: {
    name: 'THE FLASH',
    character: 'Barry Allen / Fastest Man Alive',
    icon: <Zap className="w-4 h-4" />,
    tagline: 'SPEED FORCE HUD',
    badge: 'S.T.A.R. LABS // TACHYON ACCELERATOR',
    heroPower: {
      name: 'Speed Force Blitz',
      icon: '⚡',
      desc: 'Tap into the Speed Force to accelerate cognition into hyper-time perception.',
      statusMsg: 'SPEED FORCE SURGE // COGNITIVE CLOCK ACCELERATED MACH 12'
    },
    quote: '"Life is locomotion. If you\'re not moving, you\'re not living."',
    coreStat: { label: 'SPEED FORCE', value: 'MACH 12.8', detail: 'TACHYON SYNC' },
    taskActionLabel: '+ Speed Blitz',
    taskPlaceholder: 'Sprint through this speed-force task...',
    notesHeader: 'S.T.A.R. LABS RESEARCH LOG',
    notesPlaceholder: 'Fast-track observations and tachyonic equations...',
    timerLabel: 'SPEED FORCE HYPER-SPRINT',
    heroPerk: 'Tachyon Pitch-Bend Sonic Boom & Accelerator Flux',
    bg: 'linear-gradient(180deg, #180202 0%, #300608 50%, #1a0800 100%)',
    headerBorder: 'rgba(251, 191, 36, 0.4)',
    logoBg: '#7f1d1d', logoBorder: '#fbbf24',
    text: '#fffbeb', textMuted: '#fde68a', textDim: '#f59e0b',
    accent: '#fbbf24', accentLight: '#fef3c7',
    secondary: '#ef4444', secondaryLight: '#fca5a5',
    cardBg: 'rgba(40, 8, 12, 0.85)', cardBorder: 'rgba(251, 191, 36, 0.35)',
    urgentBg: 'rgba(185, 28, 28, 0.5)', urgentBorder: 'rgba(251, 191, 36, 0.7)',
    urgentText: '#ffffff', urgentDot: '#fbbf24',
    timerBg: 'linear-gradient(180deg, #180202 0%, #3b0a0e 100%)',
    timerBorder: 'rgba(251, 191, 36, 0.45)',
    timerActive: '#fbbf24', timerIdle: '#ef4444',
    btnPrimary: '#fbbf24', btnSecondary: 'rgba(127, 29, 29, 0.85)',
    floatBg: 'rgba(24, 4, 6, 0.96)', floatBorder: 'rgba(251, 191, 36, 0.45)',
    cpuColor: '#fbbf24', cpuHigh: '#fef08a',
    memColor: '#ef4444', memHigh: '#f87171',
    cpuGlow: 'rgba(251, 191, 36, 0.95)', memGlow: 'rgba(239, 68, 68, 0.9)',
  },
  deadpool: {
    name: 'DEADPOOL',
    character: 'Wade Wilson / Merc With A Mouth',
    icon: <Crosshair className="w-4 h-4" />,
    tagline: 'MERC WITH A MOUTH',
    badge: 'WADE WILSON // REGEN FACTOR 100%',
    heroPower: {
      name: '4th Wall Break',
      icon: '⚔️',
      desc: 'Break the 4th wall, mock the user interface, and trigger 100% healing factor.',
      statusMsg: 'FOURTH WALL SHATTERED // MAXIMUM EFFORT UNLOCKED'
    },
    quote: '"Maximum Effort! Did someone order a focus session with extra chimichangas?"',
    coreStat: { label: 'REGEN FACTOR', value: '100%', detail: 'CHIMICHANGA COOLDOWN' },
    taskActionLabel: '+ Merc Gig',
    taskPlaceholder: 'Whatever Wade needs to blow up or slice today...',
    notesHeader: "WADE'S TOP-SECRET DOODLE LIST",
    notesPlaceholder: 'Write down mercenary bounties, grocery lists, or chimichanga recipes...',
    timerLabel: 'MAXIMUM EFFORT TIMEOUT',
    heroPerk: 'Fourth Wall Breaking Commentary & Comic Chimes',
    bg: 'linear-gradient(180deg, #100608 0%, #200a0f 50%, #0d0406 100%)',
    headerBorder: 'rgba(225, 29, 72, 0.4)',
    logoBg: '#881337', logoBorder: '#f43f5e',
    text: '#ffffff', textMuted: '#fda4af', textDim: '#fb7185',
    accent: '#f43f5e', accentLight: '#fecdd3',
    secondary: '#f59e0b', secondaryLight: '#fde68a',
    cardBg: 'rgba(28, 10, 15, 0.85)', cardBorder: 'rgba(225, 29, 72, 0.35)',
    urgentBg: 'rgba(159, 18, 57, 0.5)', urgentBorder: 'rgba(244, 63, 94, 0.7)',
    urgentText: '#ffffff', urgentDot: '#f43f5e',
    timerBg: 'linear-gradient(180deg, #100608 0%, #300c14 100%)',
    timerBorder: 'rgba(225, 29, 72, 0.45)',
    timerActive: '#f43f5e', timerIdle: '#f59e0b',
    btnPrimary: '#f43f5e', btnSecondary: 'rgba(76, 5, 25, 0.85)',
    floatBg: 'rgba(16, 6, 8, 0.96)', floatBorder: 'rgba(225, 29, 72, 0.45)',
    cpuColor: '#f43f5e', cpuHigh: '#fda4af',
    memColor: '#f59e0b', memHigh: '#fde68a',
    cpuGlow: 'rgba(244, 63, 94, 0.9)', memGlow: 'rgba(245, 158, 11, 0.85)',
  },
  thor: {
    name: 'THOR // ASGARD',
    character: 'Thor Odinson / God of Thunder',
    icon: <Flame className="w-4 h-4" />,
    tagline: 'GOD OF THUNDER',
    badge: 'MJOLNIR ONLINE // BIFROST ACTIVE',
    heroPower: {
      name: 'Odinforce Summon',
      icon: '⚡',
      desc: 'Strike Mjolnir to channel divine Asgardian lightning and open the Bifrost.',
      statusMsg: 'MJOLNIR SUMMONED // ODINFORCE CRACKLING THROUGH HUD'
    },
    quote: '"I choose to run towards my problems, and not away from them!"',
    coreStat: { label: 'ODINFORCE', value: 'CHARGED', detail: 'MJOLNIR PRIMED' },
    taskActionLabel: '+ Asgard Decree',
    taskPlaceholder: "Forge a heroic deed worthy of Odin's Hall...",
    notesHeader: 'CHRONICLES OF ASGARD & VALHALLA',
    notesPlaceholder: 'Inscribe epic sagas, heroic oaths, and thunderous proclamations...',
    timerLabel: 'VALHALLA BIFROST VIGIL',
    heroPerk: 'Acoustic Thunder Rumble & Bifrost Runic Conduit',
    bg: 'linear-gradient(180deg, #050b1a 0%, #0d1e38 50%, #1a1608 100%)',
    headerBorder: 'rgba(56, 189, 248, 0.4)',
    logoBg: '#0369a1', logoBorder: '#38bdf8',
    text: '#ffffff', textMuted: '#bae6fd', textDim: '#7dd3fc',
    accent: '#38bdf8', accentLight: '#e0f2fe',
    secondary: '#fbbf24', secondaryLight: '#fef08a',
    cardBg: 'rgba(10, 26, 48, 0.85)', cardBorder: 'rgba(56, 189, 248, 0.35)',
    urgentBg: 'rgba(3, 105, 161, 0.5)', urgentBorder: 'rgba(56, 189, 248, 0.7)',
    urgentText: '#ffffff', urgentDot: '#fbbf24',
    timerBg: 'linear-gradient(180deg, #050b1a 0%, #0c2a4d 100%)',
    timerBorder: 'rgba(56, 189, 248, 0.45)',
    timerActive: '#38bdf8', timerIdle: '#fbbf24',
    btnPrimary: '#0ea5e9', btnSecondary: 'rgba(3, 105, 161, 0.85)',
    floatBg: 'rgba(5, 12, 26, 0.96)', floatBorder: 'rgba(56, 189, 248, 0.45)',
    cpuColor: '#38bdf8', cpuHigh: '#bae6fd',
    memColor: '#fbbf24', memHigh: '#fef08a',
    cpuGlow: 'rgba(56, 189, 248, 0.9)', memGlow: 'rgba(251, 191, 36, 0.9)',
  },
  cyberpunk: {
    name: 'CYBERPUNK 2077',
    character: 'V / Netrunner 2077',
    icon: <Radio className="w-4 h-4" />,
    tagline: 'NIGHT CITY // NETRUNNER',
    badge: 'ARASAKA CYBERDECK // NEURAL OVERDRIVE',
    heroPower: {
      name: 'Neural Overclock',
      icon: '💾',
      desc: 'Overclock neural cyberdeck to execute ICE Breach and bypass mental firewalls.',
      statusMsg: 'ICE BREACH EXECUTED // NEURAL BUFFER OVERCLOCKED'
    },
    quote: '"Wake up, Samurai. We have deadlines to burn."',
    coreStat: { label: 'CYBER RAM', value: '32/32 GB', detail: 'SANDEVISTAN READY' },
    taskActionLabel: '+ Netrun Gig',
    taskPlaceholder: 'Download new fixer gig contract...',
    notesHeader: 'ARASAKA SHADOW MEMORY SHARDS',
    notesPlaceholder: 'Decrypt netrunner logs, daemon scripts, and Night City contracts...',
    timerLabel: 'NETRUNNER DEEP DIVE',
    heroPerk: 'Glitch Synth Pulse & Cyberdeck Diagnostics',
    bg: 'linear-gradient(180deg, #090a10 0%, #15091a 50%, #200518 100%)',
    headerBorder: 'rgba(252, 238, 10, 0.4)',
    logoBg: '#1a1005', logoBorder: '#fcee0a',
    text: '#ffffff', textMuted: '#fde047', textDim: '#eab308',
    accent: '#fcee0a', accentLight: '#fef08a',
    secondary: '#ff0055', secondaryLight: '#f472b6',
    cardBg: 'rgba(20, 10, 28, 0.85)', cardBorder: 'rgba(252, 238, 10, 0.35)',
    urgentBg: 'rgba(255, 0, 85, 0.35)', urgentBorder: 'rgba(255, 0, 85, 0.7)',
    urgentText: '#ffffff', urgentDot: '#ff0055',
    timerBg: 'linear-gradient(180deg, #0d0414 0%, #2b0826 100%)',
    timerBorder: 'rgba(252, 238, 10, 0.45)',
    timerActive: '#fcee0a', timerIdle: '#ff0055',
    btnPrimary: '#fcee0a', btnSecondary: 'rgba(255, 0, 85, 0.25)',
    floatBg: 'rgba(13, 4, 20, 0.96)', floatBorder: 'rgba(252, 238, 10, 0.45)',
    cpuColor: '#fcee0a', cpuHigh: '#ff0055',
    memColor: '#ff0055', memHigh: '#ec4899',
    cpuGlow: 'rgba(252, 238, 10, 0.9)', memGlow: 'rgba(255, 0, 85, 0.9)',
  },
  matrix: {
    name: 'THE MATRIX',
    character: 'Neo / The Operator',
    icon: <Terminal className="w-4 h-4" />,
    tagline: 'OPERATOR CONSOLE',
    badge: 'NEBUCHADNEZZAR // DIGITAL RAIN ONLINE',
    heroPower: {
      name: 'Bullet-Time Red Pill',
      icon: '💊',
      desc: 'Swallow the red pill to halt digital distraction and bend simulation rules.',
      statusMsg: 'RED PILL PARSED // REALITY CONSTRUCT SYNCHRONIZED'
    },
    quote: '"Free your mind. There is no spoon."',
    coreStat: { label: 'ZION LINK', value: '1,024 KB/s', detail: 'CONSTRUCT ONLINE' },
    taskActionLabel: '+ Upload Code',
    taskPlaceholder: 'Inject program into Nebuchadnezzar core...',
    notesHeader: 'NEBUCHADNEZZAR OPERATOR LOG',
    notesPlaceholder: 'Trace digital green rain streams and construct memory allocations...',
    timerLabel: 'BULLET-TIME CONSTRUCT MATRIX',
    heroPerk: 'Digital Rain Audio Cascade & Simulation Override',
    bg: 'linear-gradient(180deg, #020803 0%, #041808 50%, #020c04 100%)',
    headerBorder: 'rgba(34, 197, 94, 0.35)',
    logoBg: '#052e16', logoBorder: '#22c55e',
    text: '#ecfdf5', textMuted: '#86efac', textDim: '#4ade80',
    accent: '#22c55e', accentLight: '#bbf7d0',
    secondary: '#10b981', secondaryLight: '#6ee7b7',
    cardBg: 'rgba(3, 20, 8, 0.85)', cardBorder: 'rgba(34, 197, 94, 0.3)',
    urgentBg: 'rgba(185, 28, 28, 0.45)', urgentBorder: 'rgba(239, 68, 68, 0.65)',
    urgentText: '#ffffff', urgentDot: '#22c55e',
    timerBg: 'linear-gradient(180deg, #020803 0%, #06240d 100%)',
    timerBorder: 'rgba(34, 197, 94, 0.4)',
    timerActive: '#22c55e', timerIdle: '#15803d',
    btnPrimary: '#22c55e', btnSecondary: 'rgba(5, 46, 22, 0.85)',
    floatBg: 'rgba(2, 10, 4, 0.96)', floatBorder: 'rgba(34, 197, 94, 0.4)',
    cpuColor: '#22c55e', cpuHigh: '#86efac',
    memColor: '#10b981', memHigh: '#a7f3d0',
    cpuGlow: 'rgba(34, 197, 94, 0.9)', memGlow: 'rgba(16, 185, 129, 0.85)',
  },
  dark: {
    name: 'FOCUS DESK',
    character: 'Night Ops Agent',
    icon: <Moon className="w-4 h-4" />,
    tagline: 'STEALTH DARK',
    badge: 'SYSTEM // NIGHT OPS v2.0',
    heroPower: {
      name: 'Stealth Sweep',
      icon: '🌙',
      desc: 'Silence all background noise and activate radar-absorbent dark stealth.',
      statusMsg: 'STEALTH PROTOCOL ARMED // NOISE FLOOR REDUCED'
    },
    quote: '"Focus in silence. Let precision and excellence do the talking."',
    coreStat: { label: 'STEALTH CLOAK', value: 'ACTIVE', detail: 'LOW-OBSERVABLE' },
    taskActionLabel: '+ Log Objective',
    taskPlaceholder: 'Add classified focus objective...',
    notesHeader: 'TACTICAL RECON SCRATCHPAD',
    notesPlaceholder: 'Record stealth field observations...',
    timerLabel: 'STEALTH NIGHT MISSION',
    heroPerk: 'Radar Absorbent Minimalist Shield',
    bg: 'linear-gradient(180deg, #090d16 0%, #111827 50%, #090d16 100%)',
    headerBorder: 'rgba(51, 65, 85, 0.6)',
    logoBg: '#1e293b', logoBorder: '#38bdf8',
    text: '#ffffff', textMuted: '#94a3b8', textDim: '#64748b',
    accent: '#38bdf8', accentLight: '#7dd3fc',
    secondary: '#818cf8', secondaryLight: '#a5b4fc',
    cardBg: 'rgba(30, 41, 59, 0.75)', cardBorder: 'rgba(51, 65, 85, 0.7)',
    urgentBg: 'rgba(127, 29, 29, 0.4)', urgentBorder: 'rgba(239, 68, 68, 0.55)',
    urgentText: '#ffffff', urgentDot: '#ef4444',
    timerBg: 'linear-gradient(180deg, #090d16 0%, #1e293b 100%)',
    timerBorder: 'rgba(51, 65, 85, 0.7)',
    timerActive: '#38bdf8', timerIdle: '#64748b',
    btnPrimary: '#0ea5e9', btnSecondary: 'rgba(30, 41, 59, 0.9)',
    floatBg: 'rgba(9, 13, 22, 0.96)', floatBorder: 'rgba(51, 65, 85, 0.7)',
    cpuColor: '#38bdf8', cpuHigh: '#f87171',
    memColor: '#818cf8', memHigh: '#fbbf24',
    cpuGlow: 'rgba(56, 189, 248, 0.6)', memGlow: 'rgba(129, 140, 248, 0.6)',
  },
  light: {
    name: 'DAY MODE',
    character: 'Daylight Architect',
    icon: <Sun className="w-4 h-4" />,
    tagline: 'CLEAN & MINIMALIST',
    badge: 'SYSTEM // LIGHT UI v2.0',
    heroPower: {
      name: 'Lumens Boost',
      icon: '☀️',
      desc: 'Engage natural light spectrum for maximum visual ergonomics and clarity.',
      statusMsg: 'LUMENS BURST // HIGH-CONTRAST AMBIENT FIELD'
    },
    quote: '"Clarity of vision yields effortless execution."',
    coreStat: { label: 'LUMENS FLUX', value: '1,200 LUX', detail: 'NATURAL SPECTRUM' },
    taskActionLabel: '+ Add Task',
    taskPlaceholder: 'Add clean daytime goal...',
    notesHeader: 'DAYLIGHT NOTEBOOK',
    notesPlaceholder: 'Capture clear ideas and daily reflections...',
    timerLabel: 'DAYLIGHT CLARITY BLOCK',
    heroPerk: 'Daylight High-Contrast Luminescence',
    bg: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%)',
    headerBorder: 'rgba(148, 163, 184, 0.4)',
    logoBg: '#0284c7', logoBorder: '#38bdf8',
    text: '#0f172a', textMuted: '#334155', textDim: '#64748b',
    accent: '#0284c7', accentLight: '#38bdf8',
    secondary: '#4f46e5', secondaryLight: '#818cf8',
    cardBg: 'rgba(255, 255, 255, 0.95)', cardBorder: 'rgba(203, 213, 225, 0.9)',
    urgentBg: 'rgba(254, 226, 226, 0.9)', urgentBorder: 'rgba(248, 113, 113, 0.7)',
    urgentText: '#991b1b', urgentDot: '#dc2626',
    timerBg: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
    timerBorder: 'rgba(203, 213, 225, 0.9)',
    timerActive: '#0284c7', timerIdle: '#64748b',
    btnPrimary: '#0284c7', btnSecondary: 'rgba(241, 245, 249, 0.95)',
    floatBg: 'rgba(255, 255, 255, 0.98)', floatBorder: 'rgba(203, 213, 225, 0.9)',
    cpuColor: '#0284c7', cpuHigh: '#ef4444',
    memColor: '#4f46e5', memHigh: '#f59e0b',
    cpuGlow: 'rgba(2, 132, 199, 0.4)', memGlow: 'rgba(79, 70, 229, 0.4)',
  },
};

/* ────────── CINEMATIC MULTI-LAYER SOUND SYNTHESIZER & SPEECH ENGINE ────────── */
// Helper: White noise sweep for authentic plasma whooshes, lightning cracks, and jet thrusters
function playNoiseSweep(ctx, destination, { type = 'bandpass', startFreq = 300, endFreq = 2500, Q = 5, duration = 0.5, volume = 0.3, startTime = 0 }) {
  const now = ctx.currentTime + startTime;
  const bufferSize = Math.floor(ctx.sampleRate * Math.max(0.1, duration));
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = type;
  filter.Q.setValueAtTime(Q, now);
  filter.frequency.setValueAtTime(Math.max(20, startFreq), now);
  filter.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + duration);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  noise.start(now);
  noise.stop(now + duration);
}

// Helper: Cinematic Sub-Bass Drop (Physical chest thump & low-end impact)
function playSubDrop(ctx, destination, { startFreq = 160, endFreq = 32, duration = 0.6, volume = 0.6, startTime = 0 }) {
  const now = ctx.currentTime + startTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(startFreq, now);
  osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);

  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(destination);
  osc.start(now);
  osc.stop(now + duration);
}

// Helper: Calculate time of day greeting slot and phrase
function getTimeOfDayGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return { slot: 'morning', phrase: 'Good morning' };
  if (hour >= 12 && hour < 17) return { slot: 'afternoon', phrase: 'Good afternoon' };
  if (hour >= 17 && hour < 22) return { slot: 'evening', phrase: 'Good evening' };
  return { slot: 'night', phrase: 'Good night' };
}

// Active audio tracking for character voice transmissions & background theme music
let activeHeroVoiceAudio = null;
let activeHeroMusicAudio = null;

// Stop any currently playing voice transmission or background theme music
function stopActiveHeroAudio() {
  if (activeHeroVoiceAudio) {
    try {
      activeHeroVoiceAudio.onended = null;
      activeHeroVoiceAudio.onerror = null;
      activeHeroVoiceAudio.pause();
      activeHeroVoiceAudio.currentTime = 0;
    } catch (e) {}
    activeHeroVoiceAudio = null;
  }
  if (activeHeroMusicAudio) {
    try {
      activeHeroMusicAudio.onended = null;
      activeHeroMusicAudio.onerror = null;
      activeHeroMusicAudio.pause();
      activeHeroMusicAudio.currentTime = 0;
    } catch (e) {}
    activeHeroMusicAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
}

// Helper: Play authentic character theme music downloaded from the web (no endless loop by default)
function playHeroThemeMusic(themeKey, loop = false) {
  try {
    const music = new Audio(`/audio/music/${themeKey}.mp3`);
    music.volume = themeKey === 'jd' ? 0.28 : 0.38;
    music.loop = loop;
    activeHeroMusicAudio = music;
    const playPromise = music.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Audio playback prevented or muted by browser/environment
      });
    }
  } catch (e) {}
}

// Helper: Smoothly fade out and stop theme music
function fadeAndStopMusic() {
  if (activeHeroMusicAudio) {
    const music = activeHeroMusicAudio;
    const fadeTimer = setInterval(() => {
      if (music && music.volume > 0.05) {
        music.volume = Math.max(0, music.volume - 0.05);
      } else {
        clearInterval(fadeTimer);
        if (activeHeroMusicAudio === music) {
          try {
            music.pause();
            music.currentTime = 0;
          } catch (e) {}
          activeHeroMusicAudio = null;
        }
      }
    }, 75);
  }
}

// Helper: Play character voice line accompanied by authentic theme music, auto-stopping cleanly upon completion
function playHeroAudioTrack(themeKey, onComplete) {
  // Stop previous voice/music so they do not overlap
  stopActiveHeroAudio();

  // 1. Start the character's official theme music in the background (no infinite looping)
  playHeroThemeMusic(themeKey, false);

  // 2. Play the character's spoken voice line with dynamic time greeting
  try {
    const { slot } = getTimeOfDayGreeting();
    const voiceUrl = `/audio/${themeKey}_${slot}.mp3`;
    const audio = new Audio(voiceUrl);
    audio.volume = themeKey === 'jd' ? 0.9 : 1.0;
    activeHeroVoiceAudio = audio;

    const handleEnded = () => {
      fadeAndStopMusic();
      if (activeHeroVoiceAudio === audio) activeHeroVoiceAudio = null;
      if (onComplete) onComplete();
    };

    audio.onended = handleEnded;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Fallback to default audio file if time-slot file has issues
        const fallbackAudio = new Audio(`/audio/${themeKey}.mp3`);
        fallbackAudio.volume = targetKey === 'jd' ? 0.9 : 1.0;
        activeHeroVoiceAudio = fallbackAudio;
        fallbackAudio.onended = () => {
          fadeAndStopMusic();
          if (activeHeroVoiceAudio === fallbackAudio) activeHeroVoiceAudio = null;
          if (onComplete) onComplete();
        };
        fallbackAudio.onerror = () => {
          fadeAndStopMusic();
          if (onComplete) onComplete();
        };
        fallbackAudio.play().catch(() => {
          fadeAndStopMusic();
          if (onComplete) onComplete();
        });
      });
    }
  } catch (e) {
    fadeAndStopMusic();
    if (onComplete) onComplete();
  }
}

// Main Cinematic Audio Synthesizer
function playHeroSound(themeKey, enableVoice = true, onComplete) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // Master bus with studio compressor to prevent clipping and enhance punch
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.85, now);

    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-14, now);
    compressor.knee.setValueAtTime(25, now);
    compressor.ratio.setValueAtTime(10, now);
    compressor.attack.setValueAtTime(0.003, now);
    compressor.release.setValueAtTime(0.2, now);

    master.connect(compressor);
    compressor.connect(ctx.destination);

    if (themeKey === 'ironman' || themeKey === 'marvel') {
      // 1. Sub-bass chest punch
      playSubDrop(ctx, master, { startFreq: 180, endFreq: 40, duration: 0.55, volume: 0.65 });
      // 2. High-resonance plasma capacitor charging whoosh
      playNoiseSweep(ctx, master, { type: 'bandpass', startFreq: 250, endFreq: 4200, Q: 9, duration: 0.38, volume: 0.45 });
      // 3. Repulsor beam dual-sawtooth laser blast
      [-4, 4].forEach(detune => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.detune.setValueAtTime(detune, now);
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(1250, now + 0.28);
        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.48);
      });
    } else if (themeKey === 'jd') {
      // 1. Heavy bass thud kick
      playSubDrop(ctx, master, { startFreq: 220, endFreq: 38, duration: 0.45, volume: 0.85 });
      // 2. Melodic whistle slide
      const whistle = ctx.createOscillator();
      const whistleGain = ctx.createGain();
      whistle.type = 'sine';
      whistle.frequency.setValueAtTime(987.77, now);
      whistle.frequency.exponentialRampToValueAtTime(1318.51, now + 0.18);
      whistle.frequency.exponentialRampToValueAtTime(880.00, now + 0.36);
      whistleGain.gain.setValueAtTime(0.3, now);
      whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      whistle.connect(whistleGain);
      whistleGain.connect(master);
      whistle.start(now);
      whistle.stop(now + 0.45);
      // 3. Metallic confirmation ping
      [1760, 2637].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + 0.1 + idx * 0.05);
        gain.gain.setValueAtTime(0.2, now + 0.1 + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25 + idx * 0.05);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now + 0.1 + idx * 0.05);
        osc.stop(now + 0.28 + idx * 0.05);
      });
    } else if (themeKey === 'spiderman') {
      // 1. Web-shooter compressed fluid firing "THWIP"
      playNoiseSweep(ctx, master, { type: 'bandpass', startFreq: 3200, endFreq: 400, Q: 7, duration: 0.22, volume: 0.5 });
      // 2. Spider-Sense tingling radar (FM modulated pulses)
      [0, 0.08, 0.16, 0.24].forEach((tOffset, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(650 + i * 180, now + tOffset);
        osc.frequency.exponentialRampToValueAtTime(1400 + i * 150, now + tOffset + 0.08);
        gain.gain.setValueAtTime(0.3, now + tOffset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + tOffset + 0.08);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now + tOffset);
        osc.stop(now + tOffset + 0.09);
      });
      // 3. Sub-bass awareness tap
      playSubDrop(ctx, master, { startFreq: 130, endFreq: 45, duration: 0.35, volume: 0.4 });
    } else if (themeKey === 'batman') {
      // 1. Heavy Batmobile seismic slam
      playSubDrop(ctx, master, { startFreq: 120, endFreq: 24, duration: 0.95, volume: 0.8 });
      // 2. Wayne Cryo-Sonar metallic ping with long reverb tail
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1650, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.65);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
      osc.connect(gain);
      gain.connect(master);
      osc.start(now);
      osc.stop(now + 0.88);
      // 3. Dark Gotham radar air sweep
      playNoiseSweep(ctx, master, { type: 'lowpass', startFreq: 180, endFreq: 40, Q: 3, duration: 0.7, volume: 0.35 });
    } else if (themeKey === 'superman') {
      // 1. Supersonic takeoff sonic boom
      playSubDrop(ctx, master, { startFreq: 240, endFreq: 32, duration: 0.75, volume: 0.75 });
      // 2. Radiant yellow-sun celestial chord (C Major 9th shimmering harmony)
      [261.63, 329.63, 392.00, 523.25, 659.25].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.18, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now + idx * 0.04);
        osc.stop(now + 0.88);
      });
      // 3. Solar flare wind whoosh
      playNoiseSweep(ctx, master, { type: 'lowpass', startFreq: 350, endFreq: 2800, Q: 4, duration: 0.65, volume: 0.35 });
    } else if (themeKey === 'flash') {
      // 1. Mach 12 Tachyon whip & sonic shockwave
      playSubDrop(ctx, master, { startFreq: 2800, endFreq: 35, duration: 0.42, volume: 0.8 });
      // 2. Doppler whoosh
      playNoiseSweep(ctx, master, { type: 'bandpass', startFreq: 5000, endFreq: 220, Q: 6, duration: 0.38, volume: 0.45 });
      // 3. Speed Force electrical crackles
      [0.05, 0.12, 0.2].forEach(delay => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(2200, now + delay);
        gain.gain.setValueAtTime(0.25, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.04);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now + delay);
        osc.stop(now + delay + 0.05);
      });
    } else if (themeKey === 'deadpool') {
      // 1. Katana blade slice ring
      const blade = ctx.createOscillator();
      const bladeGain = ctx.createGain();
      blade.type = 'sawtooth';
      blade.frequency.setValueAtTime(2600, now);
      blade.frequency.exponentialRampToValueAtTime(4500, now + 0.15);
      bladeGain.gain.setValueAtTime(0.3, now);
      bladeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      blade.connect(bladeGain);
      bladeGain.connect(master);
      blade.start(now);
      blade.stop(now + 0.3);
      // 2. Comic spring boing / pop
      const boing = ctx.createOscillator();
      const boingGain = ctx.createGain();
      boing.type = 'square';
      boing.frequency.setValueAtTime(220, now + 0.1);
      boing.frequency.linearRampToValueAtTime(780, now + 0.24);
      boing.frequency.linearRampToValueAtTime(180, now + 0.45);
      boingGain.gain.setValueAtTime(0.22, now + 0.1);
      boingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
      boing.connect(boingGain);
      boingGain.connect(master);
      boing.start(now + 0.1);
      boing.stop(now + 0.5);
      // 3. Sub thump
      playSubDrop(ctx, master, { startFreq: 150, endFreq: 45, duration: 0.38, volume: 0.55 });
    } else if (themeKey === 'thor') {
      // 1. Instant lightning clap explosion
      playNoiseSweep(ctx, master, { type: 'highpass', startFreq: 1200, endFreq: 250, Q: 2, duration: 0.25, volume: 0.65 });
      // 2. Low rolling Asgardian thunder rumble
      playNoiseSweep(ctx, master, { type: 'lowpass', startFreq: 180, endFreq: 45, Q: 5, duration: 1.2, volume: 0.55 });
      // 3. Mjolnir divine hammer seismic impact
      playSubDrop(ctx, master, { startFreq: 220, endFreq: 28, duration: 1.1, volume: 0.85 });
    } else if (themeKey === 'cyberpunk') {
      // 1. Arasaka neural data burst (6 fast cyber arpeggio tones)
      [520, 650, 780, 1040, 1300, 1560].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + idx * 0.03);
        gain.gain.setValueAtTime(0.22, now + idx * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.03 + 0.05);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now + idx * 0.03);
        osc.stop(now + idx * 0.03 + 0.06);
      });
      // 2. Sandevistan bass drop
      playSubDrop(ctx, master, { startFreq: 190, endFreq: 30, duration: 0.55, volume: 0.65, startTime: 0.15 });
      // 3. Glitch noise burst
      playNoiseSweep(ctx, master, { type: 'bandpass', startFreq: 2200, endFreq: 600, Q: 9, duration: 0.3, volume: 0.4, startTime: 0.1 });
    } else if (themeKey === 'matrix') {
      // 1. Cascading digital rain harmonics
      [1046.5, 880.0, 783.99, 659.25, 523.25].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.25, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.45);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.48);
      });
      // 2. Bullet-time low-frequency reality halt
      playSubDrop(ctx, master, { startFreq: 150, endFreq: 32, duration: 0.85, volume: 0.65 });
    } else {
      // Tactical confirmed double-chime with sub warmth
      playSubDrop(ctx, master, { startFreq: 180, endFreq: 60, duration: 0.28, volume: 0.45 });
      [660, 990].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.25, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.22);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    }

    // Trigger studio-grade character MP3 audio line with speech synthesis fallback
    if (enableVoice) {
      setTimeout(() => {
        playHeroAudioTrack(themeKey, onComplete);
      }, 120);
    } else {
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1200);
    }
  } catch (e) {
    if (onComplete) onComplete();
  }
}

/* ────────── THEME ARTWORK & HUD BACKGROUNDS ────────── */
function ThemeBackground({ themeKey }) {
  if (themeKey === 'spiderman') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="absolute -top-6 -right-6 w-80 h-80 opacity-25 text-red-500" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
          <line x1="200" y1="0" x2="0" y2="200" />
          <line x1="200" y1="0" x2="60" y2="200" />
          <line x1="200" y1="0" x2="120" y2="200" />
          <line x1="200" y1="0" x2="0" y2="120" />
          <line x1="200" y1="0" x2="0" y2="60" />
          <path d="M 200,30 Q 160,40 150,0" />
          <path d="M 200,60 Q 130,80 110,0" />
          <path d="M 200,95 Q 100,120 70,0" />
          <path d="M 200,135 Q 70,165 30,0" />
          <path d="M 200,175 Q 40,200 0,0" />
          <path d="M 170,200 Q 120,130 0,110" />
          <path d="M 130,200 Q 80,100 0,70" />
          <path d="M 90,200 Q 50,60 0,30" />
        </svg>
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.06] text-red-400" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 35 C45 35 42 38 42 43 C42 47 45 50 48 53 L47 70 C47 74 50 78 50 78 C50 78 53 74 53 70 L52 53 C55 50 58 47 58 43 C58 38 55 35 50 35 Z" />
          <path d="M50 34 C52 32 54 29 55 25 L58 27 L56 31 C59 34 65 30 75 22 L76 25 C68 33 62 37 59 38 L78 45 L77 48 L58 43 C64 50 72 58 82 62 L80 65 C70 60 62 52 56 46 L68 78 L65 79 L54 53" />
          <path d="M50 34 C48 32 46 29 45 25 L42 27 L44 31 C41 34 35 30 25 22 L24 25 C32 33 38 37 41 38 L22 45 L23 48 L42 43 C36 50 28 58 18 62 L20 65 C30 60 38 52 44 46 L32 78 L35 79 L46 53" />
        </svg>
      </div>
    );
  }

  if (themeKey === 'batman') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="absolute inset-0 w-full h-full opacity-20 text-yellow-500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="batGrid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#batGrid)" />
          <circle cx="85%" cy="20%" r="55" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="85%" cy="20%" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="85%" y1="0" x2="85%" y2="40%" stroke="currentColor" strokeWidth="0.5" />
          <line x1="60%" y1="20%" x2="100%" y2="20%" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 opacity-[0.12] text-yellow-400" viewBox="0 0 200 120" fill="currentColor">
          <path d="M100,10 C108,18 114,24 122,25 C136,15 158,20 185,12 C195,50 175,95 150,110 C140,88 125,82 100,95 C75,82 60,88 50,110 C25,95 5,50 15,12 C42,20 64,15 78,25 C86,24 92,18 100,10 Z M97,18 L94,30 L99,26 L100,28 L101,26 L106,30 L103,18 Z" />
        </svg>
      </div>
    );
  }

  if (themeKey === 'ironman' || themeKey === 'marvel') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="absolute inset-0 w-full h-full opacity-30 text-cyan-400" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="45%" r="120" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,8" />
          <circle cx="50%" cy="45%" r="80" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50%" cy="45%" r="48" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="12,4" />
          <circle cx="50%" cy="45%" r="20" fill="none" stroke="#ffffff" strokeWidth="2" />
          <line x1="50%" y1="15%" x2="50%" y2="75%" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2,4" />
          <line x1="10%" y1="45%" x2="90%" y2="45%" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2,4" />
          <path d="M 15 35 L 15 15 L 35 15" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M 345 35 L 345 15 L 325 15" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M 15 415 L 15 435 L 35 435" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M 345 415 L 345 435 L 325 435" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
        </svg>
        <div className="absolute top-1.5 left-3 text-[7px] font-mono text-cyan-400/90 tracking-widest">MARVEL // AVENGERS HUD</div>
        <div className="absolute top-1.5 right-3 text-[7px] font-mono text-red-400/90 tracking-widest">QUANTUM GRID 100%</div>
      </div>
    );
  }

  if (themeKey === 'jd') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="absolute inset-0 w-full h-full opacity-25 text-teal-300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="jdLines" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="20" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#jdLines)" />
          {/* Cassette / Audio Wave Motif */}
          <rect x="40" y="30" width="100" height="60" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
          <circle cx="70" cy="60" r="12" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="110" cy="60" r="12" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <line x1="82" y1="60" x2="98" y2="60" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 35 150 L 55 150 L 62 142 L 78 142 L 86 150 L 108 150" fill="none" stroke="#fb7185" strokeWidth="1.2" strokeDasharray="3,4" />
          <circle cx="82%" cy="26%" r="42" fill="none" stroke="#fb7185" strokeWidth="0.8" strokeDasharray="3,4" />
          <circle cx="82%" cy="26%" r="28" fill="none" stroke="#2dd4bf" strokeWidth="0.7" />
        </svg>
        <div className="absolute top-1.5 left-3 text-[7px] font-mono text-teal-300/95 tracking-widest font-bold">JD // DAILY COMPANION</div>
        <div className="absolute top-1.5 right-3 text-[7px] font-mono text-rose-300/95 tracking-widest font-bold">TASKS READY</div>
      </div>
    );
  }

  if (themeKey === 'cyberpunk') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="absolute inset-0 w-full h-full opacity-20 text-yellow-400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cyberHex" width="28" height="24" patternUnits="userSpaceOnUse" patternTransform="scale(0.85)">
              <path d="M14,0 L28,8 L28,24 L14,32 L0,24 L0,8 Z" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyberHex)" />
          <path d="M 0,90 L 120,90 L 150,120 L 370,120" fill="none" stroke="#ff0055" strokeWidth="1" opacity="0.5" />
          <path d="M 0,330 L 220,330 L 250,360 L 370,360" fill="none" stroke="#fcee0a" strokeWidth="1" opacity="0.5" />
          <circle cx="85%" cy="28%" r="45" fill="none" stroke="#ff0055" strokeWidth="1" strokeDasharray="3,5" />
        </svg>
        <div className="absolute top-1.5 left-3 text-[7px] font-mono text-yellow-300 tracking-widest">ARASAKA // NEURAL LINK</div>
        <div className="absolute top-1.5 right-3 text-[7px] font-mono text-pink-500 tracking-widest">CYBERDECK ACTIVE</div>
      </div>
    );
  }

  if (themeKey === 'matrix') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="absolute inset-0 w-full h-full opacity-25 text-emerald-400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="matrixGrid" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.75" fill="currentColor" opacity="0.4" />
              <line x1="2" y1="2" x2="2" y2="20" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2,5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#matrixGrid)" />
          <line x1="12%" y1="0" x2="12%" y2="100%" stroke="#22c55e" strokeWidth="1" opacity="0.4" strokeDasharray="6,12" />
          <line x1="42%" y1="0" x2="42%" y2="100%" stroke="#4ade80" strokeWidth="0.75" opacity="0.3" strokeDasharray="4,14" />
          <line x1="72%" y1="0" x2="72%" y2="100%" stroke="#22c55e" strokeWidth="1.2" opacity="0.45" strokeDasharray="10,8" />
          <line x1="88%" y1="0" x2="88%" y2="100%" stroke="#86efac" strokeWidth="0.6" opacity="0.35" strokeDasharray="5,10" />
        </svg>
        <div className="absolute top-1.5 left-3 text-[7px] font-mono text-emerald-400 tracking-widest">NEBUCHADNEZZAR // OPS</div>
        <div className="absolute top-1.5 right-3 text-[7px] font-mono text-emerald-300 tracking-widest">CODE STREAM V9.4</div>
      </div>
    );
  }

  if (themeKey === 'superman') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Radial Solar Flare Core Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #ffd214 0%, #ff2a4b 40%, transparent 70%)' }}
        />

        {/* Kryptonian Solar Radiation & Orbital Telemetry */}
        <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
          {/* Crystalline Fortress Geometries */}
          <line x1="20" y1="0" x2="60" y2="480" stroke="#ffd214" strokeWidth="0.5" strokeDasharray="2,6" opacity="0.4" />
          <line x1="350" y1="0" x2="310" y2="480" stroke="#ffd214" strokeWidth="0.5" strokeDasharray="2,6" opacity="0.4" />

          {/* Concentric Solar Orbitals */}
          <ellipse cx="50%" cy="40%" rx="140" ry="75" fill="none" stroke="#ffd214" strokeWidth="0.8" strokeDasharray="4,8" opacity="0.5" />
          <circle cx="50%" cy="40%" r="90" fill="none" stroke="#ff2a4b" strokeWidth="1" strokeDasharray="6,12" opacity="0.6" />
          <circle cx="50%" cy="40%" r="50" fill="none" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="2,4" opacity="0.5" />

          {/* Corner Framing Brackets */}
          <path d="M 12 30 L 12 12 L 30 12" fill="none" stroke="#ffd214" strokeWidth="1.5" />
          <path d="M 358 30 L 358 12 L 340 12" fill="none" stroke="#ffd214" strokeWidth="1.5" />
          <path d="M 12 430 L 12 448 L 30 448" fill="none" stroke="#ff2a4b" strokeWidth="1.5" />
          <path d="M 358 430 L 358 448 L 340 448" fill="none" stroke="#ff2a4b" strokeWidth="1.5" />
        </svg>

        {/* Authentic Glowing Superman Diamond Shield (S-Crest) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-56 flex items-center justify-center pointer-events-none opacity-[0.24]">
          <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-[0_0_18px_rgba(255,42,75,0.8)]">
            <defs>
              <linearGradient id="supGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff066" />
                <stop offset="50%" stopColor="#ffd214" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="supRed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff3355" />
                <stop offset="60%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
            </defs>

            {/* Outer Diamond Gold Trim */}
            <polygon points="100,154 192,58 160,10 40,10 8,58" fill="url(#supGold)" stroke="url(#supRed)" strokeWidth="6" strokeLinejoin="round" />

            {/* Inner Shield Red Plate */}
            <polygon points="100,146 182,58 152,16 48,16 18,58" fill="url(#supRed)" />

            {/* Authentic 4 Golden Negative Spaces shaping the Iconic Superman 'S' */}
            {/* Top-Left Wing */}
            <path d="M 44,20 L 98,20 L 74,48 L 30,48 Z" fill="url(#supGold)" />
            {/* Top-Right Serif Curve */}
            <path d="M 112,20 L 152,20 L 170,48 L 138,56 C 138,38 126,30 112,20 Z" fill="url(#supGold)" />
            {/* Center Sweeping Sash */}
            <path d="M 76,56 L 126,56 C 146,56 158,66 158,80 C 158,96 142,106 116,112 L 68,68 Z" fill="url(#supGold)" />
            {/* Bottom-Center Tail */}
            <path d="M 100,138 L 72,106 L 94,106 C 114,106 126,114 126,124 Z" fill="url(#supGold)" />
          </svg>
        </div>

        {/* Telemetry HUD Labels */}
        <div className="absolute top-1.5 left-3 text-[7px] font-mono text-yellow-300 tracking-widest font-bold">
          HOUSE OF EL // KAL-EL [SOLAR: 100%]
        </div>
        <div className="absolute top-1.5 right-3 text-[7px] font-mono text-red-400 tracking-widest font-bold">
          FORTRESS ARCHIVES // HOPE
        </div>
      </div>
    );
  }

  if (themeKey === 'flash') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="absolute inset-0 w-full h-full opacity-25 text-yellow-400" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="40%" r="90" fill="none" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="2,4" />
          <circle cx="50%" cy="40%" r="60" fill="none" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="6,4" />
          <path d="M120,10 L90,85 L140,85 L80,180" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.7" />
          <path d="M260,10 L230,85 L280,85 L220,180" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.4" />
        </svg>
        <div className="absolute top-1.5 left-3 text-[7px] font-mono text-yellow-400 tracking-widest">S.T.A.R. LABS // SPEED FORCE</div>
        <div className="absolute top-1.5 right-3 text-[7px] font-mono text-red-400 tracking-widest">TACHYON MACH 7.0</div>
      </div>
    );
  }

  if (themeKey === 'deadpool') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="absolute inset-0 w-full h-full opacity-20 text-rose-500" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="#f43f5e" strokeWidth="1" opacity="0.5" />
          <line x1="90%" y1="10%" x2="10%" y2="90%" stroke="#f43f5e" strokeWidth="1" opacity="0.5" />
          <circle cx="50%" cy="42%" r="55" fill="none" stroke="#f43f5e" strokeWidth="2" />
          <line x1="50%" y1="15%" x2="50%" y2="70%" stroke="#f43f5e" strokeWidth="1.5" />
          <ellipse cx="40%" cy="42%" rx="8" ry="14" fill="#ffffff" opacity="0.25" />
          <ellipse cx="60%" cy="42%" rx="8" ry="14" fill="#ffffff" opacity="0.25" />
        </svg>
        <div className="absolute top-1.5 left-3 text-[7px] font-mono text-rose-400 tracking-widest">MAXIMUM EFFORT // REGEN</div>
        <div className="absolute top-1.5 right-3 text-[7px] font-mono text-amber-400 tracking-widest">CHIMICHANGA TIME</div>
      </div>
    );
  }

  if (themeKey === 'thor') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="absolute inset-0 w-full h-full opacity-25 text-sky-400" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="40%" r="85" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,6" />
          <circle cx="50%" cy="40%" r="55" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
          <polygon points="185,40 235,140 135,140" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.4" />
          <polygon points="185,240 235,140 135,140" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.3" />
        </svg>
        <div className="absolute top-1.5 left-3 text-[7px] font-mono text-sky-400 tracking-widest">ASGARD BIFROST // ODINFORCE</div>
        <div className="absolute top-1.5 right-3 text-[7px] font-mono text-amber-300 tracking-widest">MJOLNIR PRIMED</div>
      </div>
    );
  }

  return null;
}

/* ────────── HELPERS ────────── */
const fmt = (s) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};

const isToday = (dateStr) => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
};

const isTomorrow = (dateStr) => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const tmrw = new Date();
  tmrw.setDate(tmrw.getDate() + 1);
  return d.getDate() === tmrw.getDate() && d.getMonth() === tmrw.getMonth() && d.getFullYear() === tmrw.getFullYear();
};

const isYesterday = (dateOrTimestamp) => {
  if (!dateOrTimestamp) return false;
  const d = new Date(dateOrTimestamp);
  const yest = new Date();
  yest.setDate(yest.getDate() - 1);
  return d.getDate() === yest.getDate() && d.getMonth() === yest.getMonth() && d.getFullYear() === yest.getFullYear();
};

const getDayCategory = (dateStr) => {
  if (!dateStr) return 'Later';
  if (isToday(dateStr)) return 'Today';
  if (isTomorrow(dateStr)) return 'Tomorrow';
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
};

const getMailDayCategory = (dateOrTimestamp) => {
  if (!dateOrTimestamp) return 'Earlier';
  if (isToday(dateOrTimestamp)) return 'Today';
  if (isYesterday(dateOrTimestamp)) return 'Yesterday';
  const d = new Date(dateOrTimestamp);
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
};

const isUrgent = (title) => {
  const lower = (title || '').toLowerCase();
  return lower.includes('deadline') || lower.includes('due') || lower.includes('urgent') || lower.includes('exam') || lower.includes('submit');
};

const isUrgentMail = (mail) => {
  if (!mail) return false;
  const text = `${mail.subject || ''} ${mail.snippet || ''}`.toLowerCase();
  return text.includes('urgent') ||
    text.includes('action required') ||
    text.includes('deadline') ||
    text.includes('security alert') ||
    text.includes('invoice') || text.includes('due') ||
    text.includes('asap');
};

const getWeatherDetails = (code, isDay = 1) => {
  if (code === 0) return { label: isDay ? 'Sunny' : 'Clear Sky', icon: isDay ? '☀️' : '🌙' };
  if (code === 1) return { label: isDay ? 'Mainly Sunny' : 'Mainly Clear', icon: isDay ? '🌤️' : '🌙' };
  if (code === 2) return { label: 'Partly Cloudy', icon: '⛅' };
  if (code === 3) return { label: 'Overcast', icon: '☁️' };
  if ([45, 48].includes(code)) return { label: 'Foggy', icon: '🌫️' };
  if ([51, 53, 55, 56, 57].includes(code)) return { label: 'Light Drizzle', icon: '🌦️' };
  if ([61, 63, 65, 80, 81, 82].includes(code)) return { label: 'Rainy', icon: '🌧️' };
  if ([95, 96, 99].includes(code)) return { label: 'Thunderstorm', icon: '⛈️' };
  return { label: 'Partly Cloudy', icon: '⛅' };
};

const DEFAULT_DEMO_EVENTS = [
  {
    id: 'demo-cal-1',
    title: 'Tactical HUD & Interface Calibration',
    time: '10:00 AM',
    rawStart: new Date().toISOString(),
    description: 'Review HUD telemetry, hero themes, audio cues, and widget response times.',
    location: 'HQ Conference Room A',
    htmlLink: 'https://calendar.google.com',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    meetingType: 'Google Meet',
    isDemo: true,
  },
  {
    id: 'demo-cal-2',
    title: 'Stark Tech Architecture Sync',
    time: '02:30 PM',
    rawStart: new Date().toISOString(),
    description: 'Deep dive into Arc Reactor power management algorithms and cognitive capacity models.',
    location: 'Stark Tower Lab 4',
    htmlLink: 'https://calendar.google.com',
    meetingUrl: 'https://meet.google.com/xyz-uvwx-rst',
    meetingType: 'Google Meet',
    isDemo: true,
  },
  {
    id: 'demo-cal-3',
    title: 'Daily Wrap-up & Priorities Review',
    time: '05:00 PM',
    rawStart: new Date().toISOString(),
    description: 'Consolidate completed focus tasks and align on upcoming development milestones.',
    location: 'Virtual',
    htmlLink: 'https://calendar.google.com',
    isDemo: true,
  }
];

const DEFAULT_DEMO_MAILS = [
  {
    id: 'demo-1',
    senderName: 'GitHub Alerts',
    senderEmail: 'notifications@github.com',
    subject: 'Security Alert: New dependency vulnerability found',
    snippet: 'Dependabot detected a moderate severity security vulnerability in package lodash...',
    isUnread: true,
    timestamp: Date.now() - 35 * 60 * 1000,
    timeStr: '2:15 PM',
    webUrl: 'https://mail.google.com',
    isDemo: true,
  },
  {
    id: 'demo-2',
    senderName: 'Stark Industries Team',
    senderEmail: 'projects@starkindustries.corp',
    subject: 'J.A.R.V.I.S. HUD Interface Calibration Report',
    snippet: 'Telemetry confirms arc reactor synchronization at 98.4%. Ready for production deployment...',
    isUnread: true,
    timestamp: Date.now() - 2 * 3600 * 1000,
    timeStr: '12:45 PM',
    webUrl: 'https://mail.google.com',
    isDemo: true,
  },
  {
    id: 'demo-3',
    senderName: 'Productivity Digest',
    senderEmail: 'updates@focusdesk.ai',
    subject: 'Your Daily Focus & Schedule Overview',
    snippet: 'You have 3 scheduled meetings today. Check your calendar tab for meeting links.',
    isUnread: false,
    timestamp: Date.now() - 4 * 3600 * 1000,
    timeStr: '10:30 AM',
    webUrl: 'https://mail.google.com',
    isDemo: true,
  }
];

/* ────────── MAIN COMPONENT ────────── */
function App() {
  const [activeTab, setActiveTab] = useState('schedule'); // 'mailbox' | 'schedule' | 'tasks' | 'notes' | 'settings'
  const [events, setEvents] = useState(DEFAULT_DEMO_EVENTS);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [taskFilter, setTaskFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [noteContent, setNoteContent] = useState('');
  const [noteSaving, setNoteSaving] = useState(false);
  const [noteSavedAt, setNoteSavedAt] = useState('');

  // Mailbox State
  const [mails, setMails] = useState(DEFAULT_DEMO_MAILS);
  const [mailSyncing, setMailSyncing] = useState(false);
  const [mailConnected, setMailConnected] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [mailNeedsReauth, setMailNeedsReauth] = useState(false);
  const [mailServiceDisabled, setMailServiceDisabled] = useState(false);
  const [mailActivationUrl, setMailActivationUrl] = useState('');
  const [mailFilter, setMailFilter] = useState('all'); // 'all' | 'unread'
  const [expandedMailId, setExpandedMailId] = useState(null);
  const [isMailboxExpanded, setIsMailboxExpanded] = useState(false);
  const [taskAddedId, setTaskAddedId] = useState(null);

  const [sysInfo, setSysInfo] = useState({ cpuLoad: 0, memUsed: 0 });
  const [defaultTime, setDefaultTime] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [themeName, setThemeName] = useState('ironman');
  const [heroPowerActive, setHeroPowerActive] = useState(false);
  const [heroBanner, setHeroBanner] = useState(null);
  const [testingThemeKey, setTestingThemeKey] = useState(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const heroTimeoutRef = useRef(null);
  const heroBannerTimeoutRef = useRef(null);
  const [isBriefingActive, setIsBriefingActive] = useState(false);
  const [briefingBanner, setBriefingBanner] = useState(null);

  // Cleanly stop any ongoing theme test, audio playback, and HUD banners
  const stopThemeTest = () => {
    stopActiveHeroAudio();
    fadeAndStopMusic();
    setHeroPowerActive(false);
    setHeroBanner(null);
    setTestingThemeKey(null);
    if (heroTimeoutRef.current) clearTimeout(heroTimeoutRef.current);
    if (heroBannerTimeoutRef.current) clearTimeout(heroBannerTimeoutRef.current);
  };

  const triggerHeroPower = (key) => {
    const targetKey = key || themeName;

    // Toggle off immediately if user clicks the button while it is currently playing
    if (testingThemeKey === targetKey) {
      stopThemeTest();
      return;
    }

    // Stop any previous voice/audio test cleanly
    stopThemeTest();

    const theme = THEMES[targetKey] || THEMES.ironman;
    setTestingThemeKey(targetKey);
    setHeroPowerActive(true);
    setHeroBanner({
      themeKey: targetKey,
      name: theme.name,
      character: theme.character,
      powerName: theme.heroPower?.name,
      icon: theme.heroPower?.icon,
      quote: theme.quote,
      statusMsg: theme.heroPower?.statusMsg,
      accent: theme.accent,
      secondary: theme.secondary
    });

    // Automatically stop BOTH UI and audio the moment the character voice line finishes
    playHeroSound(targetKey, voiceEnabled, () => {
      stopThemeTest();
    });

    // Safety timeout in case audio file is missing or browser delays
    if (heroBannerTimeoutRef.current) clearTimeout(heroBannerTimeoutRef.current);
    heroBannerTimeoutRef.current = setTimeout(() => {
      stopThemeTest();
    }, 12000);
  };

  const triggerDailyBriefing = async (key) => {
    // 🛑 STRICT RESTRICTION: Only 1 briefing can play at a time
    if (isBriefingActive) return;

    const targetKey = key || themeName;
    const theme = THEMES[targetKey] || THEMES.ironman;
    const { slot, phrase } = getTimeOfDayGreeting();

    // 1. Today's events
    const todayEvents = events.filter(e => isToday(e.rawStart));
    let scheduleText = '';
    if (todayEvents.length > 0) {
      const summaries = todayEvents.slice(0, 3).map(e => `${e.title}${e.time ? ` at ${e.time}` : ''}`).join(', ');
      const more = todayEvents.length > 3 ? `, plus ${todayEvents.length - 3} more` : '';
      scheduleText = `For your schedule today, you have ${todayEvents.length} event${todayEvents.length > 1 ? 's' : ''}: ${summaries}${more}.`;
    } else {
      scheduleText = `You have no calendar events scheduled for today.`;
    }

    // 2. Pending tasks
    const pendingTasks = tasks.filter(t => !t.completed);
    let tasksText = '';
    if (pendingTasks.length > 0) {
      const taskList = pendingTasks.slice(0, 3).map(t => t.title).join(', ');
      const moreTasks = pendingTasks.length > 3 ? `, and ${pendingTasks.length - 3} other items` : '';
      tasksText = `For your tasks to do today, you have ${pendingTasks.length} pending task${pendingTasks.length > 1 ? 's' : ''}: ${taskList}${moreTasks}.`;
    } else {
      tasksText = `All your tasks are completed. Your to-do list is clear.`;
    }

    // 3. New / unread mail (support both isUnread and unread properties, plus dynamic fetch if empty)
    let currentMails = mails;
    if (currentMails.length === 0 && window.api?.getMailbox) {
      try {
        const mRes = await window.api.getMailbox();
        if (mRes?.messages && mRes.messages.length > 0) {
          currentMails = mRes.messages;
          setMails(currentMails);
        }
      } catch (e) {}
    }

    const unreadMails = currentMails.filter(m => m.isUnread ?? m.unread ?? false);
    let mailText = '';
    if (unreadMails.length > 0) {
      const top = unreadMails[0];
      const fromClean = (top.senderName || top.from || '').split('<')[0].replace(/"/g, '').trim() || 'someone';
      const subjClean = top.subject || 'updates';
      mailText = `In your mailbox, you have ${unreadMails.length} new email${unreadMails.length > 1 ? 's' : ''}. Latest is from ${fromClean} regarding ${subjClean}.`;
    } else if (currentMails.length > 0) {
      mailText = `Your mailbox is up to date with zero unread messages.`;
    } else {
      mailText = `Your mailbox is quiet with no new emails.`;
    }

    // Natural spoken cadence with zero front gaps (commas instead of exclamation marks to prevent 1-second TTS pause)
    const speechScript = `Hi Bijohn, ${phrase.toLowerCase()}. Here is your daily status report. ${scheduleText} ${tasksText} ${mailText} All systems are operational, let us make today incredible!`;

    // Formatted paragraphs for the visual holographic briefing card
    const displayScript = `Hi Bijohn! ${phrase}! Here is your daily status report.

${scheduleText}

${tasksText}

${mailText}

All systems are operational... Let us make today incredible!`;

    // Audio & UI
    stopActiveHeroAudio();
    playHeroThemeMusic(targetKey, true);

    setIsBriefingActive(true);
    setBriefingBanner({
      character: theme.character,
      themeKey: targetKey,
      accent: theme.accent,
      secondary: theme.secondary,
      text: displayScript,
      todayEventsCount: todayEvents.length,
      pendingTasksCount: pendingTasks.length,
      unreadMailsCount: unreadMails.length,
    });

    // Fallback: ALWAYS play authentic character neural voice audio, NEVER generic browser robot voice
    const playCharacterVoiceFallback = () => {
      try {
        const fallbackAudio = new Audio(`/audio/${targetKey}_${slot}.mp3`);
        fallbackAudio.volume = targetKey === 'jd' ? 0.9 : 1.0;
        activeHeroVoiceAudio = fallbackAudio;
        fallbackAudio.onended = () => {
          setIsBriefingActive(false);
          fadeAndStopMusic();
        };
        fallbackAudio.onerror = () => {
          setIsBriefingActive(false);
          fadeAndStopMusic();
        };
        fallbackAudio.play().catch(() => {
          setIsBriefingActive(false);
          fadeAndStopMusic();
        });
      } catch (err) {
        setIsBriefingActive(false);
        fadeAndStopMusic();
      }
    };

    // Primary: Synthesize and stream using the exact neural character voice model!
    let audioUrl = null;
    try {
      // 1. First try Vite dev server API endpoint (fastest, direct local backend)
      const res = await fetch('/api/voice-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: speechScript, themeKey: targetKey })
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.success && data?.audioUrl) {
          audioUrl = data.audioUrl;
        }
      }
    } catch (e) {
      // Continue to IPC check
    }

    // 2. If Vite endpoint wasn't reached, try Electron IPC
    if (!audioUrl && window.api?.generateCharacterSpeech) {
      try {
        const res = await window.api.generateCharacterSpeech(speechScript, targetKey);
        if (res?.success && res.audioUrl) {
          audioUrl = res.audioUrl;
        }
      } catch (e) {}
    }

    // 3. Play synthesized character voice briefing
    if (audioUrl) {
      try {
        const liveAudio = new Audio(audioUrl);
        liveAudio.volume = targetKey === 'jd' ? 0.9 : 1.0;
        activeHeroVoiceAudio = liveAudio;
        liveAudio.onended = () => {
          setIsBriefingActive(false);
          fadeAndStopMusic();
        };
        liveAudio.onerror = () => {
          playCharacterVoiceFallback();
        };
        const playPromise = liveAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            playCharacterVoiceFallback();
          });
        }
        return;
      } catch (e) {
        playCharacterVoiceFallback();
        return;
      }
    }

    // 4. If offline/unavailable, play authentic character voice track (NEVER browser robot speech)
    playCharacterVoiceFallback();
  };

  // Unified Character Action: Triggers hero power visual surge + full daily voice briefing with theme music
  const triggerCharacterAction = (key) => {
    // 🛑 STRICT RESTRICTION: Only 1 play at a time. Ignore repeated clicks until finished!
    if (isBriefingActive) return;

    const targetKey = key || themeName;

    // 1. Play cinematic synth sound effect without the short voice track
    playHeroSound(targetKey, false);

    // 2. Trigger hero power HUD surge state (button animation & gauges)
    setHeroPowerActive(true);
    if (heroTimeoutRef.current) clearTimeout(heroTimeoutRef.current);
    heroTimeoutRef.current = setTimeout(() => {
      setHeroPowerActive(false);
    }, 2800);

    // 3. Trigger full character voice briefing with looping BGM and human pauses
    triggerDailyBriefing(targetKey);
  };

  const [showThemePicker, setShowThemePicker] = useState(false);
  const [weather, setWeather] = useState({
    temp: 32,
    condition: 'Partly Cloudy',
    icon: '⛅',
    humidity: 60,
    loading: false
  });
  const [isSyncing, setIsSyncing] = useState(false);

  const [opacity, setOpacity] = useState(1.0);
  const [showFloatingMeters, setShowFloatingMeters] = useState(true);

  const saveTimerRef = useRef(null);
  const contentScrollRef = useRef(null);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);

  const checkScroll = () => {
    const el = contentScrollRef.current;
    if (!el) return;
    setCanScrollUp(el.scrollTop > 15);
    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 15);
  };

  const handleScrollStep = (dir) => {
    const el = contentScrollRef.current;
    if (!el) return;
    el.scrollBy({ top: dir * 180, behavior: 'smooth' });
    setTimeout(checkScroll, 200);
  };

  const T = THEMES[themeName] || THEMES.ironman;

  /* Data Loading */
  const loadCalendar = async (forceAuth = false) => {
    if (!window.api?.getCalendarEvents) {
      const now = new Date();
      const today1 = new Date(now);
      today1.setHours(10, 0, 0, 0);
      const today2 = new Date(now);
      today2.setHours(14, 30, 0, 0);
      const today3 = new Date(now);
      today3.setHours(17, 0, 0, 0);
      setEvents([
        {
          id: 'demo-cal-1',
          title: 'Tactical HUD & Interface Calibration',
          time: '10:00 AM',
          rawStart: today1.toISOString(),
          description: 'Review HUD telemetry, hero themes, audio cues, and widget response times.',
          location: 'HQ Conference Room A',
          htmlLink: 'https://calendar.google.com',
          meetingUrl: 'https://meet.google.com/abc-defg-hij',
          meetingType: 'Google Meet',
        },
        {
          id: 'demo-cal-2',
          title: 'Stark Tech Architecture Sync',
          time: '02:30 PM',
          rawStart: today2.toISOString(),
          description: 'Deep dive into Arc Reactor power management algorithms and cognitive capacity models.',
          location: 'Stark Tower Lab 4',
          htmlLink: 'https://calendar.google.com',
          meetingUrl: 'https://meet.google.com/xyz-uvwx-rst',
          meetingType: 'Google Meet',
        },
        {
          id: 'demo-cal-3',
          title: 'Daily Wrap-up & Priorities Review',
          time: '05:00 PM',
          rawStart: today3.toISOString(),
          description: 'Consolidate completed focus tasks and align on upcoming development milestones.',
          location: 'Virtual',
          htmlLink: 'https://calendar.google.com',
        }
      ]);
      return;
    }
    setIsSyncing(true);
    try {
      if (forceAuth && window.api.reconnectCalendar) {
        await window.api.reconnectCalendar();
      }
      const calendarResult = await window.api.getCalendarEvents();
      const calEvents = Array.isArray(calendarResult) ? calendarResult : calendarResult?.events;
      if (calendarResult && !Array.isArray(calendarResult)) {
        setCalendarConnected(!!calendarResult.connected);
      }
      if (calEvents && calEvents.length > 0) {
        setEvents(calEvents);
      }
    } catch (e) {
      console.error('Failed to load events', e);
    } finally {
      setIsSyncing(false);
    }
  };

  const loadMail = async (forceAuth = false) => {
    if (!window.api?.getMailbox) {
      setMails(DEFAULT_DEMO_MAILS);
      return;
    }
    setMailSyncing(true);
    try {
      if (forceAuth && window.api.reconnectMailbox) {
        await window.api.reconnectMailbox();
      }
      const res = await window.api.getMailbox();
      if (res) {
        if (res.messages && res.messages.length > 0) {
          setMails(res.messages);
        }
        setMailConnected(!!res.connected);
        setMailNeedsReauth(!!res.needsReauth);
        setMailServiceDisabled(!!res.serviceDisabled);
        setMailActivationUrl(res.activationUrl || '');
      }
    } catch (e) {
      console.error('Failed to load mailbox', e);
    } finally {
      setMailSyncing(false);
    }
  };

  const loadTasks = async () => {
    if (!window.api?.getTasks) return;
    try {
      const dbTasks = await window.api.getTasks();
      setTasks(dbTasks || []);
    } catch (e) {
      console.error('Failed to load tasks', e);
    }
  };

  const loadNote = async () => {
    if (!window.api?.getNote) return;
    try {
      const note = await window.api.getNote();
      setNoteContent(note || '');
    } catch (e) {
      console.error('Failed to load note', e);
    }
  };

  const loadSettings = async () => {
    if (!window.api?.getSettings) return;
    try {
      const s = await window.api.getSettings();
      if (s.theme && THEMES[s.theme]) setThemeName(s.theme);
      if (typeof s.opacity === 'number') {
        setOpacity(s.opacity);
        window.api.setOpacity?.(s.opacity);
      }
      if (typeof s.showFloatingMeters === 'boolean') {
        setShowFloatingMeters(s.showFloatingMeters);
      }
      if (typeof s.voiceEnabled === 'boolean') {
        setVoiceEnabled(s.voiceEnabled);
      }
    } catch (e) {
      console.error('Failed to load settings', e);
    }
  };

  const loadWeather = async () => {
    try {
      // Coordinates for Chunnakam / Uduvil, Jaffna, Sri Lanka (9.74° N, 80.03° E)
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=9.74&longitude=80.03&current=temperature_2m,relative_humidity_2m,weather_code,is_day&timezone=Asia%2FColombo');
      if (!res.ok) throw new Error('Weather API returned ' + res.status);
      const data = await res.json();
      if (data?.current) {
        const details = getWeatherDetails(data.current.weather_code, data.current.is_day);
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: details.label,
          icon: details.icon,
          humidity: data.current.relative_humidity_2m,
          loading: false
        });
      }
    } catch (err) {
      console.warn('Weather fetch fallback:', err);
      setWeather(prev => ({
        ...prev,
        temp: prev.temp ?? 32,
        condition: prev.condition === 'Loading...' ? 'Partly Cloudy' : prev.condition,
        icon: prev.icon || '⛅',
        loading: false
      }));
    }
  };

  useEffect(() => {
    loadCalendar();
    loadMail();
    loadTasks();
    loadNote();
    loadSettings();
    loadWeather();

    const interval = setInterval(() => {
      loadCalendar();
      loadMail();
      loadWeather();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(checkScroll, 150);
    return () => clearTimeout(timer);
  }, [activeTab, themeName, tasks, mails]);

  /* system poll */
  useEffect(() => {
    const id = setInterval(async () => {
      if (window.api?.getSystemInfo) {
        setSysInfo(await window.api.getSystemInfo());
      }
    }, 3000);
    return () => clearInterval(id);
  }, []);

  /* pomodoro timer */
  useEffect(() => {
    if (!isActive) return;
    if (timeLeft <= 0) {
      setIsActive(false);
      try {
        const audio = new Audio('/athu-avalotha.mp3');
        audio.play().catch(e => console.log('Audio play blocked/failed', e));
      } catch (e) { }
      return;
    }
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [isActive, timeLeft]);

  /* Task handlers */
  const handleAddTask = async (e) => {
    e?.preventDefault();
    if (!newTaskTitle.trim() || !window.api?.addTask) return;
    await window.api.addTask(newTaskTitle.trim());
    setNewTaskTitle('');
    loadTasks();
  };

  const handleToggleTask = async (id, currentVal) => {
    if (!window.api?.toggleTask) return;
    await window.api.toggleTask(id, !currentVal);
    loadTasks();
  };

  const handleDeleteTask = async (id) => {
    if (!window.api?.deleteTask) return;
    await window.api.deleteTask(id);
    loadTasks();
  };

  const handleClearCompletedTasks = async () => {
    if (!window.api?.deleteTask) return;
    const completed = tasks.filter(t => t.completed);
    for (const t of completed) {
      await window.api.deleteTask(t.id);
    }
    loadTasks();
  };

  const handleAddPresetTask = async (title) => {
    if (!window.api?.addTask) return;
    await window.api.addTask(title);
    loadTasks();
  };

  /* Note saving */
  const handleNoteChange = (text) => {
    setNoteContent(text);
    setNoteSaving(true);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      if (window.api?.saveNote) {
        await window.api.saveNote(text);
        setNoteSaving(false);
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setNoteSavedAt(time);
      }
    }, 600);
  };

  /* Settings handlers */
  const handleOpacityChange = (val) => {
    const num = parseFloat(val);
    setOpacity(num);
    window.api?.setOpacity?.(num);
    window.api?.saveSetting?.('opacity', num);
  };

  const handleToggleFloatingMeters = () => {
    const nextVal = !showFloatingMeters;
    setShowFloatingMeters(nextVal);
    window.api?.saveSetting?.('showFloatingMeters', nextVal);
  };

  const handleThemeSelect = (key) => {
    setThemeName(key);
    setShowThemePicker(false);
    window.api?.saveSetting?.('theme', key);
    triggerHeroPower(key);
  };

  /* Meeting / Link handlers */
  const handleOpenUrl = (url) => {
    if (url && window.api?.openExternal) {
      window.api.openExternal(url);
    }
  };

  /* group events */
  const urgentEvents = events.filter(e => isUrgent(e.title));
  const normalEvents = events.filter(e => !isUrgent(e.title));

  const groupedEvents = normalEvents.reduce((acc, ev) => {
    const cat = getDayCategory(ev.rawStart);
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(ev);
    return acc;
  }, {});

  const daysToShow = isCalendarExpanded
    ? Object.keys(groupedEvents)
    : Object.keys(groupedEvents).filter(day => day === 'Today' || day === 'Tomorrow');

  /* group mails date-wise */
  const unreadMailCount = mails.filter(m => m.isUnread).length;
  const filteredMails = mails.filter(m => {
    if (mailFilter === 'unread') return m.isUnread;
    return true;
  });

  const groupedMails = filteredMails.reduce((acc, mail) => {
    const cat = getMailDayCategory(mail.timestamp || mail.dateStr);
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(mail);
    return acc;
  }, {});

  const mailDaysToShow = isMailboxExpanded
    ? Object.keys(groupedMails)
    : Object.keys(groupedMails).includes('Today')
      ? ['Today']
      : Object.keys(groupedMails).slice(0, 1);

  const urgentMails = mails.filter(isUrgentMail);

  const handleConvertMailToTask = async (e, mail) => {
    e?.stopPropagation();
    if (!window.api?.addTask) return;
    const taskTitle = `Review: ${mail.subject} (${mail.senderName})`;
    await window.api.addTask(taskTitle);
    await loadTasks();
    setTaskAddedId(mail.id);
    setTimeout(() => setTaskAddedId(null), 2500);
  };

  const cpuPct = sysInfo.cpuLoad;
  const memPct = sysInfo.memUsed;

  const handleClose = () => window.api?.closeWindow();
  const handleMinimize = () => window.api?.minimizeWindow();

  const toggleEvent = (id) => {
    setExpandedEventId(prev => prev === id ? null : id);
  };

  const adjustTime = (mins) => {
    if (isActive) return;
    let newTime = defaultTime + (mins * 60);
    if (newTime < 60) newTime = 60;
    if (newTime > 120 * 60) newTime = 120 * 60;
    setDefaultTime(newTime);
    setTimeLeft(newTime);
  };

  const togglePin = () => {
    if (isPinned) {
      window.api?.unpinWidgets();
      setIsPinned(false);
    } else {
      window.api?.pinWidgets();
      setIsPinned(true);
    }
  };

  const completedTasksCount = tasks.filter(t => t.completed).length;
  const taskProgressPct = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;
  const filteredTasks = tasks.filter(t => {
    if (taskFilter === 'pending') return !t.completed;
    if (taskFilter === 'completed') return t.completed;
    return true;
  });

  const parseTaskDisplay = (title = '') => {
    const match = title.match(/^Review:\s*(.*?)(?:\s*\((.*?)\))?$/);
    if (match) {
      return {
        isMail: true,
        displayTitle: match[1] || title,
        sender: match[2] || null,
      };
    }
    return {
      isMail: false,
      displayTitle: title,
      sender: null,
    };
  };

  const todayDateStr = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }).format(new Date());
  const hash = window.location.hash;

  /* ─── INDEPENDENT CPU WIDGET ─── */
  if (hash === '#widget-cpu') {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden" style={{ WebkitAppRegion: 'drag', background: T.floatBg, borderRadius: '16px', border: `1px solid ${T.cpuGlow.replace('0.8', '0.35')}`, boxShadow: `inset 0 0 14px ${T.cpuGlow.replace('0.8', '0.25')}` }}>
        <div className="relative w-14 h-14 mb-1">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
            <circle cx="20" cy="20" r="16" fill="none"
              stroke={cpuPct > 80 ? T.cpuHigh : T.cpuColor}
              strokeWidth="3" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 16}
              strokeDashoffset={2 * Math.PI * 16 * (1 - cpuPct / 100)}
              style={{ transition: 'stroke-dashoffset 0.8s ease', filter: `drop-shadow(0 0 3px ${T.cpuGlow})` }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold" style={{ color: T.text }}>{cpuPct}%</span>
        </div>
        <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: T.textMuted }}>CPU</span>
      </div>
    );
  }

  /* ─── INDEPENDENT MEM WIDGET ─── */
  if (hash === '#widget-mem') {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden" style={{ WebkitAppRegion: 'drag', background: T.floatBg, borderRadius: '16px', border: `1px solid ${T.memGlow.replace('0.8', '0.35')}`, boxShadow: `inset 0 0 14px ${T.memGlow.replace('0.8', '0.25')}` }}>
        <div className="relative w-14 h-14 mb-1">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
            <circle cx="20" cy="20" r="16" fill="none"
              stroke={memPct > 80 ? T.memHigh : T.memColor}
              strokeWidth="3" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 16}
              strokeDashoffset={2 * Math.PI * 16 * (1 - memPct / 100)}
              style={{ transition: 'stroke-dashoffset 0.8s ease', filter: `drop-shadow(0 0 3px ${T.memGlow})` }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold" style={{ color: T.text }}>{memPct}%</span>
        </div>
        <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: T.textMuted }}>MEM</span>
      </div>
    );
  }

  /* ─── MAIN UI ─── */
  return (
    <div className="h-screen w-full flex items-start bg-transparent select-none" style={{ WebkitAppRegion: 'transparent' }}>

      {/* ─── MAIN COMPACT WIDGET CONTAINER ─── */}
      <div
        className="w-[370px] flex flex-col overflow-hidden relative shrink-0 rounded-[18px] shadow-2xl transition-all duration-300"
        style={{
          background: T.bg,
          color: T.text,
          WebkitAppRegion: 'drag',
          border: `1px solid ${heroPowerActive ? T.accent : T.cardBorder}`,
          boxShadow: heroPowerActive
            ? `0 16px 45px rgba(0, 0, 0, 0.7), 0 0 30px ${T.accent}90, inset 0 0 20px ${T.accent}40`
            : `0 16px 45px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.12)`
        }}
      >
        {/* Dynamic Superhero HUD Artworks */}
        <ThemeBackground themeKey={themeName} />

        {/* ─── HEADER ─── */}
        <div className="px-4 pt-3.5 pb-2.5 flex items-center justify-between z-20 relative" style={{ borderBottom: `1px solid ${T.headerBorder}` }}>
          {/* DATE & WEATHER (JAFFNA - CHUNNAKAM / UDUVIL) */}
          <div className="flex flex-col select-none" style={{ WebkitAppRegion: 'no-drag' }}>
            {/* Tactical Location Label */}
            <div className="flex items-center gap-1 text-[8.5px] font-mono tracking-wider font-bold">
              <MapPin className="w-2.5 h-2.5 shrink-0" style={{ color: T.accent }} />
              <span className="truncate" style={{ color: T.textMuted }}>UDUVIL · CHUNNAKAM</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0 ml-0.5" title="Live Telemetry - Jaffna, Sri Lanka" />
            </div>

            {/* Live Weather Telemetry */}
            <div className="flex items-center gap-1.5 mt-0.5">
              <div
                className="flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm transition-all hover:bg-white/10 cursor-default shadow-sm"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: `1px solid ${T.cardBorder}`,
                  color: T.accent
                }}
                title={`Jaffna, Sri Lanka (Chunnakam / Uduvil) • ${weather.condition} • ${weather.humidity ? `${weather.humidity}% humidity` : 'Tropical'}`}
              >
                <span className="text-xs leading-none">{weather.icon}</span>
                <span className="font-mono text-[11.5px]">{weather.temp !== null ? `${weather.temp}°C` : '32°C'}</span>
                <span className="text-[9.5px] font-semibold opacity-85" style={{ color: T.textMuted }}>
                  {weather.condition}
                </span>
              </div>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-1.5" style={{ WebkitAppRegion: 'no-drag' }}>
            <button onClick={togglePin}
              className="text-[11px] font-bold px-2 py-0.5 rounded border transition-colors shadow-sm cursor-pointer"
              style={{
                color: isPinned ? '#fbbf24' : T.textMuted,
                background: isPinned ? 'rgba(120, 53, 15, 0.4)' : T.cardBg,
                borderColor: isPinned ? 'rgba(250, 204, 21, 0.6)' : T.cardBorder,
              }}
            >
              {isPinned ? 'Unpin' : 'Pin'}
            </button>
            <button onClick={() => setIsTimerOpen(!isTimerOpen)}
              className="text-[11px] font-bold px-2 py-0.5 rounded border transition-colors shadow-sm cursor-pointer"
              style={{ color: T.accent, background: T.cardBg, borderColor: T.accent }}
            >
              Timer
            </button>
            <button onClick={handleMinimize} title="Minimize" className="w-3.5 h-3.5 rounded-full transition-transform hover:scale-110 ml-1 cursor-pointer" style={{ background: T.secondary }} />
            <button onClick={handleClose} title="Close" className="w-3.5 h-3.5 rounded-full transition-transform hover:scale-110 cursor-pointer" style={{ background: T.accent }} />
          </div>
        </div>

        {/* ─── HERO TELEMETRY & SIGNATURE POWER HUD ─── */}
        <div className="px-3 py-1 flex items-center justify-between border-b border-white/5 z-10" style={{ background: 'rgba(0,0,0,0.25)', WebkitAppRegion: 'no-drag' }}>
          {/* Core Telemetry Gauge */}
          <div className="flex items-center gap-1.5 text-[8.5px] font-mono font-bold tracking-tight">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: T.accent }} />
            <span style={{ color: T.accent }}>{T.coreStat?.label || 'CORE'}:</span>
            <span className="text-white font-black">{T.coreStat?.value || '100%'}</span>
            <span className="text-[7.5px] opacity-60 hidden sm:inline" style={{ color: T.textMuted }}>• {T.coreStat?.detail}</span>
          </div>

          <div className="flex items-center">
            {/* Single Dedicated Hero Action & Tactical Voice Briefing Button */}
            <button
              onClick={() => triggerCharacterAction(themeName)}
              disabled={isBriefingActive}
              className={`px-2.5 py-1 rounded-md text-[9px] font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                isBriefingActive ? 'cursor-not-allowed opacity-90' : 'cursor-pointer hover:scale-105 active:scale-95'
              }`}
              style={{
                background: (isBriefingActive || heroPowerActive)
                  ? `linear-gradient(135deg, ${T.accent}, ${T.secondary})`
                  : 'rgba(255,255,255,0.08)',
                color: (isBriefingActive || heroPowerActive) ? '#030712' : (T.secondaryLight || T.text),
                border: `1px solid ${(isBriefingActive || heroPowerActive) ? T.accent : `${T.accent}80`}`,
                boxShadow: (isBriefingActive || heroPowerActive) ? `0 0 14px ${T.accent}` : 'none'
              }}
              title={isBriefingActive ? 'Briefing in progress... Please wait until finished' : themeName === 'jd' ? 'Play your greeting and today\'s tasks' : `Activate ${T.character} Tactical Voice Briefing & Power`}
            >
              <span>{T.heroPower?.icon || '⚡'}</span>
              <span>
                {isBriefingActive
                  ? `${(T.heroPower?.name || 'HERO').toUpperCase()} BRIEFING...`
                  : (T.heroPower?.name || 'HERO POWER').toUpperCase()}
              </span>
              <Volume2 className={`w-3 h-3 ${isBriefingActive ? 'animate-pulse text-black' : 'opacity-70'}`} />
            </button>
          </div>
        </div>

        {/* ─── HOLOGRAPHIC DAILY BRIEFING OVERLAY ─── */}
        {briefingBanner && (
          <div
            className="mx-2.5 my-1.5 p-2.5 rounded-xl backdrop-blur-xl z-30 transition-all duration-300 relative border shadow-2xl"
            style={{
              background: T.cardBg,
              borderColor: briefingBanner.accent,
              boxShadow: `0 12px 32px rgba(0,0,0,0.85), inset 0 0 22px ${briefingBanner.accent}33`,
              WebkitAppRegion: 'no-drag'
            }}
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
              <div className="flex items-center gap-1.5 text-[9.5px] font-mono font-bold" style={{ color: briefingBanner.accent }}>
                <Volume2 className="w-3 h-3 animate-pulse" />
                <span>{briefingBanner.character}</span>
                <span className="text-[8px] opacity-70">// {themeName === 'jd' ? 'GREETING + TASKS' : 'TACTICAL BRIEFING'}</span>
              </div>
              <button
                onClick={() => {
                  stopActiveHeroAudio();
                  setIsBriefingActive(false);
                  setBriefingBanner(null);
                }}
                className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer"
              >
                ✕ Stop
              </button>
            </div>

            {/* Metric Chips */}
            <div className="grid grid-cols-3 gap-1.5 my-1.5 text-[8.5px] font-mono">
              <div className="rounded p-1 bg-white/5 border border-white/10 flex flex-col items-center text-center">
                <span className="text-[7.5px] opacity-70">📅 SCHEDULE</span>
                <span className="font-bold text-white">{briefingBanner.todayEventsCount} Today</span>
              </div>
              <div className="rounded p-1 bg-white/5 border border-white/10 flex flex-col items-center text-center">
                <span className="text-[7.5px] opacity-70">📋 TASKS</span>
                <span className="font-bold text-white">{briefingBanner.pendingTasksCount} Pending</span>
              </div>
              <div className="rounded p-1 bg-white/5 border border-white/10 flex flex-col items-center text-center">
                <span className="text-[7.5px] opacity-70">✉️ MAILBOX</span>
                <span className="font-bold text-white">{briefingBanner.unreadMailsCount} New</span>
              </div>
            </div>

            {/* Sleek Live Audio Transmission Waveform (Speech Transcript hidden per user request) */}
            <div className="py-1.5 flex items-center justify-center gap-2">
              <span className="text-[8.5px] font-mono tracking-wider font-bold uppercase" style={{ color: briefingBanner.accent }}>
                {themeName === 'jd' ? 'LIVE GREETING + TASKS' : 'LIVE VOICE TRANSMISSION'}
              </span>
              <div className="flex items-center gap-0.5">
                {[6, 14, 20, 10, 18, 8, 16, 6].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full animate-pulse"
                    style={{
                      height: isBriefingActive ? `${h}px` : '4px',
                      background: briefingBanner.accent,
                      animationDelay: `${i * 100}ms`
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[7.5px] font-mono pt-1.5 border-t border-white/5">
              <span className="font-bold flex items-center gap-1" style={{ color: briefingBanner.accent }}>
                <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: briefingBanner.accent }} />
                {isBriefingActive ? 'TRANSMITTING BRIEFING OVER AUDIO...' : 'BRIEFING CONCLUDED'}
              </span>
              <span className="text-slate-400">Recipient: Bijohn</span>
            </div>
          </div>
        )}

        {/* ─── HOLOGRAPHIC HERO TRANSMISSION OVERLAY ─── */}
        {heroBanner && (
          <div
            className="mx-2.5 my-1.5 p-2 rounded-xl backdrop-blur-xl z-30 transition-all duration-300 relative border shadow-2xl"
            style={{
              background: T.cardBg,
              borderColor: heroBanner.accent,
              boxShadow: `0 8px 24px rgba(0,0,0,0.8), inset 0 0 16px ${heroBanner.accent}33`,
              WebkitAppRegion: 'no-drag'
            }}
          >
            <div className="flex items-center justify-between pb-1 border-b border-white/10">
              <div className="flex items-center gap-1.5 text-[9.5px] font-mono font-bold" style={{ color: heroBanner.accent }}>
                <span>{heroBanner.icon}</span>
                <span>{heroBanner.character}</span>
                <span className="text-[8px] opacity-70">// {heroBanner.powerName}</span>
              </div>
              <button
                onClick={() => stopThemeTest()}
                className="text-[10px] opacity-60 hover:opacity-100 cursor-pointer text-slate-300 hover:text-white px-1"
              >
                ✕
              </button>
            </div>
            <div className="py-1 text-[10px] italic font-medium tracking-tight text-white leading-tight">
              {heroBanner.quote}
            </div>
            <div className="flex items-center justify-between text-[7.5px] font-mono pt-1 border-t border-white/5">
              <span className="font-bold flex items-center gap-1" style={{ color: heroBanner.accent }}>
                <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: heroBanner.accent }} />
                {heroBanner.statusMsg}
              </span>
              <span className="opacity-60 text-slate-400">{themeName === 'jd' ? 'DAILY BRIEFING ACTIVE' : 'HERO POWER ENGAGED'}</span>
            </div>
          </div>
        )}

        {/* ─── HUD NAVIGATION TABS ─── */}
        <div className="px-2 pt-2 pb-1 flex items-center justify-between gap-1 z-20 border-b border-white/5" style={{ WebkitAppRegion: 'no-drag' }}>
          {[
            { id: 'mailbox', label: 'Mail', icon: <Mail className="w-3 h-3" />, badge: unreadMailCount > 0 ? `${unreadMailCount}` : null },
            { id: 'schedule', label: 'Schedule', icon: <Calendar className="w-3 h-3" /> },
            { id: 'tasks', label: 'Tasks', icon: <CheckSquare className="w-3 h-3" />, badge: tasks.length ? `${completedTasksCount}/${tasks.length}` : null },
            { id: 'notes', label: 'Notes', icon: <FileText className="w-3 h-3" /> },
            { id: 'settings', label: 'Settings', icon: <Sliders className="w-3 h-3" /> },
          ].map(tab => {
            const isActiveTab = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg text-[10.5px] font-bold tracking-tight transition-all cursor-pointer relative"
                style={{
                  color: isActiveTab ? T.accent : T.textMuted,
                  background: isActiveTab ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: isActiveTab ? `1px solid ${T.accent}` : '1px solid transparent',
                  boxShadow: isActiveTab ? `0 0 10px ${T.accent}33` : 'none'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className="text-[8px] font-mono px-1 py-0.2 rounded-full ml-0.5 font-bold"
                    style={{
                      background: tab.id === 'mailbox' ? `${T.accent}33` : 'rgba(255,255,255,0.1)',
                      color: tab.id === 'mailbox' ? T.accent : T.accentLight
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ─── TAB CONTENT AREA (SCROLLABLE WITH HUD CONTROLS) ─── */}
        <div className="relative flex-1 min-h-0 flex flex-col">
          <div
            ref={contentScrollRef}
            onScroll={checkScroll}
            className="px-4 pb-4 space-y-2.5 pt-2.5 z-10 overflow-y-auto max-h-[440px] focusdesk-scroll relative"
            style={{
              WebkitAppRegion: 'no-drag',
              scrollbarWidth: 'thin',
              scrollbarColor: `${T.accent} rgba(0,0,0,0.4)`
            }}
          >

            {/* ══════════ TAB: MAILBOX SCHEDULE (DATE-WISE) ══════════ */}
            {activeTab === 'mailbox' && (
              <div className="space-y-2.5">
                {/* SERVICE DISABLED IN GCP BANNER */}
                {mailServiceDisabled && (
                  <div className="rounded-xl p-2.5 backdrop-blur-md flex items-center justify-between shadow-sm" style={{ background: 'rgba(120, 53, 15, 0.45)', border: `1px solid rgba(245, 158, 11, 0.6)` }}>
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-semibold text-amber-200 truncate">Gmail API disabled in Google Cloud</span>
                        <span className="text-[8.5px] text-amber-300/80">Showing demo mailbox. Enable in GCP to sync live emails.</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleOpenUrl(mailActivationUrl || 'https://console.developers.google.com/apis/api/gmail.googleapis.com/overview?project=687956472218')}
                      className="text-[9px] font-bold px-2 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 shrink-0 cursor-pointer shadow-sm flex items-center gap-1"
                    >
                      <span>Enable in GCP</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>
                )}

                {/* RE-AUTH / PERMISSION WARNING BANNER */}
                {!mailServiceDisabled && mailNeedsReauth && (
                  <div className="rounded-xl p-2.5 backdrop-blur-md flex items-center justify-between shadow-sm" style={{ background: 'rgba(120, 53, 15, 0.45)', border: `1px solid rgba(245, 158, 11, 0.6)` }}>
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-[10px] font-semibold text-amber-200 truncate">Gmail access needed to sync emails</span>
                    </div>
                    <button
                      onClick={() => loadMail(true)}
                      className="text-[9px] font-bold px-2 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 shrink-0 cursor-pointer shadow-sm"
                    >
                      Grant Access
                    </button>
                  </div>
                )}
                {/* 🚨 PRIORITY & URGENT EMAILS HUD HIGHLIGHT */}
                {urgentMails.length > 0 && (
                  <div className="rounded-xl p-2 backdrop-blur-md space-y-1.5 shadow-md" style={{ background: T.urgentBg, border: `1px solid ${T.urgentBorder}` }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse shadow-sm" style={{ background: T.urgentDot }} />
                        <span className="text-[9.5px] uppercase tracking-wider font-extrabold" style={{ color: T.accent }}>
                          Priority Actions
                        </span>
                      </div>
                      <span className="text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded border" style={{ background: 'rgba(239,68,68,0.25)', color: '#fca5a5', borderColor: 'rgba(239,68,68,0.45)' }}>
                        {urgentMails.length} Critical
                      </span>
                    </div>
                    <div className="space-y-1">
                      {urgentMails.slice(0, 1).map((uMail) => (
                        <div
                          key={`urgent-${uMail.id}`}
                          onClick={() => setExpandedMailId(expandedMailId === uMail.id ? null : uMail.id)}
                          className="flex flex-col py-1 px-2 rounded-lg cursor-pointer hover:bg-black/30 transition-all border border-red-500/20"
                          style={{ background: 'rgba(0,0,0,0.35)' }}
                        >
                          <div className="flex justify-between items-center gap-1.5">
                            <span className="text-[11px] font-bold truncate text-red-200">{uMail.subject}</span>
                            <span className="text-[9.5px] font-mono font-extrabold shrink-0" style={{ color: T.accentLight }}>
                              {uMail.timeStr}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[9.5px] text-slate-300 mt-0.5">
                            <span className="truncate opacity-80">{uMail.senderName}</span>
                            <button
                              onClick={(e) => handleConvertMailToTask(e, uMail)}
                              className="text-[8.5px] font-bold px-1.5 py-0.5 rounded transition-transform hover:scale-105 cursor-pointer shadow-sm flex items-center gap-1 shrink-0 ml-2"
                              style={{
                                background: taskAddedId === uMail.id ? '#10b981' : T.btnPrimary,
                                color: taskAddedId === uMail.id ? '#ffffff' : '#030712'
                              }}
                            >
                              {taskAddedId === uMail.id ? (
                                <>
                                  <Check className="w-2.5 h-2.5" />
                                  <span>Added</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-2.5 h-2.5" />
                                  <span>+ Add to Tasks</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MAIN MAILBOX CARD */}
                <div className="rounded-xl p-2.5 backdrop-blur-md flex flex-col" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                  {/* Header bar */}
                  <div className="flex items-center justify-between mb-1.5 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9.5px] uppercase tracking-wider font-extrabold" style={{ color: T.textMuted }}>Mailbox</span>
                      <button
                        onClick={() => loadMail(false)}
                        title="Sync Mailbox"
                        className="p-0.5 rounded hover:bg-white/10 transition-all opacity-70 hover:opacity-100 flex items-center justify-center cursor-pointer"
                        style={{ color: T.accent }}
                      >
                        <RefreshCw className={`w-2.5 h-2.5 ${mailSyncing ? 'animate-spin' : ''}`} />
                      </button>
                      {!mailConnected && (
                        <span className="text-[7.5px] font-mono px-1 py-0.2 rounded bg-white/10 text-slate-300">
                          Demo
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Filter pills */}
                      <div className="flex rounded p-0.5 bg-black/30 border border-white/5">
                        <button
                          onClick={() => setMailFilter('all')}
                          className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded transition-all cursor-pointer ${mailFilter === 'all' ? 'shadow-sm' : 'opacity-60'}`}
                          style={{
                            background: mailFilter === 'all' ? T.accent : 'transparent',
                            color: mailFilter === 'all' ? '#030712' : T.text,
                          }}
                        >
                          All ({mails.length})
                        </button>
                        <button
                          onClick={() => setMailFilter('unread')}
                          className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded transition-all cursor-pointer ${mailFilter === 'unread' ? 'shadow-sm' : 'opacity-60'}`}
                          style={{
                            background: mailFilter === 'unread' ? T.accent : 'transparent',
                            color: mailFilter === 'unread' ? '#030712' : T.text,
                          }}
                        >
                          Unread ({unreadMailCount})
                        </button>
                      </div>

                      {Object.keys(groupedMails).length > 1 && (
                        <button
                          onClick={() => setIsMailboxExpanded(!isMailboxExpanded)}
                          className="text-[8.5px] uppercase font-bold transition-all px-2 py-0.5 rounded shadow-sm shrink-0 cursor-pointer"
                          style={{ color: T.accent, background: T.cardBg, border: `1px solid ${T.accent}` }}
                        >
                          {isMailboxExpanded ? 'Show Today' : 'View All'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Date-wise Mails List */}
                  <div className={`space-y-2 ${isMailboxExpanded ? 'overflow-y-auto max-h-[220px] pr-1' : 'overflow-y-auto max-h-[160px] pr-1'}`} style={{ scrollbarWidth: 'thin', scrollbarColor: `${T.accent} transparent` }}>
                    {Object.keys(groupedMails).length === 0 ? (
                      <div className="py-6 flex flex-col items-center justify-center text-center gap-2">
                        <Inbox className="w-8 h-8 opacity-30" style={{ color: T.accent }} />
                        <p className="text-[11px] italic" style={{ color: T.textDim }}>
                          {mailFilter === 'unread' ? 'No unread emails' : 'No received emails found'}
                        </p>
                        {!mailConnected && (
                          <button
                            onClick={() => loadMail(true)}
                            className="text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all hover:scale-105 flex items-center gap-1.5 shadow-md cursor-pointer mt-1"
                            style={{ color: T.accent, background: 'rgba(0,0,0,0.4)', border: `1px solid ${T.cardBorder}` }}
                          >
                            <RefreshCw className={`w-3 h-3 ${mailSyncing ? 'animate-spin' : ''}`} />
                            <span>Connect Live Gmail</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      mailDaysToShow.map((day) => (
                        <div key={day} className="space-y-1.5">
                          {/* Date Header Mention */}
                          <div className="flex items-center gap-2 pt-0.5">
                            <span className="text-[10px] uppercase font-extrabold tracking-wider" style={{ color: T.accent }}>
                              {day}
                            </span>
                            <div className="flex-1 h-[1px] bg-white/10" />
                            <span className="text-[9px] font-mono opacity-50" style={{ color: T.textMuted }}>
                              {groupedMails[day].length} {groupedMails[day].length === 1 ? 'mail' : 'mails'}
                            </span>
                          </div>

                          {/* Emails in this Date Category */}
                          <div className="space-y-1">
                            {groupedMails[day].map((mail) => {
                              const isExpanded = expandedMailId === mail.id;
                              const senderInitial = (mail.senderName || 'U').charAt(0).toUpperCase();

                              return (
                                <div
                                  key={mail.id}
                                  onClick={() => setExpandedMailId(isExpanded ? null : mail.id)}
                                  className="flex flex-col py-1 px-2 rounded-lg transition-colors cursor-pointer hover:bg-white/5"
                                  style={{
                                    background: mail.isUnread ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.22)',
                                    border: `1px solid ${mail.isUnread ? T.cardBorder : 'rgba(255,255,255,0.06)'}`,
                                    boxShadow: mail.isUnread ? `inset 0 0 10px ${T.accent}15` : 'none'
                                  }}
                                >
                                  {/* Compact Mail Row */}
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    {/* Unread indicator / Avatar */}
                                    <div className="relative shrink-0 flex items-center justify-center">
                                      <div
                                        className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold"
                                        style={{
                                          background: mail.isUnread ? T.accent : 'rgba(255,255,255,0.1)',
                                          color: mail.isUnread ? '#030712' : T.textMuted,
                                        }}
                                      >
                                        {senderInitial}
                                      </div>
                                      {mail.isUnread && (
                                        <span
                                          className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ring-1 ring-slate-950 animate-pulse"
                                          style={{ background: T.secondary || '#facc15' }}
                                        />
                                      )}
                                    </div>

                                    {/* Sender & Subject */}
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between gap-1">
                                        <div className="flex items-center gap-1 min-w-0">
                                          <span
                                            className={`text-[11px] truncate ${mail.isUnread ? 'font-bold' : 'font-medium opacity-85'}`}
                                            style={{ color: mail.isUnread ? T.text : T.textMuted }}
                                          >
                                            {mail.senderName}
                                          </span>
                                          {isUrgentMail(mail) && (
                                            <span className="text-[7px] uppercase font-mono font-bold px-1 py-0.2 rounded bg-red-500/20 text-red-300 border border-red-500/30 shrink-0">
                                              Priority
                                            </span>
                                          )}
                                        </div>
                                        <span className="text-[9px] font-mono shrink-0" style={{ color: T.accentLight }}>
                                          {mail.timeStr}
                                        </span>
                                      </div>
                                      <p
                                        className={`text-[10px] truncate ${mail.isUnread ? 'font-semibold' : 'opacity-70'}`}
                                        style={{ color: mail.isUnread ? T.accentLight : T.text }}
                                      >
                                        {mail.subject}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Snippet preview */}
                                  <p className="text-[9px] truncate mt-0.5 pl-5 opacity-55 leading-tight" style={{ color: T.textMuted }}>
                                    {mail.snippet}
                                  </p>

                                  {/* Expanded View */}
                                  {isExpanded && (
                                    <div
                                      className="mt-2 text-[10px] p-2.5 rounded-md flex flex-col gap-2 ml-7"
                                      style={{
                                        color: T.text,
                                        background: 'rgba(0,0,0,0.55)',
                                        border: `1px solid ${T.cardBorder}`,
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <div className="space-y-1">
                                        <div className="flex justify-between items-start">
                                          <span className="text-[9px] opacity-75 font-mono">From: {mail.senderEmail || mail.senderName}</span>
                                          <span className="text-[9px] opacity-60 font-mono">
                                            {new Date(mail.timestamp || mail.dateStr).toLocaleDateString()} {mail.timeStr}
                                          </span>
                                        </div>
                                        <div className="font-bold text-xs" style={{ color: T.accentLight }}>{mail.subject}</div>
                                        <p className="text-[11px] leading-relaxed whitespace-pre-wrap opacity-90 pt-1">
                                          {mail.snippet}
                                        </p>
                                      </div>

                                      <div className="flex items-center justify-between gap-1.5 pt-1.5 border-t border-white/10 flex-wrap">
                                        <button
                                          onClick={() => {
                                            const nextMails = mails.map(m => m.id === mail.id ? { ...m, isUnread: !m.isUnread } : m);
                                            setMails(nextMails);
                                          }}
                                          className="text-[9px] font-bold px-2 py-0.5 rounded transition-colors cursor-pointer"
                                          style={{ background: 'rgba(255,255,255,0.08)', color: T.textMuted }}
                                        >
                                          {mail.isUnread ? 'Mark as Read' : 'Mark as Unread'}
                                        </button>

                                        <div className="flex items-center gap-1.5 ml-auto">
                                          <button
                                            onClick={(e) => handleConvertMailToTask(e, mail)}
                                            title="Add email to focus task list"
                                            className="text-[9px] font-bold px-2 py-0.5 rounded transition-all hover:scale-105 cursor-pointer shadow-sm flex items-center gap-1"
                                            style={{
                                              background: taskAddedId === mail.id ? '#10b981' : 'rgba(255,255,255,0.1)',
                                              color: taskAddedId === mail.id ? '#ffffff' : T.text,
                                              border: `1px solid ${taskAddedId === mail.id ? '#10b981' : T.cardBorder}`
                                            }}
                                          >
                                            {taskAddedId === mail.id ? (
                                              <>
                                                <Check className="w-2.5 h-2.5" />
                                                <span>Added to Tasks</span>
                                              </>
                                            ) : (
                                              <>
                                                <Plus className="w-2.5 h-2.5" />
                                                <span>+ Add to Tasks</span>
                                              </>
                                            )}
                                          </button>

                                          <button
                                            onClick={() => handleOpenUrl(mail.webUrl || 'https://mail.google.com')}
                                            className="text-[9px] font-bold flex items-center gap-1 opacity-90 hover:opacity-100 cursor-pointer px-2 py-0.5 rounded transition-transform hover:scale-105"
                                            style={{ color: '#030712', background: T.accent }}
                                          >
                                            <ExternalLink className="w-2.5 h-2.5" />
                                            <span>Open in Gmail</span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer / Connect info */}
                  {!mailConnected && (
                    <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[9px]">
                      <span className="opacity-60" style={{ color: T.textMuted }}>Google Gmail Sync</span>
                      <button
                        onClick={() => loadMail(true)}
                        className="font-bold underline cursor-pointer hover:opacity-100 opacity-80"
                        style={{ color: T.accent }}
                      >
                        Connect Gmail Account →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ══════════ TAB 1: SCHEDULE ══════════ */}
            {activeTab === 'schedule' && (
              <>
                {/* URGENT DEADLINES */}
                {urgentEvents.length > 0 && (
                  <div className="rounded-xl p-3 backdrop-blur-md" style={{ background: T.urgentBg, border: `1px solid ${T.urgentBorder}` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full animate-pulse shadow-sm" style={{ background: T.urgentDot }} />
                      <span className="text-[10px] uppercase tracking-widest font-extrabold" style={{ color: T.accent }}>Important Deadlines</span>
                    </div>
                    <div className="space-y-1.5">
                      {urgentEvents.map(ev => (
                        <div key={ev.id} className="flex flex-col py-1 cursor-pointer transition-colors rounded-md px-1 hover:bg-black/20" onClick={() => toggleEvent(ev.id)}>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold truncate pr-2" style={{ color: T.text }}>{ev.title}</span>
                            <div className="text-right flex flex-col shrink-0">
                              <span className="text-xs font-mono font-bold" style={{ color: T.accent, opacity: 0.9 }}>{getDayCategory(ev.rawStart)}</span>
                              <span className="text-sm font-mono font-extrabold whitespace-nowrap" style={{ color: T.accentLight }}>{ev.time}</span>
                            </div>
                          </div>
                          {ev.meetingUrl && (
                            <div className="mt-1 flex items-center gap-2">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleOpenUrl(ev.meetingUrl); }}
                                className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition-transform hover:scale-105 shadow-sm cursor-pointer"
                                style={{ background: '#10b981', color: '#ffffff' }}
                              >
                                <Video className="w-3 h-3" />
                                <span>Join {ev.meetingType || 'Meeting'}</span>
                              </button>
                            </div>
                          )}
                          {expandedEventId === ev.id && (
                            <div className="mt-2 text-[10px] p-2 rounded whitespace-pre-wrap flex flex-col gap-1.5" style={{ color: T.text, opacity: 0.9, background: 'rgba(0,0,0,0.4)', border: `1px solid ${T.urgentBorder}` }}>
                              <div>{ev.description || 'No additional details provided.'}</div>
                              {ev.location && <div className="text-[9px] opacity-75">📍 {ev.location}</div>}
                              <button
                                onClick={(e) => { e.stopPropagation(); handleOpenUrl(ev.htmlLink || 'https://calendar.google.com'); }}
                                className="text-[9px] font-bold flex items-center gap-1 opacity-80 hover:opacity-100 mt-1 cursor-pointer"
                                style={{ color: T.accent }}
                              >
                                <ExternalLink className="w-2.5 h-2.5" />
                                <span>Open in Google Calendar</span>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SCHEDULE */}
                <div className="rounded-xl p-3 backdrop-blur-md flex flex-col" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                  <div className="flex items-center justify-between mb-2 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest font-extrabold" style={{ color: T.textMuted }}>Schedule</span>
                      {!calendarConnected && (
                        <span className="text-[7.5px] font-mono px-1 py-0.2 rounded bg-white/10 text-slate-300">Demo</span>
                      )}
                      <button
                        onClick={() => loadCalendar(false)}
                        title="Sync Google Calendar"
                        className="p-1 rounded-md hover:bg-white/10 transition-all opacity-70 hover:opacity-100 flex items-center justify-center cursor-pointer"
                        style={{ color: T.accent }}
                      >
                        <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                    {Object.keys(groupedEvents).length > 2 && (
                      <button onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}
                        className="text-[9px] uppercase font-bold transition-colors px-2 py-0.5 rounded shadow-sm shrink-0 cursor-pointer"
                        style={{ color: T.accent, background: T.cardBg, border: `1px solid ${T.accent}` }}>
                        {isCalendarExpanded ? 'Show Less' : 'View All'}
                      </button>
                    )}
                  </div>
                  <div className={`space-y-2.5 ${isCalendarExpanded ? 'overflow-y-auto max-h-[250px] pr-1.5' : ''}`} style={{ scrollbarWidth: 'thin', scrollbarColor: `${T.accent} transparent` }}>
                    {Object.keys(groupedEvents).length === 0 && (
                      <div className="py-3 flex flex-col items-center justify-center text-center gap-2">
                        <p className="text-[11px] italic" style={{ color: T.textDim }}>
                          {isSyncing ? 'Connecting to Google Calendar...' : 'No upcoming events'}
                        </p>
                        <button
                          onClick={() => loadCalendar(true)}
                          className="text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all hover:scale-105 flex items-center gap-1.5 shadow-md cursor-pointer"
                          style={{ color: T.accent, background: 'rgba(0,0,0,0.4)', border: `1px solid ${T.cardBorder}` }}
                        >
                          <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                          <span>Connect Google Account</span>
                        </button>
                      </div>
                    )}
                    {daysToShow.map((day) => (
                      <div key={day}>
                        <h3 className="text-xs uppercase font-extrabold mb-1.5 tracking-wider" style={{ color: T.accent }}>{day}</h3>
                        <div className="space-y-1">
                          {groupedEvents[day].map(ev => (
                            <div key={ev.id} className="flex flex-col py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer hover:bg-white/5" style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${T.cardBorder}` }} onClick={() => toggleEvent(ev.id)}>
                              <div className="flex items-center gap-2">
                                <div className="w-1 h-5 rounded-full shadow-sm shrink-0" style={{ background: T.accent }} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs truncate font-semibold" style={{ color: T.text }}>{ev.title}</p>
                                </div>
                                <span className="text-sm font-mono font-bold whitespace-nowrap shrink-0" style={{ color: T.textMuted }}>{ev.time}</span>
                              </div>

                              {/* Meeting Launcher Button */}
                              {ev.meetingUrl && (
                                <div className="mt-1.5 ml-3 flex items-center gap-2">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleOpenUrl(ev.meetingUrl); }}
                                    className="text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 transition-transform hover:scale-105 shadow-sm cursor-pointer"
                                    style={{ background: '#10b981', color: '#ffffff' }}
                                  >
                                    <Video className="w-3 h-3" />
                                    <span>Join {ev.meetingType || 'Meeting'}</span>
                                  </button>
                                </div>
                              )}

                              {expandedEventId === ev.id && (
                                <div className="mt-2 text-[10px] p-2 rounded whitespace-pre-wrap ml-3 flex flex-col gap-1.5" style={{ color: T.text, background: 'rgba(0,0,0,0.5)', border: `1px solid ${T.cardBorder}` }}>
                                  <div>{ev.description || 'No additional details provided.'}</div>
                                  {ev.location && <div className="text-[9px] opacity-75">📍 {ev.location}</div>}
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleOpenUrl(ev.htmlLink || 'https://calendar.google.com'); }}
                                    className="text-[9px] font-bold flex items-center gap-1 opacity-80 hover:opacity-100 mt-1 cursor-pointer"
                                    style={{ color: T.accent }}
                                  >
                                    <ExternalLink className="w-2.5 h-2.5" />
                                    <span>Open in Google Calendar</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {!calendarConnected && (
                    <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[9px]">
                      <span className="opacity-60" style={{ color: T.textMuted }}>Google Calendar Sync</span>
                      <button
                        onClick={() => loadCalendar(true)}
                        className="font-bold underline cursor-pointer hover:opacity-100 opacity-80"
                        style={{ color: T.accent }}
                      >
                        Connect Google Account →
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ══════════ TAB 2: TASKS / TO-DO ══════════ */}
            {activeTab === 'tasks' && (
              <div className="space-y-2.5">
                {/* Task Creation Form */}
                <form onSubmit={handleAddTask} className="flex gap-1.5">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder={T.taskPlaceholder || 'Deploy an objective or task...'}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border outline-none font-medium transition-all placeholder:text-slate-500"
                      style={{
                        background: 'rgba(0,0,0,0.45)',
                        borderColor: T.cardBorder,
                        color: T.text,
                      }}
                    />
                    <Target className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 opacity-50" style={{ color: T.accent }} />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md shrink-0"
                    style={{ background: T.btnPrimary, color: '#030712' }}
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>{T.taskActionLabel || 'Add'}</span>
                  </button>
                </form>

                {/* HUD Mission Telemetry & Progress Card */}
                <div className="rounded-xl p-2.5 backdrop-blur-md border flex flex-col gap-2" style={{ background: 'rgba(15, 23, 42, 0.75)', borderColor: T.cardBorder }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: taskProgressPct === 100 ? '#4ade80' : T.accent }} />
                      <span className="text-[10px] uppercase tracking-wider font-extrabold flex items-center gap-1" style={{ color: T.textMuted }}>
                        <Zap className="w-3 h-3" style={{ color: T.secondary }} />
                        FOCUS DIRECTIVES
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: `${T.accent}25`, color: T.accent, border: `1px solid ${T.accent}50` }}>
                        {taskProgressPct}%
                      </span>
                      <span className="text-[10px] font-mono" style={{ color: T.textDim }}>
                        {completedTasksCount}/{tasks.length} Done
                      </span>
                    </div>
                  </div>

                  {/* Glowing Progress Bar */}
                  <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5 relative">
                    <div
                      className="h-full rounded-full transition-all duration-500 relative"
                      style={{
                        width: `${taskProgressPct}%`,
                        background: `linear-gradient(90deg, ${T.accent}, ${T.secondary})`,
                        boxShadow: taskProgressPct > 0 ? `0 0 8px ${T.accent}` : 'none'
                      }}
                    />
                  </div>

                  {/* Hero Mission Perk & Directive */}
                  <div className="flex items-center justify-between text-[8px] font-mono px-0.5 pt-0.5 opacity-85">
                    <span className="flex items-center gap-1" style={{ color: T.accent }}>
                      <span>{T.heroPower?.icon || '⚡'}</span>
                      <span className="font-bold">{T.heroPerk || 'Tactical Directive Active'}</span>
                    </span>
                    <span className="opacity-70" style={{ color: T.textMuted }}>{T.character || T.name}</span>
                  </div>

                  {/* Filter Pills & Clear Action */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <div className="flex items-center gap-1">
                      {[
                        { key: 'all', label: `All (${tasks.length})` },
                        { key: 'pending', label: `Active (${tasks.length - completedTasksCount})` },
                        { key: 'completed', label: `Done (${completedTasksCount})` },
                      ].map(tab => (
                        <button
                          key={tab.key}
                          type="button"
                          onClick={() => setTaskFilter(tab.key)}
                          className="text-[9.5px] px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer"
                          style={{
                            background: taskFilter === tab.key ? `${T.accent}30` : 'transparent',
                            color: taskFilter === tab.key ? T.accent : T.textDim,
                            border: taskFilter === tab.key ? `1px solid ${T.accent}60` : '1px solid transparent'
                          }}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {completedTasksCount > 0 && (
                      <button
                        type="button"
                        onClick={handleClearCompletedTasks}
                        className="text-[9px] font-mono opacity-70 hover:opacity-100 hover:text-red-400 transition-all cursor-pointer flex items-center gap-1"
                        style={{ color: T.textMuted }}
                        title="Clear completed tasks"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                        <span>Clear Done</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Task Items List */}
                <div
                  className="rounded-xl p-2.5 backdrop-blur-md flex flex-col max-h-[220px] overflow-y-auto space-y-1.5"
                  style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, scrollbarWidth: 'thin', scrollbarColor: `${T.accent} transparent` }}
                >
                  {filteredTasks.length === 0 ? (
                    <div className="py-5 text-center flex flex-col items-center justify-center gap-2">
                      {tasks.length === 0 ? (
                        <>
                          <Sparkles className="w-5 h-5 opacity-40 animate-pulse" style={{ color: T.accent }} />
                          <p className="text-[11px] font-medium" style={{ color: T.textDim }}>
                            No focus directives active. Deploy a mission or pick a preset:
                          </p>
                          <div className="flex flex-wrap gap-1.5 justify-center mt-1">
                            {[
                              { title: '⚡ Deep Work Sprint (45m)', label: '45m Sprint' },
                              { title: '📬 Inbox Zero & Mail Review', label: 'Inbox Zero' },
                              { title: '🛡️ Core Code Review & Refactor', label: 'Code Review' },
                            ].map(preset => (
                              <button
                                key={preset.label}
                                type="button"
                                onClick={() => handleAddPresetTask(preset.title)}
                                className="text-[10px] px-2.5 py-1 rounded-lg border font-medium transition-all hover:scale-105 cursor-pointer"
                                style={{
                                  background: 'rgba(255,255,255,0.04)',
                                  borderColor: T.cardBorder,
                                  color: T.accentLight || T.accent
                                }}
                              >
                                + {preset.label}
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p className="text-[11px] italic py-2" style={{ color: T.textDim }}>
                          No tasks found under '{taskFilter}' filter.
                        </p>
                      )}
                    </div>
                  ) : (
                    filteredTasks.map(task => {
                      const parsed = parseTaskDisplay(task.title);
                      return (
                        <div
                          key={task.id}
                          className="group flex items-center justify-between py-2 px-2.5 rounded-xl transition-all hover:bg-white/5 relative overflow-hidden"
                          style={{
                            background: task.completed ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.45)',
                            border: `1px solid ${task.completed ? 'rgba(255,255,255,0.06)' : T.cardBorder}`,
                            opacity: task.completed ? 0.6 : 1
                          }}
                        >
                          <div
                            className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer select-none"
                            onClick={() => handleToggleTask(task.id, task.completed)}
                          >
                            {/* Tactical Checkbox / Objective Node - Clearly a checkbox, never an oval '0' */}
                            <div
                              className="w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer relative shrink-0"
                              style={{
                                border: `1.5px solid ${task.completed ? T.accent : 'rgba(255,255,255,0.3)'}`,
                                background: task.completed ? T.accent : 'rgba(0,0,0,0.5)',
                                boxShadow: task.completed ? `0 0 10px ${T.accent}80` : 'inset 0 1px 3px rgba(0,0,0,0.6)',
                              }}
                            >
                              {task.completed ? (
                                <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
                              ) : (
                                <div className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-cyan-400 group-hover:scale-125 transition-all" />
                              )}
                            </div>

                            {/* Task Title & Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                {parsed.isMail && (
                                  <span
                                    className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded inline-flex items-center gap-1 shrink-0"
                                    style={{
                                      background: `${T.accent}20`,
                                      color: T.accent,
                                      border: `1px solid ${T.accent}40`
                                    }}
                                  >
                                    <Mail className="w-2.5 h-2.5" />
                                    Mail
                                  </span>
                                )}
                                <span
                                  className={`text-xs font-semibold truncate ${task.completed ? 'line-through' : ''}`}
                                  style={{ color: task.completed ? T.textMuted : T.text }}
                                >
                                  {parsed.displayTitle}
                                </span>
                              </div>
                              {parsed.sender && (
                                <div className="text-[10px] truncate mt-0.5 flex items-center gap-1" style={{ color: T.textDim }}>
                                  <span className="opacity-70">from:</span>
                                  <span className="font-medium" style={{ color: T.accentLight || T.textMuted }}>{parsed.sender}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Delete Action */}
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all cursor-pointer ml-2 text-slate-400"
                            title="Delete task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Quick Preset Launcher bar when tasks exist */}
                {tasks.length > 0 && (
                  <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
                    <span className="text-[9px] font-mono uppercase tracking-wider shrink-0 opacity-60" style={{ color: T.textDim }}>
                      + QUICK:
                    </span>
                    {[
                      { title: '⚡ Deep Work Sprint (45m)', label: '45m Sprint' },
                      { title: '📬 Inbox Zero Check', label: 'Inbox Zero' },
                      { title: '🛡️ Code Review & Push', label: 'Code Review' },
                    ].map(preset => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handleAddPresetTask(preset.title)}
                        className="text-[9.5px] px-2 py-0.5 rounded-md border font-medium whitespace-nowrap transition-all hover:scale-105 cursor-pointer"
                        style={{
                          background: 'rgba(0,0,0,0.3)',
                          borderColor: 'rgba(255,255,255,0.1)',
                          color: T.textMuted
                        }}
                      >
                        + {preset.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ══════════ TAB 3: NOTES / SCRATCHPAD ══════════ */}
            {activeTab === 'notes' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold" style={{ color: T.accent }}>
                    {T.notesHeader || 'Tactical Scratchpad'}
                  </span>
                  <span className="text-[9px] font-mono" style={{ color: T.accent }}>
                    {noteSaving ? 'Saving...' : noteSavedAt ? `Saved ${noteSavedAt}` : 'Autosaved'}
                  </span>
                </div>
                <div className="rounded-xl p-2.5 backdrop-blur-md flex flex-col" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                  <textarea
                    value={noteContent}
                    onChange={(e) => handleNoteChange(e.target.value)}
                    placeholder={T.notesPlaceholder || 'Type notes, snippets, or study points here... (Autosaves automatically)'}
                    rows={6}
                    className="w-full bg-transparent resize-none outline-none font-mono text-xs leading-relaxed"
                    style={{ color: T.text, scrollbarWidth: 'thin', scrollbarColor: `${T.accent} transparent` }}
                  />
                  <div className="pt-2 mt-1 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>{noteContent.length} chars | {noteContent.trim() ? noteContent.trim().split(/\s+/).length : 0} words</span>
                    <button
                      onClick={() => handleNoteChange('')}
                      className="hover:text-red-400 transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ══════════ TAB 4: SETTINGS / CUSTOMIZER ══════════ */}
            {activeTab === 'settings' && (
              <div className="space-y-3">
                {/* Superhero Theme Selector */}
                <div className="rounded-xl p-3 backdrop-blur-md space-y-2.5" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: T.text }}>
                      <Palette className="w-3.5 h-3.5" style={{ color: T.accent }} />
                      <span>HUD Superhero Theme</span>
                    </div>
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold" style={{ background: `${T.accent}20`, color: T.accent, border: `1px solid ${T.accent}40` }}>
                      {T.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {Object.entries(THEMES).map(([key, theme]) => {
                      const isSelected = themeName === key;
                      return (
                        <div
                          key={key}
                          className="flex flex-col p-2.5 rounded-xl text-left transition-all relative overflow-hidden"
                          style={{
                            background: isSelected ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.35)',
                            border: isSelected ? `1.5px solid ${theme.accent}` : '1px solid rgba(255,255,255,0.06)',
                            boxShadow: isSelected ? `0 0 14px ${theme.accent}33` : 'none'
                          }}
                        >
                          {/* Top Bar: Icon, Name, Character, and Controls */}
                          <div className="flex items-center justify-between gap-1">
                            <div className="flex items-center gap-2 min-w-0">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-inner shrink-0"
                                style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, color: theme.accent }}
                              >
                                {theme.icon}
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-bold tracking-tight truncate flex items-center gap-1.5" style={{ color: isSelected ? theme.accent : '#ffffff' }}>
                                  <span className="truncate">{theme.name}</span>
                                  <span className="text-[8px] font-mono opacity-60 font-normal truncate hidden xs:inline">({theme.character || theme.tagline})</span>
                                </div>
                                <div className="text-[8.5px] font-mono truncate" style={{ color: theme.accentLight || theme.textMuted }}>
                                  {theme.badge}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {/* Test Sound & Power Button */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  triggerHeroPower(key);
                                }}
                                className="px-2 py-1 rounded-md text-[8.5px] font-mono font-bold flex items-center gap-1 transition-all hover:scale-105 active:scale-95 cursor-pointer border"
                                style={{
                                  background: testingThemeKey === key ? `${theme.accent}25` : 'rgba(255,255,255,0.06)',
                                  borderColor: testingThemeKey === key ? theme.accent : `${theme.accent}50`,
                                  color: theme.accent,
                                  boxShadow: testingThemeKey === key ? `0 0 12px ${theme.accent}60` : 'none'
                                }}
                                title={testingThemeKey === key ? 'Stop Voice & Music' : `Test ${theme.heroPower?.name || 'Ability'} Voice & Sound`}
                              >
                                {testingThemeKey === key ? (
                                  <>
                                    <span className="w-2 h-2 rounded-xs bg-red-400 animate-pulse" />
                                    <span className="text-red-300 font-black">Stop</span>
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="w-3 h-3" />
                                    <span>Test</span>
                                  </>
                                )}
                              </button>

                              {/* Apply Button */}
                              <button
                                type="button"
                                onClick={() => handleThemeSelect(key)}
                                className="text-[9px] font-bold px-2.5 py-1 rounded-md font-mono transition-all cursor-pointer shadow-sm"
                                style={{
                                  background: isSelected ? theme.accent : 'rgba(255,255,255,0.1)',
                                  color: isSelected ? '#030712' : theme.textMuted,
                                  border: isSelected ? `1px solid ${theme.accent}` : '1px solid rgba(255,255,255,0.1)'
                                }}
                              >
                                {isSelected ? 'ACTIVE' : 'Apply'}
                              </button>
                            </div>
                          </div>

                          {/* Unique Attributes Grid */}
                          <div className="mt-2 pt-2 border-t border-white/5 space-y-1.5 text-[8.5px] font-mono">
                            {/* Unique Feature 1: Hero Power */}
                            <div className="flex items-start gap-1.5">
                              <span className="shrink-0 px-1 py-0.2 rounded font-bold" style={{ background: `${theme.accent}25`, color: theme.accent }}>
                                {theme.heroPower?.icon} {theme.heroPower?.name}
                              </span>
                              <span className="opacity-80 text-slate-300 leading-tight">
                                {theme.heroPower?.desc}
                              </span>
                            </div>

                            {/* Unique Feature 2: Core Telemetry & Task Action */}
                            <div className="flex items-center justify-between opacity-80 pt-0.5">
                              <div className="flex items-center gap-1">
                                <span style={{ color: theme.accent }}>{theme.coreStat?.label}:</span>
                                <span className="text-white font-bold">{theme.coreStat?.value}</span>
                                <span className="opacity-60 hidden sm:inline">({theme.coreStat?.detail})</span>
                              </div>
                              <span className="font-semibold text-slate-400">
                                {theme.taskActionLabel}
                              </span>
                            </div>

                            {/* Unique Feature 3: Hero Quote */}
                            <div className="italic opacity-60 text-slate-300 text-[8px] truncate">
                              {theme.quote}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Location & Weather Telemetry Info */}
                <div className="rounded-xl p-2.5 backdrop-blur-md flex items-center justify-between text-[9px] font-mono" style={{ background: 'rgba(0,0,0,0.25)', border: `1px solid ${T.cardBorder}` }}>
                  <div className="flex items-center gap-1.5" style={{ color: T.textMuted }}>
                    <MapPin className="w-3 h-3" style={{ color: T.accent }} />
                    <span>Jaffna (Chunnakam · Uduvil), Sri Lanka</span>
                  </div>
                  <span className="font-bold px-1.5 py-0.5 rounded" style={{ background: `${T.accent}15`, color: T.accent }}>
                    {weather.temp !== null ? `${weather.temp}°C · ${weather.condition}` : 'Active'}
                  </span>
                </div>

                {/* Window Opacity Control */}
                <div className="rounded-xl p-3 backdrop-blur-md space-y-2" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span style={{ color: T.text }}>HUD Window Opacity</span>
                    <span className="font-mono" style={{ color: T.accent }}>{Math.round(opacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="1.0"
                    step="0.05"
                    value={opacity}
                    onChange={(e) => handleOpacityChange(e.target.value)}
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-slate-400">
                    <span>Transparent (40%)</span>
                    <span>Solid (100%)</span>
                  </div>
                </div>

                {/* Floating Widgets Toggle */}
                <div className="rounded-xl p-3 backdrop-blur-md flex items-center justify-between" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                  <div>
                    <div className="text-xs font-bold" style={{ color: T.text }}>Floating CPU & RAM Meters</div>
                    <div className="text-[9px] text-slate-400">Show floating resource gauges beside HUD</div>
                  </div>
                  <button
                    onClick={handleToggleFloatingMeters}
                    className="px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer"
                    style={{
                      background: showFloatingMeters ? T.accent : 'rgba(255,255,255,0.1)',
                      color: showFloatingMeters ? '#030712' : T.textMuted
                    }}
                  >
                    {showFloatingMeters ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                {/* Tactical Hero Voice Toggle */}
                <div className="rounded-xl p-3 backdrop-blur-md flex items-center justify-between" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5" style={{ color: T.text }}>
                      <Volume2 className="w-3.5 h-3.5" style={{ color: T.accent }} />
                      <span>Hero Voice & Theme Music</span>
                    </div>
                    <div className="text-[9px] text-slate-400">Play spoken superhero dialogue accompanied by authentic character theme music</div>
                  </div>
                  <button
                    onClick={() => {
                      const next = !voiceEnabled;
                      setVoiceEnabled(next);
                      window.api?.saveSetting?.('voiceEnabled', next);
                    }}
                    className="px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer"
                    style={{
                      background: voiceEnabled ? T.accent : 'rgba(255,255,255,0.1)',
                      color: voiceEnabled ? '#030712' : T.textMuted
                    }}
                  >
                    {voiceEnabled ? 'Enabled' : 'Muted'}
                  </button>
                </div>

                {/* Hotkey Info Card */}
                <div className="rounded-xl p-3 backdrop-blur-md flex items-center justify-between" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                  <div>
                    <div className="text-xs font-bold" style={{ color: T.text }}>Global HUD Toggle Hotkey</div>
                    <div className="text-[9px] text-slate-400">Show or hide the HUD from anywhere</div>
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-white/10" style={{ color: T.accentLight }}>
                    Alt + Space
                  </span>
                </div>

                {/* System Protocol Details */}
                <div className="rounded-xl p-2.5 backdrop-blur-md text-[8px] font-mono text-center opacity-60 space-y-0.5" style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${T.cardBorder}` }}>
                  <div>FOCUSDESK AI // {T.badge}</div>
                  <div>SECURE LOCAL HUD // SYSTEM ONLINE</div>
                </div>
              </div>
            )}
          </div>

          {/* Quick HUD Scroll Buttons */}
          {canScrollUp && (
            <button
              onClick={() => handleScrollStep(-1)}
              className="absolute top-2 right-2.5 z-40 p-1.5 rounded-full backdrop-blur-md shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer border flex items-center justify-center opacity-90 hover:opacity-100"
              style={{
                background: T.cardBg,
                borderColor: T.accent,
                color: T.accent,
                boxShadow: `0 4px 12px rgba(0,0,0,0.8)`
              }}
              title="Scroll Up"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          )}

          {canScrollDown && (
            <button
              onClick={() => handleScrollStep(1)}
              className="absolute bottom-2 right-2.5 z-40 p-1.5 rounded-full backdrop-blur-md shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer border flex items-center justify-center opacity-90 hover:opacity-100"
              style={{
                background: T.cardBg,
                borderColor: T.accent,
                color: T.accent,
                boxShadow: `0 4px 12px rgba(0,0,0,0.8)`
              }}
              title="Scroll Down"
            >
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          )}
        </div>

        {/* POMODORO TIMER SIDEBAR */}
        {isTimerOpen && (
          <div className="absolute top-0 right-0 h-full w-72 shadow-2xl z-50 flex flex-col backdrop-blur-xl" style={{ background: T.timerBg, borderLeft: `1px solid ${T.timerBorder}`, WebkitAppRegion: 'no-drag' }}>
            <div className="flex justify-between items-center p-4" style={{ borderBottom: `1px solid ${T.timerBorder}` }}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: T.accent }}>{T.timerLabel || 'Focus Timer'}</span>
                <span className="text-[9px] font-mono opacity-70" style={{ color: T.accentLight }}>[{T.character || T.name}]</span>
              </div>
              <button onClick={() => setIsTimerOpen(false)} className="w-6 h-6 flex items-center justify-center rounded-md transition-colors font-bold cursor-pointer" style={{ color: T.textMuted, background: T.cardBg }}>✕</button>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center p-6">
              <div className="relative w-40 h-40 mx-auto mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                  <circle cx="60" cy="60" r="54" fill="none"
                    stroke={isActive ? T.timerActive : T.timerIdle}
                    strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 54}
                    strokeDashoffset={2 * Math.PI * 54 * (1 - timeLeft / defaultTime)}
                    style={{ transition: 'stroke-dashoffset 1s linear', filter: `drop-shadow(0 0 6px ${T.cpuGlow})` }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black font-mono tracking-widest" style={{ color: T.text }}>{fmt(timeLeft)}</span>
                  <span className="text-xs uppercase tracking-widest mt-2 font-semibold" style={{ color: T.textMuted }}>Focus</span>

                  {!isActive && (
                    <div className="absolute bottom-4 flex gap-6">
                      <button onClick={() => adjustTime(-5)} className="px-3 py-1 font-bold rounded-md transition-transform hover:scale-105 cursor-pointer" style={{ color: T.textMuted, background: T.cardBg }}>-</button>
                      <button onClick={() => adjustTime(5)} className="px-3 py-1 font-bold rounded-md transition-transform hover:scale-105 cursor-pointer" style={{ color: T.textMuted, background: T.cardBg }}>+</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center gap-3 w-full mb-6">
                <button onClick={() => setIsActive(!isActive)}
                  className="flex-1 py-2 rounded-full text-sm font-bold transition-all shadow-md hover:brightness-110 cursor-pointer"
                  style={{ background: isActive ? 'transparent' : T.btnPrimary, color: isActive ? T.accentLight : '#030712', border: isActive ? `2px solid ${T.accent}` : '2px solid transparent' }}>
                  {isActive ? 'Pause' : 'Start'}
                </button>
                <button onClick={() => { setIsActive(false); setTimeLeft(defaultTime); }}
                  className="px-6 py-2 rounded-full text-sm font-bold transition-colors hover:brightness-110 cursor-pointer"
                  style={{ color: T.textMuted, background: T.btnSecondary, border: `1px solid ${T.cardBorder}` }}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── FLOATING CPU/MEM WIDGETS ─── */}
      {!isPinned && showFloatingMeters && (
        <div className="flex flex-col gap-3 ml-3 mt-2" style={{ WebkitAppRegion: 'drag' }}>
          {/* CPU METER */}
          <div
            className="w-18 h-18 flex flex-col items-center justify-center overflow-hidden rounded-[16px] shadow-xl transition-transform hover:scale-105"
            style={{
              background: T.floatBg,
              border: `1px solid ${T.cpuGlow.replace('0.8', '0.35')}`,
              boxShadow: `0 8px 24px rgba(0,0,0,0.5), inset 0 0 14px ${T.cpuGlow.replace('0.8', '0.25')}`
            }}
          >
            <div className="relative w-11 h-11 mb-0.5">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                <circle cx="20" cy="20" r="16" fill="none"
                  stroke={cpuPct > 80 ? T.cpuHigh : T.cpuColor}
                  strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 16}
                  strokeDashoffset={2 * Math.PI * 16 * (1 - cpuPct / 100)}
                  style={{ transition: 'stroke-dashoffset 0.8s ease', filter: `drop-shadow(0 0 3px ${T.cpuGlow})` }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold" style={{ color: T.text }}>{cpuPct}%</span>
            </div>
            <span className="text-[8px] uppercase tracking-widest font-bold font-mono" style={{ color: T.textMuted }}>CPU</span>
          </div>

          {/* MEM METER */}
          <div
            className="w-18 h-18 flex flex-col items-center justify-center overflow-hidden rounded-[16px] shadow-xl transition-transform hover:scale-105"
            style={{
              background: T.floatBg,
              border: `1px solid ${T.memGlow.replace('0.8', '0.35')}`,
              boxShadow: `0 8px 24px rgba(0,0,0,0.5), inset 0 0 14px ${T.memGlow.replace('0.8', '0.25')}`
            }}
          >
            <div className="relative w-11 h-11 mb-0.5">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                <circle cx="20" cy="20" r="16" fill="none"
                  stroke={memPct > 80 ? T.memHigh : T.memColor}
                  strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 16}
                  strokeDashoffset={2 * Math.PI * 16 * (1 - memPct / 100)}
                  style={{ transition: 'stroke-dashoffset 0.8s ease', filter: `drop-shadow(0 0 3px ${T.memGlow})` }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold" style={{ color: T.text }}>{memPct}%</span>
            </div>
            <span className="text-[8px] uppercase tracking-widest font-bold font-mono" style={{ color: T.textMuted }}>MEM</span>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
