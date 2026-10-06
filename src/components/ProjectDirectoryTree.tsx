import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Folder, FolderOpen, FileCode, ChevronRight, ChevronDown, ExternalLink, Sparkles } from 'lucide-react';
import { cyberSound } from '../utils/audioSystem';

interface ProjectDirectoryTreeProps {
  isLightMode: boolean;
  onSelectProject?: (projectId: string) => void;
  onPlaySFX?: () => void;
}

interface TreeNode {
  id: string;
  name: string;
  badge?: string;
  badgeColor?: string;
  linkId?: string;
  children?: TreeNode[];
}

const PROJECT_TREE: TreeNode[] = [
  {
    id: 'landwatch-ai',
    name: 'LandWatch AI',
    badge: 'SIH 2026',
    badgeColor: 'bg-amber-500/10 border-amber-500/40 text-amber-400',
    linkId: 'landwatch',
    children: [
      { id: 'lw-1', name: 'xgboost_surrogate.py', badge: '0.942 AUC' },
      { id: 'lw-2', name: 'tree_shap_explain.ts', badge: '<40ms' },
      { id: 'lw-3', name: 'statutory_risk_api.py', badge: 'REST' }
    ]
  },
  {
    id: 'ai-projects',
    name: 'AI Projects',
    badge: 'PyTorch',
    badgeColor: 'bg-pink-500/10 border-pink-500/40 text-pink-400',
    linkId: 'smart-farmer',
    children: [
      { id: 'ai-1', name: 'smart_farmer_vit.py', badge: '94.1% Acc' },
      { id: 'ai-2', name: 'multi_spectral_ingest.py', badge: 'Sentinel' },
      { id: 'ai-3', name: 'soil_telemetry_mesh.ts', badge: 'IoT' }
    ]
  },
  {
    id: 'web-apps',
    name: 'Web Applications',
    badge: 'Production',
    badgeColor: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400',
    linkId: 'landwatch',
    children: [
      { id: 'web-1', name: 'knoxxed1ts_motion.tsx', badge: '60 FPS' },
      { id: 'web-2', name: 'smart_farmer_pwa.tsx', badge: 'i18n EN/HI' },
      { id: 'web-3', name: 'cyber_sound_synth.ts', badge: 'WebAudio' }
    ]
  },
  {
    id: 'experiments',
    name: 'Experiments',
    badge: 'Quantum',
    badgeColor: 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400',
    linkId: 'quantum-grid',
    children: [
      { id: 'exp-1', name: 'qubo_hamiltonian.py', badge: '24 Qubits' },
      { id: 'exp-2', name: 'qaoa_ansatz_depth4.py', badge: 'COBYLA' },
      { id: 'exp-3', name: 'grid_loss_reduction.json', badge: '18.4%' }
    ]
  }
];

export default function ProjectDirectoryTree({ isLightMode, onSelectProject, onPlaySFX }: ProjectDirectoryTreeProps) {
  // Track open folders
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'landwatch-ai': true,
    'ai-projects': false,
    'web-apps': false,
    'experiments': false
  });

  const toggleFolder = (folderId: string) => {
    cyberSound.playClick();
    if (onPlaySFX) onPlaySFX();
    setOpenFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const handleNodeClick = (node: TreeNode) => {
    cyberSound.playClick();
    if (onPlaySFX) onPlaySFX();
    if (node.linkId && onSelectProject) {
      onSelectProject(node.linkId);
    }
  };

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 shadow-xl overflow-hidden backdrop-blur-xl group hover:border-amber-500/50 ${
        isLightMode
          ? 'bg-white/45 border-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
          : 'bg-[#0b0f19]/85 border-zinc-800 text-zinc-100 shadow-2xl hover:shadow-[0_0_25px_rgba(255,170,0,0.2)]'
      }`}
    >
      {/* Directory Title Bar */}
      <div className="flex items-center justify-between border-b border-zinc-500/20 pb-3 mb-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className={`text-[11px] font-semibold ${isLightMode ? 'text-slate-800' : 'text-zinc-300'}`}>
            WORKSPACE DIRECTORY
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-400">
          TREE // 4 REPOS
        </span>
      </div>

      {/* Root projects/ folder header */}
      <div className="flex items-center gap-2 px-2 py-1 text-xs font-mono text-amber-500 font-bold mb-1">
        <FolderOpen className="w-4 h-4 text-amber-400" />
        <span>projects/</span>
      </div>

      {/* Tree Branches */}
      <div className="space-y-1 font-mono text-xs pl-2">
        {PROJECT_TREE.map((node, index) => {
          const isOpen = openFolders[node.id];
          const isLast = index === PROJECT_TREE.length - 1;
          const branchSymbol = isLast ? '└' : '├';

          return (
            <div key={node.id} className="space-y-1">
              {/* Folder Row */}
              <div
                onClick={() => toggleFolder(node.id)}
                className={`flex items-center justify-between px-2 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  isOpen
                    ? isLightMode
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 font-semibold'
                      : 'bg-amber-500/15 border-amber-500/30 text-amber-300 shadow-[0_0_12px_rgba(255,170,0,0.15)]'
                    : isLightMode
                      ? 'border-transparent hover:bg-slate-100/80 text-slate-700'
                      : 'border-transparent hover:bg-zinc-800/60 text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-zinc-500 select-none text-xs">{branchSymbol}</span>
                  {isOpen ? (
                    <FolderOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  ) : (
                    <Folder className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  )}
                  <span className="truncate">{node.name}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {node.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border ${node.badgeColor || 'border-zinc-700 text-zinc-400'}`}>
                      {node.badge}
                    </span>
                  )}
                  {isOpen ? (
                    <ChevronDown className="w-3 h-3 text-zinc-400" />
                  ) : (
                    <ChevronRight className="w-3 h-3 text-zinc-400" />
                  )}
                </div>
              </div>

              {/* Sub-items with collapse animation */}
              <AnimatePresence>
                {isOpen && node.children && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-6 space-y-1 overflow-hidden"
                  >
                    {node.children.map((child, cIdx) => (
                      <div
                        key={child.id}
                        onClick={() => handleNodeClick(node)}
                        className={`flex items-center justify-between px-2 py-1 rounded text-[11px] transition-colors cursor-pointer group/child ${
                          isLightMode
                            ? 'hover:bg-slate-200/60 text-slate-600 hover:text-slate-900'
                            : 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-zinc-500/60 select-none">
                            {cIdx === node.children!.length - 1 ? '└' : '├'}
                          </span>
                          <FileCode className="w-3 h-3 text-cyan-400 shrink-0 group-hover/child:text-amber-400 transition-colors" />
                          <span className="truncate">{child.name}</span>
                        </div>

                        {child.badge && (
                          <span className="text-[9px] text-zinc-500 font-mono shrink-0 pl-1">
                            {child.badge}
                          </span>
                        )}
                      </div>
                    ))}

                    {/* Quick Launch link */}
                    <button
                      onClick={() => handleNodeClick(node)}
                      className="w-full text-left pl-6 pr-2 py-1 text-[10px] text-amber-500 hover:text-amber-400 flex items-center gap-1 font-mono transition-colors cursor-pointer"
                    >
                      <span>→ Open Project Details</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Directory Footer */}
      <div className="border-t border-zinc-500/20 pt-2.5 mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-400">
        <span>STATUS: MOUNTED / R/W</span>
        <span className="text-emerald-400 font-bold">12 ACTIVE ASSETS</span>
      </div>
    </div>
  );
}
