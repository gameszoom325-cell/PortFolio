import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Atom, Globe, Server, Sparkles, Terminal, Activity, Layers } from 'lucide-react';
import { cyberSound } from '../utils/audioSystem';

interface SkillNode {
  id: string;
  name: string;
  category: 'ai' | 'quantum' | 'web' | 'cloud';
  proficiency: number;
  highlight: string;
  iconName?: string;
  coords: { x: number; y: number }; // percentage position around center
}

const SKILL_NODES: SkillNode[] = [
  // AI & ML Cluster (Top & Top-Left)
  { id: 'python', name: 'Python', category: 'ai', proficiency: 96, highlight: 'Core modeling, NumPy, Pandas, Data pipelines', coords: { x: 28, y: 18 } },
  { id: 'xgboost', name: 'XGBoost', category: 'ai', proficiency: 94, highlight: 'Gradient boosting, hyperparameter Optuna', coords: { x: 15, y: 35 } },
  { id: 'shap', name: 'TreeSHAP', category: 'ai', proficiency: 92, highlight: 'Explainable AI, factor attribution waterfalls', coords: { x: 22, y: 55 } },
  { id: 'pytorch', name: 'PyTorch (ViT)', category: 'ai', proficiency: 90, highlight: 'Vision Transformers, multi-spectral models', coords: { x: 38, y: 24 } },

  // Quantum Cluster (Top-Right)
  { id: 'qubo', name: 'QUBO Formulation', category: 'quantum', proficiency: 88, highlight: 'Ising Hamiltonian microgrid mapping', coords: { x: 72, y: 18 } },
  { id: 'qaoa', name: 'QAOA Circuits', category: 'quantum', proficiency: 86, highlight: 'Variational quantum ansatz depth p=4', coords: { x: 84, y: 36 } },
  { id: 'qiskit', name: 'Qiskit / NumPy', category: 'quantum', proficiency: 85, highlight: 'Quantum statevector simulation', coords: { x: 76, y: 54 } },

  // Web & Reactive Systems (Bottom-Left)
  { id: 'react', name: 'React 19', category: 'web', proficiency: 95, highlight: 'Component architectures, reactive hooks', coords: { x: 18, y: 76 } },
  { id: 'typescript', name: 'TypeScript', category: 'web', proficiency: 94, highlight: 'Strict typing, modern ESNext runtimes', coords: { x: 32, y: 82 } },
  { id: 'threejs', name: 'Three.js / WebGL', category: 'web', proficiency: 91, highlight: '3D scene graphs, shaders, canvas physics', coords: { x: 42, y: 70 } },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'web', proficiency: 96, highlight: 'Cybernetic HUDs, responsive layout design', coords: { x: 25, y: 92 } },

  // Backend & Pipelines (Bottom-Right)
  { id: 'fastapi', name: 'FastAPI', category: 'cloud', proficiency: 92, highlight: 'Asynchronous REST APIs, microservices', coords: { x: 62, y: 74 } },
  { id: 'docker', name: 'Docker / Cloud Run', category: 'cloud', proficiency: 89, highlight: 'Containerized inference deployment', coords: { x: 78, y: 80 } },
  { id: 'postgres', name: 'PostgreSQL / Redis', category: 'cloud', proficiency: 88, highlight: 'Relational & in-memory caching grids', coords: { x: 85, y: 66 } },
  { id: 'git', name: 'Git / CI/CD', category: 'cloud', proficiency: 93, highlight: 'Collaborative pipelines, automated builds', coords: { x: 70, y: 92 } }
];

const CATEGORY_COLORS = {
  ai: { border: 'border-[#FFB703]/50', bg: 'bg-[#FFB703]/10', text: 'text-[#FFB703]', glow: 'rgba(255,183,3,0.4)' },
  quantum: { border: 'border-[#00F5D4]/50', bg: 'bg-[#00F5D4]/10', text: 'text-[#00F5D4]', glow: 'rgba(0,245,212,0.4)' },
  web: { border: 'border-[#FFB703]/40', bg: 'bg-[#FFB703]/10', text: 'text-[#FFB703]', glow: 'rgba(255,183,3,0.3)' },
  cloud: { border: 'border-[#80ED99]/50', bg: 'bg-[#80ED99]/10', text: 'text-[#80ED99]', glow: 'rgba(128,237,153,0.4)' }
};

interface InteractiveSkillEcosystemProps {
  isLightMode: boolean;
}

