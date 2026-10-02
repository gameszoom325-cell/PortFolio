import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';

/* =========================================================================
   PORTFOLIO STATIC METRICS & DATA DEFINITIONS
   ========================================================================= */
const portfolioData = {
  name: "AYUSH SINGH",
  title: "AI / ML Engineer & Creative Technologist",
  institution: "SRM Institute of Science and Technology",
  department: "CSE (AI & ML) · Batch 2026 – 2030",
  tagline: "AI/ML • WEB • QUANTUM",
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
        parameters: "64 Qubits"
      },
      liveUrl: "https://quantumgrid.io",
      repoUrl: "https://github.com/gameszoom325-cell/quantum-grid-optimizer",
      hologramColor: "#06b6d4"
    }
  ],
  pipelineSteps: [
    { step: "01", title: "Data Ingestion & Sanitization", tech: "Kafka • Arrow • Redis", desc: "Sub-millisecond schema validation and streaming feature normalization across heterogenous telemetry nodes." },
    { step: "02", title: "Surrogate Training & Optimization", tech: "XGBoost • PyTorch • Optuna", desc: "Automated hyperparameter gradient tuning with cross-validated statutory risk attribution matrices." },
    { step: "03", title: "SHAP Explainability Surface", tech: "TreeSHAP • Kernel Attributions", desc: "Decomposing non-linear multi-target predictive interactions into transparent, statutory regulatory metrics." },
    { step: "04", title: "Edge & Web Deployment", tech: "ONNX Runtime • WebAssembly", desc: "Zero-latency edge inferencing running compiled neural graph surrogates directly in client browser runtimes." }
  ],
  skills: [
    { category: "Machine Learning & Core AI", items: ["XGBoost", "SHAP", "PyTorch", "Scikit-Learn", "Computer Vision (ViT)", "Transformers", "Feature Engineering"] },
    { category: "Quantum & Mathematics", items: ["QUBO Formulation", "QAOA Algorithms", "Qiskit", "Graph Partitioning", "Combinatorial Optimization", "Stochastic Analysis"] },
    { category: "Frontend & Reactive Systems", items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js / WebGL", "Web Audio API", "Vite"] },
    { category: "Backend, Cloud & Pipelines", items: ["FastAPI", "Python", "Node.js", "Docker", "PostgreSQL", "Redis", "Cloud Run", "Git / GitHub CI"] }
  ]
};

/* =========================================================================
   1. CYBERNETIC SOUND SYNTHESIZER (Web Audio API)
   ========================================================================= */
export function useCyberSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
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

  const initAudio = useCallback(() => {
    try {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
    } catch {
      // Ignored
    }
  }, [getAudioContext]);

  const playHoverSFX = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.04);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Ignored
    }
  }, [soundEnabled, getAudioContext]);

  const playClickSFX = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.06);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Ignored
    }
  }, [soundEnabled, getAudioContext]);

  return {
    soundEnabled,
    setSoundEnabled,
    initAudio,
    playHover: playHoverSFX,
    playClick: playClickSFX,
    playHoverSFX,
    playClickSFX
  };
}

/* =========================================================================
   2. MAGNETIC INTERACTION BUTTON (SPRING PHYSICS)
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
   3. HOLOGRAPHIC 3D PROJECT CARD (PERSPECTIVE TILT & GLOW)
   ========================================================================= */
