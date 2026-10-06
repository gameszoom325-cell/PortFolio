import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Activity, Cpu, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { cyberSound } from '../utils/audioSystem';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  metrics: {
    accuracy: string;
    latency: string;
    parameters: string;
  };
  liveUrl: string;
  repoUrl: string;
  hologramColor: string;
}

interface HolographicProjectCardProps {
  project: ProjectData;
  onInspect: (p: ProjectData) => void;
  isLightMode: boolean;
  index?: number;
}

export default function HolographicProjectCard({
  project,
  onInspect,
  isLightMode,
  index = 0
}: HolographicProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [reflectionPos, setReflectionPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = (-(y - centerY) / centerY) * 12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setReflectionPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    cyberSound.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Render project-specific 3D schematic graphics
  const renderProjectVisual = () => {
    if (project.id === 'landwatch') {
      return (
        <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center p-3 select-none">
          <div className="absolute inset-0 cyber-grid-pattern opacity-30" />
          {/* Spatial Vector Lines */}
          <svg className="w-full h-full" viewBox="0 0 300 120" fill="none">
            <path
              d="M 20 90 Q 90 20 160 70 T 280 40"
              stroke="#FFB703"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-pulse"
            />
            <path
              d="M 30 40 C 90 100 180 10 270 80"
              stroke="#00F5D4"
              strokeWidth="1.5"
              opacity="0.8"
            />
            {/* Clearance Nodes */}
            <circle cx="90" cy="52" r="4" fill="#FFB703" />
            <circle cx="160" cy="70" r="5" fill="#80ED99" />
            <circle cx="230" cy="48" r="4" fill="#00F5D4" />
          </svg>
          <div className="absolute top-2 right-2 text-[9px] font-mono px-2 py-0.5 rounded bg-black/70 text-[#FFB703] border border-[#FFB703]/40">
            AUC // 0.942
          </div>
          <div className="absolute bottom-2 left-2 text-[9px] font-mono text-[#9CA3AF] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#80ED99] animate-ping" />
            <span>SHAP WATERFALL // 42ms</span>
          </div>
        </div>
      );
    }

    if (project.id === 'smart-farmer') {
      return (
        <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center p-3 select-none">
          <div className="absolute inset-0 cyber-grid-pattern opacity-30" />
          {/* Multispectral Imagery Grid */}
          <div className="grid grid-cols-4 gap-1.5 w-full h-full opacity-85 p-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#00F5D4]/20 flex flex-col items-center justify-center bg-[#00F5D4]/5"
              >
                <span className="text-[8px] font-mono text-[#00F5D4]">CH-0{i + 1}</span>
                <span className="text-[10px] font-bold text-[#FFFFFF]">{(88 + i * 1.5).toFixed(1)}%</span>
              </div>
            ))}
          </div>
          <div className="absolute top-2 right-2 text-[9px] font-mono px-2 py-0.5 rounded bg-black/70 text-[#80ED99] border border-[#80ED99]/40">
            ViT // 94.1%
          </div>
          <div className="absolute bottom-2 left-2 text-[9px] font-mono text-[#9CA3AF] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#80ED99] animate-ping" />
            <span>SPECTRAL NDVI TELEMETRY</span>
          </div>
        </div>
      );
    }

    if (project.id === 'quantum-grid') {
      return (
        <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center p-3 select-none">
          <div className="absolute inset-0 cyber-grid-pattern opacity-30" />
          {/* Qubit Hamiltonian Array */}
          <div className="flex items-center justify-center gap-4 w-full">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full border border-[#00F5D4] flex items-center justify-center text-[10px] font-mono text-[#00F5D4] bg-[#00F5D4]/10 shadow-[0_0_10px_rgba(0,245,212,0.3)]">
                  |q{i}⟩
                </div>
                <div className="w-[1px] h-4 bg-[#00F5D4]/40" />
              </div>
            ))}
          </div>
          <div className="absolute top-2 right-2 text-[9px] font-mono px-2 py-0.5 rounded bg-black/70 text-[#00F5D4] border border-[#00F5D4]/40">
            QAOA // 24 Qubits
          </div>
          <div className="absolute bottom-2 left-2 text-[9px] font-mono text-[#9CA3AF] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#80ED99] animate-ping" />
            <span>GRID LOSS: -18.4%</span>
          </div>
        </div>
      );
    }

    // Default / KNOXXED1TS
    return (
      <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center p-3 select-none">
        <div className="absolute inset-0 cyber-grid-pattern opacity-30" />
        <div className="flex items-end justify-center gap-1 w-full h-20 px-4">
          {[40, 75, 30, 90, 60, 85, 45, 95, 70, 50, 80, 65, 90, 35].map((val, i) => (
            <motion.div
              key={i}
              className="w-2 rounded-t bg-gradient-to-t from-[#00F5D4] to-[#FFB703]"
              animate={{ height: [`${val * 0.4}%`, `${val}%`, `${val * 0.6}%`] }}
              transition={{ duration: 1.2 + (i % 3) * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
        <div className="absolute top-2 right-2 text-[9px] font-mono px-2 py-0.5 rounded bg-black/70 text-[#FFB703] border border-[#FFB703]/40">
          WEBGL // 60 FPS
        </div>
        <div className="absolute bottom-2 left-2 text-[9px] font-mono text-[#9CA3AF] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-ping" />
          <span>KINETIC MOTION GRAPHICS</span>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
        scale: 0.93,
        rotateZ: index % 2 === 0 ? -4 : 4,
        filter: 'blur(8px)'
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateZ: 0,
        filter: 'blur(0px)'
      }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: (index % 2) * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="relative group"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
            isHovered ? 'translateZ(20px) scale3d(1.018, 1.018, 1.018)' : 'translateZ(0px) scale3d(1, 1, 1)'
          }`,
          transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease'
        }}
        className={`crystal-glass p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl ${
          isLightMode
            ? 'bg-white/80 hover:bg-white/95 border-slate-200/80 hover:border-amber-500/50 shadow-[0_16px_45px_rgba(0,0,0,0.08)]'
            : 'bg-[rgba(10,10,15,0.74)] border-white/10 text-[#FFFFFF] hover:border-[#FFB703]/55 hover:shadow-[0_24px_55px_rgba(0,0,0,0.85),0_0_40px_rgba(255,183,3,0.12)]'
        }`}
      >
        {/* Dynamic Glass Reflection Sheen that moves with mouse cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: isHovered
              ? `radial-gradient(circle 240px at ${reflectionPos.x}% ${reflectionPos.y}%, rgba(255, 255, 255, ${isLightMode ? 0.35 : 0.12}), transparent 70%)`
              : 'none',
            opacity: isHovered ? 1 : 0
          }}
        />

        {/* Ambient Corner Glow Accent */}
        <div
          className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-opacity duration-300"
          style={{
            backgroundColor: project.hologramColor,
            opacity: isHovered ? 0.28 : 0.08
          }}
        />

        <div className="space-y-4 relative z-10">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <span
              className={`text-[10px] font-mono tracking-widest px-3 py-1 rounded-full uppercase border font-bold ${
                isLightMode
                  ? 'bg-amber-500/15 border-amber-600/40 text-amber-900 backdrop-blur-md'
                  : 'bg-[#FFB703]/10 border-[#FFB703]/30 text-[#FFB703] shadow-[0_0_10px_rgba(255,183,3,0.2)]'
              }`}
            >
              {project.category}
            </span>
            <span className={`font-mono text-xs ${isLightMode ? 'text-slate-600' : 'text-[#9CA3AF]'}`}>
              ID // {project.id}
            </span>
          </div>

          {/* 3D Visual Schematic / Image Preview */}
          {renderProjectVisual()}

          {/* Project Title */}
          <h3 className={`font-tech text-2xl font-bold tracking-tight ${
            isLightMode ? 'text-slate-950 font-bold' : 'text-[#FFFFFF]'
          }`}>
            {project.title}
          </h3>

          {/* Short Description */}
          <p className={`leading-relaxed line-clamp-3 text-xs sm:text-sm ${
            isLightMode ? 'text-slate-800 font-medium' : 'text-[#9CA3AF]'
          }`}>
            {project.description}
          </p>

          {/* Tech Stack Chips: Electric Teal */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className={`text-[10px] font-mono px-2.5 py-0.5 rounded-md border transition-colors ${
                  isLightMode
                    ? 'bg-white/80 border-slate-300 text-slate-800 font-medium'
                    : 'bg-[#00F5D4]/10 border-[#00F5D4]/30 text-[#00F5D4]'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer with Metrics and Live Buttons */}
        <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-[#9CA3AF] block text-[9px]">ACCURACY</span>
              <span className="text-[#80ED99] font-bold">{project.metrics.accuracy}</span>
            </div>
            <div>
              <span className="text-[#9CA3AF] block text-[9px]">LATENCY</span>
              <span className="text-[#FFB703] font-bold">{project.metrics.latency}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => cyberSound.playClick()}
              onMouseEnter={() => cyberSound.playHover()}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isLightMode
                  ? 'bg-white border-slate-300 text-slate-800 hover:border-amber-500 hover:text-amber-600 shadow-sm'
                  : 'bg-white/5 border-white/10 text-white hover:border-[#00F5D4]/50 hover:text-[#00F5D4] shadow-sm'
              }`}
              title="Launch Live Demo"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => {
                cyberSound.playClick();
                onInspect(project);
              }}
              onMouseEnter={() => cyberSound.playHover()}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                isLightMode
                  ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-md'
                  : 'bg-[#FFB703] text-black hover:bg-[#ffc32b] hover:shadow-[0_0_15px_rgba(255,183,3,0.4)]'
              }`}
            >
              INSPECT
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
