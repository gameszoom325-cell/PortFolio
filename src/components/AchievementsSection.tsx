import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, GraduationCap, CheckCircle2, Sparkles, Trophy, Shield, ExternalLink } from 'lucide-react';
import { cyberSound } from '../utils/audioSystem';

interface AchievementsSectionProps {
  isLightMode: boolean;
}

const ACHIEVEMENTS = [
  {
    id: 'sih-2026',
    title: 'Smart India Hackathon 2026',
    subtitle: 'Active Contender // LandWatch AI',
    category: 'NATIONAL COMPETITIVE',
    rarity: 'LEGENDARY // SIH 2026',
    date: '2026 — PRESENT',
    description: 'Engineered statutory risk delay forecasting engine using XGBoost & Shapley factor attribution for large-scale municipal land records.',
    badgeColor: 'from-[#FFB703] via-amber-400 to-[#FFB703]',
    holoColor: '#FFB703',
    icon: Trophy
  },
  {
    id: 'btech-srm',
    title: 'SRM Institute of Science & Technology',
    subtitle: 'B.Tech CSE (AI & ML) · Batch 2026–2030',
    category: 'ACADEMIC EXCELLENCE',
    rarity: 'FOUNDATIONAL CORE',
    date: '2026 – 2030',
    description: 'Specializing in artificial intelligence, neural networks, combinatorial quantum optimization, and high-performance distributed systems.',
    badgeColor: 'from-[#00F5D4] via-teal-400 to-[#00F5D4]',
    holoColor: '#00F5D4',
    icon: GraduationCap
  },
  {
    id: 'explainable-ai',
    title: 'Explainable AI & ML Ensembles',
    subtitle: 'TreeSHAP & Gradient Boosted Surrogates',
    category: 'RESEARCH MILESTONE',
    rarity: 'MASTER // ML ENSEMBLES',
    date: '2025 — 2026',
    description: 'Pioneered transparent game-theoretic explainability surfaces decomposing non-linear predictive interactions for regulatory auditability.',
    badgeColor: 'from-[#FFB703] via-orange-400 to-[#FFB703]',
    holoColor: '#FFB703',
    icon: Shield
  },
  {
    id: 'quantum-dispatch',
    title: 'Quantum Microgrid Optimization',
    subtitle: 'QAOA & QUBO Hamiltonian Simulation',
    category: 'COMPUTATIONAL RESEARCH',
    rarity: 'EPIC // QUANTUM',
    date: '2025 — 2026',
    description: 'Formulated non-convex renewable feed dispatch into Quadratic Unconstrained Binary Optimization matrices yielding 18.4% grid loss reduction.',
    badgeColor: 'from-[#80ED99] via-emerald-400 to-[#00F5D4]',
    holoColor: '#80ED99',
    icon: Award
  }
];

export default function AchievementsSection({ isLightMode }: AchievementsSectionProps) {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    cyberSound.playClick();
    setFlippedCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="achievements" className="py-14 sm:py-20 flex flex-col justify-center space-y-10 scroll-mt-24">
      {/* Header */}
      <div className="border-b border-zinc-500/20 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className={`text-xs font-mono tracking-widest mb-1 ${
            isLightMode ? 'text-[#c2410c] font-semibold' : 'text-amber-400'
          }`}>
            // COLLECTIBLE MILESTONES &amp; CREDENTIALS
          </div>
          <h2 className={`text-2xl sm:text-4xl font-tech ${
            isLightMode ? 'text-slate-950 font-extrabold' : 'font-bold text-white'
          }`}>
            06. Achievements, Education &amp; Credentials
          </h2>
        </div>
        <div className={`text-xs font-mono ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>
          INTERACTIVE HOLOGRAPHIC BADGES // CLICK TO INSPECT
        </div>
      </div>

      {/* Grid of Holographic Collectible Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ACHIEVEMENTS.map((item, index) => {
          const Icon = item.icon;
          const isFlipped = flippedCardId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40, rotateY: index % 2 === 0 ? -10 : 10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1]
              }}
              onClick={() => handleCardClick(item.id)}
              onMouseEnter={() => cyberSound.playHover()}
              className="cursor-pointer group perspective-1000"
            >
              <div
                className={`crystal-glass crystal-glass-hover-amber p-6 sm:p-7 flex flex-col justify-between min-h-[320px] relative transition-all duration-300 ${
                  isLightMode
                    ? 'bg-white/80 hover:bg-white/95 border-slate-200/80 hover:border-amber-500/50 shadow-[0_16px_40px_rgba(0,0,0,0.06)]'
                    : 'bg-[rgba(10,10,15,0.72)] border-white/10 text-white hover:border-[#FFB703]/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_40px_rgba(255,183,3,0.12)]'
                }`}
              >
                {/* Iridescent Holographic Foil Sheen Effect */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  style={{
                    background: `linear-gradient(135deg, transparent 20%, ${item.holoColor}30 50%, transparent 80%)`
                  }}
                />

                <div className="space-y-4 relative z-10">
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-widest px-2.5 py-0.5 rounded-full border border-white/10 text-[#9CA3AF]">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-[#FFB703] font-bold">
                      {item.date}
                    </span>
                  </div>

                  {/* Icon Emblem with Radiant Gradient Halo */}
                  <div className="pt-2">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.badgeColor} p-[1px] shadow-lg inline-flex items-center justify-center`}>
                      <div className={`w-full h-full rounded-2xl flex items-center justify-center ${
                        isLightMode ? 'bg-white' : 'bg-[#080808]'
                      }`}>
                        <Icon className="w-5 h-5 text-[#FFB703]" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className={`font-tech text-lg font-bold ${
                      isLightMode ? 'text-slate-950 font-bold' : 'text-white'
                    }`}>
                      {item.title}
                    </h3>
                    <div className="text-xs font-mono text-[#FFB703] font-semibold mt-0.5">
                      {item.subtitle}
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed ${
                    isLightMode ? 'text-slate-800 font-medium' : 'text-[#9CA3AF]'
                  }`}>
                    {item.description}
                  </p>
                </div>

                {/* Card Footer with Collectible Rarity Badge */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono relative z-10">
                  <span className={`px-2 py-0.5 rounded border border-[#FFB703]/30 text-[#FFB703] font-bold bg-[#FFB703]/10`}>
                    {item.rarity}
                  </span>
                  <span className="text-[#80ED99] flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3 h-3 text-[#80ED99]" />
                    <span>VERIFIED</span>
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
