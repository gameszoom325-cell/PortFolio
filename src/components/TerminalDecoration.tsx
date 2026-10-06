import React, { useState, useEffect } from 'react';
import { Terminal, Copy, Check, Play, Pause } from 'lucide-react';
import { cyberSound } from '../utils/audioSystem';

interface TerminalDecorationProps {
  isLightMode: boolean;
  onPlaySFX?: () => void;
}

interface Snippet {
  id: string;
  title: string;
  lines: Array<{
    type: 'comment' | 'code';
    tokens: Array<{ text: string; colorClass: string }>;
  }>;
}

const SNIPPETS: Snippet[] = [
  {
    id: 'developer',
    title: 'developer.ts',
    lines: [
      {
        type: 'comment',
        tokens: [{ text: '// Autonomous Developer Profile', colorClass: 'text-zinc-500 italic' }]
      },
      {
        type: 'code',
        tokens: [
          { text: 'const ', colorClass: 'text-pink-500 font-semibold' },
          { text: 'developer ', colorClass: 'text-cyan-400' },
          { text: '= {', colorClass: 'text-yellow-400' }
        ]
      },
      {
        type: 'code',
        tokens: [
          { text: '  name: ', colorClass: 'text-slate-300' },
          { text: '"Ayush Singh"', colorClass: 'text-emerald-400' },
          { text: ',', colorClass: 'text-zinc-400' }
        ]
      },
      {
        type: 'code',
        tokens: [
          { text: '  role: ', colorClass: 'text-slate-300' },
          { text: '"AI/ML Student"', colorClass: 'text-emerald-400' },
          { text: ',', colorClass: 'text-zinc-400' }
        ]
      },
      {
        type: 'code',
        tokens: [
          { text: '  institution: ', colorClass: 'text-slate-300' },
          { text: '"SRM IST"', colorClass: 'text-emerald-400' },
          { text: ',', colorClass: 'text-zinc-400' }
        ]
      },
      {
        type: 'code',
        tokens: [
          { text: '  stack: ', colorClass: 'text-slate-300' },
          { text: '["Python", "React", "ML"]', colorClass: 'text-amber-400' }
        ]
      },
      {
        type: 'code',
        tokens: [{ text: '};', colorClass: 'text-yellow-400' }]
      }
    ]
  },
  {
    id: 'pipeline',
    title: 'neural_pipeline.py',
    lines: [
      {
        type: 'comment',
        tokens: [{ text: '# Real-Time SHAP Risk Attributor', colorClass: 'text-zinc-500 italic' }]
      },
      {
        type: 'code',
        tokens: [
          { text: 'pipeline ', colorClass: 'text-cyan-400' },
          { text: '= ', colorClass: 'text-pink-500' },
          { text: 'XGBoostEnsemble(', colorClass: 'text-yellow-400' }
        ]
      },
      {
        type: 'code',
        tokens: [
          { text: '  target: ', colorClass: 'text-slate-300' },
          { text: '"Statutory_Delay"', colorClass: 'text-emerald-400' },
          { text: ',', colorClass: 'text-zinc-400' }
        ]
      },
      {
        type: 'code',
        tokens: [
          { text: '  auc_roc: ', colorClass: 'text-slate-300' },
          { text: '0.942', colorClass: 'text-amber-400' },
          { text: ',', colorClass: 'text-zinc-400' }
        ]
      },
      {
        type: 'code',
        tokens: [
          { text: '  explainability: ', colorClass: 'text-slate-300' },
          { text: '"TreeSHAP"', colorClass: 'text-emerald-400' }
        ]
      },
      {
        type: 'code',
        tokens: [{ text: ')', colorClass: 'text-yellow-400' }]
      }
    ]
  },
  {
    id: 'quantum',
    title: 'qubo_optimizer.qasm',
    lines: [
      {
        type: 'comment',
        tokens: [{ text: '// QAOA Variational Hamiltonian', colorClass: 'text-zinc-500 italic' }]
      },
      {
        type: 'code',
        tokens: [
          { text: 'quantumGrid ', colorClass: 'text-cyan-400' },
          { text: '= {', colorClass: 'text-yellow-400' }
        ]
      },
      {
        type: 'code',
        tokens: [
          { text: '  qubits: ', colorClass: 'text-slate-300' },
          { text: '24', colorClass: 'text-amber-400' },
          { text: ',', colorClass: 'text-zinc-400' }
        ]
      },
      {
        type: 'code',
        tokens: [
          { text: '  ansatzDepth: ', colorClass: 'text-slate-300' },
          { text: '"p = 4"', colorClass: 'text-emerald-400' },
          { text: ',', colorClass: 'text-zinc-400' }
        ]
      },
      {
        type: 'code',
        tokens: [
          { text: '  lossReduction: ', colorClass: 'text-slate-300' },
          { text: '"+18.4%"', colorClass: 'text-emerald-400' }
        ]
      },
      {
        type: 'code',
        tokens: [{ text: '};', colorClass: 'text-yellow-400' }]
      }
    ]
  }
];

