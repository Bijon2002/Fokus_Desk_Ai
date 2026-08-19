import { useState, useEffect } from 'react';
import { Cpu, Crosshair, Shield, Moon, Sun, ChevronDown } from 'lucide-react';

/* ────────── THEMES DEFINITION ────────── */
const THEMES = {
  ironman: {
    name: 'J.A.R.V.I.S.',
    icon: <Cpu className="w-4 h-4" />,
    tagline: 'MARK LXXXV HUD',
    badge: 'STARK TECH // ARC REACTOR ONLINE',
    bg: 'linear-gradient(180deg, #030712 0%, #081528 50%, #150810 100%)',
    headerBorder: 'rgba(56, 189, 248, 0.35)',
    logoBg: '#0f172a', logoBorder: '#38bdf8',
    text: '#ffffff', textMuted: '#93c5fd', textDim: '#38bdf8',
    accent: '#38bdf8', accentLight: '#bae6fd',
    secondary: '#facc15', secondaryLight: '#fef08a',
    cardBg: 'rgba(15, 23, 42, 0.85)', cardBorder: 'rgba(56, 189, 248, 0.35)',
    urgentBg: 'rgba(69, 10, 10, 0.55)', urgentBorder: 'rgba(239, 68, 68, 0.65)',
    urgentText: '#ffffff', urgentDot: '#38bdf8',
    timerBg: 'linear-gradient(180deg, #030712 0%, #0f172a 100%)',
    timerBorder: 'rgba(56, 189, 248, 0.45)',
    timerActive: '#38bdf8', timerIdle: '#facc15',
    btnPrimary: '#38bdf8', btnSecondary: 'rgba(15, 23, 42, 0.9)',
    floatBg: 'rgba(3, 7, 18, 0.96)', floatBorder: 'rgba(56, 189, 248, 0.45)',
    cpuColor: '#38bdf8', cpuHigh: '#7dd3fc',
    memColor: '#facc15', memHigh: '#fef08a',
    cpuGlow: 'rgba(56, 189, 248, 0.9)', memGlow: 'rgba(250, 204, 21, 0.9)',
  },
  spiderman: {
    name: 'SPIDER-SUIT HUD',
    icon: <Crosshair className="w-4 h-4" />,
    tagline: 'QUEENS NYC',
    badge: 'PETER PARKER // PROTOCOL 17-A',
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
    icon: <Shield className="w-4 h-4" />,
    tagline: 'TACTICAL HUD',
    badge: 'BATCOMPUTER v4.1 // GOTHAM CITY',
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
  dark: {
    name: 'FOCUS DESK',
    icon: <Moon className="w-4 h-4" />,
    tagline: 'STEALTH DARK',
    badge: 'SYSTEM // NIGHT OPS v2.0',
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
    icon: <Sun className="w-4 h-4" />,
    tagline: 'CLEAN & MINIMALIST',
    badge: 'SYSTEM // LIGHT UI v2.0',
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

/* ────────── THEME ARTWORK & HUD BACKGROUNDS ────────── */
function ThemeBackground({ themeKey }) {
  if (themeKey === 'spiderman') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Intricate Spider Web Pattern */}
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

        {/* Spider Emblem Silhouette */}
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
        {/* Wayne Tech Sonar Grid & Radar Rings */}
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

        {/* Bat-Signal / Batarang Silhouette */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 opacity-[0.12] text-yellow-400" viewBox="0 0 200 120" fill="currentColor">
          <path d="M100,10 C108,18 114,24 122,25 C136,15 158,20 185,12 C195,50 175,95 150,110 C140,88 125,82 100,95 C75,82 60,88 50,110 C25,95 5,50 15,12 C42,20 64,15 78,25 C86,24 92,18 100,10 Z M97,18 L94,30 L99,26 L100,28 L101,26 L106,30 L103,18 Z" />
        </svg>

        <div className="absolute top-2 left-2 text-[8px] font-mono text-yellow-500/50 tracking-widest">[BAT_SYS.01]</div>
        <div className="absolute bottom-2 right-2 text-[8px] font-mono text-yellow-500/50 tracking-widest">GOTHAM_DEF_GRID</div>
      </div>
    );
  }

  if (themeKey === 'ironman') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Holographic Arc Reactor HUD */}
        <svg className="absolute inset-0 w-full h-full opacity-30 text-cyan-400" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="45%" r="120" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,8" />
          <circle cx="50%" cy="45%" r="80" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50%" cy="45%" r="48" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="12,4" />
          <circle cx="50%" cy="45%" r="20" fill="none" stroke="#ffffff" strokeWidth="2" />
          
          <line x1="50%" y1="15%" x2="50%" y2="75%" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2,4" />
          <line x1="10%" y1="45%" x2="90%" y2="45%" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2,4" />

          {/* Stark Tech Corner Brackets */}
          <path d="M 15 35 L 15 15 L 35 15" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M 345 35 L 345 15 L 325 15" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M 15 415 L 15 435 L 35 435" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M 345 415 L 345 435 L 325 435" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
        </svg>

        <div className="absolute top-1.5 left-3 text-[7px] font-mono text-cyan-400/90 tracking-widest">MARK LXXXV // PWR 100%</div>
        <div className="absolute top-1.5 right-3 text-[7px] font-mono text-cyan-300/90 tracking-widest">J.A.R.V.I.S. ONLINE</div>
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

const getDayCategory = (dateStr) => {
  if (!dateStr) return 'Later';
  const d = new Date(dateStr);
  const t = new Date();
  const tmrw = new Date();
  tmrw.setDate(tmrw.getDate() + 1);

  if (d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear()) return 'Today';
  if (d.getDate() === tmrw.getDate() && d.getMonth() === tmrw.getMonth() && d.getFullYear() === tmrw.getFullYear()) return 'Tomorrow';
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
};

const isUrgent = (title) => {
  const lower = (title || '').toLowerCase();
  return lower.includes('deadline') || lower.includes('due') || lower.includes('urgent') || lower.includes('exam') || lower.includes('submit');
};

/* ────────── MAIN COMPONENT ────────── */
function App() {
  const [events, setEvents] = useState([]);
  const [sysInfo, setSysInfo] = useState({ cpuLoad: 0, memUsed: 0 });
  const [defaultTime, setDefaultTime] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [themeName, setThemeName] = useState('ironman');
  const [showThemePicker, setShowThemePicker] = useState(false);

  const T = THEMES[themeName] || THEMES.ironman;

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    if (!window.api) return;
    const calEvents = await window.api.getCalendarEvents();
    setEvents(calEvents || []);
  };

  /* system poll */
  useEffect(() => {
    const id = setInterval(async () => {
      if (window.api?.getSystemInfo) {
        setSysInfo(await window.api.getSystemInfo());
      }
    }, 3000);
    return () => clearInterval(id);
  }, []);

  /* pomodoro */
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
    <div className="h-screen w-full flex items-start bg-transparent" style={{ WebkitAppRegion: 'transparent' }}>

      {/* ─── MAIN COMPACT WIDGET CONTAINER (NO EXTRA BOTTOM GAP) ─── */}
      <div
        className="w-[360px] flex flex-col overflow-hidden relative shrink-0 rounded-[18px] shadow-2xl"
        style={{
          background: T.bg,
          color: T.text,
          WebkitAppRegion: 'drag',
          border: `1px solid ${T.cardBorder}`,
          boxShadow: `0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
        }}
      >
        {/* Dynamic Superhero HUD Artworks */}
        <ThemeBackground themeKey={themeName} />

        {/* ─── HEADER ─── */}
        <div className="px-4 pt-3.5 pb-2.5 flex items-center justify-between z-20 relative" style={{ borderBottom: `1px solid ${T.headerBorder}` }}>
          {/* THEME PICKER BUTTON */}
          <div className="relative" style={{ WebkitAppRegion: 'no-drag' }}>
            <button
              onClick={() => setShowThemePicker(!showThemePicker)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 shadow-sm"
              style={{ background: T.cardBg, border: `1px solid ${T.accent}`, color: T.text }}
            >
              <div className="flex items-center justify-center p-0.5 rounded bg-white/5 mr-1 text-inherit opacity-90">
                {T.icon}
              </div>
              <span className="tracking-wide uppercase text-[11px] font-extrabold">{T.name}</span>
              <ChevronDown className="w-3 h-3 ml-0.5 opacity-80" />
            </button>

            {/* DROPDOWN MENU & CLICK-AWAY OVERLAY */}
            {showThemePicker && (
              <>
                <div 
                  className="fixed inset-0 z-[9998]"
                  onClick={() => setShowThemePicker(false)}
                />
                <div 
                  className="absolute top-10 left-0 w-56 rounded-xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.85)] z-[9999] border backdrop-blur-2xl" 
                  style={{ background: '#080c14', borderColor: T.accent }}
                >
                  <div className="px-3.5 py-2 text-[9px] font-mono uppercase tracking-wider text-slate-400 border-b border-white/10 bg-white/5">
                    Select Theme
                  </div>
                  {Object.entries(THEMES).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => { setThemeName(key); setShowThemePicker(false); }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left text-xs font-semibold transition-all hover:bg-white/10"
                      style={{
                        color: themeName === key ? theme.accent : '#ffffff',
                        background: themeName === key ? 'rgba(255,255,255,0.08)' : 'transparent',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div className="flex items-center justify-center p-1 rounded bg-white/5 mr-2">
                        {theme.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">{theme.name}</span>
                        <span className="text-[9px] font-normal opacity-60 text-slate-300">{theme.tagline}</span>
                      </div>
                      {themeName === key && <span className="ml-auto text-xs font-bold" style={{ color: theme.accent }}>✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-1.5" style={{ WebkitAppRegion: 'no-drag' }}>
            <button onClick={togglePin}
              className="text-[11px] font-bold px-2 py-0.5 rounded border transition-colors shadow-sm"
              style={{
                color: isPinned ? '#fbbf24' : T.textMuted,
                background: isPinned ? 'rgba(120, 53, 15, 0.4)' : T.cardBg,
                borderColor: isPinned ? 'rgba(250, 204, 21, 0.6)' : T.cardBorder,
              }}
            >
              {isPinned ? 'Unpin' : 'Pin'}
            </button>
            <button onClick={() => setIsTimerOpen(!isTimerOpen)}
              className="text-[11px] font-bold px-2 py-0.5 rounded border transition-colors shadow-sm"
              style={{ color: T.accent, background: T.cardBg, borderColor: T.accent }}
            >
              Timer
            </button>
            <button onClick={handleMinimize} className="w-3.5 h-3.5 rounded-full transition-transform hover:scale-110 ml-1" style={{ background: T.secondary }} />
            <button onClick={handleClose} className="w-3.5 h-3.5 rounded-full transition-transform hover:scale-110" style={{ background: T.accent }} />
          </div>
        </div>

        {/* ─── HUD SUB-TAGLINE ─── */}
        <div className="px-4 py-1 flex items-center justify-between text-[8px] font-mono uppercase tracking-widest opacity-70 border-b border-white/5 z-10">
          <span style={{ color: T.textMuted }}>{T.tagline}</span>
        </div>

        {/* ─── CONTENT AREA (COMPACT) ─── */}
        <div className="px-4 pb-4 space-y-3 pt-3 z-10" style={{ WebkitAppRegion: 'no-drag' }}>

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
                    {expandedEventId === ev.id && (
                      <div className="mt-2 text-[10px] p-2 rounded whitespace-pre-wrap" style={{ color: T.text, opacity: 0.9, background: 'rgba(0,0,0,0.4)', border: `1px solid ${T.urgentBorder}` }}>
                        {ev.description || 'No additional details provided.'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCHEDULE */}
          <div className="rounded-xl p-3 backdrop-blur-md flex flex-col" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, maxHeight: isCalendarExpanded ? '320px' : 'none' }}>
            <div className="flex items-center justify-between mb-2 shrink-0">
              <span className="text-[10px] uppercase tracking-widest font-extrabold" style={{ color: T.textMuted }}>Schedule</span>
              {Object.keys(groupedEvents).length > 2 && (
                <button onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}
                  className="text-[9px] uppercase font-bold transition-colors px-2 py-0.5 rounded shadow-sm shrink-0"
                  style={{ color: T.accent, background: T.cardBg, border: `1px solid ${T.accent}` }}>
                  {isCalendarExpanded ? 'Show Less' : 'View All'}
                </button>
              )}
            </div>
            <div className={`space-y-3 ${isCalendarExpanded ? 'overflow-y-auto pr-2' : ''}`} style={{ scrollbarWidth: 'thin', scrollbarColor: `${T.accent} transparent` }}>
              {Object.keys(groupedEvents).length === 0 && <p className="text-[11px] italic py-1" style={{ color: T.textDim }}>No upcoming events</p>}
              {daysToShow.map((day) => (
                <div key={day}>
                  <h3 className="text-xs uppercase font-extrabold mb-1.5 tracking-wider" style={{ color: T.accent }}>{day}</h3>
                  <div className="space-y-1">
                    {groupedEvents[day].map(ev => (
                      <div key={ev.id} className="flex flex-col py-1.5 px-2 rounded-lg transition-colors cursor-pointer hover:bg-white/5" style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${T.cardBorder}` }} onClick={() => toggleEvent(ev.id)}>
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-5 rounded-full shadow-sm shrink-0" style={{ background: T.accent }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs truncate font-semibold" style={{ color: T.text }}>{ev.title}</p>
                          </div>
                          <span className="text-sm font-mono font-bold whitespace-nowrap shrink-0" style={{ color: T.textMuted }}>{ev.time}</span>
                        </div>
                        {expandedEventId === ev.id && (
                          <div className="mt-2 text-[10px] p-2 rounded whitespace-pre-wrap ml-3" style={{ color: T.text, background: 'rgba(0,0,0,0.5)', border: `1px solid ${T.cardBorder}` }}>
                            {ev.description || 'No additional details provided.'}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* POMODORO TIMER SIDEBAR */}
          {isTimerOpen && (
            <div className="absolute top-0 right-0 h-full w-72 shadow-2xl z-50 flex flex-col backdrop-blur-xl" style={{ background: T.timerBg, borderLeft: `1px solid ${T.timerBorder}`, WebkitAppRegion: 'no-drag' }}>
              <div className="flex justify-between items-center p-4" style={{ borderBottom: `1px solid ${T.timerBorder}` }}>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold uppercase tracking-widest" style={{ color: T.accent }}>Focus Timer</span>
                  <span className="text-[9px] font-mono opacity-60">[{T.name}]</span>
                </div>
                <button onClick={() => setIsTimerOpen(false)} className="w-6 h-6 flex items-center justify-center rounded-md transition-colors font-bold" style={{ color: T.textMuted, background: T.cardBg }}>✕</button>
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
                        <button onClick={() => adjustTime(-5)} className="px-3 py-1 font-bold rounded-md transition-transform hover:scale-105" style={{ color: T.textMuted, background: T.cardBg }}>-</button>
                        <button onClick={() => adjustTime(5)} className="px-3 py-1 font-bold rounded-md transition-transform hover:scale-105" style={{ color: T.textMuted, background: T.cardBg }}>+</button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-center gap-3 w-full mb-6">
                  <button onClick={() => setIsActive(!isActive)}
                    className="flex-1 py-2 rounded-full text-sm font-bold transition-all shadow-md hover:brightness-110"
                    style={{ background: isActive ? 'transparent' : T.btnPrimary, color: isActive ? T.accentLight : '#030712', border: isActive ? `2px solid ${T.accent}` : '2px solid transparent' }}>
                    {isActive ? 'Pause' : 'Start'}
                  </button>
                  <button onClick={() => { setIsActive(false); setTimeLeft(defaultTime); }}
                    className="px-6 py-2 rounded-full text-sm font-bold transition-colors hover:brightness-110"
                    style={{ color: T.textMuted, background: T.btnSecondary, border: `1px solid ${T.cardBorder}` }}>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ─── FLOATING CPU/MEM WIDGETS ─── */}
      {!isPinned && (
        <div className="flex flex-col gap-3 ml-3 mt-2" style={{ WebkitAppRegion: 'drag' }}>
          <div className="rounded-xl p-3 flex flex-col items-center backdrop-blur-xl" style={{ background: T.floatBg, border: `1px solid ${T.floatBorder}`, boxShadow: `0 0 15px ${T.cpuGlow.replace('0.8', '0.25')}` }}>
            <div className="relative w-10 h-10 mb-1">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
                <circle cx="20" cy="20" r="16" fill="none"
                  stroke={cpuPct > 80 ? T.cpuHigh : T.cpuColor}
                  strokeWidth="2.5" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 16}
                  strokeDashoffset={2 * Math.PI * 16 * (1 - cpuPct / 100)}
                  style={{ transition: 'stroke-dashoffset 0.8s ease', filter: `drop-shadow(0 0 3px ${T.cpuGlow})` }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold" style={{ color: T.text }}>{cpuPct}%</span>
            </div>
            <span className="text-[9px] uppercase tracking-widest font-bold" style={{ color: T.textMuted }}>CPU</span>
          </div>

          <div className="rounded-xl p-3 flex flex-col items-center backdrop-blur-xl" style={{ background: T.floatBg, border: `1px solid ${T.floatBorder}`, boxShadow: `0 0 15px ${T.memGlow.replace('0.8', '0.25')}` }}>
            <div className="relative w-10 h-10 mb-1">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
                <circle cx="20" cy="20" r="16" fill="none"
                  stroke={memPct > 80 ? T.memHigh : T.memColor}
                  strokeWidth="2.5" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 16}
                  strokeDashoffset={2 * Math.PI * 16 * (1 - memPct / 100)}
                  style={{ transition: 'stroke-dashoffset 0.8s ease', filter: `drop-shadow(0 0 3px ${T.memGlow})` }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold" style={{ color: T.text }}>{memPct}%</span>
            </div>
            <span className="text-[9px] uppercase tracking-widest font-bold" style={{ color: T.textMuted }}>MEM</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
