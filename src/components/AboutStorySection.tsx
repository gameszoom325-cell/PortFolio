import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal, Cpu, Atom, ShieldCheck, Compass, Code2, ArrowUpRight } from 'lucide-react';
import { cyberSound } from '../utils/audioSystem';

interface AboutStorySectionProps {
  isLightMode: boolean;
}

const STORY_PILLARS = [
  {
    id: 'pillar-ai',
    number: '01',
    title: 'Explainable AI & Surrogate Models',
    subtitle: 'Transparent Mathematics over Black Boxes',
    icon: Cpu,
    tag: 'CORE ML ENGINE',
    description:
      'Rather than accepting uninterpretable black-box predictions, my research focuses on game-theoretic Shapley additive feature attribution (SHAP) coupled with tuned gradient-boosted ensembles (XGBoost). In LandWatch AI, this enables municipal auditors to trace statutory delay factors to their exact statutory root causes in 42ms.',
    highlight: 'AUC-ROC 0.942 on 150k+ civic records',
    hologramColor: '#FFB703'
  },
  {
    id: 'pillar-quantum',
    number: '02',
    title: 'Quantum Heuristic Optimization',
    subtitle: 'QUBO Mapping & Variational Circuits',
    icon: Atom,
    tag: 'QUANTUM RESEARCH',
    description:
      'Translating non-convex microgrid dispatch and battery degradation constraints into Quadratic Unconstrained Binary Optimization (QUBO) matrices. Using QAOA variational quantum circuits with alternating mixer and cost Hamiltonians, achieving an 18.4% transmission loss reduction over classical baselines.',
    highlight: '24 Qubits statevector simulation (p=4 ansatz)',
    hologramColor: '#00F5D4'
  },
  {
    id: 'pillar-webgl',
    number: '03',
    title: 'High-FPS Reactive Architecture',
    subtitle: 'Hardware-Accelerated Interfaces & WebGL',
    icon: Code2,
    tag: 'FRONTEND SYSTEMS',
    description:
      'Crafting high-octane digital experiences where motion is not decorative, but communicates system state. Leveraging React 19, Three.js shaders, Web Audio synthesizer architectures, and Tailwind CSS to build cybernetic command centers that maintain locked 60 FPS performance on all devices.',
    highlight: 'Zero-jank 60 FPS with custom WebGL shaders',
    hologramColor: '#00F5D4'
  },
  {
    id: 'pillar-mission',
    number: '04',
    title: 'Autonomous Civic Technology',
    subtitle: 'Smart India Hackathon 2026 Active Contender',
    icon: Compass,
    tag: 'CIVIC IMPACT',
    description:
      'Applying predictive intelligence to solve structural real-world friction. Active contender at Smart India Hackathon 2026 with LandWatch AI, solving India’s 14–26 month statutory land record delay crisis, alongside the Smart Farmer Portal which delivers bilingual neural pathology diagnostics to rural farming communities.',
    highlight: 'SIH 2026 Contender & AgriTech deployed platforms',
    hologramColor: '#80ED99'
  }
];

