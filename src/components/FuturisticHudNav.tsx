import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cpu, Briefcase, GitBranch, History, Sliders, Radio, Sparkles, Award } from 'lucide-react';
import { cyberSound } from '../utils/audioSystem';

interface FuturisticHudNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isLightMode: boolean;
  onPlaySFX?: () => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'CORE', icon: Cpu },
  { id: 'about', label: 'ABOUT', icon: Sparkles },
  { id: 'projects', label: 'PROJECTS', icon: Briefcase },
  { id: 'case-studies', label: 'PIPELINE', icon: GitBranch },
  { id: 'timeline', label: 'TIMELINE', icon: History },
  { id: 'skills', label: 'SKILLS', icon: Sliders },
  { id: 'achievements', label: 'HONORS', icon: Award },
  { id: 'contact', label: 'CONTACT', icon: Radio }
];

export default function FuturisticHudNav({
  activeSection,
  onNavigate,
  isLightMode
}: FuturisticHudNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    cyberSound.playTransition();
    onNavigate(id);
  };

  return (
    <aside aria-label="Command Dock Navigation" className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[96vw] sm:max-w-none">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          scale: isScrolled ? 0.97 : 1
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`relative px-2 sm:px-3 py-2 rounded-full border backdrop-blur-3xl shadow-2xl flex items-center gap-1 sm:gap-2 transition-all duration-500 overflow-hidden ${
          isLightMode
            ? 'bg-white/80 border-slate-200/80 shadow-[0_16px_45px_rgba(15,23,42,0.14)] text-slate-900'
            : 'bg-[rgba(10,10,15,0.76)] border-white/12 text-[#FFFFFF] shadow-[0_20px_55px_rgba(0,0,0,0.85),0_0_35px_rgba(255,183,3,0.06)]'
        }`}
      >
        {/* Subtle moving glass reflection sheen across navbar */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[slowGlassSheen_14s_ease-in-out_infinite]" />

        {/* Holographic Glowing Border Line */}
        <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFB703]/60 to-transparent pointer-events-none" />
        <div className="absolute inset-x-6 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F5D4]/40 to-transparent pointer-events-none" />

        {/* Sci-fi badge on left for desktop */}
        <div className="hidden md:flex items-center gap-1.5 px-3 border-r border-white/10 text-[10px] font-mono text-[#FFB703] select-none">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB703] animate-pulse" />
          <span className="font-bold tracking-widest">OS // HUD</span>
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5 relative z-10">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={(e) => handleClick(item.id, e)}
                onMouseEnter={() => cyberSound.playHover()}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2 select-none group whitespace-nowrap ${
                  isActive
                    ? isLightMode
                      ? 'text-white font-bold'
                      : 'text-black font-bold'
                    : isLightMode
                      ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70 font-medium'
                      : 'text-[#9CA3AF] hover:text-[#00F5D4] hover:bg-white/5'
                }`}
              >
                {/* Smooth Gliding Active Highlight Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeHudGlow"
                    className={`absolute inset-0 rounded-full pointer-events-none shadow-lg ${
                      isLightMode
                        ? 'bg-amber-500 shadow-amber-500/30'
                        : 'bg-[#FFB703] shadow-[0_0_24px_rgba(255,183,3,0.55)]'
                    }`}
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}

                <Icon className={`w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:scale-115 pointer-events-none ${
                  isActive ? (isLightMode ? 'text-white' : 'text-black') : 'text-[#9CA3AF] group-hover:text-[#00F5D4]'
                }`} />

                <span className="text-[11px] sm:text-xs relative z-10 pointer-events-none font-semibold">
                  [ {item.label} ]
                </span>

                {/* Micro holographic pulsing dot for active item */}
                {isActive && (
                  <span className={`w-1.5 h-1.5 rounded-full relative z-10 animate-ping pointer-events-none ${
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