function HolographicProjectCard({
  project,
  onInspect,
  sfx,
  isLightMode
}: {
  project: (typeof portfolioData.projects)[0];
  onInspect: (p: typeof project) => void;
  sfx: ReturnType<typeof useCyberSound>;
  isLightMode: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((-(y - centerY) / centerY) * 12);
    setRotateY(((x - centerX) / centerX) * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={sfx.playHover}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out'
      }}
      className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group ${
        isLightMode
          ? 'bg-white/30 hover:bg-white/45 backdrop-blur-xl border border-white/70 hover:border-amber-500/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
          : 'bg-[#0b0f19]/80 backdrop-blur-xl border border-zinc-800 text-zinc-100 shadow-2xl hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(255,170,0,0.22)]'
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className={`text-[11px] font-mono tracking-wider px-3 py-1 rounded-full uppercase ${
            isLightMode
              ? 'bg-amber-500/15 border border-amber-600/40 text-amber-900 font-mono text-[10px] font-bold backdrop-blur-md'
              : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
          }`}>
            {project.category}
          </span>
          <span className={`font-mono text-xs ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>ID // {project.id}</span>
        </div>

        <h3 className={`font-tech ${
          isLightMode ? 'text-slate-950 font-bold text-xl' : 'text-2xl font-bold text-white'
        }`}>
          {project.title}
        </h3>

        <p className={`leading-relaxed ${
          isLightMode ? 'text-slate-800 font-mono text-xs' : 'text-sm text-zinc-300'
        }`}>
          {project.description}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                isLightMode
                  ? 'bg-white/60 border border-slate-300/80 text-slate-800 font-medium'
                  : 'bg-zinc-900/90 border border-zinc-800 text-zinc-400'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-zinc-500/20 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-zinc-400 block text-[10px]">ACCURACY</span>
            <span className="text-emerald-500 font-bold">{project.metrics.accuracy}</span>
          </div>
          <div>
            <span className="text-zinc-400 block text-[10px]">LATENCY</span>
            <span className="text-amber-500 font-bold">{project.metrics.latency}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            onClick={sfx.playClick}
            onMouseEnter={sfx.playHover}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isLightMode
                ? 'bg-white border-slate-200 text-slate-800 hover:border-amber-500 hover:text-amber-600 shadow-sm'
                : 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:border-amber-400 hover:text-amber-300 shadow-sm'
            }`}
            title="Launch Live Pipeline"
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <button
            onClick={() => {
              sfx.playClick();
              onInspect(project);
            }}
            onMouseEnter={sfx.playHover}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              isLightMode
                ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-md font-bold'
                : 'bg-amber-400/90 text-black hover:bg-amber-300 hover:shadow-[0_0_15px_rgba(255,170,0,0.4)]'
            }`}
          >
            INSPECT
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. LIVE NEURAL DIAGNOSTICS & SYSTEM TELEMETRY
   ========================================================================= */
function LiveNeuralPipelineDiagnostics({ sfx, isLightMode }: { sfx: ReturnType<typeof useCyberSound>; isLightMode: boolean }) {
  const [epoch, setEpoch] = useState<number>(128);
  const [loss, setLoss] = useState<number>(0.0142);
  const [activeNode, setActiveNode] = useState<string>('XGBoost Surrogate');

  useEffect(() => {
    const timer = setInterval(() => {
      setEpoch((prev) => prev + 1);
      setLoss((prev) => Math.max(0.008, +(prev + (Math.random() * 0.001 - 0.0005)).toFixed(4)));
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`rounded-2xl p-6 sm:p-8 border transition-all ${
      isLightMode
        ? 'bg-white/65 backdrop-blur-xl border border-white/80 text-slate-900 shadow-[0_8px_32px_rgba(15,23,42,0.12)]'
        : 'bg-[#090d16]/85 backdrop-blur-xl border border-zinc-800 text-zinc-100 shadow-2xl'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-500/20 pb-4 mb-6">
        <div>
          <div className={`text-xs font-mono tracking-widest ${isLightMode ? 'text-[#c2410c] font-semibold' : 'text-amber-400'}`}>
            // TELEMETRY ENGINE 03
          </div>
          <h3 className={`text-2xl font-bold font-tech ${isLightMode ? 'text-[#090d16] font-extrabold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]' : 'text-white'}`}>
            03. Live AI Neural Pipeline &amp; Model Diagnostics
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-mono text-emerald-500 font-bold">STREAM ACTIVE // 60Hz</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-xl border ${isLightMode ? 'bg-white/70 border-slate-200' : 'bg-black/40 border-zinc-800'}`}>
          <span className="text-[10px] font-mono text-zinc-400 block">TRAINING EPOCH</span>
          <span className="text-xl font-mono font-bold text-amber-500">{epoch}</span>
        </div>
        <div className={`p-4 rounded-xl border ${isLightMode ? 'bg-white/70 border-slate-200' : 'bg-black/40 border-zinc-800'}`}>
          <span className="text-[10px] font-mono text-zinc-400 block">CROSS-ENTROPY LOSS</span>
          <span className="text-xl font-mono font-bold text-cyan-500">{loss}</span>
        </div>
        <div className={`p-4 rounded-xl border ${isLightMode ? 'bg-white/70 border-slate-200' : 'bg-black/40 border-zinc-800'}`}>
          <span className="text-[10px] font-mono text-zinc-400 block">GPU VRAM LOAD</span>
          <span className="text-xl font-mono font-bold text-pink-500">6.4 / 16 GB</span>
        </div>
        <div className={`p-4 rounded-xl border ${isLightMode ? 'bg-white/70 border-slate-200' : 'bg-black/40 border-zinc-800'}`}>
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
                sfx.playClick();
                setActiveNode(node);
              }}
              onMouseEnter={sfx.playHover}
              className={`p-3 rounded-xl text-left border text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
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
    </div>
  );
}

/* =========================================================================
   5. VERTICAL SOCIAL RIBBON
   ========================================================================= */
function SocialRibbon({ sfx, onCopyEmail, isLightMode }: { sfx: ReturnType<typeof useCyberSound>; onCopyEmail: () => void; isLightMode: boolean }) {
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
              onClick={sfx.playClick}
              onMouseEnter={sfx.playHover}
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
            sfx.playClick();
            onCopyEmail();
          }}
          onMouseEnter={sfx.playHover}
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
   6. TECH DRONE MASCOT (BOTTOM RIGHT)
   ========================================================================= */
function TechDroneMascot({ sfx, onReboot, isLightMode }: { sfx: ReturnType<typeof useCyberSound>; onReboot: () => void; isLightMode: boolean }) {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2">
      <motion.button
        onClick={() => {
          sfx.playClick();
          onReboot();
        }}
        onMouseEnter={sfx.playHover}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-3 py-2 rounded-xl border text-xs font-mono flex items-center gap-2 cursor-pointer shadow-lg backdrop-blur-md transition-all ${
          isLightMode
            ? 'bg-white/85 border-slate-300 text-slate-800 hover:border-amber-500'
            : 'bg-black/75 border-zinc-800 text-zinc-300 hover:border-amber-400'
        }`}
        title="Reboot Telemetry Drone"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>DRONE // PATROL</span>
      </motion.button>
    </div>
  );
}