export default function InteractiveSkillEcosystem({ isLightMode }: InteractiveSkillEcosystemProps) {
  const [activeNode, setActiveNode] = useState<SkillNode | null>(null);
  const [viewMode, setViewMode] = useState<'constellation' | 'matrix'>('constellation');

  const handleNodeHover = (node: SkillNode) => {
    setActiveNode(node);
    cyberSound.playHover();
  };

  return (
    <section id="skills" className="py-14 sm:py-20 flex flex-col justify-center space-y-8 scroll-mt-24">
      {/* Header & Controls */}
      <div className="border-b border-zinc-500/20 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className={`text-xs font-mono tracking-widest mb-1 ${
            isLightMode ? 'text-[#c2410c] font-semibold' : 'text-amber-400'
          }`}>
            // INTERACTIVE TECHNOLOGY MAP
          </div>
          <h2 className={`text-2xl sm:text-4xl font-tech ${
            isLightMode ? 'text-slate-950 font-extrabold' : 'font-bold text-white'
          }`}>
            05. Technology Ecosystem &amp; Skill Matrix
          </h2>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-zinc-500/20 bg-black/20 text-xs font-mono">
          <button
            onClick={() => {
              cyberSound.playClick();
              setViewMode('constellation');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'constellation'
                ? isLightMode
                  ? 'bg-amber-500 text-white font-bold'
                  : 'bg-amber-400 text-black font-bold shadow-[0_0_12px_rgba(255,170,0,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>ECOSYSTEM MAP</span>
          </button>
          <button
            onClick={() => {
              cyberSound.playClick();
              setViewMode('matrix');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'matrix'
                ? isLightMode
                  ? 'bg-amber-500 text-white font-bold'
                  : 'bg-amber-400 text-black font-bold shadow-[0_0_12px_rgba(255,170,0,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>CATEGORIZED GRID</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE CONSTELLATION MAP */}
      {viewMode === 'constellation' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`crystal-glass min-h-[580px] sm:min-h-[640px] p-6 flex items-center justify-center select-none shadow-2xl relative ${
            isLightMode
              ? 'bg-white/80 border-slate-200/80 shadow-[0_16px_45px_rgba(15,23,42,0.08)]'
              : 'bg-[rgba(10,10,15,0.76)] border-white/10 text-white shadow-[0_0_55px_rgba(0,0,0,0.85)]'
          }`}
        >
          {/* Subtle Grid Backdrop */}
          <div className="absolute inset-0 cyber-grid-pattern opacity-25 pointer-events-none" />

          {/* SVG Connection Constellation Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFB703" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#00F5D4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#80ED99" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            {SKILL_NODES.map((node) => {
              const isActive = activeNode?.id === node.id;
              return (
                <g key={`line-${node.id}`}>
                  {/* Connection line from center (50%, 50%) to node */}
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`${node.coords.x}%`}
                    y2={`${node.coords.y}%`}
                    stroke={isActive ? '#FFB703' : 'url(#lineGrad)'}
                    strokeWidth={isActive ? '2' : '1'}
                    strokeDasharray={isActive ? 'none' : '4 4'}
                    className="transition-all duration-300"
                  />
                  {/* Pulsing Signal Dot along line */}
                  <circle
                    cx={`${(50 + node.coords.x) / 2}%`}
                    cy={`${(50 + node.coords.y) / 2}%`}
                    r={isActive ? '3' : '1.5'}
                    fill={isActive ? '#FFB703' : '#00F5D4'}
                    className="animate-pulse"
                  />
                </g>
              );
            })}
          </svg>

          {/* Central AI / Development Core Hub */}
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute z-20 w-32 h-32 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center text-center p-3 cursor-default"
          >
            {/* Outer Rotating Radar Ring */}
            <div className="absolute -inset-2 rounded-full border border-dashed border-amber-500/40 animate-[spin_18s_linear_infinite]" />
            <div className="absolute -inset-5 rounded-full border border-cyan-500/20 animate-[spin_28s_linear_infinite_reverse]" />

            {/* Glowing Core Orb */}
            <div className={`w-full h-full rounded-full border flex flex-col items-center justify-center p-2 shadow-2xl backdrop-blur-xl ${
              isLightMode
                ? 'bg-amber-500/15 border-amber-500/50 text-slate-900 shadow-amber-500/20'
                : 'bg-black/80 border-amber-400 text-white shadow-[0_0_30px_rgba(255,170,0,0.5)]'
            }`}>
              <Cpu className="w-6 h-6 text-amber-400 animate-pulse mb-1" />
              <span className="text-[10px] sm:text-xs font-tech font-black tracking-wider leading-tight text-amber-400">
                AI / DEV CORE
              </span>
              <span className="text-[9px] font-mono text-emerald-400 font-semibold mt-0.5">
                ● SYNCED // 15 NODES
              </span>
            </div>
          </motion.div>

          {/* Orbiting Satellite Skill Nodes */}
          {SKILL_NODES.map((node) => {
            const isHovered = activeNode?.id === node.id;
            const style = CATEGORY_COLORS[node.category];

            return (
              <motion.div
                key={node.id}
                onMouseEnter={() => handleNodeHover(node)}
                onMouseLeave={() => setActiveNode(null)}
                style={{
                  left: `${node.coords.x}%`,
                  top: `${node.coords.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className={`absolute z-30 transition-all duration-300 cursor-pointer ${
                  isHovered ? 'scale-115 z-40' : 'hover:scale-105'
                }`}
              >
                <div
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl border text-xs font-mono flex items-center gap-2 backdrop-blur-xl transition-all shadow-lg ${
                    style.border
                  } ${
                    isHovered
                      ? isLightMode
                        ? 'bg-white text-slate-950 font-bold shadow-xl border-amber-500'
                        : 'bg-black text-amber-300 font-bold shadow-[0_0_20px_rgba(255,170,0,0.6)] border-amber-400'
                      : isLightMode
                        ? 'bg-white/80 text-slate-800'
                        : 'bg-[#090d16]/90 text-zinc-300'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isHovered ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                  <span className="whitespace-nowrap font-semibold">{node.name}</span>
                </div>
              </motion.div>
            );
          })}

          {/* Live Node Telemetry Card (Pinned bottom center) */}
          <div className="absolute bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-80 z-40 pointer-events-none">
            <div className={`p-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all ${
              isLightMode
                ? 'bg-white/90 border-slate-300 text-slate-900 shadow-slate-300'
                : 'bg-black/90 border-amber-500/40 text-white shadow-[0_0_25px_rgba(0,0,0,0.9)]'
            }`}>
              {activeNode ? (
                <div className="space-y-2 font-mono">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#FFB703]">[ NODE // {activeNode.name} ]</span>
                    <span className="text-[#80ED99] font-bold">{activeNode.proficiency}% FIDELITY</span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FFB703] to-[#00F5D4]"
                      style={{ width: `${activeNode.proficiency}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                    {activeNode.highlight}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2.5 text-xs font-mono text-[#9CA3AF]">
                  <Sparkles className="w-4 h-4 text-[#FFB703] animate-pulse" />
                  <span>HOVER ANY NODE TO PROBE TELEMETRY</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* VIEW 2: CATEGORIZED TELEMETRY GRID */}
      {viewMode === 'matrix' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Machine Learning & Core AI",
              icon: Cpu,
              items: ["XGBoost", "SHAP", "PyTorch", "Scikit-Learn", "Computer Vision (ViT)", "Transformers", "Feature Engineering"],
              color: "border-[#FFB703]/40 text-[#FFB703]"
            },
            {
              title: "Quantum & Mathematics",
              icon: Atom,
              items: ["QUBO Formulation", "QAOA Algorithms", "Qiskit", "Graph Partitioning", "Combinatorial Optimization", "Stochastic Analysis"],
              color: "border-[#00F5D4]/40 text-[#00F5D4]"
            },
            {
              title: "Frontend & Reactive Systems",
              icon: Globe,
              items: ["React 19", "TypeScript", "Tailwind CSS", "Motion", "Three.js / WebGL", "Web Audio API", "Vite"],
              color: "border-[#FFB703]/40 text-[#FFB703]"
            },
            {
              title: "Backend, Cloud & Pipelines",
              icon: Server,
              items: ["FastAPI", "Python", "Node.js", "Docker", "PostgreSQL", "Redis", "Cloud Run", "Git / GitHub CI"],
              color: "border-[#80ED99]/40 text-[#80ED99]"
            }
          ].map((group) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`crystal-glass crystal-glass-hover-amber p-6 sm:p-7 relative ${
                  isLightMode
                    ? 'bg-white/80 border-slate-200/80 shadow-[0_12px_35px_rgba(0,0,0,0.06)]'
                    : 'bg-[rgba(10,10,15,0.72)] border-white/10 text-white hover:border-[#FFB703]/50 shadow-xl'
                }`}
              >
                <h4 className={`text-base font-bold font-tech mb-4 flex items-center gap-2 ${
                  isLightMode ? 'text-slate-950' : 'text-white'
                }`}>
                  <Icon className="w-4 h-4 text-[#FFB703]" />
                  <span>{group.title}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className={`text-xs font-mono px-3 py-1.5 rounded-xl border ${
                        isLightMode
                          ? 'bg-white/80 border-slate-300 text-slate-800 font-medium'
                          : 'bg-white/[0.04] border-white/10 text-[#00F5D4]'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
