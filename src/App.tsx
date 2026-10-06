import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import {
  Sparkles,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Github,
  Mail,
  Linkedin,
  Instagram,
  Cpu,
  Activity,
  Radio,
  Check,
  Sliders,
  Copy,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

import AICoreSphere from './components/AICoreSphere';
import CinematicLoadingScreen from './components/CinematicLoadingScreen';
import TerminalDecoration from './components/TerminalDecoration';
import ProjectDirectoryTree from './components/ProjectDirectoryTree';
import FuturisticHudNav from './components/FuturisticHudNav';
import AIAssistantWidget from './components/AIAssistantWidget';
import JourneyTimeline from './components/JourneyTimeline';
import CustomCursor from './components/CustomCursor';
import HolographicProjectCard, { ProjectData } from './components/HolographicProjectCard';
import { initParticleStarfield } from './particles';
import { cyberSound } from './utils/audioSystem';

/* =========================================================================
   PORTFOLIO STATIC METRICS & DATA DEFINITIONS
   ========================================================================= */
const portfolioData = {
  name: "AYUSH SINGH",
  title: "AI / ML Engineer & Creative Technologist",
  institution: "SRM Institute of Science and Technology",
  department: "CSE (AI & ML) · Batch 2026 – 2030",
  tagline: "AI/ML • WEB • QUANTUM • CREATIVE TECH",
  status: "ONLINE // SIH 2026 ACTIVE",
  metrics: {
    systemHealth: "99.98%",
    activePipelines: "14",
    latency: "18ms",
    quantumFidelity: "94.2%"
  },
  projects: [
    {
      id: "landwatch",
      title: "LandWatch AI",
      category: "Statutory Risk Delay Analytics",
      description: "Pioneering statutory delay forecasting for large-scale land records. Formulates XGBoost explainability with Shapley additive feature attribution to predict regulatory bottleneck latencies with 92.4% validation accuracy.",
      techStack: ["Python", "XGBoost", "SHAP", "FastAPI", "PostgreSQL", "React", "Tailwind CSS"],
      metrics: {
        accuracy: "92.4%",
        latency: "42ms",
        parameters: "4.8M"
      },
      liveUrl: "https://landwatch-tau.vercel.app/",
      repoUrl: "https://github.com/gameszoom325-cell/landwatch-ai",
      hologramColor: "#ffaa00"
    },
    {
      id: "smart-farmer",
      title: "Smart Farmer Portal",
      category: "AgriTech Neural Diagnostics",
      description: "Distributed agricultural decision-intelligence suite synthesizing multimodal satellite multi-spectral imagery and IoT soil telemetry for real-time crop pathology diagnostics and micro-yield forecasts.",
      techStack: ["PyTorch", "Vision Transformer", "Flask", "Docker", "Node.js", "Redis"],
      metrics: {
        accuracy: "94.1%",
        latency: "68ms",
        parameters: "12.2M"
      },
      liveUrl: "https://smartfarmerportal.vercel.app/",
      repoUrl: "https://github.com/gameszoom325-cell/smart-farmer-portal",
      hologramColor: "#ec4899"
    },
    {
      id: "quantum-grid",
      title: "Quantum Grid Optimizer",
      category: "Hybrid QAOA / QUBO Dispatch",
      description: "Heuristic microgrid dispatch engine mapping non-convex intermittent renewable feed constraints onto Quadratic Unconstrained Binary Optimization (QUBO) hamiltonians executed via simulated quantum annealing.",
      techStack: ["Qiskit", "Python", "NumPy", "C++", "Next.js", "WebGL"],
      metrics: {
        accuracy: "96.8%",
        latency: "115ms",
        parameters: "24 Qubits"
      },
      liveUrl: "https://quantumgrid.io",
      repoUrl: "https://github.com/gameszoom325-cell/quantum-grid-optimizer",
      hologramColor: "#06b6d4"
    },
    {
      id: "knoxxed1ts",
      title: "KNOXXED1TS",
      category: "High-Octane Creative Showreel",
      description: "Hardware-accelerated creative motion graphics engine featuring zero-jank frame synchronization, adaptive video scrubbing, kinetic typography, and WebGL transitions running at 60 FPS.",
      techStack: ["WebGL", "Motion", "Tailwind CSS", "React", "HLS Streaming"],
      metrics: {
        accuracy: "99/100",
        latency: "60 FPS",
        parameters: "4.2x Opt"
      },
      liveUrl: "https://knoxxed1ts.vercel.app",
      repoUrl: "https://github.com/gameszoom325-cell/knoxxed1ts",
      hologramColor: "#a855f7"
    }
  ] as ProjectData[],
  pipelineSteps: [
    { step: "01", title: "Data Ingestion & Sanitization", tech: "Kafka • Arrow • Redis", desc: "Sub-millisecond schema validation and streaming feature normalization across heterogenous telemetry nodes." },
    { step: "02", title: "Surrogate Training & Optimization", tech: "XGBoost • PyTorch • Optuna", desc: "Automated hyperparameter gradient tuning with cross-validated statutory risk attribution matrices." },
    { step: "03", title: "SHAP Explainability Surface", tech: "TreeSHAP • Kernel Attributions", desc: "Decomposing non-linear multi-target predictive interactions into transparent, statutory regulatory metrics." },
    { step: "04", title: "Edge & Web Deployment", tech: "ONNX Runtime • WebAssembly", desc: "Zero-latency edge inferencing running compiled neural graph surrogates directly in client browser runtimes." }
  ],
  skills: [
    { category: "Machine Learning & Core AI", items: ["XGBoost", "SHAP", "PyTorch", "Scikit-Learn", "Computer Vision (ViT)", "Transformers", "Feature Engineering"] },
    { category: "Quantum & Mathematics", items: ["QUBO Formulation", "QAOA Algorithms", "Qiskit", "Graph Partitioning", "Combinatorial Optimization", "Stochastic Analysis"] },
    { category: "Frontend & Reactive Systems", items: ["React", "TypeScript", "Tailwind CSS", "Motion", "Three.js / WebGL", "Web Audio API", "Vite"] },
    { category: "Backend, Cloud & Pipelines", items: ["FastAPI", "Python", "Node.js", "Docker", "PostgreSQL", "Redis", "Cloud Run", "Git / GitHub CI"] }
  ]
};

/* =========================================================================
   MAGNETIC INTERACTION BUTTON (SPRING PHYSICS)
   ========================================================================= */
function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    setPos({ x, y });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================================
   LIVE NEURAL DIAGNOSTICS & SYSTEM TELEMETRY
   ========================================================================= */
function LiveNeuralPipelineDiagnostics({ isLightMode }: { isLightMode: boolean }) {
  const [epoch, setEpoch] = useState<number>(142);
  const [loss, setLoss] = useState<number>(0.0138);
  const [activeNode, setActiveNode] = useState<string>('XGBoost Surrogate');

  useEffect(() => {
    const timer = setInterval(() => {
      setEpoch((prev) => prev + 1);
      setLoss((prev) => Math.max(0.0075, +(prev + (Math.random() * 0.001 - 0.0005)).toFixed(4)));
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-3xl p-6 sm:p-8 border transition-all ${
        isLightMode
          ? 'bg-white/45 backdrop-blur-2xl border border-white/80 text-slate-900 shadow-[0_8px_32px_rgba(15,23,42,0.08)]'
          : 'bg-[#090d16]/85 backdrop-blur-2xl border border-zinc-800 text-zinc-100 shadow-2xl'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-500/20 pb-4 mb-6">
        <div>
          <div className={`text-xs font-mono tracking-widest ${isLightMode ? 'text-[#c2410c] font-semibold' : 'text-amber-400'}`}>
            // TELEMETRY ENGINE 03
          </div>
          <h3 className={`text-2xl font-bold font-tech ${isLightMode ? 'text-slate-950 font-extrabold' : 'text-white'}`}>
            Live AI Neural Pipeline &amp; Model Diagnostics
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-mono text-emerald-500 font-bold">STREAM ACTIVE // 60Hz</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-white/70 border-slate-200' : 'bg-black/40 border-zinc-800'}`}>
          <span className="text-[10px] font-mono text-zinc-400 block">TRAINING EPOCH</span>
          <span className="text-xl font-mono font-bold text-amber-500">{epoch}</span>
        </div>
        <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-white/70 border-slate-200' : 'bg-black/40 border-zinc-800'}`}>
          <span className="text-[10px] font-mono text-zinc-400 block">CROSS-ENTROPY LOSS</span>
          <span className="text-xl font-mono font-bold text-cyan-500">{loss}</span>
        </div>
        <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-white/70 border-slate-200' : 'bg-black/40 border-zinc-800'}`}>
          <span className="text-[10px] font-mono text-zinc-400 block">GPU VRAM LOAD</span>
          <span className="text-xl font-mono font-bold text-pink-500">6.8 / 16 GB</span>
        </div>
        <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-white/70 border-slate-200' : 'bg-black/40 border-zinc-800'}`}>
          <span className="text-[10px] font-mono text-zinc-400 block">EDGE INFERENCE</span>
          <span className="text-xl font-mono font-bold text-emerald-500">18.4 ms</span>
        </div>
      </div>

      {/* Interactive Pipeline Nodes */}
      <div className="space-y-3">
        <span className="text-xs font-mono text-zinc-400 block">// ACTIVE NEURAL CLUSTERS (CLICK TO PROBE)</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {['XGBoost Surrogate', 'Vision Transformer (ViT)', 'QUBO Hamiltonian Solver'].map((node) => (
            <button
              key={node}
              onClick={() => {
                cyberSound.playClick();
                setActiveNode(node);
              }}
              onMouseEnter={() => cyberSound.playHover()}
              className={`p-3 rounded-2xl text-left border text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
                activeNode === node
                  ? isLightMode
                    ? 'bg-amber-500/15 border-amber-500 text-[#9a3412] font-bold shadow-sm'
                    : 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(255,170,0,0.3)]'
                  : isLightMode
                    ? 'bg-white/70 border-slate-200 text-slate-700 hover:border-slate-300'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <span>{node}</span>
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================================
   VERTICAL SOCIAL RIBBON
   ========================================================================= */
function SocialRibbon({ onCopyEmail, isLightMode }: { onCopyEmail: () => void; isLightMode: boolean }) {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3">
      <div className="w-[1px] h-12 bg-zinc-500/30" />
      {[
        { icon: Github, href: "https://github.com/gameszoom325-cell", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/ayush-singh-48960032b", label: "LinkedIn" },
        { icon: Instagram, href: "https://www.instagram.com/ayush.rxt_?stkn=aDM1NDE1ZnV1bXBw", label: "Instagram" }
      ].map((social) => {
        const Icon = social.icon;
        return (
          <MagneticButton key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer"
              onClick={() => cyberSound.playClick()}
              onMouseEnter={() => cyberSound.playHover()}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isLightMode
                  ? 'bg-white/85 border-slate-200 text-slate-700 hover:border-amber-500 hover:text-amber-600 shadow-sm'
                  : 'bg-black/60 border-zinc-800 text-zinc-400 hover:border-amber-400 hover:text-amber-300 shadow-lg'
              }`}
              title={social.label}
            >
              <Icon className="w-4 h-4 pointer-events-none" />
            </a>
          </MagneticButton>
        );
      })}

      <MagneticButton>
        <button
          onClick={() => {
            cyberSound.playClick();
            onCopyEmail();
          }}
          onMouseEnter={() => cyberSound.playHover()}
          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
            isLightMode
              ? 'bg-white/85 border-slate-200 text-slate-700 hover:border-amber-500 hover:text-amber-600 shadow-sm'
              : 'bg-black/60 border-zinc-800 text-zinc-400 hover:border-amber-400 hover:text-amber-300 shadow-lg'
          }`}
          title="Copy Email"
        >
          <Mail className="w-4 h-4 pointer-events-none" />
        </button>
      </MagneticButton>
      <div className="w-[1px] h-12 bg-zinc-500/30" />
    </div>
  );
}

/* =========================================================================
   MAIN APPLICATION COMPONENT
   ========================================================================= */
export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const darkVideoRef = useRef<HTMLVideoElement | null>(null);
  const lightVideoRef = useRef<HTMLVideoElement | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const starfieldControlRef = useRef<{ destroy: () => void; updateTheme?: (isDark: boolean) => void } | null>(null);

  // Loading Screen State
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  // Single reliable boolean state for theme
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'light') return true;
      if (saved === 'dark') return false;
      return window.matchMedia('(prefers-color-scheme: light)').matches;
    }
    return false;
  });

  // Sound system state: ON by default, synced with audioSystem and localStorage
  const [isSoundOn, setIsSoundOn] = useState<boolean>(() => cyberSound.isEnabled());

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Background mouse depth parallax reaction
  const [bgOffset, setBgOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Mouse parallax tracking on background depth layers
  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      setBgOffset({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Theme toggle with explicit event isolation
  const toggleTheme = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    cyberSound.playClick();
    setIsLightMode((prev) => !prev);
  };

  // Sound toggle button (Sound ON / Sound OFF per requirement)
  const toggleSound = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const nextState = !isSoundOn;
    setIsSoundOn(nextState);
    cyberSound.setSoundEnabled(nextState);
    if (nextState) {
      cyberSound.playClick();
    }
  };

  // Synchronize document theme class and local storage
  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-theme', 'light');
      document.documentElement.classList.remove('dark-theme', 'dark');
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      document.documentElement.classList.add('dark-theme', 'dark');
      document.documentElement.classList.remove('light-theme', 'light');
      localStorage.setItem('portfolio-theme', 'dark');
    }
    if (starfieldControlRef.current && starfieldControlRef.current.updateTheme) {
      starfieldControlRef.current.updateTheme(!isLightMode);
    }
  }, [isLightMode]);

  // Track active section, scroll progress, and subtle scrolling ambient tick
  useEffect(() => {
    let lastSection = 'hero';

    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(progress);

      const sections = ['hero', 'projects', 'case-studies', 'neural-telemetry', 'timeline', 'skills', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 140) {
            if (lastSection !== sectionId) {
              lastSection = sectionId;
              cyberSound.playScrollTick();
            }
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Continuous background video autoplay
  useEffect(() => {
    if (darkVideoRef.current) darkVideoRef.current.play().catch(() => {});
    if (lightVideoRef.current) lightVideoRef.current.play().catch(() => {});
  }, []);

  // Connect ambient audio element to CyberSoundSystem
  useEffect(() => {
    if (audioRef.current) {
      cyberSound.setAmbientAudioElement(audioRef.current);
    }
  }, []);

  // Initialize Particle Starfield Canvas (preserves custom live particles)
  useEffect(() => {
    if (particleCanvasRef.current) {
      const control = initParticleStarfield(particleCanvasRef.current, {
        isDark: !isLightMode
      });
      starfieldControlRef.current = control;
    }
    return () => {
      if (starfieldControlRef.current) {
        starfieldControlRef.current.destroy();
      }
    };
  }, []);

  // GSAP micro-animations for gentle floating and icons
  useEffect(() => {
    if (!hasEntered) return;
    const targets = document.querySelectorAll('.gsap-float');
    if (targets.length > 0) {
      gsap.to(targets, {
        y: -4,
        duration: 2.2,
        ease: 'sine.inOut',
        stagger: 0.12,
        repeat: -1,
        yoyo: true
      });
    }
  }, [hasEntered]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("090109ayush@gmail.com");
    setToastMessage("TRANSMISSION ADDR COPIED: 090109ayush@gmail.com");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRebootSequence = () => {
    cyberSound.playBoot();
    setHasEntered(false);
  };

  const handleNavigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative min-h-screen bg-transparent transition-colors duration-500 overflow-x-hidden ${
      isLightMode ? 'text-slate-900' : 'text-zinc-100'
    }`}>
      {/* Custom Crosshair Reticle Cursor */}
      <CustomCursor isLightMode={isLightMode} />

      {/* =========================================================================
          1. DUAL VIDEO BACKGROUND ENGINE (PRESERVED LIVE BACKGROUNDS WITH MOUSE PARALLAX)
          ========================================================================= */}
      {/* Base Layer: Dark Mode Cyberpunk Video (zIndex: 0) */}
      <video
        ref={darkVideoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          transform: `scale(1.04) translate3d(${bgOffset.x * 6}px, ${bgOffset.y * 6}px, 0)`,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0"
      >
        <source
          src="https://res.cloudinary.com/lnalzoz5/video/upload/v1790941245/cyberpunk-bg.mp4"
          type="video/mp4"
        />
      </video>

      {/* Curtain Layer: Light Mode Daylight Metropolis Video (zIndex: 1) */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-[1]"
        style={{
          clipPath: isLightMode
            ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
            : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          transition: 'clip-path 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'clip-path',
          transform: 'translateZ(0)',
        }}
      >
        <video
          ref={lightVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            transform: `scale(1.04) translate3d(${bgOffset.x * 6}px, ${bgOffset.y * 6}px, 0)`,
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/lnalzoz5/video/upload/v1790946251/night-city-daily-life-cyberpunk-2077-moewalls-com.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* =========================================================================
          2. CUSTOM PARTICLES CANVAS (PRESERVED & INTERACTIVE zIndex: 2)
          ========================================================================= */}
      <canvas
        ref={particleCanvasRef}
        style={{
          transform: `translate3d(${bgOffset.x * 12}px, ${bgOffset.y * 12}px, 0)`,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="fixed inset-0 w-full h-full pointer-events-none z-[2]"
      />

      {/* =========================================================================
          3. ADAPTIVE READABILITY OVERLAYS (zIndex: 3)
          ========================================================================= */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-700 z-[3]"
        style={{
          transform: `translate3d(${bgOffset.x * 3}px, ${bgOffset.y * 3}px, 0)`,
          background: isLightMode
            ? "radial-gradient(circle at center, rgba(255, 255, 255, 0.12) 0%, rgba(226, 232, 240, 0.48) 100%)"
            : "radial-gradient(circle at center, rgba(3, 7, 18, 0.55) 0%, rgba(3, 7, 18, 0.82) 100%)"
        }}
      />

      {/* Ambient Audio Stream */}
      <audio
        ref={audioRef}
        src="https://res.cloudinary.com/lnalzoz5/video/upload/v1790945241/Cyberpunk_Ambient_Music_Futuristic_Sci-Fi_Soundscapes_to_Chill_Focus_and_Create_-_MadMaraca.mp3"
        loop
        preload="auto"
      />

      {/* Top Neon Scroll Progress Indicator */}
      <div className={`fixed top-0 left-0 w-full h-[2px] z-50 pointer-events-none ${isLightMode ? 'bg-slate-200' : 'bg-slate-900/60'}`}>
        <div
          className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-pink-500 shadow-[0_0_12px_#f97316] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* =========================================================================
          4. CINEMATIC LOADING SCREEN EXPERIENCE (REQUIREMENT 3)
          ========================================================================= */}
      {!hasEntered && (
        <CinematicLoadingScreen
          onEnter={() => setHasEntered(true)}
          isLightMode={isLightMode}
        />
      )}

      {/* =========================================================================
          5. TOP UTILITY HUD BAR (MINIMALIST COMMAND BANNER)
          ========================================================================= */}
      <header className={`fixed top-0 left-0 right-0 z-40 h-16 px-4 sm:px-8 flex items-center justify-between transition-colors duration-300 ${
        isLightMode
          ? 'bg-white/50 backdrop-blur-xl border-b border-white/60 shadow-xs text-slate-900'
          : 'bg-black/60 backdrop-blur-md border-b border-zinc-800/80 text-white'
      }`}>
        {/* Left Brand Cluster */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            cyberSound.playClick();
            handleNavigateToSection('hero');
          }}
          onMouseEnter={() => cyberSound.playHover()}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-lg shadow-[0_0_12px_rgba(255,170,0,0.2)] group-hover:border-amber-400 transition-all">
            <Sparkles className="w-5 h-5 text-amber-400 pointer-events-none" />
          </div>
          <div className="flex flex-col">
            <span className={`font-bold tracking-wider text-base leading-none font-tech transition-colors ${
              isLightMode ? 'text-slate-950 group-hover:text-amber-700' : 'text-white group-hover:text-amber-300'
            }`}>
              AYUSH SINGH
            </span>
            <span className="font-mono text-[10px] text-amber-500 tracking-widest mt-1">
              SRM IST // AI COMMAND CENTER
            </span>
          </div>
        </a>

        {/* Center Subsystem Status Beacon */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className={isLightMode ? 'text-slate-700 font-medium' : 'text-zinc-300'}>
              QUANTUM ISING HAMILTONIANS [ONLINE]
            </span>
          </div>
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Reboot Sequence Button */}
          <button
            type="button"
            onClick={handleRebootSequence}
            onMouseEnter={() => cyberSound.playHover()}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
              isLightMode
                ? 'bg-white/80 border border-slate-300 text-slate-800 hover:border-amber-500'
                : 'bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:border-amber-400 hover:text-amber-300'
            }`}
            title="Replay System Boot Sequence"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-500 pointer-events-none" />
            <span className="hidden sm:inline pointer-events-none">[ BOOT ]</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            onMouseEnter={() => cyberSound.playHover()}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 select-none shadow-sm ${
              isLightMode
                ? 'bg-white/90 border border-slate-300 text-slate-900 hover:border-amber-500'
                : 'bg-slate-900/90 border border-zinc-700 text-amber-300 hover:border-amber-400'
            }`}
            aria-label="Toggle Theme"
          >
            {isLightMode ? (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-600 pointer-events-none" />
                <span className="font-bold pointer-events-none">[ ☾ DARK ]</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400 pointer-events-none" />
                <span className="font-bold pointer-events-none">[ ☼ LIGHT ]</span>
              </>
            )}
          </button>

          {/* Website Sound Control Button (Requirement 2: 🔊 Sound ON / 🔇 Sound OFF) */}
          <button
            type="button"
            onClick={toggleSound}
            onMouseEnter={() => cyberSound.playHover()}
            className={`relative z-50 pointer-events-auto px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer shadow-sm select-none ${
              isSoundOn
                ? 'bg-black/85 border border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(255,170,0,0.35)]'
                : isLightMode
                  ? 'bg-white/85 border border-slate-300 text-slate-500 hover:border-slate-400'
                  : 'bg-slate-900/80 border border-zinc-700 text-zinc-400 hover:border-zinc-500'
            }`}
            title={isSoundOn ? 'Disable Sound' : 'Enable Sound'}
            aria-label="Sound Control"
          >
            {isSoundOn ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse pointer-events-none" />
                <span className="font-semibold text-amber-300 pointer-events-none">🔊 Sound ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
                <span className="pointer-events-none">🔇 Sound OFF</span>
              </>
            )}
          </button>

          {/* SIH 2026 Event Badge */}
          <div className="bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white font-bold text-xs px-3 sm:px-4 py-1.5 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.4)] select-none whitespace-nowrap flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>SIH 2026</span>
          </div>
        </div>
      </header>

      {/* Floating Systems */}
      <SocialRibbon onCopyEmail={handleCopyEmail} isLightMode={isLightMode} />

      {/* =========================================================================
          6. FUTURISTIC HUD BOTTOM NAVIGATION
          ========================================================================= */}
      <FuturisticHudNav
        activeSection={activeSection}
        onNavigate={handleNavigateToSection}
        isLightMode={isLightMode}
      />

      {/* =========================================================================
          7. AI ASSISTANT WIDGET
          ========================================================================= */}
      <AIAssistantWidget
        isLightMode={isLightMode}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-24 left-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border text-xs font-mono shadow-xl animate-bounce ${
          isLightMode
            ? 'bg-white/95 border-amber-500 text-slate-900 shadow-amber-500/10'
            : 'bg-slate-950/95 border-amber-400 text-amber-300 shadow-[0_0_25px_rgba(255,170,0,0.35)]'
        }`}>
          <Check className="w-4 h-4 text-emerald-400 pointer-events-none" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          8. MAIN CONTENT CONTAINER (REVERSIBLE SCROLL ANIMATIONS)
          ========================================================================= */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 space-y-12 sm:space-y-16">
        {/* =========================================================================
            HERO SECTION: 3D AI CORE SPHERE + CODE DECORATIONS (REQ 1 & 4)
            ========================================================================= */}
        <section id="hero" className="py-8 sm:py-12 flex flex-col justify-center relative overflow-visible">
          {/* Main Hero Card Container */}
          <div className="relative">
            {/* 3D Three.js AI Core Sphere placed behind/around Name */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-80 sm:opacity-90">
              <div className="w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px]">
                <AICoreSphere isLightMode={isLightMode} />
              </div>
            </div>

            {/* Hero Text Content */}
            <div className={`relative z-10 max-w-4xl mx-auto text-center space-y-6 transition-all duration-300 ${
              isLightMode
                ? 'bg-white/40 backdrop-blur-xl border border-white/70 p-8 sm:p-12 rounded-3xl shadow-[0_8px_32px_rgba(15,23,42,0.06)]'
                : 'bg-[#060a14]/65 backdrop-blur-xl border border-zinc-800/80 p-8 sm:p-12 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.6)]'
            }`}>
              {/* Badges & Status Pills with subtle GSAP float */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono gsap-float">
                <span className={`px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                  isLightMode
                    ? 'bg-amber-500/15 border-amber-600/40 text-amber-900 font-mono shadow-sm backdrop-blur-md font-bold'
                    : 'bg-black/60 border-amber-500/50 text-amber-300'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  SRM INSTITUTE OF SCIENCE AND TECHNOLOGY
                </span>
                <span className={`px-3 py-1 rounded-full border ${
                  isLightMode
                    ? 'bg-white/70 border-slate-300 text-slate-800 shadow-sm font-mono backdrop-blur-md font-semibold'
                    : 'bg-black/60 border-pink-500/50 text-pink-300'
                }`}>
                  CSE (AI &amp; ML) · BATCH 2026 – 2030
                </span>
                <span className={`px-3 py-1 rounded-full border ${
                  isLightMode
                    ? 'bg-white/70 border-slate-300 text-slate-800 shadow-sm font-mono backdrop-blur-md font-semibold'
                    : 'bg-black/60 border-emerald-500/50 text-emerald-300'
                }`}>
                  SIH 2026 ACTIVE
                </span>
              </div>

              {/* Main Heading with Glitch Depth */}
              <div className="space-y-2">
                <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-tech tracking-tight leading-tight ${
                  isLightMode
                    ? 'text-slate-950 font-black tracking-tight drop-shadow-sm'
                    : 'font-bold text-white text-glow-amber drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]'
                }`}>
                  AYUSH SINGH
                </h1>
                <p className={`text-lg sm:text-2xl font-tech tracking-wider ${
                  isLightMode
                    ? 'text-amber-800 font-mono font-bold tracking-widest'
                    : 'bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 bg-clip-text text-transparent font-semibold drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]'
                }`}>
                  {portfolioData.tagline}
                </p>
              </div>

              {/* Body Description */}
              <p className={`max-w-2xl mx-auto text-xs sm:text-sm sm:leading-relaxed ${
                isLightMode
                  ? 'text-slate-900 font-mono leading-relaxed font-semibold'
                  : 'text-zinc-100 font-mono drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]'
              }`}>
                Engineering statutory risk delay analytics with{' '}
                <span className={isLightMode ? 'text-amber-900 bg-amber-100/80 px-1 py-0.5 rounded border border-amber-300/60 font-bold' : 'font-semibold text-amber-300'}>
                  XGBoost &amp; SHAP explainability
                </span>, and formulating hybrid{' '}
                <span className={isLightMode ? 'text-amber-900 bg-amber-100/80 px-1 py-0.5 rounded border border-amber-300/60 font-bold' : 'font-semibold text-pink-400'}>
                  QUBO / QAOA quantum optimization
                </span>{' '}
                for renewable microgrid dispatch. Specialized in high-performance reactive interfaces and explainable machine intelligence.
              </p>

              {/* Action CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <MagneticButton>
                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      cyberSound.playClick();
                      handleNavigateToSection('projects');
                    }}
                    onMouseEnter={() => cyberSound.playHover()}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold px-6 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(255,170,0,0.5)] flex items-center gap-2 font-mono text-xs transition-all cursor-pointer shadow-md"
                  >
                    <Cpu className="w-4 h-4 text-black pointer-events-none" />
                    <span className="pointer-events-none font-bold">VIEW SYSTEMS</span>
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <button
                    onClick={() => {
                      cyberSound.playClick();
                      handleCopyEmail();
                    }}
                    onMouseEnter={() => cyberSound.playHover()}
                    className={`px-5 py-2.5 rounded-xl font-mono text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm border ${
                      isLightMode
                        ? 'bg-white border-slate-300 text-slate-800 hover:border-amber-500'
                        : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-pink-500/60'
                    }`}
                    title="Copy Email"
                  >
                    <Mail className="w-4 h-4 text-pink-500 pointer-events-none" />
                    <span className="pointer-events-none">090109ayush@gmail.com</span>
                  </button>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* =========================================================================
              LEFT & RIGHT CODE SECTIONS: DEVELOPER TERMINAL & DIRECTORY TREE
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Left Wing: Animated Developer Terminal */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <TerminalDecoration isLightMode={isLightMode} />
            </motion.div>

            {/* Right Wing: Animated Project Directory Tree */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectDirectoryTree
                isLightMode={isLightMode}
                onSelectProject={(projectId) => {
                  const target = portfolioData.projects.find((p) => p.id === projectId);
                  if (target) setSelectedProject(target);
                  handleNavigateToSection('projects');
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            01. PROJECTS SECTION (PREMIUM 3D CARDS WITH PERSPECTIVE & SCHEMATICS - REQ 1)
            ========================================================================= */}
        <section id="projects" className="py-12 sm:py-16 flex flex-col justify-center space-y-8 scroll-mt-24">
          <div className="border-b border-zinc-500/20 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className={`text-xs font-mono tracking-widest mb-1 ${
                isLightMode ? 'text-[#c2410c] font-semibold' : 'text-amber-400'
              }`}>
                // DEPLOYED PLATFORMS
              </div>
              <h2 className={`text-2xl sm:text-4xl font-tech ${
                isLightMode ? 'text-slate-950 font-extrabold' : 'font-bold text-white'
              }`}>
                01. 3D Holographic Project Matrix
              </h2>
            </div>
            <div className={`text-xs font-mono ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>
              INTERACTIVE 3D SCHEMATICS (ROTATE X/Y &amp; GLASS REFLECTION)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project) => (
              <HolographicProjectCard
                key={project.id}
                project={project}
                onInspect={(p) => setSelectedProject(p)}
                isLightMode={isLightMode}
              />
            ))}
          </div>
        </section>

        {/* =========================================================================
            02. PIPELINE SECTION
            ========================================================================= */}
        <section id="case-studies" className="py-12 sm:py-16 flex flex-col justify-center space-y-8 scroll-mt-24">
          <div className="border-b border-zinc-500/20 pb-4">
            <div className={`text-xs font-mono tracking-widest mb-1 ${
              isLightMode ? 'text-[#c2410c] font-semibold' : 'text-amber-400'
            }`}>
              // ARCHITECTURAL PIPELINE
            </div>
            <h2 className={`text-2xl sm:text-4xl font-tech ${
              isLightMode ? 'text-slate-950 font-extrabold' : 'font-bold text-white'
            }`}>
              02. End-to-End ML Inference Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioData.pipelineSteps.map((step) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`p-6 rounded-2xl border transition-all ${
                  isLightMode
                    ? 'bg-white/45 hover:bg-white/60 backdrop-blur-xl border border-white/70 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
                    : 'bg-[#0b0f19]/85 backdrop-blur-xl border border-zinc-800 text-zinc-100 hover:border-amber-500/40'
                }`}
              >
                <span className="text-3xl font-mono font-bold text-amber-500 block mb-2">{step.step}</span>
                <h4 className={`text-lg font-bold font-tech mb-2 ${isLightMode ? 'text-slate-950' : 'text-white'}`}>{step.title}</h4>
                <div className={`text-xs font-mono mb-3 ${isLightMode ? 'text-slate-600 font-medium' : 'text-zinc-400'}`}>{step.tech}</div>
                <p className={`text-xs leading-relaxed ${isLightMode ? 'text-slate-800 font-medium' : 'text-zinc-300'}`}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            03. DIAGNOSTICS SECTION
            ========================================================================= */}
        <section id="neural-telemetry" className="py-12 sm:py-16 flex flex-col justify-center scroll-mt-24">
          <LiveNeuralPipelineDiagnostics isLightMode={isLightMode} />
        </section>

        {/* =========================================================================
            04. JOURNEY TIMELINE
            ========================================================================= */}
        <JourneyTimeline isLightMode={isLightMode} />

        {/* =========================================================================
            05. SKILLS SECTION
            ========================================================================= */}
        <section id="skills" className="py-12 sm:py-16 flex flex-col justify-center space-y-8 scroll-mt-24">
          <div className="border-b border-zinc-500/20 pb-4">
            <div className={`text-xs font-mono tracking-widest mb-1 ${
              isLightMode ? 'text-[#c2410c] font-semibold' : 'text-amber-400'
            }`}>
              // SYSTEM MATRICES
            </div>
            <h2 className={`text-2xl sm:text-4xl font-tech ${
              isLightMode ? 'text-slate-950 font-extrabold' : 'font-bold text-white'
            }`}>
              05. Technical Capabilities &amp; Stack Telemetry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.skills.map((skillGroup) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`p-6 rounded-2xl border transition-all ${
                  isLightMode
                    ? 'bg-white/45 hover:bg-white/60 backdrop-blur-xl border border-white/70 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
                    : 'bg-[#0b0f19]/85 backdrop-blur-xl border border-zinc-800 text-zinc-100'
                }`}
              >
                <h4 className={`text-base font-bold font-tech mb-4 flex items-center gap-2 ${
                  isLightMode ? 'text-slate-950' : 'text-white'
                }`}>
                  <Sliders className="w-4 h-4 text-amber-500 pointer-events-none" />
                  <span>{skillGroup.category}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className={`text-xs font-mono px-3 py-1.5 rounded-xl border ${
                        isLightMode
                          ? 'bg-white/80 border-slate-300 text-slate-800 font-medium'
                          : 'bg-zinc-900/90 border-zinc-800 text-zinc-300'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            06. CONTACT TRANSMISSION SECTION
            ========================================================================= */}
        <section id="contact" className="py-12 sm:py-16 flex flex-col justify-center space-y-8 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className={`rounded-3xl p-8 sm:p-12 text-center space-y-6 border transition-all ${
              isLightMode
                ? 'bg-white/45 backdrop-blur-2xl border border-white/70 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
                : 'bg-[#0b0f19]/85 backdrop-blur-2xl border border-zinc-800 text-zinc-100 shadow-2xl'
            }`}
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border ${
              isLightMode
                ? 'bg-amber-500/15 border-amber-600/40 text-amber-900 font-mono shadow-sm backdrop-blur-md font-bold'
                : 'bg-amber-950/80 border-amber-500/40 text-amber-300'
            }`}>
              <Radio className="w-3.5 h-3.5 text-amber-500 animate-pulse pointer-events-none" />
              <span>TRANSMISSION PROTOCOL OPEN</span>
            </div>

            <h2 className={`text-3xl sm:text-5xl font-tech ${
              isLightMode ? 'text-slate-950 font-extrabold' : 'font-bold text-white'
            }`}>
              Initialize Direct Transmission
            </h2>

            <p className={`max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed ${
              isLightMode ? 'text-slate-800 font-medium font-mono' : 'text-zinc-300 font-mono'
            }`}>
              Available for AI/ML engineering, quantum computing modeling, SIH collaboration, and high-performance creative technology development.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <button
                  onClick={() => {
                    cyberSound.playClick();
                    handleCopyEmail();
                  }}
                  onMouseEnter={() => cyberSound.playHover()}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 hover:brightness-110 text-white font-mono font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Copy className="w-4 h-4 pointer-events-none" />
                  <span className="pointer-events-none">COPY: 090109ayush@gmail.com</span>
                </button>
              </MagneticButton>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Inspect Project Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`max-w-2xl w-full p-6 sm:p-8 rounded-3xl border shadow-2xl relative ${
                isLightMode ? 'bg-white text-slate-900 border-slate-300' : 'bg-[#090d18] text-white border-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between border-b border-zinc-500/20 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-mono text-amber-500 block">{selectedProject.category}</span>
                  <h3 className="text-xl font-bold font-tech">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => {
                    cyberSound.playClick();
                    setSelectedProject(null);
                  }}
                  onMouseEnter={() => cyberSound.playHover()}
                  className="px-3 py-1 rounded-lg border text-xs font-mono hover:bg-zinc-500/20 cursor-pointer"
                >
                  ESC // CLOSE
                </button>
              </div>
              <p className="text-sm leading-relaxed mb-6">{selectedProject.description}</p>
              
              <div className="grid grid-cols-3 gap-3 mb-6 font-mono text-xs">
                <div className={`p-3 rounded-xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-zinc-800'}`}>
                  <span className="text-[10px] text-zinc-400 block">ACCURACY</span>
                  <span className="text-emerald-500 font-bold">{selectedProject.metrics.accuracy}</span>
                </div>
                <div className={`p-3 rounded-xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-zinc-800'}`}>
                  <span className="text-[10px] text-zinc-400 block">LATENCY</span>
                  <span className="text-amber-500 font-bold">{selectedProject.metrics.latency}</span>
                </div>
                <div className={`p-3 rounded-xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-zinc-800'}`}>
                  <span className="text-[10px] text-zinc-400 block">PARAMETERS</span>
                  <span className="text-cyan-500 font-bold">{selectedProject.metrics.parameters}</span>
                </div>
              </div>

              {/* Tech Stack Chips in Modal */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                      isLightMode ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => cyberSound.playClick()}
                  onMouseEnter={() => cyberSound.playHover()}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-xs font-mono hover:bg-amber-400 cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <span>LAUNCH PLATFORM</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