export default function TerminalDecoration({ isLightMode, onPlaySFX }: TerminalDecorationProps) {
  const [snippetIndex, setSnippetIndex] = useState<number>(0);
  const [revealedLinesCount, setRevealedLinesCount] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const activeSnippet = SNIPPETS[snippetIndex];

  // Typing line progression
  useEffect(() => {
    if (isPaused) return;

    if (revealedLinesCount < activeSnippet.lines.length) {
      const timer = setTimeout(() => {
        setRevealedLinesCount((prev) => prev + 1);
      }, 420);
      return () => clearTimeout(timer);
    } else {
      // Dwell on complete snippet, then cycle to next
      const cycleTimer = setTimeout(() => {
        setSnippetIndex((prev) => (prev + 1) % SNIPPETS.length);
        setRevealedLinesCount(1);
      }, 4500);
      return () => clearTimeout(cycleTimer);
    }
  }, [revealedLinesCount, activeSnippet, isPaused]);

  const handleCopyCode = () => {
    if (onPlaySFX) onPlaySFX();
    const rawText = activeSnippet.lines
      .map((line) => line.tokens.map((t) => t.text).join(''))
      .join('\n');
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTogglePause = () => {
    if (onPlaySFX) onPlaySFX();
    setIsPaused((prev) => !prev);
  };

  return (
    <div
      className={`crystal-glass crystal-glass-hover-amber p-4 sm:p-5 relative ${
        isLightMode
          ? 'bg-white/80 border-slate-200/80 shadow-[0_12px_35px_rgb(0,0,0,0.06)]'
          : 'bg-[rgba(10,10,15,0.72)] border-white/10 text-white shadow-2xl hover:border-[#FFB703]/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_35px_rgba(255,183,3,0.12)]'
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB703]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#80ED99]/80" />
          </div>
          <span className={`text-[11px] font-semibold pl-2 flex items-center gap-1.5 ${
            isLightMode ? 'text-slate-800' : 'text-zinc-200'
          }`}>
            <Terminal className="w-3.5 h-3.5 text-[#FFB703]" />
            <span>{activeSnippet.title}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Pause / Resume Button */}
          <button
            onClick={handleTogglePause}
            className={`p-1.5 rounded-lg border text-[10px] transition-colors cursor-pointer ${
              isLightMode
                ? 'border-slate-300 hover:bg-slate-100 text-slate-700'
                : 'border-white/10 hover:bg-white/10 text-[#9CA3AF]'
            }`}
            title={isPaused ? 'Resume Typing' : 'Pause Typing'}
          >
            {isPaused ? <Play className="w-3 h-3 text-[#80ED99]" /> : <Pause className="w-3 h-3 text-[#FFB703]" />}
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopyCode}
            className={`p-1.5 rounded-lg border text-[10px] transition-colors cursor-pointer ${
              isLightMode
                ? 'border-slate-300 hover:bg-slate-100 text-slate-700'
                : 'border-white/10 hover:bg-white/10 text-[#9CA3AF]'
            }`}
            title="Copy Code"
          >
            {copied ? <Check className="w-3 h-3 text-[#80ED99]" /> : <Copy className="w-3 h-3 text-[#FFB703]" />}
          </button>
        </div>
      </div>

      {/* Code Area with Syntax Highlighting and Line Numbers */}
      <div className="font-mono text-xs leading-relaxed overflow-x-auto min-h-[160px] py-1 select-text">
        {activeSnippet.lines.slice(0, revealedLinesCount).map((line, lineIdx) => (
          <div key={lineIdx} className="flex items-start gap-3 hover:bg-amber-500/5 px-1 py-0.5 rounded transition-colors">
            <span className="text-zinc-500/60 select-none text-[11px] w-4 text-right">
              {lineIdx + 1}
            </span>
            <div className="flex-1 whitespace-pre">
              {line.tokens.map((token, tokIdx) => (
                <span key={tokIdx} className={token.colorClass}>
                  {token.text}
                </span>
              ))}
              {lineIdx === revealedLinesCount - 1 && (
                <span className="inline-block w-2 h-3.5 bg-amber-400 align-middle ml-1 animate-pulse" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Terminal Footer Info */}
      <div className="flex items-center justify-between border-t border-zinc-500/20 pt-2.5 mt-2 text-[10px] font-mono text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>TSC READY // STRICT</span>
        </span>
        <span className="text-amber-500">
          NODE v22.14 // UTF-8
        </span>
      </div>
    </div>
  );
}
