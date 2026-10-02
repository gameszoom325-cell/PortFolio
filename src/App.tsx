import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import portfolioData from './portfolioData.json';
import {
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Volume2,
  VolumeX,
  X,
  ChevronRight,
  ShieldAlert,
  Atom,
  Sprout,
  Film,
  Zap,
  Code2,
  Compass,
  GraduationCap,
  Copy,
  Check,
  Maximize2,
  Activity,
  Radio,
  RefreshCw,
  Sliders,
  Server,
  Globe,
  Wifi,
  AlertTriangle,
  CheckCircle2,
  Gauge,
  ArrowRight,
  Play,
  Sun,
  Moon
} from 'lucide-react';

/* =========================================================================
   SCENE-BASED SCROLL TRANSITION CONFIGURATION
   Full Viewport Snapping / Section Morph
   ========================================================================= */
const sceneTransition = {
  initial: { opacity: 0, y: 80, scale: 1.05, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -60, scale: 0.95, filter: "blur(8px)" },
  viewport: { once: false, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
};
const biDirectionalScroll = sceneTransition;

/* =========================================================================
   1. CYBERNETIC SOUND SYNTHESIZER (Web Audio API - Zero External Assets)
   ========================================================================= */
export function useCyberSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  const playHover = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.025);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {
      // Ignored
    }
  }, [soundEnabled, getAudioContext]);

  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(620, now);
      osc1.frequency.exponentialRampToValueAtTime(940, now + 0.05);

      osc2.frequency.setValueAtTime(1240, now);
      osc2.frequency.exponentialRampToValueAtTime(1880, now + 0.05);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.05);
      osc2.stop(now + 0.05);
    } catch {
      // Ignored
    }
  }, [soundEnabled, getAudioContext]);

  const playPowerUp = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.14);
    } catch {
      // Ignored
    }
  }, [soundEnabled, getAudioContext]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => {
          try {
            const ctx = getAudioContext();
            if (ctx) {
              const now = ctx.currentTime;
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(800, now);
              osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
              gain.gain.setValueAtTime(0.04, now);
              gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start(now);
              osc.stop(now + 0.08);
            }
          } catch {
            // Ignored
          }
        }, 10);
      }
      return next;
    });
  }, [getAudioContext]);

  return { soundEnabled, toggleSound, playHover, playClick, playPowerUp };
}

/* =========================================================================
   2. REUSABLE MAGNETIC BUTTON WRAPPER (Desktop Native Cursor Friendly)
   ========================================================================= */
export function MagneticButton({
  children,
  className = '',
  strength = 0.22,
  onClick,
  onMouseEnter
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
}) {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.1s ease-out'
      }}
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================================================================
   3. LIVING ATMOSPHERIC CANVAS PARTICLE NET WITH 2D ELASTIC COLLISION PHYSICS
   Supports dynamic theme adapting (vibrant colors in both Light & Dark modes)
   ========================================================================= */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  color: string;
  phase: number;
}

