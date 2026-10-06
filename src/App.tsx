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
import AboutStorySection from './components/AboutStorySection';
import InteractiveSkillEcosystem from './components/InteractiveSkillEcosystem';
import AchievementsSection from './components/AchievementsSection';
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
      className={`crystal-glass crystal-glass-hover-teal p-6 sm:p-8 relative ${
        isLightMode
          ? 'bg-white/80 border-slate-200/80 shadow-[0_16px_45px_rgba(15,23,42,0.08)]'
          : 'bg-[rgba(10,10,15,0.72)] border-white/10 text-[#FFFFFF] shadow-2xl'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div>
          <div className={`text-xs font-mono tracking-widest ${isLightMode ? 'text-[#c2410c] font-semibold' : 'text-[#FFB703]'}`}>
            // TELEMETRY ENGINE 03
          </div>
          <h3 className={`text-2xl font-bold font-tech ${isLightMode ? 'text-slate-950 font-extrabold' : 'text-[#FFFFFF]'}`}>
            Live AI Neural Pipeline &amp; Model Diagnostics
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#80ED99] animate-ping" />
          <span className="text-xs font-mono text-[#80ED99] font-bold">STREAM ACTIVE // 60Hz</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-white/70 border-slate-200' : 'bg-black/40 border-white/10'}`}>
          <span className="text-[10px] font-mono text-[#9CA3AF] block">TRAINING EPOCH</span>
          <span className="text-xl font-mono font-bold text-[#FFB703]">{epoch}</span>
        </div>
        <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-white/70 border-slate-200' : 'bg-black/40 border-white/10'}`}>
          <span className="text-[10px] font-mono text-[#9CA3AF] block">CROSS-ENTROPY LOSS</span>
          <span className="text-xl font-mono font-bold text-[#00F5D4]">{loss}</span>
        </div>
        <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-white/70 border-slate-200' : 'bg-black/40 border-white/10'}`}>
          <span className="text-[10px] font-mono text-[#9CA3AF] block">GPU VRAM LOAD</span>
          <span className="text-xl font-mono font-bold text-[#FFB703]">6.8 / 16 GB</span>
        </div>
        <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-white/70 border-slate-200' : 'bg-black/40 border-white/10'}`}>
          <span className="text-[10px] font-mono text-[#9CA3AF] block">EDGE INFERENCE</span>
          <span className="text-xl font-mono font-bold text-[#80ED99]">18.4 ms</span>
        </div>
      </div>

      {/* Interactive Pipeline Nodes */}
      <div className="space-y-3">
        <span className="text-xs font-mono text-[#9CA3AF] block">// ACTIVE NEURAL CLUSTERS (CLICK TO PROBE)</span>
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
                    : 'bg-[#FFB703]/20 border-[#FFB703] text-[#FFB703] shadow-[0_0_15px_rgba(255,183,3,0.3)]'
                  : isLightMode
                    ? 'bg-white/70 border-slate-200 text-slate-700 hover:border-slate-300'
                    : 'bg-white/5 border-white/10 text-[#9CA3AF] hover:border-white/20 hover:text-white'
              }`}
            >
              <span>{node}</span>
              <Activity className="w-3.5 h-3.5 text-[#80ED99]" />
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

      const sections = ['hero', 'about', 'projects', 'case-studies', 'neural-telemetry', 'timeline', 'skills', 'achievements', 'contact'];
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
        className="fixed inset-0 pointer-events-none transition-all duration-700 z-[3] obsidian-noise"
        style={{
          transform: `translate3d(${bgOffset.x * 3}px, ${bgOffset.y * 3}px, 0)`,
          background: isLightMode
            ? "radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, rgba(241, 245, 249, 0.75) 100%)"
            : "radial-gradient(ellipse 85% 55% at 50% -20%, rgba(255, 183, 3, 0.08), transparent), radial-gradient(ellipse 65% 45% at 90% 40%, rgba(0, 245, 212, 0.06), transparent), radial-gradient(circle at center, rgba(8, 8, 8, 0.65) 0%, rgba(8, 8, 8, 0.88) 100%)"
        }}
      />

      {/* Ambient Audio Stream */}
      <audio
        ref={audioRef}
        src="https://res.cloudinary.com/lnalzoz5/video/upload/v1790945241/Cyberpunk_Ambient_Music_Futuristic_Sci-Fi_Soundscapes_to_Chill_Focus_and_Create_-_MadMaraca.mp3"
        loop
        preload="auto"
      />

      {/* Top Gradient Scroll Progress Indicator: Amber to Teal to Mint */}
      <div className={`fixed top-0 left-0 w-full h-[2px] z-50 pointer-events-none ${isLightMode ? 'bg-slate-200' : 'bg-black/60'}`}>
        <div
          className="h-full bg-gradient-to-r from-[#FFB703] via-[#00F5D4] to-[#80ED99] shadow-[0_0_12px_rgba(255,183,3,0.5)] transition-all duration-75"
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
          ? 'bg-white/70 backdrop-blur-xl border-b border-slate-200 text-slate-900'
          : 'bg-[#080808]/80 backdrop-blur-xl border-b border-white/10 text-white'
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
          <div className="w-10 h-10 rounded-xl bg-[#FFB703]/10 border border-[#FFB703]/40 flex items-center justify-center text-[#FFB703] font-bold text-lg shadow-[0_0_12px_rgba(255,183,3,0.25)] group-hover:border-[#FFB703] transition-all">
            <Sparkles className="w-5 h-5 text-[#FFB703] pointer-events-none" />
          </div>
          <div className="flex flex-col">
            <span className={`font-bold tracking-wider text-base leading-none font-tech transition-colors ${
              isLightMode ? 'text-slate-950 group-hover:text-amber-700' : 'text-[#FFFFFF] group-hover:text-[#FFB703]'
            }`}>
              AYUSH SINGH
            </span>
            <span className="font-mono text-[10px] text-[#FFB703] tracking-widest mt-1">
              SRM IST // AI RESEARCH LAB
            </span>
          </div>
        </a>

        {/* Center Subsystem Status Beacon */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5">
            <span className="w-2 h-2 rounded-full bg-[#80ED99] animate-ping" />
            <span className={isLightMode ? 'text-slate-700 font-medium' : 'text-[#9CA3AF]'}>
              HAMILTONIAN INFERENCE [<span className="text-[#80ED99] font-bold">ONLINE</span>]
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
                : 'bg-white/5 border border-white/10 text-[#9CA3AF] hover:border-[#FFB703]/40 hover:text-[#FFB703]'
            }`}
            title="Replay System Boot Sequence"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#FFB703] pointer-events-none" />
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
                : 'bg-white/5 border border-white/10 text-[#FFB703] hover:border-[#FFB703]/40'
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
                <Sun className="w-3.5 h-3.5 text-[#FFB703] pointer-events-none" />
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
                ? 'bg-[rgba(255,255,255,0.06)] border border-[#FFB703]/50 text-[#FFB703] shadow-[0_0_12px_rgba(255,183,3,0.3)]'
                : isLightMode
                  ? 'bg-white/85 border border-slate-300 text-slate-500 hover:border-slate-400'
                  : 'bg-white/5 border border-white/10 text-[#9CA3AF] hover:border-white/20'
            }`}
            title={isSoundOn ? 'Disable Sound' : 'Enable Sound'}
            aria-label="Sound Control"
          >
            {isSoundOn ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#FFB703] animate-pulse pointer-events-none" />
                <span className="font-semibold text-[#FFB703] pointer-events-none">🔊 Sound ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#9CA3AF] pointer-events-none" />
                <span className="pointer-events-none">🔇 Sound OFF</span>
              </>
            )}
          </button>

          {/* SIH 2026 Event Badge */}
          <div className="bg-gradient-to-r from-[#FFB703] to-[#80ED99] text-black font-bold text-xs px-3 sm:px-4 py-1.5 rounded-xl shadow-[0_0_15px_rgba(255,183,3,0.25)] select-none whitespace-nowrap flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
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

            {/* Hero Text Content in Glassmorphic Container (rgba(255,255,255,0.06)) */}
            <div className={`relative z-10 max-w-4xl mx-auto text-center space-y-6 transition-all duration-300 ${
              isLightMode
                ? 'bg-white/60 backdrop-blur-xl border border-slate-200 p-8 sm:p-12 rounded-3xl shadow-sm'
                : 'bg-[rgba(255,255,255,0.06)] backdrop-blur-2xl border border-[rgba(255,255,255,0.1)] p-8 sm:p-12 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)]'
            }`}>
              {/* Badges & Status Pills with subtle GSAP float */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono gsap-float">
                <span className={`px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                  isLightMode
                    ? 'bg-amber-500/10 border-amber-600/30 text-amber-900 font-mono shadow-sm backdrop-blur-md font-bold'
                    : 'bg-white/5 border-white/10 text-[#9CA3AF]'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-[#FFB703] animate-ping" />
                  SRM INSTITUTE OF SCIENCE AND TECHNOLOGY
                </span>
                <span className={`px-3 py-1 rounded-full border ${
                  isLightMode
                    ? 'bg-white/70 border-slate-300 text-slate-800 shadow-sm font-mono backdrop-blur-md font-semibold'
                    : 'bg-[#00F5D4]/10 border-[#00F5D4]/30 text-[#00F5D4]'
                }`}>
                  CSE (AI &amp; ML) · BATCH 2026 – 2030
                </span>
                <span className={`px-3 py-1 rounded-full border ${
                  isLightMode
                    ? 'bg-white/70 border-slate-300 text-slate-800 shadow-sm font-mono backdrop-blur-md font-semibold'
                    : 'bg-[#80ED99]/10 border-[#80ED99]/30 text-[#80ED99]'
                }`}>
                  SIH 2026 ACTIVE
                </span>
              </div>

              {/* Main Heading with 3D Depth, Letter Blur-to-Sharp, and Light Sweep */}
              <div className="space-y-3 relative overflow-visible">
                {/* Subtle sweeping light across name */}
                <motion.div
                  initial={{ translateX: '-100%' }}
                  animate={{ translateX: '250%' }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-y-0 w-36 bg-gradient-to-r from-transparent via-[#FFB703]/20 to-transparent pointer-events-none blur-md z-20"
                />

                <div className="relative inline-block select-none">
                  {/* 3D Extrusion Depth Layer */}
                  <h1
                    aria-hidden="true"
                    className={`absolute inset-0 flex items-center justify-center text-4xl sm:text-6xl lg:text-7xl font-tech font-black tracking-tight leading-tight translate-y-1.5 translate-x-1.5 opacity-30 blur-[1px] pointer-events-none ${
                      isLightMode ? 'text-amber-800' : 'text-[#FFB703]'
                    }`}
                  >
                    AYUSH SINGH
                  </h1>

                  {/* Main Animated Letters */}
                  <h1 className={`relative z-10 text-4xl sm:text-6xl lg:text-7xl font-tech tracking-tight leading-tight flex items-center justify-center flex-wrap ${
                    isLightMode
                      ? 'text-slate-950 font-black drop-shadow-sm'
                      : 'font-bold text-[#FFFFFF] text-glow-amber drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]'
                  }`}>
                    {"AYUSH SINGH".split("").map((char, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, filter: 'blur(10px)', y: 22, rotateX: 55 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0, rotateX: 0 }}
                        transition={{
                          duration: 0.55,
                          delay: 0.15 + idx * 0.045,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className={`inline-block transition-transform hover:scale-110 cursor-default ${
                          char === " " ? "w-3 sm:w-5" : ""
                        }`}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </h1>
                </div>

                <p className={`text-lg sm:text-2xl font-tech tracking-wider ${
                  isLightMode
                    ? 'text-amber-800 font-mono font-bold tracking-widest'
                    : 'text-[#FFB703] font-mono font-bold tracking-widest'
                }`}>
                  {portfolioData.tagline}
                </p>
              </div>

              {/* Body Description */}
              <p className={`max-w-2xl mx-auto text-xs sm:text-sm sm:leading-relaxed ${
                isLightMode
                  ? 'text-slate-900 font-mono leading-relaxed font-semibold'
                  : 'text-[#9CA3AF] font-mono leading-relaxed'
              }`}>
                Engineering statutory risk delay analytics with{' '}
                <span className={isLightMode ? 'text-amber-900 bg-amber-100/80 px-1 py-0.5 rounded border border-amber-300/60 font-bold' : 'font-semibold text-[#FFB703]'}>
                  XGBoost &amp; SHAP explainability
                </span>, and formulating hybrid{' '}
                <span className={isLightMode ? 'text-amber-900 bg-amber-100/80 px-1 py-0.5 rounded border border-amber-300/60 font-bold' : 'font-semibold text-[#00F5D4]'}>
                  QUBO / QAOA quantum optimization
                </span>{' '}
                for renewable microgrid dispatch. Specialized in high-performance reactive interfaces and explainable machine intelligence.
              </p>

              {/* Action CTA Buttons: Amber Gold and Subtle Glass */}
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
                    className="bg-[#FFB703] text-black font-semibold px-6 py-2.5 rounded-xl hover:bg-[#ffc32b] hover:shadow-[0_0_20px_rgba(255,183,3,0.4)] flex items-center gap-2 font-mono text-xs transition-all cursor-pointer shadow-md"
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
                        : 'bg-white/5 border-white/10 text-white hover:border-[#00F5D4]/40 hover:text-[#00F5D4]'
                    }`}
                    title="Copy Email"
                  >
                    <Mail className="w-4 h-4 text-[#00F5D4] pointer-events-none" />
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
            ABOUT & IDENTITY DOSSIER (STORYTELLING MOTION & LAYERED DEPTH)
            ========================================================================= */}
        <AboutStorySection isLightMode={isLightMode} />

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
                className={`crystal-glass crystal-glass-hover-amber p-6 relative ${
                  isLightMode
                    ? 'bg-white/80 border-slate-200/80 text-slate-900 shadow-sm'
                    : 'bg-[rgba(10,10,15,0.72)] border-white/10 text-white hover:border-[#FFB703]/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_30px_rgba(255,183,3,0.12)]'
                }`}
              >
                <span className="text-3xl font-mono font-bold text-[#FFB703] block mb-2">{step.step}</span>
                <h4 className={`text-lg font-bold font-tech mb-2 ${isLightMode ? 'text-slate-950' : 'text-[#FFFFFF]'}`}>{step.title}</h4>
                <div className={`text-xs font-mono mb-3 ${isLightMode ? 'text-slate-600 font-medium' : 'text-[#00F5D4]'}`}>{step.tech}</div>
                <p className={`text-xs leading-relaxed ${isLightMode ? 'text-slate-800 font-medium' : 'text-[#9CA3AF]'}`}>{step.desc}</p>
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
            05. INTERACTIVE TECHNOLOGY ECOSYSTEM & SKILL MATRIX
            ========================================================================= */}
        <InteractiveSkillEcosystem isLightMode={isLightMode} />

        {/* =========================================================================
            06. ACHIEVEMENTS & CREDENTIALS HOLOGRAPHIC VAULT
            ========================================================================= */}
        <AchievementsSection isLightMode={isLightMode} />

        {/* =========================================================================
            06. CONTACT TRANSMISSION SECTION
            ========================================================================= */}
        <section id="contact" className="py-12 sm:py-16 flex flex-col justify-center space-y-8 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className={`crystal-glass crystal-glass-hover-amber p-8 sm:p-12 text-center space-y-6 relative ${
              isLightMode
                ? 'bg-white/80 border-slate-200/80 text-slate-900 shadow-sm'
                : 'bg-[rgba(10,10,15,0.76)] border-white/10 text-[#FFFFFF] shadow-2xl'
            }`}
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border ${
              isLightMode
                ? 'bg-amber-500/10 border-amber-600/30 text-amber-900 font-mono shadow-sm backdrop-blur-md font-bold'
                : 'bg-white/5 border-white/10 text-[#FFB703]'
            }`}>
              <Radio className="w-3.5 h-3.5 text-[#FFB703] animate-pulse pointer-events-none" />
              <span>TRANSMISSION PROTOCOL OPEN</span>
            </div>

            <h2 className={`text-3xl sm:text-5xl font-tech ${
              isLightMode ? 'text-slate-950 font-extrabold' : 'font-bold text-[#FFFFFF]'
            }`}>
              Initialize Direct Transmission
            </h2>

            <p className={`max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed ${
              isLightMode ? 'text-slate-800 font-medium font-mono' : 'text-[#9CA3AF] font-mono'
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
                  className="px-8 py-4 rounded-xl bg-[#FFB703] hover:bg-[#ffc32b] text-black font-mono font-bold text-xs shadow-[0_0_25px_rgba(255,183,3,0.4)] transition-all flex items-center gap-2 cursor-pointer"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`max-w-2xl w-full p-6 sm:p-8 crystal-glass shadow-2xl relative ${
                isLightMode ? 'bg-white/95 text-slate-900 border-slate-300' : 'bg-[rgba(10,10,15,0.92)] text-white border-white/12'
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#FFB703] block">{selectedProject.category}</span>
                  <h3 className="text-xl font-bold font-tech text-[#FFFFFF]">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => {
                    cyberSound.playClick();
                    setSelectedProject(null);
                  }}
                  onMouseEnter={() => cyberSound.playHover()}
                  className="px-3 py-1 rounded-lg border text-xs font-mono hover:bg-white/10 cursor-pointer text-[#9CA3AF]"
                >
                  ESC // CLOSE
                </button>
              </div>
              <p className="text-sm leading-relaxed mb-6 text-[#9CA3AF]">{selectedProject.description}</p>
              
              <div className="grid grid-cols-3 gap-3 mb-6 font-mono text-xs">
                <div className={`p-3 rounded-xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'}`}>
                  <span className="text-[10px] text-[#9CA3AF] block">ACCURACY</span>
                  <span className="text-[#80ED99] font-bold">{selectedProject.metrics.accuracy}</span>
                </div>
                <div className={`p-3 rounded-xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'}`}>
                  <span className="text-[10px] text-[#9CA3AF] block">LATENCY</span>
                  <span className="text-[#FFB703] font-bold">{selectedProject.metrics.latency}</span>
                </div>
                <div className={`p-3 rounded-xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'}`}>
                  <span className="text-[10px] text-[#9CA3AF] block">PARAMETERS</span>
                  <span className="text-[#00F5D4] font-bold">{selectedProject.metrics.parameters}</span>
                </div>
              </div>

              {/* Tech Stack Chips in Modal */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                      isLightMode ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-[#00F5D4]/10 border-[#00F5D4]/30 text-[#00F5D4]'
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
                  className="px-5 py-2.5 rounded-xl bg-[#FFB703] text-black font-semibold text-xs font-mono hover:bg-[#ffc32b] cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,183,3,0.35)]"
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
