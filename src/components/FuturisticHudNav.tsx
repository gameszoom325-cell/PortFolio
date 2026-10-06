import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Briefcase, GitBranch, History, Sliders, Radio, Sparkles } from 'lucide-react';
import { cyberSound } from '../utils/audioSystem';

interface FuturisticHudNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isLightMode: boolean;
  onPlaySFX?: () => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'ABOUT', icon: Cpu },
  { id: 'projects', label: 'PROJECTS', icon: Briefcase },
  { id: 'case-studies', label: 'PIPELINE', icon: GitBranch },
  { id: 'timeline', label: 'TIMELINE', icon: History },
  { id: 'skills', label: 'SKILLS', icon: Sliders },
  { id: 'contact', label: 'CONTACT', icon: Radio }
];

export default function FuturisticHudNav({
  activeSection,
  onNavigate,
  isLightMode
}: FuturisticHudNavProps) {
  const handleClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    cyberSound.playTransition();
    onNavigate(id);
  };

  return (
    <aside aria-label="Command Dock Navigation" className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] sm:max-w-none">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`relative px-2 sm:px-3 py-2 rounded-2xl border backdrop-blur-2xl shadow-2xl flex items-center gap-1 sm:gap-2 transition-all duration-300 ${
          isLightMode
            ? 'bg-white/75 border-white/80 shadow-[0_12px_40px_rgba(15,23,42,0.15)] text-slate-900'
            : 'bg-[#060913]/85 border-amber-500/30 text-white shadow-[0_0_35px_rgba(0,0,0,0.8)]'
        }`}
      >
        {/* Holographic Glowing Border Line */}
        <div className="absolute inset-x-4 -top-[1px] h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent pointer-events-none" />
        <div className="absolute inset-x-4 -bottom-[1px] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

        {/* Small sci-fi badge on left for desktop */}
        <div className="hidden md:flex items-center gap-1 px-2 border-r border-zinc-500/20 text-[10px] font-mono text-amber-500 select-none">
          <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
          <span className="font-bold tracking-widest">HUD</span>
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={(e) => handleClick(item.id, e)}
                onMouseEnter={() => cyberSound.playHover()}
                className={`relative px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 sm:gap-2 select-none group whitespace-nowrap ${
                  isActive
                    ? isLightMode
                      ? 'bg-amber-500 text-white font-bold shadow-md'
                      : 'bg-amber-400/90 text-black font-bold shadow-[0_0_20px_rgba(255,170,0,0.5)]'
                    : isLightMode
                      ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 font-medium'
                      : 'text-zinc-400 hover:text-amber-300 hover:bg-zinc-800/60'
                }`}
              >
                {/* Active Underline Beam */}
                {isActive && (
                  <motion.div
                    layoutId="activeHudGlow"
                    className="absolute inset-0 rounded-xl bg-amber-400/20 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <Icon className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 pointer-events-none ${
                  isActive ? (isLightMode ? 'text-white' : 'text-black') : 'text-zinc-400 group-hover:text-amber-400'
                }`} />

                <span className="text-[11px] sm:text-xs pointer-events-none font-semibold">
                  [ {item.label} ]
                </span>

                {/* Tiny holographic dot for active item */}
                {isActive && (
                  <span className={`w-1.5 h-1.5 rounded-full animate-ping pointer-events-none ${
                    isLightMode ? 'bg-white' : 'bg-black'
                  }`} />
                )}
              </button>
            );
          })}
        </div>
      </motion.div>
    </aside>
  );
}