export function AtmosphericCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 26 : 68;
    const maxDistance = isMobile ? 95 : 135;
    const mouseRadius = isMobile ? 0 : 155;

    const mouse = { x: -2000, y: -2000, active: false };
    const particles: Particle[] = [];

    // SPEC 3: Bright purple/orange on Dark; subtle deep slate/gray on Light
    const darkPalette = ['#f97316', '#a855f7', '#fb923c', '#c084fc', '#e11d48'];
    const lightPalette = ['#334155', '#475569', '#64748b', '#94a3b8', '#7c3aed'];
    const activePalette = isDark ? darkPalette : lightPalette;

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 2.2 + 1.8;
      particles.push({
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * (height - 40) + 20,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius,
        mass: radius * radius,
        color: activePalette[Math.floor(Math.random() * activePalette.length)],
        phase: Math.random() * Math.PI * 2
      });
    }

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = -2000;
      mouse.y = -2000;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // 1. UPDATE PARTICLES & APPLY MOUSE DISPERSION PHYSICS
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius && dist > 0.01) {
            const force = (1 - dist / mouseRadius) * 2.6;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * 0.35;
            p.vy += Math.sin(angle) * force * 0.35;
          }
        }

        p.vx *= 0.992;
        p.vy *= 0.992;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 3.5;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Boundary collision
        if (p.x - p.radius < 0) {
          p.x = p.radius;
          p.vx = Math.abs(p.vx) * 0.95;
        } else if (p.x + p.radius > width) {
          p.x = width - p.radius;
          p.vx = -Math.abs(p.vx) * 0.95;
        }

        if (p.y - p.radius < 0) {
          p.y = p.radius;
          p.vy = Math.abs(p.vy) * 0.95;
        } else if (p.y + p.radius > height) {
          p.y = height - p.radius;
          p.vy = -Math.abs(p.vy) * 0.95;
        }
      }

      // 2. ELASTIC 2D PARTICLE-PARTICLE COLLISIONS
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = p1.radius + p2.radius;

          if (dist < minDist && dist > 0.001) {
            const nx = dx / dist;
            const ny = dy / dist;
            const kx = p1.vx - p2.vx;
            const ky = p1.vy - p2.vy;
            const p = (2 * (nx * kx + ny * ky)) / (p1.mass + p2.mass);

            if (nx * kx + ny * ky > 0) {
              p1.vx -= p * p2.mass * nx;
              p1.vy -= p * p2.mass * ny;
              p2.vx += p * p1.mass * nx;
              p2.vy += p * p1.mass * ny;

              const overlap = 0.5 * (minDist - dist);
              p1.x -= overlap * nx;
              p1.y -= overlap * ny;
              p2.x += overlap * nx;
              p2.y += overlap * ny;
            }
          }
        }
      }

      // 3. DRAW CONNECTING EDGES & GLOWING PARTICLES
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulse = Math.sin(frame * 0.035 + p.phase) * 0.35 + 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        if (isDark) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (isDark ? 0.22 : 0.15);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? p.color === '#f97316'
                ? `rgba(249, 115, 22, ${alpha})`
                : `rgba(168, 85, 247, ${alpha})`
              : `rgba(71, 85, 105, ${alpha})`;
            ctx.lineWidth = isDark ? 0.85 : 0.75;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 bg-transparent ${isDark ? 'opacity-70' : 'opacity-85'}`}
    />
  );
}

/* =========================================================================
   4. FIRST-LOAD BOOT SEQUENCE (Obsidian Terminal Decryption Loader)
   ========================================================================= */
export function BootSequence({
  onComplete,
  sfx
}: {
  onComplete: () => void;
  sfx: ReturnType<typeof useCyberSound>;
}) {
  const [progress, setProgress] = useState(0);
  const [bootLog, setBootLog] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  const logs = useMemo(
    () => [
      'INITIALIZING KERNEL: AYUSH_SINGH.EXE',
      'CONNECTING SRM_NODE // B.TECH CSE (AI & ML) SEC-B',
      'SYNTHESIZING QUBO ENERGY ISING MATRICES...',
      'LOADING XGBOOST & SHAP EXPLAINABILITY ENGINE...',
      'CALIBRATING SRM_IST CYBERNETIC HUD...',
      'ALL INVARIANTS VERIFIED. PORTFOLIO SYSTEM READY.'
    ],
    []
  );

  const handleSkip = useCallback(() => {
    sfx.playPowerUp();
    setIsDone(true);
    setTimeout(onComplete, 400);
  }, [sfx, onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    let currentProgress = 0;
    let logIndex = 0;

    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 7) + 4;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          handleSkip();
        }, 500);
      } else {
        setProgress(currentProgress);
        if (currentProgress > (logIndex + 1) * 16 && logIndex < logs.length) {
          setBootLog((prev) => [...prev, logs[logIndex]]);
          logIndex++;
          sfx.playHover();
        }
      }
    }, 45);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [handleSkip, logs, sfx]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b] text-slate-100 transition-all duration-700 ${
        isDone ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="w-full max-w-lg px-6 space-y-6">
        <div className="flex items-center justify-between border-b border-orange-500/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
            <span className="font-mono text-xs font-bold text-orange-400 tracking-wider">
              AYUSH_SINGH.EXE // SECURE_BOOT
            </span>
          </div>
          <button
            onClick={handleSkip}
            className="text-[11px] font-mono text-slate-400 hover:text-orange-300 border border-slate-800 hover:border-orange-500/50 px-2 py-0.5 rounded transition-colors cursor-pointer"
          >
            SKIP [ESC]
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline justify-between font-mono text-xs">
            <span className="text-slate-400">SYSTEM ARCHITECTURE MOUNT</span>
            <span className="text-2xl font-bold font-tech text-orange-400 tabular-nums">
              {progress}%
            </span>
          </div>

          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-orange-500/20">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-500 shadow-[0_0_15px_#f97316] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-lg bg-black/60 border border-orange-500/20 font-mono text-[11px] leading-relaxed text-slate-300 min-h-[140px] space-y-1">
          {bootLog.map((log, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-purple-400">&gt;</span>
              <span className={index === bootLog.length - 1 ? 'text-orange-300 font-semibold' : 'text-slate-400'}>
                {log}
              </span>
            </div>
          ))}
          {progress < 100 && (
            <div className="flex items-center gap-1 text-orange-400">
              <span className="w-2 h-3.5 bg-orange-400 animate-pulse inline-block" />
            </div>
          )}
        </div>

        <div className="text-center font-mono text-[10px] text-slate-500 tracking-widest">
          SRM IST // COMPUTER SCIENCE &amp; ENGINEERING (AI &amp; ML)
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. 3D HOLOGRAPHIC PROJECT CARD
   ========================================================================= */
export function HolographicProjectCard({
  project,
  onInspect,
  sfx,
  isDark
}: {
  project: (typeof portfolioData.projects)[0];
  onInspect: () => void;
  sfx: ReturnType<typeof useCyberSound>;
  isDark: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotate({ x: rotateX, y: rotateY });
    setSheen({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const liveUrl = project.architecture?.demoUrl || '#';
  const githubUrl = project.architecture?.githubUrl || 'https://github.com/gameszoom325-cell';

  return (
    <motion.div
      {...biDirectionalScroll}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: rotate.x === 0 ? 'transform 0.4s ease-out' : 'transform 0.08s ease-out'
        }}
        className={`group relative rounded-xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 cyber-corner-tr h-full cursor-default ${
          isDark
            ? 'bg-[#0f0f13]/90 border border-orange-500/25 hover:border-orange-400 hover:shadow-[0_0_35px_rgba(249,115,22,0.2)] text-[#f3f4f6]'
            : 'bg-white border border-gray-200 shadow-xl hover:shadow-2xl hover:border-purple-400 text-[#0f172a]'
        }`}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: isDark
              ? `radial-gradient(400px circle at ${sheen.x}% ${sheen.y}%, rgba(249, 115, 22, 0.12), transparent 70%)`
              : `radial-gradient(400px circle at ${sheen.x}% ${sheen.y}%, rgba(168, 85, 247, 0.08), transparent 70%)`
          }}
        />

        <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
          <div className={`absolute top-2 right-2 w-2 h-2 rounded-sm transition-colors ${
            isDark ? 'bg-orange-400 group-hover:bg-purple-400' : 'bg-purple-500 group-hover:bg-orange-500'
          }`} />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className={`font-semibold tracking-wider uppercase ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
              {project.category}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] ${
              isDark
                ? 'bg-purple-950/80 border border-purple-500/40 text-purple-300'
                : 'bg-purple-50 border border-purple-200 text-purple-700 font-medium'
            }`}>
              {project.badge}
            </span>
          </div>

          <div>
            <h3 className={`text-xl font-bold font-tech transition-colors flex items-center justify-between ${
              isDark ? 'text-white group-hover:text-orange-300' : 'text-slate-900 group-hover:text-purple-600'
            }`}>
              <span>{project.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sfx.playPowerUp();
                  onInspect();
                }}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-slate-800 text-slate-500 hover:text-orange-400' : 'hover:bg-slate-100 text-slate-400 hover:text-purple-600'
                }`}
                title="Inspect Architecture"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </h3>
            <p className={`mt-2 text-xs sm:text-sm font-mono leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {project.description}
            </p>
          </div>

          {project.stats && project.stats.length > 0 && (
            <div className={`grid grid-cols-2 gap-2 py-2 border-y font-mono text-xs ${
              isDark ? 'border-slate-800/80' : 'border-slate-200'
            }`}>
              {project.stats.slice(0, 2).map((s, idx) => (
                <div key={idx} className={`p-2 rounded border ${
                  isDark ? 'bg-black/40 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{s.label}</div>
                  <div className={`font-bold tabular-nums ${isDark ? 'text-orange-300' : 'text-purple-700'}`}>
                    {s.value} <span className="text-[10px] opacity-75">{s.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`px-2 py-0.5 text-[10px] font-mono rounded border transition-colors ${
                  isDark
                    ? 'bg-slate-900/90 text-slate-300 border-slate-800 group-hover:border-orange-500/30'
                    : 'bg-slate-100 text-slate-700 border-slate-200 group-hover:border-purple-300'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className={`relative z-10 pt-5 mt-4 border-t flex items-center justify-between gap-3 text-xs font-mono ${
          isDark ? 'border-slate-800/80' : 'border-gray-200'
        }`}>
          <button
            onClick={() => {
              sfx.playPowerUp();
              onInspect();
            }}
            onMouseEnter={sfx.playHover}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-orange-300' : 'text-slate-600 hover:text-purple-600'
            }`}
          >
            <span>INSPECT SPEC</span>
            <ChevronRight className={`w-3.5 h-3.5 ${isDark ? 'text-orange-400' : 'text-purple-600'}`} />
          </button>

          <div className="flex items-center gap-2">
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                sfx.playClick();
              }}
              onMouseEnter={sfx.playHover}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900 border-slate-800 hover:border-orange-500/50 text-slate-300 hover:text-white'
                  : 'bg-slate-50 border-gray-200 hover:border-purple-400 text-slate-700 hover:text-purple-600 shadow-xs'
              }`}
              title="View Repository"
            >
              <Github className="w-3.5 h-3.5" />
            </a>

            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                sfx.playClick();
              }}
              onMouseEnter={sfx.playHover}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all shadow-sm cursor-pointer ${
                isDark
                  ? 'bg-orange-500/20 hover:bg-orange-500/30 border border-orange-400/60 hover:border-orange-400 text-orange-300 hover:text-orange-100 shadow-[0_0_12px_rgba(249,115,22,0.2)]'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md'
              }`}
            >
              <span>LIVE DEMO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================================
   6. INTERACTIVE CASE STUDY PIPELINE
   ========================================================================= */
