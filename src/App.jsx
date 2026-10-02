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
  Play
} from 'lucide-react';

/* =========================================================================
   REUSABLE BI-DIRECTIONAL SCROLL ANIMATION CONFIGURATION (SPEC 1 & 5)
   Scroll Down = Reveal, Scroll Up = Exit
   ========================================================================= */
const biDirectionalScroll = {
  viewport: { once: false, amount: 0.25 },
  initial: { opacity: 0, y: 60, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -40, filter: 'blur(4px)' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

/* =========================================================================
   1. CYBERNETIC SOUND SYNTHESIZER (Web Audio API - Zero External Assets)
   ========================================================================= */
export function useCyberSound() {
  const audioCtxRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
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
}) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
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
   (SPEC 3: Particle-Particle Elastic Collisions + Screen Bounce + Mouse Disperse)
   ========================================================================= */
export function AtmosphericCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 28 : 72;
    const maxDistance = isMobile ? 95 : 135;
    const mouseRadius = isMobile ? 0 : 155;

    const mouse = { x: -2000, y: -2000, active: false };
    const particles = [];
    const colors = ['#00f0ff', '#ff007f', '#0066ff', '#38bdf8'];

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 2.2 + 1.8;
      particles.push({
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * (height - 40) + 20,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius,
        mass: radius * radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2
      });
    }

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onMouseMove = (e) => {
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

        // Cursor Repulsion / Smooth Dispersion (SPEC 3)
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

        // Natural friction/damping
        p.vx *= 0.992;
        p.vy *= 0.992;

        // Speed clamping
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 3.5;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // 2. BOUNDARY COLLISION PHYSICS (BOUNCE OFF SCREEN EDGES WITH RESTITUTION)
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

      // 3. ELASTIC 2D PARTICLE-PARTICLE COLLISIONS (SPEC 3)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = p1.radius + p2.radius;

          if (dist < minDist && dist > 0.001) {
            // Normal unit vector
            const nx = dx / dist;
            const ny = dy / dist;

            // Relative velocity
            const kx = p1.vx - p2.vx;
            const ky = p1.vy - p2.vy;

            // Velocity along normal
            const p = 2 * (nx * kx + ny * ky) / (p1.mass + p2.mass);

            // Collide only if moving toward each other
            if (nx * kx + ny * ky > 0) {
              p1.vx -= p * p2.mass * nx;
              p1.vy -= p * p2.mass * ny;
              p2.vx += p * p1.mass * nx;
              p2.vy += p * p1.mass * ny;

              // Prevent overlap / particle sticking
              const overlap = 0.5 * (minDist - dist);
              p1.x -= overlap * nx;
              p1.y -= overlap * ny;
              p2.x += overlap * nx;
              p2.y += overlap * ny;
            }
          }
        }
      }

      // 4. DRAW CONNECTING NEON EDGES & PARTICLES
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulse = Math.sin(frame * 0.035 + p.phase) * 0.35 + 1;

        // Particle Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Interconnecting lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color === '#00f0ff' ? `rgba(0, 240, 255, ${alpha})` : `rgba(255, 0, 127, ${alpha})`;
            ctx.lineWidth = 0.85;
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
}

/* =========================================================================
   4. FIRST-LOAD BOOT SEQUENCE (Obsidian Terminal Decryption Loader)
   ========================================================================= */