export default function AboutStorySection({ isLightMode }: AboutStorySectionProps) {
  const [activePillar, setActivePillar] = useState<string>(STORY_PILLARS[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = STORY_PILLARS.find((p) => p.id === activePillar) || STORY_PILLARS[0];
  const SelectedIcon = selected.icon;

  return (
    <section id="about" className="py-12 sm:py-20 flex flex-col justify-center space-y-10 scroll-mt-24">
      {/* Header with progressive focus reveal */}
      <motion.div
        initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="border-b border-zinc-500/20 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <div className={`text-xs font-mono tracking-widest mb-1 ${
            isLightMode ? 'text-[#c2410c] font-semibold' : 'text-amber-400'
          }`}>
            // IDENTITY DOSSIER &amp; CORE PHILOSOPHY
          </div>
          <h2 className={`text-2xl sm:text-4xl font-tech ${
            isLightMode ? 'text-slate-950 font-extrabold' : 'font-bold text-white'
          }`}>
            Identity &amp; Engineering Philosophy
          </h2>
        </div>
        <div className={`text-xs font-mono ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>
          INTERACTIVE PILLARS // CLICK TO DEEP-DIVE
        </div>
      </motion.div>

      {/* Main Storytelling Interactive Layout */}
      <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Wing: Identity Dossier Card with Layered Depth (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className={`lg:col-span-5 crystal-glass crystal-glass-hover-amber p-6 sm:p-8 relative ${
            isLightMode ? 'bg-white/80' : 'bg-[rgba(10,10,15,0.72)]'
          }`}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-16 -left-16 w-44 h-44 rounded-full bg-[#FFB703]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-44 h-44 rounded-full bg-[#00F5D4]/15 blur-3xl pointer-events-none" />

          {/* Dossier Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#80ED99] animate-ping" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#80ED99] uppercase">
                ENGINEER DOSSIER // AUTHENTICATED
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#9CA3AF]">SRM IST · 2026–2030</span>
          </div>

          {/* Identity Snapshot */}
          <div className="space-y-4 mb-6">
            <h3 className={`text-2xl font-tech font-bold ${isLightMode ? 'text-slate-950' : 'text-white'}`}>
              Ayush Singh
            </h3>
            <p className={`text-xs sm:text-sm font-mono leading-relaxed ${
              isLightMode ? 'text-slate-700' : 'text-[#9CA3AF]'
            }`}>
              Computer Science &amp; Engineering undergraduate specializing in{' '}
              <strong className={isLightMode ? 'text-amber-800 font-bold' : 'text-[#FFB703] font-bold'}>
                Artificial Intelligence &amp; Machine Learning
              </strong>{' '}
              at SRM Institute of Science and Technology.
            </p>
            <p className={`text-xs font-mono leading-relaxed ${
              isLightMode ? 'text-slate-600' : 'text-zinc-400'
            }`}>
              Bridging the gap between cutting-edge computational theory and production-grade reactive software: from mathematical explainability in municipal delay analytics to quantum microgrid optimization.
            </p>
          </div>

          {/* Quick Metrics Matrix */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className={`p-3 rounded-2xl border transition-all duration-300 hover:border-[#FFB703]/40 ${isLightMode ? 'bg-white/80 border-slate-200' : 'bg-white/[0.03] border-white/10 shadow-inner'}`}>
              <span className="text-[9px] font-mono text-[#9CA3AF] block">SPECIALIZATION</span>
              <span className="text-xs font-mono font-bold text-[#FFB703]">AI / ML · Section B</span>
            </div>
            <div className={`p-3 rounded-2xl border transition-all duration-300 hover:border-[#80ED99]/40 ${isLightMode ? 'bg-white/80 border-slate-200' : 'bg-white/[0.03] border-white/10 shadow-inner'}`}>
              <span className="text-[9px] font-mono text-[#9CA3AF] block">HACKATHON FOCUS</span>
              <span className="text-xs font-mono font-bold text-[#80ED99]">SIH 2026 Active</span>
            </div>
            <div className={`p-3 rounded-2xl border transition-all duration-300 hover:border-[#00F5D4]/40 ${isLightMode ? 'bg-white/80 border-slate-200' : 'bg-white/[0.03] border-white/10 shadow-inner'}`}>
              <span className="text-[9px] font-mono text-[#9CA3AF] block">PRIMARY SURROGATE</span>
              <span className="text-xs font-mono font-bold text-[#00F5D4]">XGBoost + SHAP</span>
            </div>
            <div className={`p-3 rounded-2xl border transition-all duration-300 hover:border-[#FFB703]/40 ${isLightMode ? 'bg-white/80 border-slate-200' : 'bg-white/[0.03] border-white/10 shadow-inner'}`}>
              <span className="text-[9px] font-mono text-[#9CA3AF] block">QUANTUM CIRCUITS</span>
              <span className="text-xs font-mono font-bold text-[#FFB703]">QUBO / QAOA (p=4)</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`p-3 rounded-2xl border flex items-center justify-between text-xs font-mono ${
            isLightMode ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-[#FFB703]/10 border-[#FFB703]/30 text-[#FFB703]'
          }`}>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#80ED99]" />
              <span>STATUS: OPEN FOR RESEARCH &amp; BUILDS</span>
            </span>
            <span className="text-[10px] uppercase font-bold text-[#80ED99]">ONLINE</span>
          </div>
        </motion.div>

        {/* Right Wing: Interactive Pillars & Deep Dive (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Pillar Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {STORY_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              const isActive = pillar.id === activePillar;

              return (
                <button
                  key={pillar.id}
                  onClick={() => {
                    cyberSound.playClick();
                    setActivePillar(pillar.id);
                  }}
                  onMouseEnter={() => cyberSound.playHover()}
                  className={`p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-24 relative overflow-hidden backdrop-blur-2xl ${
                    isActive
                      ? isLightMode
                        ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-[1.02]'
                        : 'bg-[rgba(14,14,22,0.88)] text-white border-[#FFB703] shadow-[0_0_25px_rgba(255,183,3,0.35)] scale-[1.02]'
                      : isLightMode
                        ? 'bg-white/70 border-slate-200 text-slate-700 hover:border-slate-300'
                        : 'bg-white/[0.03] border-white/10 text-[#9CA3AF] hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono opacity-80">{pillar.number}</span>
                    <Icon className="w-4 h-4 pointer-events-none" />
                  </div>
                  <div className="text-[11px] font-bold font-tech line-clamp-2 leading-tight">
                    {pillar.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Showcase Card with Motion */}
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 25, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={`crystal-glass crystal-glass-hover-teal p-6 sm:p-8 relative ${
              isLightMode ? 'bg-white/80' : 'bg-[rgba(10,10,15,0.72)]'
            }`}
          >
            {/* Top Tag & Number */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-[10px] font-mono tracking-widest px-3 py-1 rounded-full uppercase border font-bold"
                style={{
                  color: selected.hologramColor,
                  borderColor: `${selected.hologramColor}50`,
                  backgroundColor: `${selected.hologramColor}15`
                }}
              >
                {selected.tag}
              </span>
              <span className="text-2xl font-mono font-bold text-white/30">
                // {selected.number}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h4 className={`text-2xl font-tech font-bold mb-1 ${isLightMode ? 'text-slate-950' : 'text-white'}`}>
              {selected.title}
            </h4>
            <div className="text-xs font-mono text-[#FFB703] font-semibold mb-4">
              {selected.subtitle}
            </div>

            {/* Pillar Narrative */}
            <p className={`text-xs sm:text-sm font-mono leading-relaxed mb-6 ${
              isLightMode ? 'text-slate-800' : 'text-[#9CA3AF]'
            }`}>
              {selected.description}
            </p>

            {/* Live Highlight Telemetry Banner */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              isLightMode ? 'bg-amber-50/80 border-amber-200 text-amber-950' : 'bg-white/[0.03] border-white/10 text-white shadow-inner'
            }`}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFB703] animate-pulse" />
                <span className="text-xs font-mono font-bold">{selected.highlight}</span>
              </div>
              <span className="text-[10px] font-mono text-[#80ED99] uppercase hidden sm:inline font-semibold">
                TELEMETRY VALIDATED
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