export function CaseStudyPipeline({
  sfx,
  isDark
}: {
  sfx: ReturnType<typeof useCyberSound>;
  isDark: boolean;
}) {
  const [selectedCase, setSelectedCase] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const activeStudy = portfolioData.caseStudies[selectedCase];

  return (
    <div className={`rounded-2xl p-6 sm:p-8 space-y-8 border shadow-lg cyber-corner-tr transition-colors ${
      isDark
        ? 'bg-[#0a0a0f]/95 border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.12)] text-slate-100'
        : 'bg-white border-slate-200 text-slate-900 shadow-xl'
    }`}>
      <div className={`flex flex-wrap items-center justify-between gap-4 border-b pb-4 ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div>
          <div className={`text-xs font-mono tracking-widest ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
            // DEEP ARCHITECTURAL BREAKDOWN
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-tech">
            02. Interactive Engineering Pipelines
          </h3>
        </div>

        <div className={`flex items-center gap-2 p-1 rounded-lg text-xs font-mono border ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {portfolioData.caseStudies.map((cs, idx) => (
            <button
              key={cs.id}
              onClick={() => {
                sfx.playClick();
                setSelectedCase(idx);
                setActiveStep(0);
              }}
              onMouseEnter={sfx.playHover}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                selectedCase === idx
                  ? isDark
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/50 shadow-sm font-semibold'
                    : 'bg-white text-purple-700 font-bold shadow-xs border border-slate-200'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cs.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className={`flex items-center gap-2 text-xs font-mono ${isDark ? 'text-purple-400' : 'text-purple-600 font-semibold'}`}>
          <Activity className="w-4 h-4" />
          <span>{activeStudy.subtitle}</span>
        </div>
        <p className={`text-xs sm:text-sm font-mono max-w-3xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {activeStudy.description}
        </p>
      </div>

      <div className={`grid grid-cols-2 sm:grid-cols-5 gap-2 border-y py-4 ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        {activeStudy.steps.map((st, idx) => (
          <button
            key={idx}
            onClick={() => {
              sfx.playClick();
              setActiveStep(idx);
            }}
            onMouseEnter={sfx.playHover}
            className={`p-3 rounded-lg text-left transition-all font-mono cursor-pointer ${
              activeStep === idx
                ? isDark
                  ? 'bg-orange-950/80 border border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.25)]'
                  : 'bg-purple-50 border border-purple-500 shadow-sm'
                : isDark
                ? 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                : 'bg-slate-50 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className={`text-[10px] ${isDark ? 'text-orange-400' : 'text-purple-600 font-semibold'}`}>
              PHASE {st.step}
            </div>
            <div className={`text-xs font-bold font-tech truncate mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {st.title}
            </div>
          </button>
        ))}
      </div>

      {activeStudy.steps[activeStep] && (
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 rounded-xl border ${
          isDark ? 'bg-black/50 border-orange-500/20' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 text-xs font-mono rounded border ${
                isDark ? 'bg-orange-950 border-orange-800 text-orange-300' : 'bg-orange-100 border-orange-200 text-orange-800 font-semibold'
              }`}>
                STAGE {activeStudy.steps[activeStep].step} // 05
              </span>
              <h4 className="text-lg font-bold font-tech">
                {activeStudy.steps[activeStep].title}
              </h4>
            </div>
            <p className={`text-xs sm:text-sm font-mono leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {activeStudy.steps[activeStep].description}
            </p>
          </div>

          <div className={`md:col-span-4 p-4 rounded-xl border text-center space-y-1 ${
            isDark ? 'bg-[#050508] border-purple-500/30' : 'bg-white border-purple-200 shadow-sm'
          }`}>
            <div className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {activeStudy.steps[activeStep].metricLabel}
            </div>
            <div className={`text-3xl font-bold font-tech tracking-wide ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
              {activeStudy.steps[activeStep].metric}
            </div>
            <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              BENCHMARK VERIFIED
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   7. LIVE AI NEURAL PIPELINE & MODEL DIAGNOSTICS CONSOLE
   ========================================================================= */
export function LiveNeuralPipelineDiagnostics({
  sfx,
  isDark
}: {
  sfx: ReturnType<typeof useCyberSound>;
  isDark: boolean;
}) {
  const [activeTab, setActiveTab] = useState<'landwatch' | 'farmer' | 'quantum'>('landwatch');
  const [isInferencing, setIsInferencing] = useState(false);
  const [inferenceCycle, setInferenceCycle] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi'>('en');
  const [activeQuboCell, setActiveQuboCell] = useState<{ r: number; c: number } | null>(null);

  const handleTriggerInference = () => {
    sfx.playClick();
    setIsInferencing(true);
    setTimeout(() => {
      sfx.playPowerUp();
      setInferenceCycle((prev) => prev + 1);
      setIsInferencing(false);
    }, 750);
  };

  const riskScore = useMemo(() => {
    const base = 78.4;
    const variation = ((inferenceCycle * 17) % 7) - 3;
    return (base + variation * 0.4).toFixed(1);
  }, [inferenceCycle]);

  const latencyXGB = useMemo(() => {
    return (34 + ((inferenceCycle * 13) % 9)).toString();
  }, [inferenceCycle]);

  const shapFeatures = [
    { name: 'Statutory Clearance Lag (Sec 11(1))', score: '+0.342', pct: 86, impact: 'High Risk Contributor' },
    { name: 'Gram Sabha Consent Quorum Delay', score: '+0.285', pct: 72, impact: 'Deliberation Block' },
    { name: 'Environmental & Forest Clearance Latency', score: '+0.210', pct: 64, impact: 'Statutory Bottleneck' },
    { name: 'Title Deed Verification Discrepancy', score: '+0.145', pct: 46, impact: 'Litigation Hazard' },
    { name: 'Social Impact Assessment (SIA) Incomplete', score: '+0.098', pct: 31, impact: 'Procedural Delay' },
  ];

  const quboMatrix = [
    [-2.40, 1.15, -0.65, 0.42],
    [1.15, -1.85, 0.90, -0.35],
    [-0.65, 0.90, -3.10, 1.25],
    [0.42, -0.35, 1.25, -2.90],
  ];

  return (
    <div className={`rounded-2xl p-6 sm:p-8 space-y-6 border shadow-lg cyber-corner-tr transition-colors ${
      isDark
        ? 'bg-[#0a0a0f]/95 border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.15)] text-slate-100'
        : 'bg-white border-slate-200 shadow-xl text-slate-900'
    }`}>
      {/* Header and Controls */}
      <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b pb-5 ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div>
          <div className={`text-xs font-mono tracking-widest flex items-center gap-2 mb-1 ${
            isDark ? 'text-orange-400' : 'text-orange-600'
          }`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-orange-400' : 'bg-orange-500'}`} />
            <span>// COMPUTATIONAL TELEMETRY &amp; LIVE MODEL BENCHMARKS</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-tech">
            03. Live AI Neural Pipeline &amp; Model Diagnostics
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono border ${
            isDark ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-700'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>INFERENCE RUNTIME: ONLINE</span>
          </div>

          <button
            onClick={handleTriggerInference}
            disabled={isInferencing}
            onMouseEnter={sfx.playHover}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-xs transition-all cursor-pointer disabled:opacity-50 ${
              isDark
                ? 'bg-gradient-to-r from-orange-500 to-purple-600 hover:brightness-110 text-white shadow-[0_0_20px_rgba(249,115,22,0.35)]'
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isInferencing ? 'animate-spin' : ''}`} />
            <span>{isInferencing ? 'RE-EVALUATING MODEL...' : 'TRIGGER DIAGNOSTICS'}</span>
          </button>
        </div>
      </div>

      {/* Project Selector Tabs */}
      <div className={`flex flex-wrap items-center gap-2 border-b pb-4 ${
        isDark ? 'border-slate-800/80' : 'border-slate-200'
      }`}>
        {[
          { id: 'landwatch', label: '1. LandWatch (SIH 2026)', badge: 'XGBoost + SHAP' },
          { id: 'farmer', label: '2. Smart Farmer Portal', badge: 'Dual NLP & OTP Flow' },
          { id: 'quantum', label: '3. Quantum Grid Optimizer', badge: 'QUBO / QAOA Matrix' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sfx.playClick();
              setActiveTab(tab.id as 'landwatch' | 'farmer' | 'quantum');
            }}
            onMouseEnter={sfx.playHover}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? isDark
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.25)] font-bold'
                  : 'bg-purple-50 text-purple-700 border border-purple-500 shadow-sm font-bold'
                : isDark
                ? 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
              isDark ? 'bg-black/60 text-orange-400 border-orange-500/20' : 'bg-white text-purple-600 border-slate-200'
            }`}>
              {tab.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Tab 1: LandWatch */}
      {activeTab === 'landwatch' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className={`lg:col-span-4 p-5 rounded-xl border space-y-4 ${
              isDark ? 'bg-black/50 border-orange-500/25' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>PROJECT DELAY PREDICTOR</span>
                <span className={`font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>SIH 2026</span>
              </div>

              <div className={`p-4 rounded-lg border text-center space-y-2 ${
                isDark ? 'bg-[#050508] border-purple-500/30' : 'bg-white border-purple-200 shadow-sm'
              }`}>
                <div className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>PREDICTED BEYOND-SCHEDULE RISK</div>
                <div className={`text-4xl font-bold font-tech tracking-tight ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  {riskScore}%
                </div>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${
                  isDark ? 'bg-purple-950/80 border-purple-500/40 text-purple-300' : 'bg-purple-50 border-purple-200 text-purple-700'
                }`}>
                  <AlertTriangle className="w-3 h-3 text-purple-500" />
                  <span>CRITICAL STATUTORY DELAY LIKELY</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className={`text-[11px] uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  // STATUTORY INVARIANTS
                </div>
                <div className="space-y-1.5">
                  {[
                    { label: 'RFCTLARR Sec 19 Notification', status: 'IN REVIEW', ok: false },
                    { label: 'Collector Sanction Seal', status: 'VERIFIED', ok: true },
                    { label: 'GIS Environmental Overlap', status: '0 VIOLATIONS', ok: true },
                    { label: 'Gram Sabha Quorum Status', status: 'UNRESOLVED', ok: false },
                  ].map((inv, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-2 rounded border ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                    }`}>
                      <span className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{inv.label}</span>
                      <span className={`text-[10px] font-bold ${inv.ok ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {inv.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`pt-2 flex items-center justify-between text-[11px] font-mono border-t ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
              }`}>
                <span>Inference Latency:</span>
                <span className={`font-bold ${isDark ? 'text-orange-300' : 'text-orange-600'}`}>{latencyXGB} ms (Batch 512)</span>
              </div>
            </div>

            <div className={`lg:col-span-8 p-5 rounded-xl border space-y-4 ${
              isDark ? 'bg-black/50 border-orange-500/25' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between text-xs font-mono">
                <div>
                  <span className={`font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                    XGBOOST ENSEMBLE + GAME-THEORETIC SHAP ATTRIBUTION
                  </span>
                  <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Mathematical marginal contributions to total project timeline deviation
                  </p>
                </div>
                <span className={`px-2 py-0.5 rounded border text-[10px] ${
                  isDark ? 'bg-orange-950 border-orange-800 text-orange-300' : 'bg-orange-100 border-orange-200 text-orange-800 font-semibold'
                }`}>
                  AUC: 0.942
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {shapFeatures.map((f, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={`font-medium truncate max-w-[280px] sm:max-w-none ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {f.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className={`text-[11px] hidden sm:inline ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{f.impact}</span>
                        <span className={`font-bold font-mono ${isDark ? 'text-orange-300' : 'text-purple-600'}`}>{f.score} SHAP</span>
                      </div>
                    </div>
                    <div className={`h-2 w-full rounded-full overflow-hidden border ${
                      isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200 border-slate-300'
                    }`}>
                      <motion.div
                        className="h-full bg-gradient-to-r from-orange-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${f.pct}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.08 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className={`p-3 rounded-lg border text-[11px] font-mono flex items-start gap-2 ${
                isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-orange-400' : 'text-purple-600'}`} />
                <span>
                  <strong className={isDark ? 'text-orange-300' : 'text-purple-700'}>SIH 2026 Auditability Guaranteed:</strong> All predictions output rigorous mathematical attribution vectors preventing municipal administrative discretion disputes.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Smart Farmer Portal */}
      {activeTab === 'farmer' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className={`lg:col-span-8 p-5 rounded-xl border space-y-5 ${
              isDark ? 'bg-black/50 border-orange-500/25' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between text-xs font-mono">
                <div>
                  <span className={`font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                    PROGRESSIVE AGRI-GATEWAY &amp; CARRIER OTP PIPELINE
                  </span>
                  <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Multi-lingual rural edge network with sub-50ms SMS routing and offline indexing
                  </p>
                </div>
                <div className={`flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded border ${
                  isDark ? 'bg-emerald-950 border-emerald-600 text-emerald-300' : 'bg-emerald-100 border-emerald-300 text-emerald-800'
                }`}>
                  <Wifi className="w-3 h-3 text-emerald-500" />
                  <span>SLA 99.8% PING</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
                {[
                  { step: '01', title: 'Farmer Query', desc: 'SMS / USSD / Web Hook', icon: Globe, ping: '4ms' },
                  { step: '02', title: 'Edge NLP Router', desc: 'English ⇄ Hindi Engine', icon: Server, ping: '18ms' },
                  { step: '03', title: 'Agri Microservice', desc: 'Soil & Mandi Advisory', icon: Sprout, ping: '22ms' },
                  { step: '04', title: 'Carrier Dispatch', desc: 'Secure OTP / SMS Push', icon: Radio, ping: '42ms' },
                ].map((node, idx) => {
                  const Icon = node.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-lg border transition-colors space-y-1.5 ${
                        isDark
                          ? 'bg-[#05050a] border-orange-500/20 hover:border-orange-400'
                          : 'bg-white border-slate-200 hover:border-purple-400 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className={`font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>NODE {node.step}</span>
                        <span className="text-emerald-500">{node.ping}</span>
                      </div>
                      <div className={`flex items-center gap-1.5 font-tech font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        <Icon className={`w-3.5 h-3.5 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                        <span>{node.title}</span>
                      </div>
                      <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{node.desc}</div>
                    </div>
                  );
                })}
              </div>

              <div className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                    TEST LOCALIZATION NLP ROUTING (LIVE PAYLOAD):
                  </span>
                  <div className={`flex items-center gap-1 p-1 rounded border ${
                    isDark ? 'bg-black border-slate-800' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <button
                      onClick={() => {
                        sfx.playClick();
                        setSelectedLanguage('en');
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                        selectedLanguage === 'en'
                          ? isDark
                            ? 'bg-orange-500/30 text-orange-300 font-bold'
                            : 'bg-white text-purple-700 font-bold shadow-xs'
                          : isDark
                          ? 'text-slate-400'
                          : 'text-slate-600'
                      }`}
                    >
                      ENGLISH
                    </button>
                    <button
                      onClick={() => {
                        sfx.playClick();
                        setSelectedLanguage('hi');
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                        selectedLanguage === 'hi'
                          ? isDark
                            ? 'bg-orange-500/30 text-orange-300 font-bold'
                            : 'bg-white text-purple-700 font-bold shadow-xs'
                          : isDark
                          ? 'text-slate-400'
                          : 'text-slate-600'
                      }`}
                    >
                      हिंदी (HINDI)
                    </button>
                  </div>
                </div>

                <div className={`p-3 rounded border font-mono text-xs ${
                  isDark ? 'bg-black border-orange-500/20 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  {selectedLanguage === 'en' ? (
                    <div>
                      <div className={`text-[10px] mb-1 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>// INPUT STREAM [EN-US]:</div>
                      &quot;Soil nitrogen deficit detected in Sector 4. Recommend DAP fertilizer application at 45kg/acre prior to irrigation.&quot;
                    </div>
                  ) : (
                    <div>
                      <div className={`text-[10px] mb-1 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>// इनपुट स्ट्रीम [HI-IN] (TRANSLATED 18ms):</div>
                      &quot;सेक्टर 4 में मिट्टी में नाइट्रोजन की कमी पाई गई। सिंचाई से पहले 45 किग्रा/एकड़ की दर से डीएपी उर्वरक डालने की सलाह दी जाती है।&quot;
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={`lg:col-span-4 p-5 rounded-xl border space-y-4 font-mono ${
              isDark ? 'bg-black/50 border-orange-500/25' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>TELEMETRY BENCHMARKS</div>

              <div className="space-y-3">
                {[
                  { label: 'Hindi / English NLP Latency', value: '18.4 ms', detail: 'On-device quantized transformer' },
                  { label: 'Carrier OTP Delivery SLA', value: '99.8%', detail: 'Dual fallback via Twilio & Exotel' },
                  { label: 'Advisory Offline Cache', value: '<86 ms', detail: 'IndexedDB PWA storage' },
                  { label: 'Low-Bandwidth Optimization', value: '4.2 KB', detail: 'Gzip compressed payload' },
                ].map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-lg border space-y-0.5 ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}>
                    <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.label}</div>
                    <div className={`text-xl font-bold font-tech ${isDark ? 'text-orange-300' : 'text-purple-700'}`}>{item.value}</div>
                    <div className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Quantum Grid Optimizer */}
      {activeTab === 'quantum' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className={`lg:col-span-7 p-5 rounded-xl border space-y-4 font-mono ${
              isDark ? 'bg-black/50 border-orange-500/25' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className={`font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                    QUADRATIC UNCONSTRAINED BINARY OPTIMIZATION (QUBO)
                  </span>
                  <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Pairwise Ising spin coupling matrix Q_ij for renewable microgrid dispatch
                  </p>
                </div>
                <span className={`px-2 py-0.5 rounded border text-[10px] ${
                  isDark ? 'bg-purple-950 border-purple-700 text-purple-300' : 'bg-purple-100 border-purple-200 text-purple-800'
                }`}>
                  24 QUBITS SIMULATED
                </span>
              </div>

              <div className={`p-4 rounded-xl border overflow-x-auto ${
                isDark ? 'bg-[#030308] border-orange-500/20' : 'bg-white border-slate-200 shadow-xs'
              }`}>
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className={`text-[10px] border-b ${isDark ? 'text-slate-500 border-slate-800' : 'text-slate-400 border-slate-200'}`}>
                      <th className="p-2">Q_ij</th>
                      <th className={`p-2 ${isDark ? 'text-orange-300' : 'text-orange-600 font-bold'}`}>Node q0</th>
                      <th className={`p-2 ${isDark ? 'text-orange-300' : 'text-orange-600 font-bold'}`}>Node q1</th>
                      <th className={`p-2 ${isDark ? 'text-orange-300' : 'text-orange-600 font-bold'}`}>Node q2</th>
                      <th className={`p-2 ${isDark ? 'text-orange-300' : 'text-orange-600 font-bold'}`}>Node q3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quboMatrix.map((row, rIdx) => (
                      <tr key={rIdx} className={`border-b ${isDark ? 'border-slate-900/80' : 'border-slate-100'}`}>
                        <td className={`p-2 text-[10px] font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>q{rIdx}</td>
                        {row.map((val, cIdx) => {
                          const isSelected = activeQuboCell?.r === rIdx && activeQuboCell?.c === cIdx;
                          const isNegative = val < 0;
                          return (
                            <td
                              key={cIdx}
                              onClick={() => {
                                sfx.playHover();
                                setActiveQuboCell({ r: rIdx, c: cIdx });
                              }}
                              className={`p-2 text-xs transition-colors cursor-pointer rounded ${
                                isSelected
                                  ? isDark
                                    ? 'bg-orange-500/30 text-white font-bold border border-orange-400'
                                    : 'bg-purple-100 text-purple-900 font-bold border border-purple-400'
                                  : isNegative
                                  ? isDark ? 'text-orange-300 hover:bg-slate-900' : 'text-orange-600 font-semibold hover:bg-slate-100'
                                  : isDark ? 'text-purple-400 hover:bg-slate-900' : 'text-purple-700 font-semibold hover:bg-slate-100'
                              }`}
                              title={`Coupling q${rIdx}-q${cIdx}: ${val}`}
                            >
                              {val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={`text-[11px] flex items-center justify-between ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <span>Coupling polarity: <span className="text-orange-500 font-bold">Negative</span> vs <span className="text-purple-600 font-bold">Positive</span></span>
                <span className="text-emerald-500 font-bold">Ising Ground Verified</span>
              </div>
            </div>

            <div className={`lg:col-span-5 p-5 rounded-xl border space-y-4 font-mono text-xs ${
              isDark ? 'bg-black/50 border-orange-500/25' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={isDark ? 'text-slate-400' : 'text-slate-500'}>QAOA / COBYLA SOLVER TELEMETRY</div>

              <div className="space-y-3">
                <div className={`p-3 rounded-lg border space-y-1 ${
                  isDark ? 'bg-[#030308] border-orange-500/30' : 'bg-white border-purple-200 shadow-xs'
                }`}>
                  <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>CONVERGENCE RATE</div>
                  <div className="text-3xl font-bold font-tech text-emerald-500">
                    100.0%
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>Global Minimum Invariant Satisfied</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className={`p-2.5 rounded border ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}>
                    <div className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>GROUND ENERGY</div>
                    <div className={`text-base font-bold font-tech ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>-42.85 eV</div>
                  </div>
                  <div className={`p-2.5 rounded border ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}>
                    <div className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>COBYLA CYCLES</div>
                    <div className={`text-base font-bold font-tech ${isDark ? 'text-orange-300' : 'text-orange-600'}`}>120 Cycles</div>
                  </div>
                </div>

                <div className={`p-3 rounded-lg border space-y-1 ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>OPTIMAL STATE VECTOR</div>
                  <div className="text-sm font-tech font-bold tracking-widest">
                    |q₀ q₁ q₂ q₃⟩ = <span className={isDark ? 'text-orange-300' : 'text-purple-700'}>|1 0 1 1⟩</span>
                  </div>
                  <div className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                    Battery storage charge prioritized · Peak grid loss mitigated by 18.4%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   8. SKILLS & TECHNICAL CAPABILITIES GRID
   ========================================================================= */
export function SkillsTelemetryGrid({
  sfx,
  isDark
}: {
  sfx: ReturnType<typeof useCyberSound>;
  isDark: boolean;
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = ['All', 'AI / ML', 'Quantum', 'Web Dev', 'Creative', 'Tools'];

  const filteredSkills = portfolioData.skills.filter((sk) => {
    if (selectedCategory === 'All') return true;
    return sk.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      <div className={`flex flex-wrap items-center gap-2 border-b pb-4 ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sfx.playClick();
              setSelectedCategory(cat);
            }}
            onMouseEnter={sfx.playHover}
            className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
              selectedCategory === cat
                ? isDark
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.2)] font-bold'
                  : 'bg-purple-50 text-purple-700 border border-purple-500 shadow-sm font-bold'
                : isDark
                ? 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <motion.div
            key={skill.name}
            {...biDirectionalScroll}
            onMouseEnter={() => {
              sfx.playHover();
              setHoveredSkill(skill.name);
            }}
            onMouseLeave={() => setHoveredSkill(null)}
            className={`p-4 rounded-xl border transition-all duration-200 cursor-default ${
              hoveredSkill === skill.name
                ? isDark
                  ? 'border-orange-400 bg-slate-900/90 shadow-[0_0_20px_rgba(249,115,22,0.2)]'
                  : 'border-purple-500 bg-white shadow-lg'
                : isDark
                ? 'border-slate-800 bg-[#0c0c11]/80 hover:border-slate-700'
                : 'border-slate-200 bg-white shadow-xs hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className={`font-bold font-tech text-sm tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {skill.name}
              </span>
              <span className={`font-semibold ${isDark ? 'text-orange-300' : 'text-purple-600'}`}>{skill.level}%</span>
            </div>

            <div className={`h-1.5 w-full rounded-full overflow-hidden mb-3 border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-purple-500 transition-all duration-500"
                style={{ width: `${skill.level}%` }}
              />
            </div>

            <div className={`text-[11px] font-mono line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {skill.highlight}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   7. PINNED VERTICAL SOCIAL RIBBON (Right Edge Dock)
   ========================================================================= */
export function SocialRibbon({
  sfx,
  onCopyEmail
}: {
  sfx: ReturnType<typeof useCyberSound>;
  onCopyEmail: () => void;
}) {
  const socialLinks = [
    {
      id: 'github',
      label: 'GITHUB // AYUSH',
      icon: Github,
      href: 'https://github.com/gameszoom325-cell',
      isExternal: true,
    },
    {
      id: 'linkedin',
      label: 'LINKEDIN // AYUSH',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/ayush-singh-705a63397?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      isExternal: true,
    },
    {
      id: 'instagram',
      label: 'INSTAGRAM // AYUSH',
      icon: Instagram,
      href: 'https://www.instagram.com/ayush.rxt_?stkn=aDM1NDE1ZnV1bXBw',
      isExternal: true,
    },
    {
      id: 'email',
      label: 'EMAIL // AYUSH',
      icon: Mail,
      onClick: onCopyEmail,
      isExternal: false,
    },
  ];

  return (
    <aside
      aria-label="Social Channels"
      className="fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col pointer-events-auto"
    >
      <div className="flex flex-col items-center gap-2.5 py-3.5 px-2 rounded-2xl bg-[#030712]/80 backdrop-blur-md border border-cyan-400/30 shadow-[0_0_25px_rgba(0,0,0,0.6)]">
        {/* Top Indicator */}
        <div className="w-1 h-3 rounded-full bg-cyan-400/60 shadow-[0_0_6px_#00f0ff]" />

        {socialLinks.map((item) => {
          const Icon = item.icon;
          const buttonInner = (
            <div className="relative group flex items-center justify-end">
              {/* Expanding glowing cyan tooltip pill on the left */}
              <div className="absolute right-full mr-3 px-3 py-1 rounded-full bg-[#030712]/95 border border-cyan-400 text-[10px] font-mono font-bold text-cyan-300 tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none shadow-[0_0_15px_rgba(0,240,255,0.6)]">
                {item.label}
              </div>

              {/* Icon Container: slides 6px left toward center with cyan illumination */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-300 transition-all duration-200 group-hover:-translate-x-1.5 group-hover:text-cyan-200 group-hover:bg-cyan-950/70 border border-transparent group-hover:border-cyan-400/80 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] cursor-pointer"
              >
                <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
              </div>
            </div>
          );

          if (item.isExternal) {
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                onClick={sfx?.playClick}
                onMouseEnter={sfx?.playHover}
                title={item.label}
              >
                {buttonInner}
              </a>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => {
                sfx?.playClick?.();
                item.onClick?.();
              }}
              onMouseEnter={sfx?.playHover}
              title={item.label}
              className="bg-transparent border-0 p-0 cursor-pointer"
            >
              {buttonInner}
            </button>
          );
        })}

        {/* Bottom Indicator */}
        <div className="w-1 h-3 rounded-full bg-cyan-400/60 shadow-[0_0_6px_#00f0ff]" />
      </div>
    </aside>
  );
}

/* =========================================================================
   8. INTERACTIVE FLOATING TECH DRONE MASCOT (Bottom Right)
   ========================================================================= */
export function TechDroneMascot({
  sfx,
  onReboot
}: {
  sfx: ReturnType<typeof useCyberSound>;
  onReboot?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        onMouseEnter={() => {
          setIsHovered(true);
          sfx?.playHover?.();
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          sfx?.playPowerUp?.();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (onReboot) onReboot();
        }}
        className="relative group cursor-pointer"
        title="DRONE_AI // CLICK TO REBOOT TO APEX"
      >
        {/* Tooltip Tag */}
        <div
          className={`absolute bottom-full right-0 mb-3 px-3 py-1.5 rounded-lg bg-[#030712]/95 border border-cyan-400/60 text-[11px] font-mono text-cyan-300 tracking-wider whitespace-nowrap shadow-[0_0_20px_rgba(0,240,255,0.45)] transition-all duration-300 pointer-events-none ${
            isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold">AI_DRONE // CLICK TO REBOOT TO APEX</span>
          </div>
        </div>

        {/* Drone Chassis Container */}
        <div
          className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            isHovered
              ? 'bg-slate-950/95 border-2 border-cyan-300 shadow-[0_0_30px_rgba(0,240,255,0.85)] scale-105'
              : 'bg-[#030712]/85 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
          }`}
          style={{
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
          }}
        >
          {/* Animated Internal HUD Radar Grid */}
          <div
            className={`absolute inset-1 rounded-xl border border-cyan-400/30 transition-all ${
              isHovered ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '4s' }}
          />

          {/* Central Optics / Sensor Core */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <Radio
              className={`w-6 h-6 transition-all duration-300 ${
                isHovered ? 'text-cyan-200 animate-pulse scale-110 drop-shadow-[0_0_8px_#00f0ff]' : 'text-cyan-400'
              }`}
            />
          </div>

          {/* Top Status LED */}
          <div className="absolute top-1 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping shadow-[0_0_6px_#00f0ff]" />
        </div>

        {/* Dual Neon Cyan Thrusters Flaring at Base */}
        <div className="flex justify-center gap-3.5 -mt-0.5">
          <div
            className={`w-2 rounded-full bg-gradient-to-b from-cyan-400 via-cyan-300 to-transparent transition-all duration-200 ${
              isHovered
                ? 'h-6 shadow-[0_0_16px_#00f0ff] opacity-100 scale-110'
                : 'h-3 opacity-60 shadow-[0_0_8px_#00f0ff]'
            }`}
          />
          <div
            className={`w-2 rounded-full bg-gradient-to-b from-cyan-400 via-cyan-300 to-transparent transition-all duration-200 ${
              isHovered
                ? 'h-6 shadow-[0_0_16px_#00f0ff] opacity-100 scale-110'
                : 'h-3 opacity-60 shadow-[0_0_8px_#00f0ff]'
            }`}
          />
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================================
   9. MAIN APPLICATION COMPONENT (Ayush Singh Portfolio)
   ========================================================================= */
export default function App() {
  const sfx = useCyberSound();
  const [bootDone, setBootDone] = useState(false);
  const [selectedProject, setSelectedProject] = useState<(typeof portfolioData.projects)[0] | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be deferred until user interaction by browser security policy
      });
    }
  }, []);

  // High-End Theme State with LocalStorage Persistence
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    }
    return 'dark';
  });

  const isDark = theme === 'dark';

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme', 'light');
      document.documentElement.classList.remove('dark-theme', 'dark');
    } else {
      document.documentElement.classList.add('dark-theme', 'dark');
      document.documentElement.classList.remove('light-theme', 'light');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    sfx.playPowerUp();
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Monitor Scroll Progress & Active Section
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      const sections = ['hero', 'projects', 'case-studies', 'neural-telemetry', 'skills', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    sfx.playClick();
    navigator.clipboard.writeText('090109ayush@gmail.com');
    setToastMessage('COPIED TO CLIPBOARD // 090109ayush@gmail.com');
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleDroneReboot = () => {
    setToastMessage('HUD REBOOTED // APEX SECTOR 01 MOUNTED');
    setTimeout(() => setToastMessage(null), 3200);
  };

  return (
    <div
      className={`relative min-h-screen bg-transparent ${isDark ? 'dark-theme' : 'light-theme'} ${
        isDark ? 'text-slate-100 selection:bg-orange-500/30 selection:text-orange-200' : 'text-slate-900 selection:bg-purple-500/20 selection:text-purple-900'
      } overflow-x-hidden`}
      style={{
        background: 'transparent',
        backgroundColor: 'transparent',
      }}
    >
      {/* =========================================================================
          BACKGROUND ARCHITECTURE
          ========================================================================= */}
      {/* 1. Exact Video Mounting: Skyscraper billboard video from Cloudinary */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: -30,
          pointerEvents: "none",
        }}
        onError={(e) => {
          console.warn('[Video Engine] Background video loading failed:', e);
        }}
      >
        <source
          src="https://res.cloudinary.com/lnalzoz5/video/upload/v1790941245/cyberpunk-bg.mp4"
          type="video/mp4"
        />
      </video>

      {/* 2. Readability Tint: Translucent overlay so text, HUD panels, and metrics stay readable */}
      <div
        className="fixed inset-0 pointer-events-none transition-colors duration-300"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -20,
          backgroundColor: isDark ? "rgba(3, 7, 18, 0.5)" : "rgba(255, 255, 255, 0.5)",
          pointerEvents: "none",
        }}
      />

      {/* 3. CSS Grid Overlay with low opacity and no solid background behind grid lines */}
      <div className="fixed inset-0 -z-10 pointer-events-none cyber-grid-pattern opacity-15" />

      {/* 4. Subtle CRT Scanline Overlay */}
      <div className="fixed inset-0 -z-10 pointer-events-none crt-scanlines opacity-10" />

      {/* 5. Living Atmospheric Canvas Particle Web (bg-transparent, clearRect only) */}
      <AtmosphericCanvas isDark={isDark} />

      {/* Top-Fixed Neon Scroll Bar */}
      <div className={`fixed top-0 left-0 w-full h-[2px] z-50 pointer-events-none ${isDark ? 'bg-slate-900/60' : 'bg-slate-200/60'}`}>
        <div
          className="h-full bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-500 shadow-[0_0_12px_#f97316] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Toast Notification (Repositioned to left corner to coexist with Tech Drone) */}
      {toastMessage && (
        <div className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border text-xs font-mono shadow-xl animate-bounce ${
          isDark
            ? 'bg-slate-950/95 border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.4)]'
            : 'bg-white border-purple-500 text-purple-700 shadow-purple-500/10'
        }`}>
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Pinned Vertical Social Ribbon (Right Viewport Edge) */}
      <SocialRibbon sfx={sfx} onCopyEmail={handleCopyEmail} />

      {/* Interactive Floating Tech Drone Mascot (Bottom Right Corner) */}
      <TechDroneMascot sfx={sfx} onReboot={handleDroneReboot} />

      {/* =========================================================================
          ANGULAR GAME HUD NAVIGATION (TOP BAR)
          ========================================================================= */}
      <header className="sticky top-0 z-40 w-full px-2 sm:px-6 pt-2 pb-1">
        <div className="max-w-7xl mx-auto">
          <div
            className="hud-clip-nav relative backdrop-blur-xl border-b border-cyan-400/50 shadow-[0_4px_30px_rgba(0,240,255,0.18)] transition-all duration-300"
            style={{
              backgroundColor: isDark ? 'rgba(3, 7, 18, 0.85)' : 'rgba(255, 255, 255, 0.88)',
            }}
          >
            {/* Top cyan neon edge light accent */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-85 shadow-[0_0_8px_#00f0ff]" />

            <div className="px-4 sm:px-8 h-16 flex items-center justify-between">
              {/* Brand Logo Callout */}
              <a
                href="#hero"
                onClick={sfx.playClick}
                onMouseEnter={sfx.playHover}
                className="flex items-center gap-2.5 group cursor-pointer"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isDark
                      ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 group-hover:border-cyan-300 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.5)]'
                      : 'bg-cyan-100 border border-cyan-300 text-cyan-700 group-hover:border-cyan-500'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-tech text-base font-bold tracking-wider text-white group-hover:text-cyan-300 text-glow-cyan transition-colors">
                    AYUSH SINGH
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400/80">
                    SRM IST // AI &amp; ML
                  </span>
                </div>
              </a>

              {/* Navigation Links: [ ACCOMMODATION / ABOUT ] [ PROJECTS ] [ DIAGNOSTICS ] [ SKILLS ] [ CONTACT ] */}
              <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-xs font-mono tracking-wider">
                {[
                  { id: 'hero', label: 'ACCOMMODATION / ABOUT' },
                  { id: 'projects', label: 'PROJECTS' },
                  { id: 'neural-telemetry', label: 'DIAGNOSTICS' },
                  { id: 'skills', label: 'SKILLS' },
                  { id: 'contact', label: 'CONTACT' },
                ].map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={sfx.playClick}
                      onMouseEnter={sfx.playHover}
                      className="relative py-2 px-1.5 group cursor-pointer flex flex-col items-center transition-colors"
                    >
                      {/* Tiny glowing pip/dot appears above active link */}
                      <span
                        className={`w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] mb-1 transition-all duration-200 ${
                          isActive ? 'opacity-100 scale-100 animate-ping' : 'opacity-0 scale-50 group-hover:opacity-80'
                        }`}
                      />

                      {/* Text color flashes into glowing cyan/gold on hover */}
                      <span
                        className={`font-semibold tracking-wider transition-all duration-200 ${
                          isActive
                            ? 'text-cyan-300 text-glow-cyan font-bold'
                            : 'text-slate-400 group-hover:text-cyan-300 group-hover:text-glow-cyan'
                        }`}
                      >
                        [ {link.label} ]
                      </span>

                      {/* Subtle neon underline sweeps in from center */}
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-transform duration-300 origin-center ${
                          isActive ? 'scale-x-100 shadow-[0_0_8px_#00f0ff]' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </a>
                  );
                })}
              </nav>

              {/* Controls + Far Right Action: Angled "[ → SIGN IN / CONTACT ]" button with magnetic glow state */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  onMouseEnter={sfx.playHover}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-700 hover:border-cyan-400/50 bg-slate-900/70 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer shadow-sm"
                  title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                  aria-label="Toggle Light / Dark Theme"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '24s' }} />
                      <span className="hidden sm:inline font-bold">LIGHT</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="hidden sm:inline font-bold">DARK</span>
                    </>
                  )}
                </button>

                {/* SFX Mute/Unmute */}
                <button
                  onClick={sfx.toggleSound}
                  onMouseEnter={sfx.playHover}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-700 hover:border-cyan-400/50 bg-slate-900/70 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer shadow-sm"
                  title={sfx.soundEnabled ? 'Disable Synthesizer SFX' : 'Enable Synthesizer SFX'}
                >
                  {sfx.soundEnabled ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                      <span className="hidden sm:inline font-semibold text-cyan-400">SFX [LIVE]</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                      <span className="hidden sm:inline text-slate-400">SFX [MUTED]</span>
                    </>
                  )}
                </button>

                {/* Far Right Action: Angled "[ → SIGN IN / CONTACT ]" button with magnetic glow state */}
                <MagneticButton>
                  <a
                    href="#contact"
                    onClick={sfx.playClick}
                    onMouseEnter={sfx.playHover}
                    className="hud-clip-btn px-3 sm:px-4 py-1.5 text-xs font-mono font-bold tracking-wider bg-cyan-950/80 hover:bg-cyan-900/90 text-cyan-300 hover:text-white border border-cyan-400/60 hover:border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.35)] hover:shadow-[0_0_25px_rgba(0,240,255,0.7)] transition-all cursor-pointer whitespace-nowrap"
                  >
                    [ → SIGN IN / CONTACT ]
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-24 sm:space-y-36">
        {/* =========================================================================
            HERO SECTION
            ========================================================================= */}
        <motion.section
          id="hero"
          {...biDirectionalScroll}
          className="snap-section min-h-screen flex flex-col justify-center py-12 sm:py-20 relative overflow-visible"
        >
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className={`px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                isDark ? 'bg-orange-950/80 border-orange-500/40 text-orange-300' : 'bg-orange-50 border-orange-200 text-orange-800 font-medium'
              }`}>
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                SRM INSTITUTE OF SCIENCE AND TECHNOLOGY
              </span>
              <span className={`px-3 py-1 rounded-full border ${
                isDark ? 'bg-purple-950/80 border-purple-500/40 text-purple-300' : 'bg-purple-50 border-purple-200 text-purple-800 font-medium'
              }`}>
                CSE (AI &amp; ML) · SECTION B
              </span>
              <span className={`px-3 py-1 rounded-full border ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}>
                BATCH 2026 – 2030
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-tech tracking-tight leading-tight">
                <span className={`inline-block glitch-hover ${isDark ? 'text-white text-glow-orange' : 'text-slate-900'}`}>
                  AYUSH SINGH
                </span>
              </h1>
              <p className="text-lg sm:text-2xl font-tech font-semibold tracking-wider bg-gradient-to-r from-orange-500 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                {portfolioData.tagline}
              </p>
            </div>

            <p className={`max-w-3xl text-sm sm:text-base font-mono leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Engineering statutory risk delay analytics with{' '}
              <span className={`font-semibold ${isDark ? 'text-orange-300' : 'text-orange-600'}`}>XGBoost &amp; SHAP explainability</span>, and formulating hybrid{' '}
              <span className={`font-semibold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>QUBO / QAOA quantum optimization</span> for renewable microgrid
              dispatch. Specialized in high-performance reactive interfaces and explainable machine intelligence.
            </p>

            {/* Social Icons Container */}
            <div className="flex flex-wrap items-center gap-3 pt-4 overflow-visible">
              <MagneticButton>
                <a
                  href="#projects"
                  onClick={sfx.playClick}
                  onMouseEnter={sfx.playHover}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 hover:brightness-110 text-white font-mono font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Cpu className="w-4 h-4" />
                  <span>VIEW_SYSTEMS</span>
                </a>
              </MagneticButton>

              <MagneticButton>
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={sfx.playHover}
                  className={`px-5 py-3 rounded-xl border font-mono font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer ${
                    isDark
                      ? 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 hover:border-orange-400 text-slate-200'
                      : 'bg-white hover:bg-slate-50 border-slate-300 hover:border-purple-400 text-slate-800 shadow-xs'
                  }`}
                  title="Copy Email"
                >
                  <Mail className={`w-4 h-4 ${isDark ? 'text-orange-400' : 'text-purple-600'}`} />
                  <span>090109ayush@gmail.com</span>
                </button>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="https://github.com/gameszoom325-cell"
                  target="_blank"
                  rel="noreferrer"
                  onClick={sfx.playClick}
                  onMouseEnter={sfx.playHover}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isDark
                      ? 'bg-slate-900/80 border-orange-500/30 text-orange-400 hover:border-orange-400 hover:bg-orange-500/10 hover:text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 shadow-xs'
                  }`}
                  title="GitHub: gameszoom325-cell"
                >
                  <Github className="w-5 h-5" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="https://www.linkedin.com/in/ayush-singh-705a63397?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noreferrer"
                  onClick={sfx.playClick}
                  onMouseEnter={sfx.playHover}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isDark
                      ? 'bg-slate-900/80 border-orange-500/30 text-orange-400 hover:border-orange-400 hover:bg-orange-500/10 hover:text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 shadow-xs'
                  }`}
                  title="LinkedIn: Ayush Singh"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="https://www.instagram.com/ayush.rxt_?stkn=aDM1NDE1ZnV1bXBw"
                  target="_blank"
                  rel="noreferrer"
                  onClick={sfx.playClick}
                  onMouseEnter={sfx.playHover}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isDark
                      ? 'bg-slate-900/80 border-orange-500/30 text-orange-400 hover:border-orange-400 hover:bg-orange-500/10 hover:text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 shadow-xs'
                  }`}
                  title="Instagram: @ayush.rxt_"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </MagneticButton>
            </div>

            <div className={`pt-10 flex items-center gap-3 text-xs font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              <div className={`w-5 h-8 rounded-full border flex items-start justify-center p-1 ${isDark ? 'border-slate-700' : 'border-slate-300'}`}>
                <div className="w-1.5 h-2 rounded-full bg-orange-500 animate-bounce" />
              </div>
              <span>SCROLL TO INITIALIZE TELEMETRY</span>
            </div>
          </div>
        </motion.section>

        {/* =========================================================================
            PROJECTS SECTION
            ========================================================================= */}
        <motion.section
          id="projects"
          {...biDirectionalScroll}
          className="snap-section min-h-screen flex flex-col justify-center space-y-8 py-12 sm:py-20 scroll-mt-24"
        >
          <div className={`border-b pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${
            isDark ? 'border-orange-500/20' : 'border-slate-200'
          }`}>
            <div>
              <div className={`text-xs font-mono tracking-widest mb-1 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                // DEPLOYED PLATFORMS
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-tech">
                01. 3D Holographic Project Matrix
              </h2>
            </div>
            <div className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              REAL-TIME PERSPECTIVE (ROTATE X/Y)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project) => (
              <HolographicProjectCard
                key={project.id}
                project={project}
                onInspect={() => setSelectedProject(project)}
                sfx={sfx}
                isDark={isDark}
              />
            ))}
          </div>
        </motion.section>

        {/* =========================================================================
            CASE STUDY PIPELINE
            ========================================================================= */}
        <motion.section
          id="case-studies"
          {...biDirectionalScroll}
          className="snap-section min-h-screen flex flex-col justify-center py-12 sm:py-20 scroll-mt-24"
        >
          <CaseStudyPipeline sfx={sfx} isDark={isDark} />
        </motion.section>

        {/* =========================================================================
            LIVE AI NEURAL PIPELINE & MODEL DIAGNOSTICS
            ========================================================================= */}
        <motion.section
          id="neural-telemetry"
          {...biDirectionalScroll}
          className="snap-section min-h-screen flex flex-col justify-center py-12 sm:py-20 scroll-mt-24"
        >
          <LiveNeuralPipelineDiagnostics sfx={sfx} isDark={isDark} />
        </motion.section>

        {/* =========================================================================
            SKILLS & TECHNICAL CAPABILITIES
            ========================================================================= */}
        <motion.section
          id="skills"
          {...biDirectionalScroll}
          className="snap-section min-h-screen flex flex-col justify-center space-y-8 py-12 sm:py-20 scroll-mt-24"
        >
          <div className={`border-b pb-4 ${isDark ? 'border-orange-500/20' : 'border-slate-200'}`}>
            <div className={`text-xs font-mono tracking-widest mb-1 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
              // SYSTEM MATRICES
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-tech">
              04. Technical Capabilities &amp; Stack Telemetry
            </h2>
          </div>

          <SkillsTelemetryGrid sfx={sfx} isDark={isDark} />
        </motion.section>

        {/* =========================================================================
            CONTACT SECTION
            ========================================================================= */}
        <motion.section
          id="contact"
          {...biDirectionalScroll}
          className="snap-section min-h-screen flex flex-col justify-center space-y-8 py-12 sm:py-20 scroll-mt-24"
        >
          <div className={`rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-xl cyber-corner-tr border transition-all ${
            isDark
              ? 'bg-gradient-to-b from-[#121218] to-[#07070a] border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.15)] text-slate-100'
              : 'bg-white border-slate-200 shadow-xl text-slate-900'
          }`}>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border ${
              isDark ? 'bg-orange-950/80 border-orange-500/40 text-orange-300' : 'bg-orange-50 border-orange-200 text-orange-800'
            }`}>
              <Radio className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              <span>TRANSMISSION PROTOCOL OPEN</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-tech">
              Initialize Direct Transmission
            </h2>

            <p className={`max-w-2xl mx-auto font-mono text-xs sm:text-sm leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Available for AI/ML engineering, quantum computing modeling, SIH collaboration, and high-performance creative development.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={sfx.playHover}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 hover:brightness-110 text-white font-mono font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>COPY: 090109ayush@gmail.com</span>
                </button>
              </MagneticButton>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
              <MagneticButton>
                <a
                  href="https://github.com/gameszoom325-cell"
                  target="_blank"
                  rel="noreferrer"
                  onClick={sfx.playClick}
                  onMouseEnter={sfx.playHover}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isDark
                      ? 'bg-slate-900/80 border-orange-500/30 text-orange-400 hover:border-orange-400 hover:bg-orange-500/10 hover:text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 shadow-xs'
                  }`}
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="https://www.linkedin.com/in/ayush-singh-705a63397?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noreferrer"
                  onClick={sfx.playClick}
                  onMouseEnter={sfx.playHover}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isDark
                      ? 'bg-slate-900/80 border-orange-500/30 text-orange-400 hover:border-orange-400 hover:bg-orange-500/10 hover:text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 shadow-xs'
                  }`}
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="https://www.instagram.com/ayush.rxt_?stkn=aDM1NDE1ZnV1bXBw"
                  target="_blank"
                  rel="noreferrer"
                  onClick={sfx.playClick}
                  onMouseEnter={sfx.playHover}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isDark
                      ? 'bg-slate-900/80 border-orange-500/30 text-orange-400 hover:border-orange-400 hover:bg-orange-500/10 hover:text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 shadow-xs'
                  }`}
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </MagneticButton>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className={`pt-8 pb-16 border-t text-xs font-mono ${
          isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-500'
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <div className={`font-tech font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                AYUSH SINGH // SRM INSTITUTE OF SCIENCE AND TECHNOLOGY
              </div>
              <div className="text-slate-500">
                B.Tech Computer Science &amp; Engineering (AI &amp; ML), Section B, Batch 2026–2030
              </div>
            </div>
            <div className={`font-semibold ${isDark ? 'text-orange-400/80' : 'text-purple-600'}`}>
              SRM IST // COMPUTER SCIENCE &amp; ENGINEERING (AI &amp; ML)
            </div>
          </div>
        </footer>
      </main>

      {/* Interactive Project Architecture Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className={`fixed inset-0 backdrop-blur-md transition-opacity ${
              isDark ? 'bg-black/85' : 'bg-slate-900/40'
            }`}
            onClick={() => {
              sfx.playClick();
              setSelectedProject(null);
            }}
          />

          <div className={`relative z-10 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden cyber-corner-tr my-8 border ${
            isDark
              ? 'bg-[#0a0a10] border-orange-500 text-slate-100 shadow-[0_0_50px_rgba(249,115,22,0.25)]'
              : 'bg-white border-slate-300 text-slate-900 shadow-2xl'
          }`}>
            <div className={`flex items-center justify-between px-6 py-4 border-b ${
              isDark ? 'bg-slate-900/90 border-orange-500/20' : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <div className={`text-[11px] font-mono ${isDark ? 'text-orange-400' : 'text-orange-600 font-semibold'}`}>
                  SPECIFICATION ARCHITECTURE // {selectedProject.badge}
                </div>
                <h3 className="text-xl font-bold font-tech">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  sfx.playClick();
                  setSelectedProject(null);
                }}
                onMouseEnter={sfx.playHover}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 hover:bg-red-950 border-slate-700 hover:border-red-500 text-slate-400 hover:text-red-400'
                    : 'bg-white hover:bg-red-50 border-slate-300 hover:border-red-400 text-slate-500 hover:text-red-600'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className={`p-4 rounded-lg border text-xs sm:text-sm font-mono leading-relaxed ${
                isDark ? 'bg-orange-950/20 border-orange-500/20 text-slate-300' : 'bg-purple-50/50 border-purple-200 text-slate-700'
              }`}>
                {selectedProject.architecture?.summary || selectedProject.description}
              </div>

              {selectedProject.architecture?.layers && (
                <div className="space-y-3">
                  <div className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    SYSTEM EXECUTION PIPELINE
                  </div>
                  <div className="space-y-2">
                    {selectedProject.architecture.layers.map((layer, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border ${
                          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                            isDark ? 'bg-orange-950 border-orange-800 text-orange-400' : 'bg-orange-100 border-orange-200 text-orange-800 font-semibold'
                          }`}>
                            LAYER 0{idx + 1}
                          </span>
                          <h4 className="text-xs font-bold font-tech">
                            {layer.name}
                          </h4>
                        </div>
                        <p className={`text-[11px] font-mono pl-7 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {layer.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className={`text-xs font-mono mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  // STACK ENCODING
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 text-xs font-mono rounded border ${
                        isDark
                          ? 'bg-slate-800/80 text-orange-300 border-orange-500/20'
                          : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className={`flex items-center justify-between px-6 py-4 border-t ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-xs font-mono text-slate-500">ID: {selectedProject.id}</span>
              <div className="flex items-center gap-3">
                <a
                  href={selectedProject.architecture?.githubUrl || 'https://github.com/gameszoom325-cell'}
                  target="_blank"
                  rel="noreferrer"
                  onClick={sfx.playClick}
                  onMouseEnter={sfx.playHover}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded-lg border transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                      : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 shadow-xs'
                  }`}
                >
                  <Github className="w-4 h-4" />
                  <span>REPOSITORY</span>
                </a>
                <a
                  href={selectedProject.architecture?.demoUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  onClick={sfx.playClick}
                  onMouseEnter={sfx.playHover}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-lg bg-gradient-to-r from-orange-500 to-purple-600 hover:brightness-110 text-white transition-all shadow-md cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LAUNCH_DEMO</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
