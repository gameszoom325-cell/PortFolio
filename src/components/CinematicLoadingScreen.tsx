import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Terminal, Sparkles, Activity, ShieldCheck, Cpu } from 'lucide-react';
import { cyberSound } from '../utils/audioSystem';

interface CinematicLoadingScreenProps {
  onEnter: () => void;
  isLightMode: boolean;
}

const BOOT_LOGS = [
  "INITIALIZING SECURE KERNEL (x86_64 // NEURAL GRAPH)...",
  "HYPER-THREADING VECTOR SURROGATES [XGBOOST, SHAP, QAOA]...",
  "CONNECTING TELEMETRY BUS TO KNOXXZONE...",
  "COMPUTING STATUTORY DELAY MATRICES (VALIDATION AUC 0.942)...",
  "ESTABLISHING QUBO ISING HAMILTONIANS [OK]",
  "SECURITY PROTOCOLS SYNCHRONIZED [ONLINE]"
];

export default function CinematicLoadingScreen({ onEnter, isLightMode }: CinematicLoadingScreenProps) {
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [currentLogIndex, setCurrentLogIndex] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>("");
  const [bootProgress, setBootProgress] = useState<number>(0);
  const [isEntering, setIsEntering] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Stage 1: Terminal logs typing and progress sequence with subtle acoustic blips
  useEffect(() => {
    let charIndex = 0;
    const currentTarget = BOOT_LOGS[currentLogIndex];
    let isCancelled = false;

    setTypedText("");

    const typingInterval = setInterval(() => {
      if (isCancelled) return;
      if (charIndex <= currentTarget.length) {
        setTypedText(currentTarget.slice(0, charIndex));
        if (charIndex % 3 === 0) {
          cyberSound.playInitLog();
        }
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setBootProgress(Math.min(100, Math.round(((currentLogIndex + 1) / BOOT_LOGS.length) * 100)));

        setTimeout(() => {
          if (isCancelled) return;
          if (currentLogIndex < BOOT_LOGS.length - 1) {
            setCurrentLogIndex((prev) => prev + 1);
          } else {
            // Trigger boot chord sound and move to Stage 2
            cyberSound.playBoot();
            setStage(2);
          }
        }, 220);
      }
    }, 15);

    return () => {
      isCancelled = true;
      clearInterval(typingInterval);
    };
  }, [currentLogIndex]);

  // Stage 2: Letters appear with 3D text depth & glitch, then transition to Stage 3 (Scroll to enter)
  useEffect(() => {
    if (stage === 2) {
      const timer = setTimeout(() => {
        setStage(3);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Trigger enter transition with cinematic warp sound
  const handleTriggerEnter = () => {
    if (isEntering) return;
    setIsEntering(true);
    cyberSound.playEnter();
    cyberSound.startAmbientOnEnter();
    setTimeout(() => {
      onEnter();
    }, 700);
  };

  // Scroll listener to unlock when in stage 2 or 3
  useEffect(() => {
    const handleScrollOrWheel = (e: WheelEvent | TouchEvent | KeyboardEvent) => {
      if (stage >= 2 && !isEntering) {
        if ('deltaY' in e && e.deltaY > 10) {
          handleTriggerEnter();
        } else if (e.type === 'touchmove' || (e instanceof KeyboardEvent && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' '))) {
          handleTriggerEnter();
        }
      }
    };

    window.addEventListener('wheel', handleScrollOrWheel, { passive: true });
    window.addEventListener('touchmove', handleScrollOrWheel, { passive: true });
    window.addEventListener('keydown', handleScrollOrWheel);

    return () => {
      window.removeEventListener('wheel', handleScrollOrWheel);
      window.removeEventListener('touchmove', handleScrollOrWheel);
      window.removeEventListener('keydown', handleScrollOrWheel);
    };
  }, [stage, isEntering]);

  const nameLetters = "AYUSH SINGH".split("");

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isEntering ? 0 : 1,
          scale: isEntering ? 1.08 : 1,
          filter: isEntering ? 'blur(12px)' : 'blur(0px)'
        }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100] flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none bg-black/60 backdrop-blur-md"
        style={{
          background: isLightMode
            ? 'radial-gradient(ellipse at center, rgba(255,255,255,0.48) 0%, rgba(226,232,240,0.82) 100%)'
            : 'radial-gradient(ellipse at center, rgba(3,7,18,0.72) 0%, rgba(2,6,23,0.92) 100%)'
        }}
      >
        {/* Futuristic Cyber Grid & CRT scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-25 cyber-grid-pattern" />
        <div className="absolute inset-0 pointer-events-none opacity-20 crt-scanlines" />

        {/* Cinematic Warp Scan Light Beam during Enter Transition */}
        {isEntering && (
          <motion.div
            initial={{ translateY: '-100%' }}
            animate={{ translateY: '250%' }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
            className="absolute inset-x-0 h-48 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent pointer-events-none z-50 shadow-[0_0_60px_rgba(255,170,0,0.85)]"
          />
        )}

        {/* Ambient Floating Sparks / Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                isLightMode ? 'bg-amber-600/40' : 'bg-amber-400/60 shadow-[0_0_6px_#f59e0b]'
              }`}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0.2
              }}
              animate={{
                y: ['-10%', '110%'],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: 6 + Math.random() * 6,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </div>

        {/* Top Header Telemetry in Loading Screen */}
        <div className="relative z-10 flex items-center justify-between border-b border-amber-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Terminal className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-amber-500 font-bold uppercase">
                KNOXXZONE OS // v4.2.0
              </div>
              <div className={`text-xs font-mono ${isLightMode ? 'text-slate-800 font-medium' : 'text-zinc-400'}`}>
                AUTONOMOUS SYSTEM BOOT SEQUENCE
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="hidden sm:flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className={isLightMode ? 'text-slate-700' : 'text-zinc-300'}>NEURAL LINK ACTIVE</span>
            </div>
            <button
              onClick={handleTriggerEnter}
              onMouseEnter={() => cyberSound.playHover()}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono border transition-all cursor-pointer ${
                isLightMode
                  ? 'border-slate-300 bg-white/70 text-slate-800 hover:border-amber-500'
                  : 'border-zinc-700 bg-black/40 text-zinc-300 hover:border-amber-400 hover:text-amber-300'
              }`}
            >
              [ SKIP BOOT ]
            </button>
          </div>
        </div>

        {/* Center Stage Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-auto text-center px-4">
          {/* STAGE 1: System Boot Terminal Sequence */}
          {stage === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl w-full space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 text-xs font-mono">
                <Cpu className="w-3.5 h-3.5 animate-spin" />
                <span>AI CORE STARTUP SEQUENCE: {bootProgress}%</span>
              </div>

              {/* Terminal Box */}
              <div className={`rounded-2xl p-5 border text-left font-mono text-xs shadow-2xl relative overflow-hidden backdrop-blur-xl ${
                isLightMode
                  ? 'bg-white/85 border-slate-300 text-slate-900 shadow-slate-200'
                  : 'bg-black/85 border-zinc-800 text-zinc-200 shadow-black'
              }`}>
                {/* Simulated Terminal Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-500/20 text-[10px] text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    <span className="ml-2 font-mono">boot_sequence.sh</span>
                  </div>
                  <span>INITIALIZING SURROGATES</span>
                </div>

                <div className="space-y-1.5 min-h-[140px]">
                  {BOOT_LOGS.slice(0, currentLogIndex).map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-emerald-400">
                      <span className="text-zinc-500 font-mono select-none">&gt;</span>
                      <span className="opacity-80">{log}</span>
                    </div>
                  ))}

                  <div className="flex items-start gap-2 text-amber-400 font-bold">
                    <span className="text-amber-500 font-mono select-none">&gt;</span>
                    <span>{typedText}</span>
                    <span className="w-2 h-4 bg-amber-400 inline-block animate-pulse align-middle" />
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4 pt-3 border-t border-zinc-500/20">
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-pink-500 shadow-[0_0_12px_#f97316]"
                      animate={{ width: `${bootProgress}%` }}
                      transition={{ duration: 0.18 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STAGE 2 & 3: CENTER NAME REVEAL WITH 3D TEXT DEPTH, GLITCH & LIGHT SCAN */}
          {(stage === 2 || stage === 3) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl w-full flex flex-col items-center space-y-8"
            >
              {/* Status pill */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-bold tracking-widest ${
                  isLightMode
                    ? 'bg-amber-500/15 border-amber-600/40 text-amber-900 shadow-sm'
                    : 'bg-amber-950/60 border-amber-500/40 text-amber-300 shadow-[0_0_20px_rgba(255,170,0,0.2)]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>COMMAND CENTER UNLOCKED // SIH 2026 ACTIVE</span>
              </motion.div>

              {/* CENTER NAME WITH 3D TEXT DEPTH, LIGHT SCAN AND GLITCH STAGGER */}
              <div className="relative py-4 select-none">
                {/* Light Scan Sweep across the Name */}
                <motion.div
                  initial={{ translateX: '-100%' }}
                  animate={{ translateX: '200%' }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-amber-400/25 to-transparent pointer-events-none blur-sm"
                />

                {/* 3D Depth Extrusion Shadow Layer 1 */}
                <h1
                  aria-hidden="true"
                  className={`absolute inset-0 flex items-center justify-center text-5xl sm:text-7xl md:text-8xl font-tech font-black tracking-widest opacity-35 translate-y-2 translate-x-2 blur-[1px] ${
                    isLightMode ? 'text-amber-700' : 'text-amber-600'
                  }`}
                >
                  AYUSH SINGH
                </h1>

                {/* 3D Depth Extrusion Shadow Layer 2 */}
                <h1
                  aria-hidden="true"
                  className={`absolute inset-0 flex items-center justify-center text-5xl sm:text-7xl md:text-8xl font-tech font-black tracking-widest opacity-20 translate-y-4 translate-x-4 blur-[3px] ${
                    isLightMode ? 'text-slate-800' : 'text-black'
                  }`}
                >
                  AYUSH SINGH
                </h1>

                {/* Main Glitch Letters */}
                <h1 className="relative flex items-center justify-center text-5xl sm:text-7xl md:text-8xl font-tech font-black tracking-widest">
                  {nameLetters.map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 28, filter: 'blur(8px)', rotateX: 65 }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.045,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className={`inline-block transition-transform hover:scale-110 ${
                        char === " " ? "w-4 sm:w-8" : ""
                      } ${
                        isLightMode
                          ? 'text-slate-950 drop-shadow-[0_2px_12px_rgba(245,158,11,0.3)]'
                          : 'text-white text-glow-amber'
                      }`}
                    >
                      {char}
                    </motion.span>
                  ))}
                </h1>

                {/* Subtitle Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="mt-3 flex items-center justify-center gap-3 text-xs sm:text-sm font-mono tracking-widest"
                >
                  <span className="text-amber-500 font-bold">AI / ML ENGINEER</span>
                  <span className="text-zinc-500">•</span>
                  <span className={isLightMode ? 'text-slate-700' : 'text-zinc-300'}>QUANTUM &amp; WEB ARCHITECT</span>
                </motion.div>
              </div>

              {/* STAGE 3: "SCROLL TO ENTER ↓" ANIMATED TRIGGER */}
              {stage === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex flex-col items-center space-y-4 pt-4"
                >
                  <button
                    onClick={handleTriggerEnter}
                    onMouseEnter={() => cyberSound.playHover()}
                    className={`group px-8 py-3.5 rounded-2xl border text-xs sm:text-sm font-mono font-bold tracking-widest flex items-center gap-3 transition-all cursor-pointer shadow-lg ${
                      isLightMode
                        ? 'bg-white border-amber-500 text-slate-900 hover:bg-amber-50 hover:shadow-amber-500/20'
                        : 'bg-black/75 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-black hover:shadow-[0_0_25px_rgba(255,170,0,0.6)]'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-180 transition-transform duration-500" />
                    <span>SCROLL TO ENTER</span>
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 animate-pulse">
                    <span>[ MOUSE WHEEL • SWIPE UP • OR CLICK BUTTON ]</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Bottom Status Bar in Loading Screen */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-amber-500/20 pt-4 text-[10px] font-mono text-zinc-400">
          <div>
            <span>LOCATION: CHENNAI // SRM IST</span>
          </div>
          <div className="flex items-center gap-4">
            <span>MEM: 16.0 GB ALLOCATED</span>
            <span className="text-amber-500">SURROGATES: SYNCHRONIZED</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
