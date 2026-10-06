import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Code, Cpu, Sparkles, Rocket } from 'lucide-react';
import { cyberSound } from '../utils/audioSystem';

interface JourneyTimelineProps {
  isLightMode: boolean;
  onPlaySFX?: () => void;
}

const MILESTONES = [
  {
    year: "2024",
    title: "Started Programming",
    subtitle: "Foundations of Algorithmic Logic & Core Languages",
    description: "Began deep dive into computational thinking, data structures, and algorithmic complexity. Built foundational mastery in Python, C++, and object-oriented architectural patterns.",
    icon: Terminal,
    tags: ["Python", "C++", "Algorithms", "Linear Algebra"],
    accent: "from-amber-500 to-orange-500",
    telemetry: "KERNEL // 01 INGESTION"
  },
  {
    year: "2025",
    title: "Web Development",
    subtitle: "Reactive Interfaces & High-Performance Client Architectures",
    description: "Engineered scalable web applications with TypeScript, React, and Tailwind CSS. Explored hardware-accelerated WebGL graphics, Web Audio API synthesizers, and real-time state machines.",
    icon: Code,
    tags: ["TypeScript", "React", "Three.js / WebGL", "Web Audio API", "Tailwind CSS"],
    accent: "from-cyan-500 to-blue-500",
    telemetry: "CLIENT // REACTIVE MESH"
  },
  {
    year: "2026",
    title: "B.Tech CSE AI/ML",
    subtitle: "SRM IST Academic & SIH 2026 Competitive Engineering",
    description: "Entered SRM Institute of Science and Technology for B.Tech in CSE (AI & ML) (Batch 2026–2030). Engineered LandWatch AI for Smart India Hackathon 2026, combining XGBoost risk models with SHAP attribution.",
    icon: Cpu,
    tags: ["SRM IST", "XGBoost", "TreeSHAP", "Smart India Hackathon", "FastAPI"],
    accent: "from-pink-500 to-purple-500",
    telemetry: "RESEARCH // SURROGATE MODELS"
  },
  {
    year: "NOW",
    title: "Building AI Systems",
    subtitle: "Explainable Machine Intelligence & Quantum Optimizers",
    description: "Architecting end-to-end autonomous machine intelligence suites. Pioneering Quadratic Unconstrained Binary Optimization (QUBO) and QAOA variational circuits for renewable microgrid dispatch.",
    icon: Rocket,
    tags: ["QUBO / QAOA", "Qiskit", "Explainable AI", "Autonomous Agents", "Edge ONNX"],
    accent: "from-emerald-400 to-teal-500",
    telemetry: "CURRENT // QUANTUM + AI"
  }
];

export default function JourneyTimeline({ isLightMode, onPlaySFX }: JourneyTimelineProps) {
  return (
    <section id="timeline" className="py-16 flex flex-col justify-center space-y-10 scroll-mt-24">
      {/* Section Header */}
      <div className="border-b border-zinc-500/20 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className={`text-xs font-mono tracking-widest mb-1 ${
            isLightMode ? 'text-[#c2410c] font-semibold' : 'text-amber-400'
          }`}>
            // EVOLUTIONARY TELEMETRY
          </div>
          <h2 className={`text-2xl sm:text-4xl font-tech ${
            isLightMode ? 'text-slate-950 font-extrabold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]' : 'font-bold text-white'
          }`}>
            Journey Timeline &amp; Milestones
          </h2>
        </div>
        <div className={`text-xs font-mono ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>
          CHRONOLOGICAL PROGRESSION // 2024 — PRESENT
        </div>
      </div>

      {/* Futuristic Timeline Track */}
      <div className="relative">
        {/* Background Laser Guide Track */}
        <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-zinc-800/60" />

        {/* Self-Drawing Animated Laser Axis Line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ originY: 0 }}
          className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-amber-500 via-cyan-400 to-emerald-400 shadow-[0_0_15px_rgba(255,170,0,0.8)] z-10"
        />

        <div className="space-y-12">
          {MILESTONES.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.year}
                initial={{
                  opacity: 0,
                  x: isEven ? 40 : -40,
                  filter: 'blur(6px)'
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  filter: 'blur(0px)'
                }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                onViewportEnter={() => {
                  cyberSound.playScrollTick();
                  if (onPlaySFX) onPlaySFX();
                }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 sm:gap-12 pl-14 sm:pl-0`}
              >
                {/* Center Node Hologram */}
                <div className="absolute left-6 sm:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${item.accent} p-[1px] shadow-lg`}>
                    <div className={`w-full h-full rounded-2xl flex items-center justify-center ${
                      isLightMode ? 'bg-white' : 'bg-black'
                    }`}>
                      <Icon className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>
                  {/* Subtle Radar Pulse */}
                  <span className="absolute -inset-1 rounded-2xl bg-amber-400/20 animate-ping pointer-events-none" />
                </div>

                {/* Content Card (Left or Right) */}
                <div className="w-full sm:w-1/2">
                  <div
                    className={`crystal-glass crystal-glass-hover-amber p-6 sm:p-7 relative transition-all duration-300 ${
                      isLightMode
                        ? 'bg-white/80 border-slate-200/80 shadow-[0_12px_35px_rgb(0,0,0,0.06)]'
                        : 'bg-[rgba(10,10,15,0.72)] border-white/10 text-white shadow-2xl hover:border-[#FFB703]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(255,183,3,0.12)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-2xl sm:text-3xl font-tech font-black tracking-wider bg-gradient-to-r ${item.accent} bg-clip-text text-transparent`}>
                        {item.year}
                      </span>
                      <span className="text-[10px] font-mono tracking-widest text-[#9CA3AF] px-2 py-0.5 rounded border border-white/10">
                        {item.telemetry}
                      </span>
                    </div>

                    <h3 className={`text-xl font-bold font-tech mb-1 ${
                      isLightMode ? 'text-slate-950 font-bold' : 'text-white'
                    }`}>
                      {item.title}
                    </h3>

                    <div className={`text-xs font-mono mb-3 ${
                      isLightMode ? 'text-amber-800 font-semibold' : 'text-[#FFB703]'
                    }`}>
                      {item.subtitle}
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                      isLightMode ? 'text-slate-800 font-medium' : 'text-[#9CA3AF]'
                    }`}>
                      {item.description}
                    </p>

                    {/* Skill Tags: Electric Teal / Amber */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                            isLightMode
                              ? 'bg-white/80 border-slate-300 text-slate-800 font-medium'
                              : 'bg-white/[0.03] border-white/10 text-[#00F5D4]'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty side for symmetry on desktop */}
                <div className="hidden sm:block sm:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