export function BootSequence({ onComplete, sfx }) {
  const [progress, setProgress] = useState(0);
  const [bootLog, setBootLog] = useState([]);
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
    const handleKeyDown = (e) => {
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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#02050e] text-slate-100 transition-all duration-700 ${
        isDone ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="w-full max-w-lg px-6 space-y-6">
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider">
              AYUSH_SINGH.EXE // SECURE_BOOT
            </span>
          </div>
          <button
            onClick={handleSkip}
            className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/50 px-2 py-0.5 rounded transition-colors cursor-pointer"
          >
            SKIP [ESC]
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline justify-between font-mono text-xs">
            <span className="text-slate-400">SYSTEM ARCHITECTURE MOUNT</span>
            <span className="text-2xl font-bold font-tech text-cyan-300 tabular-nums">
              {progress}%
            </span>
          </div>

          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-cyan-500/20">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 shadow-[0_0_15px_#00f0ff] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-lg bg-slate-950/80 border border-cyan-500/20 font-mono text-[11px] leading-relaxed text-slate-300 min-h-[140px] space-y-1">
          {bootLog.map((log, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-pink-400">&gt;</span>
              <span className={index === bootLog.length - 1 ? 'text-cyan-300 font-semibold' : 'text-slate-400'}>
                {log}
              </span>
            </div>
          ))}
          {progress < 100 && (
            <div className="flex items-center gap-1 text-cyan-400">
              <span className="w-2 h-3.5 bg-cyan-400 animate-pulse inline-block" />
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
   5. 3D HOLOGRAPHIC PROJECT CARD (WITH LIVE DEPLOYMENT LINKS & BI-DIRECTIONAL MOTION)
   ========================================================================= */
export function HolographicProjectCard({
  project,
  onInspect,
  sfx
}) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
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
        className="group relative rounded-xl bg-[#070b18]/90 border border-cyan-500/25 hover:border-cyan-400 p-6 flex flex-col justify-between overflow-hidden transition-colors duration-300 cyber-corner-tr hover:shadow-[0_0_35px_rgba(0,240,255,0.25)] h-full cursor-default"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${sheen.x}% ${sheen.y}%, rgba(0, 240, 255, 0.12), transparent 70%)`
          }}
        />

        <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
          <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-sm group-hover:bg-pink-400 transition-colors" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-400 font-semibold tracking-wider uppercase">
              {project.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-pink-950/80 border border-pink-500/40 text-pink-300 text-[11px]">
              {project.badge}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold font-tech text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
              <span>{project.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sfx.playPowerUp();
                  onInspect();
                }}
                className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer"
                title="Inspect Architecture"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </h3>
            <p className="mt-2 text-xs sm:text-sm font-mono text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {project.stats && project.stats.length > 0 && (
            <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-800/80 font-mono text-xs">
              {project.stats.slice(0, 2).map((s, idx) => (
                <div key={idx} className="bg-slate-950/60 p-2 rounded border border-slate-800/60">
                  <div className="text-slate-400 text-[10px]">{s.label}</div>
                  <div className="text-cyan-300 font-bold tabular-nums">
                    {s.value} <span className="text-[10px] text-slate-400">{s.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900/90 text-slate-300 border border-slate-800 group-hover:border-cyan-500/30 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Action Buttons (Direct Live Links - Spec 4) */}
        <div className="relative z-10 pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs font-mono">
          <button
            onClick={() => {
              sfx.playPowerUp();
              onInspect();
            }}
            onMouseEnter={sfx.playHover}
            className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <span>INSPECT SPEC</span>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
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
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-colors cursor-pointer"
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/60 hover:border-cyan-400 text-cyan-300 hover:text-cyan-100 font-semibold transition-all shadow-[0_0_12px_rgba(0,240,255,0.2)] cursor-pointer"
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
export function CaseStudyPipeline({ sfx }) {
  const [selectedCase, setSelectedCase] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const activeStudy = portfolioData.caseStudies[selectedCase];

  return (
    <div className="rounded-2xl bg-[#050917]/95 border border-cyan-500/30 p-6 sm:p-8 space-y-8 shadow-[0_0_40px_rgba(0,240,255,0.12)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 tracking-widest">// DEEP ARCHITECTURAL BREAKDOWN</div>
          <h3 className="text-xl sm:text-2xl font-bold font-tech text-white">
            02. Interactive Engineering Pipelines
          </h3>
        </div>

        <div className="flex items-center gap-2 p-1 bg-slate-900/90 border border-slate-800 rounded-lg text-xs font-mono">
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
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cs.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-pink-400">
          <Activity className="w-4 h-4" />
          <span>{activeStudy.subtitle}</span>
        </div>
        <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-3xl leading-relaxed">
          {activeStudy.description}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 border-y border-slate-800 py-4">
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
                ? 'bg-cyan-950/80 border border-cyan-400/80 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                : 'bg-slate-900/60 border border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] text-cyan-400/80">PHASE {st.step}</div>
            <div className="text-xs font-bold font-tech text-white truncate mt-1">
              {st.title}
            </div>
          </button>
        ))}
      </div>

      {activeStudy.steps[activeStep] && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 rounded-xl bg-slate-950/80 border border-cyan-500/20">
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-mono rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                STAGE {activeStudy.steps[activeStep].step} // 05
              </span>
              <h4 className="text-lg font-bold font-tech text-white">
                {activeStudy.steps[activeStep].title}
              </h4>
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-300 leading-relaxed">
              {activeStudy.steps[activeStep].description}
            </p>
          </div>

          <div className="md:col-span-4 p-4 rounded-xl bg-[#030612] border border-pink-500/30 text-center space-y-1">
            <div className="text-[11px] font-mono text-slate-400">
              {activeStudy.steps[activeStep].metricLabel}
            </div>
            <div className="text-3xl font-bold font-tech text-pink-400 tracking-wide">
              {activeStudy.steps[activeStep].metric}
            </div>
            <div className="text-[10px] font-mono text-emerald-400 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              BENCHMARK VERIFIED
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   7. LIVE AI NEURAL PIPELINE & MODEL DIAGNOSTICS CONSOLE (SPEC 2)
   (Replaces Bloch Sphere with 3 Interactive Project Tabs + Trigger Inference)
   ========================================================================= */
export function LiveNeuralPipelineDiagnostics({ sfx }) {
  const [activeTab, setActiveTab] = useState('landwatch');
  const [isInferencing, setIsInferencing] = useState(false);
  const [inferenceCycle, setInferenceCycle] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [activeQuboCell, setActiveQuboCell] = useState(null);

  // Trigger simulated inference recalculation
  const handleTriggerInference = () => {
    sfx.playClick();
    setIsInferencing(true);
    setTimeout(() => {
      sfx.playPowerUp();
      setInferenceCycle((prev) => prev + 1);
      setIsInferencing(false);
    }, 750);
  };

  // Seeded / dynamically perturbed values for realistic telemetry
  const riskScore = useMemo(() => {
    const base = 78.4;
    const variation = ((inferenceCycle * 17) % 7) - 3;
    return (base + variation * 0.4).toFixed(1);
  }, [inferenceCycle]);

  const latencyXGB = useMemo(() => {
    return (34 + ((inferenceCycle * 13) % 9)).toString();
  }, [inferenceCycle]);

  // SHAP Feature values
  const shapFeatures = [
    { name: 'Statutory Clearance Lag (Sec 11(1))', score: '+0.342', pct: 86, impact: 'High Risk Contributor' },
    { name: 'Gram Sabha Consent Quorum Delay', score: '+0.285', pct: 72, impact: 'Deliberation Block' },
    { name: 'Environmental & Forest Clearance Latency', score: '+0.210', pct: 64, impact: 'Statutory Bottleneck' },
    { name: 'Title Deed Verification Discrepancy', score: '+0.145', pct: 46, impact: 'Litigation Hazard' },
    { name: 'Social Impact Assessment (SIA) Incomplete', score: '+0.098', pct: 31, impact: 'Procedural Delay' },
  ];

  // $4 \times 4$ QUBO Coupling Energy Matrix
  const quboMatrix = [
    [-2.40, 1.15, -0.65, 0.42],
    [1.15, -1.85, 0.90, -0.35],
    [-0.65, 0.90, -3.10, 1.25],
    [0.42, -0.35, 1.25, -2.90],
  ];

  return (
    <div className="rounded-2xl bg-[#060a18]/95 border border-cyan-500/30 p-6 sm:p-8 space-y-6 shadow-[0_0_40px_rgba(0,240,255,0.15)] cyber-corner-tr">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="text-xs font-mono text-cyan-400 tracking-widest flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>// COMPUTATIONAL TELEMETRY &amp; LIVE MODEL BENCHMARKS</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-tech text-white">
            03. Live AI Neural Pipeline &amp; Model Diagnostics
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[11px] font-mono text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>INFERENCE RUNTIME: ONLINE</span>
          </div>

          <button
            onClick={handleTriggerInference}
            disabled={isInferencing}
            onMouseEnter={sfx.playHover}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-slate-950 font-mono font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isInferencing ? 'animate-spin' : ''}`} />
            <span>{isInferencing ? 'RE-EVALUATING MODEL...' : 'TRIGGER DIAGNOSTICS'}</span>
          </button>
        </div>
      </div>

      {/* Project Selector Tabs (SPEC 2) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-4">
        {[
          { id: 'landwatch', label: '1. LandWatch (SIH 2026)', badge: 'XGBoost + SHAP' },
          { id: 'farmer', label: '2. Smart Farmer Portal', badge: 'Dual NLP & OTP Flow' },
          { id: 'quantum', label: '3. Quantum Grid Optimizer', badge: 'QUBO / QAOA Matrix' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sfx.playClick();
              setActiveTab(tab.id);
            }}
            onMouseEnter={sfx.playHover}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)] font-bold'
                : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950/80 text-cyan-400 border border-cyan-500/20">
              {tab.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Tab 1: LandWatch (SIH 2026) -> XGBoost + SHAP Explainability Engine */}
      {activeTab === 'landwatch' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Risk Score Gauge & Invariants */}
            <div className="lg:col-span-4 p-5 rounded-xl bg-slate-950/80 border border-cyan-500/25 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">PROJECT DELAY PREDICTOR</span>
                <span className="text-pink-400 font-bold">SIH 2026</span>
              </div>

              <div className="p-4 rounded-lg bg-[#030614] border border-pink-500/30 text-center space-y-2">
                <div className="text-[11px] font-mono text-slate-400">PREDICTED BEYOND-SCHEDULE RISK</div>
                <div className="text-4xl font-bold font-tech text-pink-400 tracking-tight">
                  {riskScore}%
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-950/80 border border-pink-500/40 text-[10px] font-mono text-pink-300">
                  <AlertTriangle className="w-3 h-3 text-pink-400" />
                  <span>CRITICAL STATUTORY DELAY LIKELY</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="text-slate-400 text-[11px] uppercase tracking-wider">// STATUTORY INVARIANTS</div>
                <div className="space-y-1.5">
                  {[
                    { label: 'RFCTLARR Sec 19 Notification', status: 'IN REVIEW', ok: false },
                    { label: 'Collector Sanction Seal', status: 'VERIFIED', ok: true },
                    { label: 'GIS Environmental Overlap', status: '0 VIOLATIONS', ok: true },
                    { label: 'Gram Sabha Quorum Status', status: 'UNRESOLVED', ok: false },
                  ].map((inv, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                      <span className="text-slate-300 text-[11px]">{inv.label}</span>
                      <span className={`text-[10px] font-bold ${inv.ok ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {inv.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800">
                <span>Inference Latency:</span>
                <span className="text-cyan-300 font-bold">{latencyXGB} ms (Batch 512)</span>
              </div>
            </div>

            {/* SHAP Feature Importance Telemetry */}
            <div className="lg:col-span-8 p-5 rounded-xl bg-slate-950/80 border border-cyan-500/25 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-cyan-400 font-bold">XGBOOST ENSEMBLE + GAME-THEORETIC SHAP ATTRIBUTION</span>
                  <p className="text-[11px] text-slate-400">Mathematical marginal contributions to total project timeline deviation</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-[10px] text-cyan-300">
                  AUC: 0.942
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {shapFeatures.map((f, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-200 font-medium truncate max-w-[280px] sm:max-w-none">
                        {f.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400 text-[11px] hidden sm:inline">{f.impact}</span>
                        <span className="text-cyan-300 font-bold font-mono">{f.score} SHAP</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${f.pct}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.08 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-cyan-300">SIH 2026 Auditability Guaranteed:</strong> All predictions output rigorous mathematical attribution vectors preventing municipal administrative discretion disputes.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Smart Farmer Portal -> Interactive API & OTP Routing Flow */}
      {activeTab === 'farmer' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Routing Topology Visualizer */}
            <div className="lg:col-span-8 p-5 rounded-xl bg-slate-950/80 border border-cyan-500/25 space-y-5">
              <div className="flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-cyan-400 font-bold">PROGRESSIVE AGRI-GATEWAY &amp; CARRIER OTP PIPELINE</span>
                  <p className="text-[11px] text-slate-400">Multi-lingual rural edge network with sub-50ms SMS routing and offline indexing</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-600 text-emerald-300">
                  <Wifi className="w-3 h-3 text-emerald-400" />
                  <span>SLA 99.8% PING</span>
                </div>
              </div>

              {/* Node Routing Flow */}
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
                      className="p-3.5 rounded-lg bg-[#040816] border border-cyan-500/20 hover:border-cyan-400 transition-colors space-y-1.5 relative group"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-pink-400 font-bold">NODE {node.step}</span>
                        <span className="text-emerald-400">{node.ping}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-white font-tech font-bold text-sm">
                        <Icon className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{node.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">{node.desc}</div>
                    </div>
                  );
                })}
              </div>

              {/* Live Interactive Localization Simulator */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-semibold">TEST LOCALIZATION NLP ROUTING (LIVE PAYLOAD):</span>
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded border border-slate-800">
                    <button
                      onClick={() => {
                        sfx.playClick();
                        setSelectedLanguage('en');
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                        selectedLanguage === 'en' ? 'bg-cyan-500/30 text-cyan-300 font-bold' : 'text-slate-400'
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
                        selectedLanguage === 'hi' ? 'bg-cyan-500/30 text-cyan-300 font-bold' : 'text-slate-400'
                      }`}
                    >
                      हिंदी (HINDI)
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded bg-slate-950 border border-cyan-500/20 font-mono text-xs text-slate-200">
                  {selectedLanguage === 'en' ? (
                    <div>
                      <div className="text-[10px] text-cyan-400 mb-1">// INPUT STREAM [EN-US]:</div>
                      &quot;Soil nitrogen deficit detected in Sector 4. Recommend DAP fertilizer application at 45kg/acre prior to irrigation.&quot;
                    </div>
                  ) : (
                    <div>
                      <div className="text-[10px] text-pink-400 mb-1">// इनपुट स्ट्रीम [HI-IN] (TRANSLATED 18ms):</div>
                      &quot;सेक्टर 4 में मिट्टी में नाइट्रोजन की कमी पाई गई। सिंचाई से पहले 45 किग्रा/एकड़ की दर से डीएपी उर्वरक डालने की सलाह दी जाती है।&quot;
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Performance SLA Metrics */}
            <div className="lg:col-span-4 p-5 rounded-xl bg-slate-950/80 border border-cyan-500/25 space-y-4 font-mono">
              <div className="text-xs text-slate-400">TELEMETRY BENCHMARKS</div>

              <div className="space-y-3">
                {[
                  { label: 'Hindi / English NLP Latency', value: '18.4 ms', detail: 'On-device quantized transformer' },
                  { label: 'Carrier OTP Delivery SLA', value: '99.8%', detail: 'Dual fallback via Twilio & Exotel' },
                  { label: 'Advisory Offline Cache', value: '<86 ms', detail: 'IndexedDB PWA storage' },
                  { label: 'Low-Bandwidth Optimization', value: '4.2 KB', detail: 'Gzip compressed payload' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-0.5">
                    <div className="text-[11px] text-slate-400">{item.label}</div>
                    <div className="text-xl font-bold font-tech text-cyan-300">{item.value}</div>
                    <div className="text-[10px] text-slate-500">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Quantum Grid Optimizer -> QUBO / QAOA Matrix Readout */}
      {activeTab === 'quantum' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* $4 \times 4$ QUBO Coupling Energy Matrix */}
            <div className="lg:col-span-7 p-5 rounded-xl bg-slate-950/80 border border-cyan-500/25 space-y-4 font-mono">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-cyan-400 font-bold">QUADRATIC UNCONSTRAINED BINARY OPTIMIZATION (QUBO)</span>
                  <p className="text-[11px] text-slate-400">Pairwise Ising spin coupling matrix Q_ij for renewable microgrid dispatch</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-pink-950 border border-pink-700 text-[10px] text-pink-300">
                  24 QUBITS SIMULATED
                </span>
              </div>

              {/* Matrix Grid */}
              <div className="p-4 rounded-xl bg-[#030612] border border-cyan-500/20 overflow-x-auto">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="text-[10px] text-slate-500 border-b border-slate-800">
                      <th className="p-2">Q_ij</th>
                      <th className="p-2 text-cyan-300">Node q0</th>
                      <th className="p-2 text-cyan-300">Node q1</th>
                      <th className="p-2 text-cyan-300">Node q2</th>
                      <th className="p-2 text-cyan-300">Node q3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quboMatrix.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-slate-900/80">
                        <td className="p-2 text-[10px] font-bold text-slate-500">q{rIdx}</td>
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
                                  ? 'bg-cyan-500/30 text-white font-bold border border-cyan-400'
                                  : isNegative
                                  ? 'text-cyan-300 hover:bg-slate-900'
                                  : 'text-pink-400 hover:bg-slate-900'
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

              <div className="text-[11px] text-slate-400 flex items-center justify-between">
                <span>Color coding: <span className="text-cyan-400 font-bold">Negative (Ferromagnetic)</span> vs <span className="text-pink-400 font-bold">Positive (Anti-ferromagnetic)</span></span>
                <span className="text-emerald-400 font-bold">Ising Ground Verified</span>
              </div>
            </div>

            {/* QAOA Convergence & Hamiltonian State */}
            <div className="lg:col-span-5 p-5 rounded-xl bg-slate-950/80 border border-cyan-500/25 space-y-4 font-mono text-xs">
              <div className="text-slate-400">QAOA / COBYLA SOLVER TELEMETRY</div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-[#030612] border border-cyan-500/30 space-y-1">
                  <div className="text-[10px] text-slate-400">CONVERGENCE RATE</div>
                  <div className="text-3xl font-bold font-tech text-emerald-400">
                    100.0%
                  </div>
                  <div className="text-[10px] text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Global Minimum Invariant Satisfied</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                    <div className="text-[10px] text-slate-500">GROUND ENERGY</div>
                    <div className="text-base font-bold text-pink-400 font-tech">-42.85 eV</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                    <div className="text-[10px] text-slate-500">COBYLA CYCLES</div>
                    <div className="text-base font-bold text-cyan-300 font-tech">120 Cycles</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400">OPTIMAL STATE VECTOR</div>
                  <div className="text-sm font-tech font-bold text-white tracking-widest">
                    |q₀ q₁ q₂ q₃⟩ = <span className="text-cyan-300">|1 0 1 1⟩</span>
                  </div>
                  <div className="text-[10px] text-slate-500">
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
   8. SKILLS & TECHNICAL CAPABILITIES GRID (WITH BI-DIRECTIONAL MOTION)
   ========================================================================= */
export function SkillsTelemetryGrid({ sfx }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const categories = ['All', 'AI / ML', 'Quantum', 'Web Dev', 'Creative', 'Tools'];

  const filteredSkills = portfolioData.skills.filter((sk) => {
    if (selectedCategory === 'All') return true;
    return sk.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
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
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/80 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
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
            className={`p-4 rounded-xl bg-slate-950/70 border transition-all duration-200 cursor-default ${
              hoveredSkill === skill.name
                ? 'border-cyan-400 bg-slate-900/90 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="font-bold text-white font-tech text-sm tracking-wide">
                {skill.name}
              </span>
              <span className="text-cyan-300 font-semibold">{skill.level}%</span>
            </div>

            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden mb-3 border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                style={{ width: `${skill.level}%` }}
              />
            </div>

            <div className="text-[11px] font-mono text-slate-400 line-clamp-2">
              {skill.highlight}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   9. MAIN APPLICATION COMPONENT (Ayush Singh Portfolio)
   ========================================================================= */
export default function App() {
  const sfx = useCyberSound();
  const [bootDone, setBootDone] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

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

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 cyber-grid-pattern aurora-mesh overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. First-Load Boot Sequence */}
      {!bootDone && (
        <BootSequence
          onComplete={() => setBootDone(true)}
          sfx={sfx}
        />
      )}

      {/* 2. Top-Fixed Neon Scroll Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-50 bg-slate-900 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 shadow-[0_0_12px_#00f0ff] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 3. Subtle CRT Scanline & Radial Vignette Overlay (SPEC 4) */}
      <div className="fixed inset-0 pointer-events-none z-30 crt-scanlines" />
      <div className="fixed inset-0 pointer-events-none z-30 crt-vignette" />

      {/* 4. Canvas Particle Net with 2D Elastic Collision Physics (SPEC 3) */}
      <AtmosphericCanvas />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-950/90 border border-cyan-400 text-cyan-300 text-xs font-mono shadow-[0_0_25px_rgba(0,240,255,0.4)] animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Responsive HUD Navigation Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/80 border-b border-cyan-500/20 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="#hero"
            onClick={sfx.playClick}
            onMouseEnter={sfx.playHover}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-tech text-base font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                AYUSH SINGH
              </span>
              <span className="text-[10px] font-mono text-cyan-400/80 tracking-widest">
                SRM IST // AI &amp; ML
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider">
            {[
              { id: 'projects', label: '01. PROJECTS' },
              { id: 'case-studies', label: '02. PIPELINE' },
              { id: 'neural-telemetry', label: '03. DIAGNOSTICS' },
              { id: 'skills', label: '04. SKILLS' },
              { id: 'contact', label: '05. CONTACT' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={sfx.playClick}
                onMouseEnter={sfx.playHover}
                className={`py-1 transition-all cursor-pointer ${
                  activeSection === link.id
                    ? 'text-cyan-300 border-b-2 border-cyan-400 text-glow-cyan'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={sfx.toggleSound}
              onMouseEnter={sfx.playHover}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all shadow-sm cursor-pointer"
              title={sfx.soundEnabled ? 'Disable Synthesizer SFX' : 'Enable Synthesizer SFX'}
            >
              {sfx.soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="hidden sm:inline text-cyan-400 font-semibold">SFX [LIVE]</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline text-slate-500">SFX [MUTED]</span>
                </>
              )}
            </button>

            <MagneticButton>
              <a
                href="#projects"
                onClick={sfx.playClick}
                onMouseEnter={sfx.playHover}
                className="px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:brightness-110 transition-all whitespace-nowrap cursor-pointer"
              >
                SIH 2026
              </a>
            </MagneticButton>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-32">
        {/* =========================================================================
            HERO SECTION (BI-DIRECTIONAL MOTION REVEAL - SPEC 1 & 5)
            ========================================================================= */}
        <motion.section
          id="hero"
          {...biDirectionalScroll}
          className="pt-8 sm:pt-16 min-h-[75vh] flex flex-col justify-center overflow-visible"
        >
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                SRM INSTITUTE OF SCIENCE AND TECHNOLOGY
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300">
                CSE (AI &amp; ML) · SECTION B
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                BATCH 2026 – 2030
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-tech tracking-tight text-white leading-tight">
                <span className="inline-block text-glow-cyan glitch-hover">
                  AYUSH SINGH
                </span>
              </h1>
              <p className="text-lg sm:text-2xl font-tech font-semibold tracking-wider bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-500 bg-clip-text text-transparent">
                {portfolioData.tagline}
              </p>
            </div>

            <p className="max-w-3xl text-sm sm:text-base font-mono text-slate-300 leading-relaxed">
              Engineering statutory risk delay analytics with{' '}
              <span className="text-cyan-300 font-semibold">XGBoost &amp; SHAP explainability</span>, and formulating hybrid{' '}
              <span className="text-pink-400 font-semibold">QUBO / QAOA quantum optimization</span> for renewable microgrid
              dispatch. Specialized in high-performance reactive interfaces and explainable machine intelligence.
            </p>

            {/* Social Icons with Clean Flexible Container (SPEC 2 & 5 - Never sliced/clipped) */}
            <div className="flex flex-wrap items-center gap-3 pt-4 overflow-visible">
              <MagneticButton>
                <a
                  href="#projects"
                  onClick={sfx.playClick}
                  onMouseEnter={sfx.playHover}
                  className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Cpu className="w-4 h-4" />
                  <span>VIEW_SYSTEMS</span>
                </a>
              </MagneticButton>

              <MagneticButton>
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={sfx.playHover}
                  className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 font-mono font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer"
                  title="Copy Email"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>090109ayush@gmail.com</span>
                </button>
              </MagneticButton>

              {/* Exact Social Link Container: flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white transition-all duration-200 */}
              <MagneticButton>
                <a
                  href="https://github.com/gameszoom325-cell"
                  target="_blank"
                  rel="noreferrer"
                  onClick={sfx.playClick}
                  onMouseEnter={sfx.playHover}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white transition-all duration-200 cursor-pointer"
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
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white transition-all duration-200 cursor-pointer"
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
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white transition-all duration-200 cursor-pointer"
                  title="Instagram: @ayush.rxt_"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </MagneticButton>
            </div>

            <div className="pt-10 flex items-center gap-3 text-xs font-mono text-slate-500">
              <div className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center p-1">
                <div className="w-1.5 h-2 rounded-full bg-cyan-400 animate-bounce" />
              </div>
              <span>SCROLL TO INITIALIZE TELEMETRY</span>
            </div>
          </div>
        </motion.section>

        {/* =========================================================================
            PROJECTS SECTION (BI-DIRECTIONAL MOTION REVEAL - SPEC 1 & LIVE LINKS SPEC 5)
            ========================================================================= */}
        <motion.section
          id="projects"
          {...biDirectionalScroll}
          className="space-y-8 scroll-mt-24"
        >
          <div className="border-b border-cyan-500/20 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-cyan-400 tracking-widest mb-1">// DEPLOYED PLATFORMS</div>
              <h2 className="text-2xl sm:text-4xl font-bold font-tech text-white">
                01. 3D Holographic Project Matrix
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-400">
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
              />
            ))}
          </div>
        </motion.section>

        {/* =========================================================================
            CASE STUDY PIPELINE (BI-DIRECTIONAL MOTION REVEAL - SPEC 1 & 5)
            ========================================================================= */}
        <motion.section
          id="case-studies"
          {...biDirectionalScroll}
          className="scroll-mt-24"
        >
          <CaseStudyPipeline sfx={sfx} />
        </motion.section>

        {/* =========================================================================
            LIVE AI NEURAL PIPELINE & MODEL DIAGNOSTICS (SPEC 2 & 5)
            (Replaced Bloch sphere with XGBoost + SHAP, Smart Farmer, & QUBO diagnostics)
            ========================================================================= */}
        <motion.section
          id="neural-telemetry"
          {...biDirectionalScroll}
          className="scroll-mt-24"
        >
          <LiveNeuralPipelineDiagnostics sfx={sfx} />
        </motion.section>

        {/* =========================================================================
            SKILLS & TECHNICAL CAPABILITIES (BI-DIRECTIONAL MOTION REVEAL - SPEC 1 & 5)
            ========================================================================= */}
        <motion.section
          id="skills"
          {...biDirectionalScroll}
          className="space-y-8 scroll-mt-24"
        >
          <div className="border-b border-cyan-500/20 pb-4">
            <div className="text-xs font-mono text-cyan-400 tracking-widest mb-1">// SYSTEM MATRICES</div>
            <h2 className="text-2xl sm:text-4xl font-bold font-tech text-white">
              04. Technical Capabilities &amp; Stack Telemetry
            </h2>
          </div>

          <SkillsTelemetryGrid sfx={sfx} />
        </motion.section>

        {/* =========================================================================
            CONTACT SECTION (BI-DIRECTIONAL MOTION REVEAL & CLEAN SOCIAL ICONS)
            ========================================================================= */}
        <motion.section
          id="contact"
          {...biDirectionalScroll}
          className="space-y-8 scroll-mt-24"
        >
          <div className="rounded-2xl bg-gradient-to-b from-[#080f24] to-[#040713] border border-cyan-500/30 p-8 sm:p-12 text-center space-y-6 shadow-[0_0_40px_rgba(0,240,255,0.15)] cyber-corner-tr">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>TRANSMISSION PROTOCOL OPEN</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-tech text-white">
              Initialize Direct Transmission
            </h2>

            <p className="max-w-2xl mx-auto font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">
              Available for AI/ML engineering, quantum computing modeling, SIH collaboration, and high-performance creative development.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={sfx.playHover}
                  className="px-8 py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>COPY: 090109ayush@gmail.com</span>
                </button>
              </MagneticButton>
            </div>

            {/* Social Icons Container (SPEC 2 & 5) */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
              <MagneticButton>
                <a
                  href="https://github.com/gameszoom325-cell"
                  target="_blank"
                  rel="noreferrer"
                  onClick={sfx.playClick}
                  onMouseEnter={sfx.playHover}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white transition-all duration-200 cursor-pointer"
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
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white transition-all duration-200 cursor-pointer"
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
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white transition-all duration-200 cursor-pointer"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </MagneticButton>
            </div>
          </div>
        </motion.section>

        {/* Footer (Clean SRM IST references with zero placeholder text) */}
        <footer className="pt-8 pb-16 border-t border-slate-800/80 text-xs font-mono text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <div className="text-white font-tech font-bold text-sm">
                AYUSH SINGH // SRM INSTITUTE OF SCIENCE AND TECHNOLOGY
              </div>
              <div className="text-slate-500">
                B.Tech Computer Science &amp; Engineering (AI &amp; ML), Section B, Batch 2026–2030
              </div>
            </div>
            <div className="text-cyan-400/80">
              SRM IST // COMPUTER SCIENCE &amp; ENGINEERING (AI &amp; ML)
            </div>
          </div>
        </footer>
      </main>

      {/* Interactive Project Architecture Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#02050f]/85 backdrop-blur-md transition-opacity"
            onClick={() => {
              sfx.playClick();
              setSelectedProject(null);
            }}
          />

          <div className="relative z-10 w-full max-w-3xl bg-[#070b1a] border border-cyan-400 rounded-xl shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden text-slate-100 cyber-corner-tr my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-cyan-500/20">
              <div>
                <div className="text-[11px] font-mono text-cyan-400">
                  SPECIFICATION ARCHITECTURE // {selectedProject.badge}
                </div>
                <h3 className="text-xl font-bold font-tech text-white">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  sfx.playClick();
                  setSelectedProject(null);
                }}
                onMouseEnter={sfx.playHover}
                className="p-2 rounded-lg bg-slate-800 hover:bg-red-950 border border-slate-700 hover:border-red-500 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-xs sm:text-sm font-mono text-slate-300 leading-relaxed">
                {selectedProject.architecture?.summary || selectedProject.description}
              </div>

              {selectedProject.architecture?.layers && (
                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-400">SYSTEM EXECUTION PIPELINE</div>
                  <div className="space-y-2">
                    {selectedProject.architecture.layers.map((layer, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-slate-900/60 border border-slate-800"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                            LAYER 0{idx + 1}
                          </span>
                          <h4 className="text-xs font-bold font-tech text-white">
                            {layer.name}
                          </h4>
                        </div>
                        <p className="text-[11px] font-mono text-slate-400 pl-7">
                          {layer.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="text-xs font-mono text-slate-400 mb-2">// STACK ENCODING</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-slate-800/80 text-cyan-300 border border-cyan-500/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Action Buttons (Direct Links - Spec 5) */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-t border-slate-800">
              <span className="text-xs font-mono text-slate-500">ID: {selectedProject.id}</span>
              <div className="flex items-center gap-3">
                <a
                  href={selectedProject.architecture?.githubUrl || 'https://github.com/gameszoom325-cell'}
                  target="_blank"
                  rel="noreferrer"
                  onClick={sfx.playClick}
                  onMouseEnter={sfx.playHover}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-all cursor-pointer"
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
                  className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer"
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