/* =========================================================================
   MAIN APPLICATION COMPONENT
   ========================================================================= */
export default function App() {
  const sfx = useCyberSound();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const darkVideoRef = useRef<HTMLVideoElement | null>(null);
  const lightVideoRef = useRef<HTMLVideoElement | null>(null);

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

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<(typeof portfolioData.projects)[0] | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Theme toggle with explicit event isolation
  const toggleTheme = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    sfx.playClick();
    setIsLightMode((prev) => !prev);
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
  }, [isLightMode]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Continuous background video autoplay
  useEffect(() => {
    if (darkVideoRef.current) darkVideoRef.current.play().catch(() => {});
    if (lightVideoRef.current) lightVideoRef.current.play().catch(() => {});
  }, []);

  // Ambient audio configuration with gesture unlock (Volume 0.35)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;

    const handleFirstGesture = () => {
      sfx.initAudio();
      audio.play().then(() => {
        setIsPlaying(true);
        cleanup();
      }).catch(() => {});
    };

    const cleanup = () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };

    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      window.addEventListener('click', handleFirstGesture, { once: true });
      window.addEventListener('keydown', handleFirstGesture, { once: true });
      window.addEventListener('scroll', handleFirstGesture, { once: true });
      window.addEventListener('touchstart', handleFirstGesture, { once: true });
    });

    return cleanup;
  }, [sfx]);

  // Audio Toggle Controller
  const toggleAudio = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    sfx.initAudio();
    if (!audioRef.current) return;
    if (!isPlaying) {
      audioRef.current.volume = 0.35;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        sfx.setSoundEnabled(true);
        sfx.playClick();
      }).catch((err) => console.error('Audio playback error:', err));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      sfx.setSoundEnabled(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("090109ayush@gmail.com");
    setToastMessage("TRANSMISSION ADDR COPIED: 090109ayush@gmail.com");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDroneReboot = () => {
    setToastMessage("TELEMETRY DRONE REBOOTED // SENSORS ONLINE");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className={`relative min-h-screen bg-transparent transition-colors duration-500 overflow-x-hidden ${
      isLightMode ? 'text-slate-900' : 'text-zinc-100'
    }`}>
      {/* =========================================================================
          1. DUAL VIDEO BACKGROUND ENGINE (LAYER 0 & LAYER 1 CURTAIN WIPE)
          ========================================================================= */}
      {/* Base Layer: Dark Mode Cyberpunk Video (zIndex: 0) */}
      <video
        ref={darkVideoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
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
          className="w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/lnalzoz5/video/upload/v1790946251/night-city-daily-life-cyberpunk-2077-moewalls-com.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* =========================================================================
          2. ADAPTIVE READABILITY OVERLAYS (zIndex: 2)
          ========================================================================= */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-700 z-[2]"
        style={{
          background: isLightMode
            ? "radial-gradient(circle at center, rgba(255, 255, 255, 0.10) 0%, rgba(226, 232, 240, 0.45) 100%)"
            : "radial-gradient(circle at center, rgba(3, 7, 18, 0.60) 0%, rgba(3, 7, 18, 0.85) 100%)"
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
          3. TOP HUD NAVBAR
          ========================================================================= */}
      <header className={`fixed top-0 left-0 right-0 z-50 h-16 px-4 sm:px-8 flex items-center justify-between transition-colors duration-300 ${
        isLightMode
          ? 'bg-white/50 backdrop-blur-xl border-b border-white/60 shadow-xs text-slate-900'
          : 'bg-black/60 backdrop-blur-md border-b border-zinc-800/80 text-white'
      }`}>
        {/* Left Brand Cluster */}
        <a
          href="#hero"
          onClick={sfx.playClick}
          onMouseEnter={sfx.playHover}
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
              SRM IST // AI &amp; ML
            </span>
          </div>
        </a>

        {/* Center Monospace Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs font-mono tracking-widest">
          {[
            { id: 'projects', label: '01. PROJECTS' },
            { id: 'case-studies', label: '02. PIPELINE' },
            { id: 'neural-telemetry', label: '03. DIAGNOSTICS' },
            { id: 'skills', label: '04. SKILLS' },
            { id: 'contact', label: '05. CONTACT' }
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={sfx.playClick}
              onMouseEnter={sfx.playHover}
              className={`transition-colors cursor-pointer whitespace-nowrap ${
                isLightMode
                  ? 'text-slate-800 hover:text-amber-700 font-semibold'
                  : 'text-zinc-400 hover:text-amber-300'
              } ${activeSection === item.id ? 'font-bold text-amber-500' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            onMouseEnter={sfx.playHover}
            className={`relative z-50 pointer-events-auto px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 select-none shadow-sm ${
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

          {/* Audio Toggle Button */}
          <button
            type="button"
            onClick={toggleAudio}
            onMouseEnter={sfx.playHover}
            className={`relative z-50 pointer-events-auto px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer shadow-sm select-none ${
              isPlaying
                ? 'bg-black/80 border border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(255,170,0,0.3)]'
                : isLightMode
                  ? 'bg-white/80 border border-slate-300 text-slate-500 hover:border-slate-400'
                  : 'bg-slate-900/80 border border-zinc-700 text-zinc-400 hover:border-zinc-500'
            }`}
            title={isPlaying ? 'Mute Audio' : 'Activate Audio'}
            aria-label="Toggle Audio"
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse pointer-events-none" />
                <span className="font-semibold text-amber-300 pointer-events-none">[ 🔊 SFX [ACTIVE] ]</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
                <span className="pointer-events-none">[ 🔈x SFX [MUTED] ]</span>
              </>
            )}
          </button>

          {/* SIH 2026 Event Badge */}
          <div className="bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white font-bold text-xs px-4 py-1.5 rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.4)] select-none whitespace-nowrap flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>SIH 2026</span>
          </div>
        </div>
      </header>

      {/* Floating Systems */}
      <SocialRibbon sfx={sfx} onCopyEmail={handleCopyEmail} isLightMode={isLightMode} />
      <TechDroneMascot sfx={sfx} onReboot={handleDroneReboot} isLightMode={isLightMode} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border text-xs font-mono shadow-xl animate-bounce ${
          isLightMode
            ? 'bg-white/95 border-amber-500 text-slate-900 shadow-amber-500/10'
            : 'bg-slate-950/95 border-amber-400 text-amber-300 shadow-[0_0_25px_rgba(255,170,0,0.35)]'
        }`}>
          <Check className="w-4 h-4 text-emerald-400 pointer-events-none" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          4. MAIN CONTENT CONTAINER (NO DEAD SPACES, CALIBRATED py-16)
          ========================================================================= */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 space-y-8 sm:space-y-12">
        {/* =========================================================================
            HERO SECTION
            ========================================================================= */}
        <section id="hero" className="py-16 flex flex-col justify-center relative overflow-visible">
          <div className={`max-w-4xl space-y-6 transition-all duration-300 ${
            isLightMode ? 'bg-white/40 backdrop-blur-md border border-white/60 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_rgba(15,23,42,0.06)]' : ''
          }`}>
            {/* Badges & Status Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className={`px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                isLightMode
                  ? 'bg-amber-500/15 border border-amber-600/40 text-amber-900 font-mono shadow-sm backdrop-blur-md font-bold'
                  : 'bg-black/60 border-amber-500/50 text-amber-300'
              }`}>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                SRM INSTITUTE OF SCIENCE AND TECHNOLOGY
              </span>
              <span className={`px-3 py-1 rounded-full border ${
                isLightMode
                  ? 'bg-white/70 border border-slate-300 text-slate-800 shadow-sm font-mono backdrop-blur-md font-semibold'
                  : 'bg-black/60 border-pink-500/50 text-pink-300'
              }`}>
                CSE (AI &amp; ML) · SECTION B
              </span>
              <span className={`px-3 py-1 rounded-full border ${
                isLightMode
                  ? 'bg-white/70 border border-slate-300 text-slate-800 shadow-sm font-mono backdrop-blur-md font-semibold'
                  : 'bg-black/60 border-slate-700 text-slate-300'
              }`}>
                BATCH 2026 – 2030
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-tech tracking-tight leading-tight ${
                isLightMode
                  ? 'text-slate-950 font-black tracking-tight drop-shadow-sm'
                  : 'font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]'
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
            <p className={`text-sm sm:text-base leading-relaxed ${
              isLightMode
                ? 'text-slate-900 font-mono text-sm leading-relaxed font-semibold'
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
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <MagneticButton>
                <a
                  href="#projects"
                  onClick={sfx.playClick}
                  onMouseEnter={sfx.playHover}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold px-6 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(255,170,0,0.5)] flex items-center gap-2 font-mono text-xs transition-all cursor-pointer shadow-md"
                >
                  <Cpu className="w-4 h-4 text-black pointer-events-none" />
                  <span className="pointer-events-none">VIEW SYSTEMS</span>
                </a>
              </MagneticButton>

              <MagneticButton>
                <button
                  onClick={() => {
                    sfx.playClick();
                    handleCopyEmail();
                  }}
                  onMouseEnter={sfx.playHover}
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
        </section>

        {/* =========================================================================
            01. PROJECTS SECTION
            ========================================================================= */}
        <section id="projects" className="py-16 flex flex-col justify-center space-y-8 scroll-mt-24">
          <div className="border-b border-zinc-500/20 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className={`text-xs font-mono tracking-widest mb-1 ${
                isLightMode ? 'text-[#c2410c] font-semibold' : 'text-amber-400'
              }`}>
                // DEPLOYED PLATFORMS
              </div>
              <h2 className={`text-2xl sm:text-4xl font-tech ${
                isLightMode ? 'text-slate-950 font-extrabold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]' : 'font-bold text-white'
              }`}>
                01. 3D Holographic Project Matrix
              </h2>
            </div>
            <div className={`text-xs font-mono ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>
              REAL-TIME PERSPECTIVE (ROTATE X/Y)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project) => (
              <HolographicProjectCard
                key={project.id}
                project={project}
                onInspect={(p) => setSelectedProject(p)}
                sfx={sfx}
                isLightMode={isLightMode}
              />
            ))}
          </div>
        </section>

        {/* =========================================================================
            02. PIPELINE SECTION
            ========================================================================= */}
        <section id="case-studies" className="py-16 flex flex-col justify-center space-y-8 scroll-mt-24">
          <div className="border-b border-zinc-500/20 pb-4">
            <div className={`text-xs font-mono tracking-widest mb-1 ${
              isLightMode ? 'text-[#c2410c] font-semibold' : 'text-amber-400'
            }`}>
              // ARCHITECTURAL PIPELINE
            </div>
            <h2 className={`text-2xl sm:text-4xl font-tech ${
              isLightMode ? 'text-slate-950 font-extrabold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]' : 'font-bold text-white'
            }`}>
              02. End-to-End ML Inference Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioData.pipelineSteps.map((step) => (
              <div
                key={step.step}
                className={`p-6 rounded-2xl border transition-all ${
                  isLightMode
                    ? 'bg-white/40 hover:bg-white/55 backdrop-blur-xl border border-white/70 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
                    : 'bg-[#0b0f19]/80 backdrop-blur-xl border border-zinc-800 text-zinc-100'
                }`}
              >
                <span className="text-3xl font-mono font-bold text-amber-500 block mb-2">{step.step}</span>
                <h4 className={`text-lg font-bold font-tech mb-2 ${isLightMode ? 'text-slate-950' : 'text-white'}`}>{step.title}</h4>
                <div className={`text-xs font-mono mb-3 ${isLightMode ? 'text-slate-600 font-medium' : 'text-zinc-400'}`}>{step.tech}</div>
                <p className={`text-xs leading-relaxed ${isLightMode ? 'text-slate-800 font-medium' : 'text-zinc-300'}`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            03. DIAGNOSTICS SECTION
            ========================================================================= */}
        <section id="neural-telemetry" className="py-16 flex flex-col justify-center scroll-mt-24">
          <LiveNeuralPipelineDiagnostics sfx={sfx} isLightMode={isLightMode} />
        </section>

        {/* =========================================================================
            04. SKILLS SECTION
            ========================================================================= */}
        <section id="skills" className="py-16 flex flex-col justify-center space-y-8 scroll-mt-24">
          <div className="border-b border-zinc-500/20 pb-4">
            <div className={`text-xs font-mono tracking-widest mb-1 ${
              isLightMode ? 'text-[#c2410c] font-semibold' : 'text-amber-400'
            }`}>
              // SYSTEM MATRICES
            </div>
            <h2 className={`text-2xl sm:text-4xl font-tech ${
              isLightMode ? 'text-slate-950 font-extrabold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]' : 'font-bold text-white'
            }`}>
              04. Technical Capabilities &amp; Stack Telemetry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.skills.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className={`p-6 rounded-2xl border transition-all ${
                  isLightMode
                    ? 'bg-white/40 hover:bg-white/55 backdrop-blur-xl border border-white/70 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
                    : 'bg-[#0b0f19]/80 backdrop-blur-xl border border-zinc-800 text-zinc-100'
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
                      className={`text-xs font-mono px-3 py-1.5 rounded-lg border ${
                        isLightMode
                          ? 'bg-white/70 border-slate-300/80 text-slate-800 font-medium'
                          : 'bg-zinc-900/90 border-zinc-800 text-zinc-300'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            05. CONTACT TRANSMISSION SECTION
            ========================================================================= */}
        <section id="contact" className="py-16 flex flex-col justify-center space-y-8 scroll-mt-24">
          <div className={`rounded-2xl p-8 sm:p-12 text-center space-y-6 border transition-all ${
            isLightMode
              ? 'bg-white/40 backdrop-blur-xl border border-white/70 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
              : 'bg-[#0b0f19]/85 backdrop-blur-xl border border-zinc-800 text-zinc-100'
          }`}>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border ${
              isLightMode
                ? 'bg-amber-500/15 border border-amber-600/40 text-amber-900 font-mono shadow-sm backdrop-blur-md font-bold'
                : 'bg-amber-950/80 border-amber-500/40 text-amber-300'
            }`}>
              <Radio className="w-3.5 h-3.5 text-amber-500 animate-pulse pointer-events-none" />
              <span>TRANSMISSION PROTOCOL OPEN</span>
            </div>

            <h2 className={`text-3xl sm:text-5xl font-tech ${
              isLightMode ? 'text-slate-950 font-extrabold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]' : 'font-bold text-white'
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
                    sfx.playClick();
                    handleCopyEmail();
                  }}
                  onMouseEnter={sfx.playHover}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 hover:brightness-110 text-white font-mono font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Copy className="w-4 h-4 pointer-events-none" />
                  <span className="pointer-events-none">COPY: 090109ayush@gmail.com</span>
                </button>
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>

      {/* Inspect Project Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`max-w-2xl w-full p-6 sm:p-8 rounded-2xl border shadow-2xl relative ${
                isLightMode ? 'bg-white text-slate-900 border-slate-300' : 'bg-slate-950 text-white border-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between border-b border-zinc-500/20 pb-4 mb-4">
                <h3 className="text-xl font-bold font-tech">{selectedProject.title}</h3>
                <button
                  onClick={() => {
                    sfx.playClick();
                    setSelectedProject(null);
                  }}
                  className="px-3 py-1 rounded-lg border text-xs font-mono hover:bg-zinc-500/20 cursor-pointer"
                >
                  ESC // CLOSE
                </button>
              </div>
              <p className="text-sm leading-relaxed mb-6">{selectedProject.description}</p>
              
              <div className="grid grid-cols-3 gap-3 mb-6 font-mono text-xs">
                <div className={`p-3 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-zinc-800'}`}>
                  <span className="text-[10px] text-zinc-400 block">ACCURACY</span>
                  <span className="text-emerald-500 font-bold">{selectedProject.metrics.accuracy}</span>
                </div>
                <div className={`p-3 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-zinc-800'}`}>
                  <span className="text-[10px] text-zinc-400 block">LATENCY</span>
                  <span className="text-amber-500 font-bold">{selectedProject.metrics.latency}</span>
                </div>
                <div className={`p-3 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-zinc-800'}`}>
                  <span className="text-[10px] text-zinc-400 block">PARAMETERS</span>
                  <span className="text-cyan-500 font-bold">{selectedProject.metrics.parameters}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-black font-semibold text-xs font-mono hover:bg-amber-400 cursor-pointer flex items-center gap-1.5"
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
