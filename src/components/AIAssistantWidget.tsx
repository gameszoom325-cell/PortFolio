import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Sparkles, Send, User, ChevronRight, Activity, Terminal } from 'lucide-react';
import { cyberSound } from '../utils/audioSystem';

interface AIAssistantWidgetProps {
  isLightMode: boolean;
  onNavigateToSection?: (sectionId: string) => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  action?: {
    label: string;
    sectionId: string;
  };
}

const PRESET_QUERIES = [
  {
    id: 'about',
    label: 'About Ayush',
    prompt: 'Who is Ayush Singh and what is his focus?',
    response:
      "Ayush Singh is an AI/ML Engineer and Creative Technologist currently studying CSE (AI & ML) at SRM Institute of Science and Technology (Batch 2026–2030). He specializes in predictive delay modeling with XGBoost & SHAP explainability, hybrid QAOA quantum microgrid optimization, and high-performance interactive architectures.",
    action: { label: 'Go to About Section', sectionId: 'hero' }
  },
  {
    id: 'projects',
    label: 'Featured Projects',
    prompt: 'Tell me about his key projects.',
    response:
      "Key platforms include:\n• LandWatch AI: Statutory risk & municipal delay forecasting with 92.4% validation AUC (Smart India Hackathon 2026).\n• Smart Farmer Portal: Multilingual AgriTech platform with low-bandwidth offline caching & ViT pathology diagnostics.\n• Quantum Grid Optimizer: Mapping renewable microgrid dispatch to QUBO / QAOA circuits for 18.4% grid loss reduction.\n• KNOXXED1TS: High-octane creative motion showcase at 60 FPS.",
    action: { label: 'View Project Matrix', sectionId: 'projects' }
  },
  {
    id: 'skills',
    label: 'Tech Stack & Skills',
    prompt: 'What technologies does Ayush use?',
    response:
      "Ayush works across 4 primary domains:\n1. AI/ML: Python, XGBoost, SHAP, PyTorch, Scikit-Learn, Vision Transformers.\n2. Quantum: QUBO formulation, QAOA variational circuits, Qiskit, NumPy.\n3. Frontend: React, TypeScript, Tailwind CSS, Three.js / WebGL, Framer Motion.\n4. Cloud & Systems: FastAPI, Docker, PostgreSQL, Redis, Cloud Run.",
    action: { label: 'Explore Skills Matrix', sectionId: 'skills' }
  },
  {
    id: 'experience',
    label: 'Journey & Experience',
    prompt: 'What is his development journey and milestones?',
    response:
      "Ayush started programming in 2024 mastering algorithmic C++ & Python. In 2025, he advanced into high-performance web systems and creative tech. Currently in 2026, he is pursuing B.Tech in CSE (AI & ML) at SRM IST, actively competing in Smart India Hackathon 2026 and architecting quantum and statutory AI systems.",
    action: { label: 'View Journey Timeline', sectionId: 'timeline' }
  },
  {
    id: 'contact',
    label: 'Contact Info',
    prompt: 'How can I get in touch with Ayush?',
    response:
      "You can transmit directly to:\n• Email: 090109ayush@gmail.com\n• GitHub: github.com/gameszoom325-cell\n• LinkedIn: linkedin.com/in/ayush-singh-48960032b\nHe is open for AI/ML engineering, SIH collaborations, and research partnerships.",
    action: { label: 'Open Transmission Protocol', sectionId: 'contact' }
  }
];

export default function AIAssistantWidget({
  isLightMode,
  onNavigateToSection
}: AIAssistantWidgetProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "System Online. I am KNOXX-AI, Ayush's autonomous portfolio assistant. Select a topic below or type an inquiry to learn about his projects, research, and technical stack."
    }
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const fetchAIResponse = async (userPrompt: string, defaultAction?: { label: string; sectionId: string }) => {
    setIsTyping(true);
    try {
      // Build conversation history for OpenAI format
      const historyPayload = messages
        .slice(-6)
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }));
      historyPayload.push({ role: 'user', content: userPrompt });

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyPayload })
      });

      if (!res.ok) {
        throw new Error(`Gateway returned HTTP ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || "Transmission received from AI Core.";

      // Contextual action detection based on user query and response
      let action = defaultAction;
      const lower = (userPrompt + " " + replyText).toLowerCase();
      if (!action) {
        if (lower.includes('landwatch') || lower.includes('project')) {
          action = { label: 'Explore LandWatch AI', sectionId: 'projects' };
        } else if (lower.includes('quantum') || lower.includes('qubo') || lower.includes('pipeline')) {
          action = { label: 'View ML Pipeline', sectionId: 'case-studies' };
        } else if (lower.includes('skills') || lower.includes('stack')) {
          action = { label: 'View Skills Matrix', sectionId: 'skills' };
        } else if (lower.includes('timeline') || lower.includes('college') || lower.includes('journey')) {
          action = { label: 'View Timeline', sectionId: 'timeline' };
        } else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire')) {
          action = { label: 'Open Transmission Protocol', sectionId: 'contact' };
        }
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: replyText, action }]);
    } catch (error: any) {
      console.error('Error fetching AI response:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: "Communication error connecting to backend AI Core. Please check backend connection and ensure OPENAI_API_KEY is configured in your environment.",
          action: defaultAction
        }
      ]);
    } finally {
      setIsTyping(false);
      cyberSound.playTransition();
    }
  };

  const handleSelectPreset = (preset: typeof PRESET_QUERIES[0]) => {
    cyberSound.playClick();
    setMessages((prev) => [...prev, { sender: 'user', text: preset.prompt }]);
    fetchAIResponse(preset.prompt, preset.action);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    setInputQuery('');
    cyberSound.playClick();

    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    fetchAIResponse(userText);
  };

  return (
    <>
      {/* Floating Launcher Button - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <motion.button
          onClick={() => {
            cyberSound.playClick();
            setIsOpen((prev) => !prev);
          }}
          onMouseEnter={() => cyberSound.playHover()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative p-3.5 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 cursor-pointer group transition-all ${
            isLightMode
              ? 'bg-white/85 border-amber-500/40 text-slate-900 hover:border-amber-500 shadow-amber-500/10'
              : 'bg-[#090e1a]/90 border-amber-500/40 text-white hover:border-amber-400 hover:shadow-[0_0_25px_rgba(255,170,0,0.4)]'
          }`}
          title="KNOXX-AI Autonomous Assistant"
          aria-label="Open AI Assistant"
        >
          {/* Glowing pulse rings */}
          <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />

          <div className="relative w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
            <Bot className="w-4 h-4 pointer-events-none" />
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest">
                AI ONLINE
              </span>
            </div>
            <span className={`text-xs font-mono font-semibold ${isLightMode ? 'text-slate-800' : 'text-zinc-300'}`}>
              KNOXX-CORE
            </span>
          </div>
        </motion.button>
      </div>

      {/* Holographic Assistant Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[580px] h-[540px] rounded-3xl border shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl ${
              isLightMode
                ? 'bg-white/92 border-white/80 text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.15)]'
                : 'bg-[#070b14]/95 border-amber-500/30 text-zinc-100 shadow-[0_0_40px_rgba(0,0,0,0.85)]'
            }`}
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-500/20 flex items-center justify-between bg-black/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-500">KNOXX-AI v2.8</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400">AUTONOMOUS PORTFOLIO AGENT</div>
                </div>
              </div>

              <button
                onClick={() => {
                  cyberSound.playClick();
                  setIsOpen(false);
                }}
                onMouseEnter={() => cyberSound.playHover()}
                className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                  isLightMode
                    ? 'border-slate-300 hover:bg-slate-100 text-slate-700'
                    : 'border-zinc-800 hover:bg-zinc-800 text-zinc-400'
                }`}
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated Neural Equalizer */}
            <div className="px-4 py-2 bg-amber-500/5 border-b border-zinc-500/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>NEURAL INFERENCE READY</span>
              </span>
              <span className="text-amber-500">LATENCY: 12ms</span>
            </div>

            {/* Chat Body */}
            <div ref={chatScrollRef} className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-zinc-400">
                    {msg.sender === 'user' ? (
                      <>
                        <span>YOU</span>
                        <User className="w-3 h-3 text-cyan-400" />
                      </>
                    ) : (
                      <>
                        <Terminal className="w-3 h-3 text-amber-400" />
                        <span>KNOXX-AI</span>
                      </>
                    )}
                  </div>

                  <div
                    className={`p-3 rounded-2xl max-w-[88%] leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? isLightMode
                          ? 'bg-amber-500 text-white rounded-br-xs shadow-sm font-medium'
                          : 'bg-amber-500/20 border border-amber-500/40 text-amber-200 rounded-br-xs shadow-[0_0_15px_rgba(255,170,0,0.15)]'
                        : isLightMode
                          ? 'bg-slate-100/90 text-slate-800 rounded-bl-xs border border-slate-200 shadow-sm'
                          : 'bg-zinc-900/90 text-zinc-200 rounded-bl-xs border border-zinc-800'
                    }`}
                  >
                    {msg.text}

                    {msg.action && (
                      <button
                        onClick={() => {
                          cyberSound.playClick();
                          if (onNavigateToSection) onNavigateToSection(msg.action!.sectionId);
                          setIsOpen(false);
                        }}
                        onMouseEnter={() => cyberSound.playHover()}
                        className={`mt-2.5 w-full py-1.5 px-3 rounded-lg border text-[11px] font-bold flex items-center justify-between transition-all cursor-pointer ${
                          isLightMode
                            ? 'bg-white border-amber-500 text-amber-900 hover:bg-amber-50'
                            : 'bg-black/60 border-amber-400/50 text-amber-300 hover:bg-amber-400 hover:text-black'
                        }`}
                      >
                        <span>{msg.action.label}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 p-2 text-amber-500 font-mono text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.3s]" />
                  <span className="text-[10px] text-zinc-400 ml-1">KNOXX-AI is computing response...</span>
                </div>
              )}
            </div>

            {/* Preset Query Chips */}
            <div className="p-3 border-t border-zinc-500/20 bg-black/10 overflow-x-auto no-scrollbar flex items-center gap-1.5">
              {PRESET_QUERIES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  onMouseEnter={() => cyberSound.playHover()}
                  className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                    isLightMode
                      ? 'bg-white/80 border-slate-300 text-slate-800 hover:border-amber-500 hover:text-amber-600'
                      : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-amber-400 hover:text-amber-300'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Custom Input Form */}
            <form onSubmit={handleSendCustom} className="p-3 border-t border-zinc-500/20 flex items-center gap-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                disabled={isTyping}
                placeholder={isTyping ? "KNOXX-AI is computing..." : "Ask about LandWatch, tech stack, research..."}
                className={`flex-1 px-3 py-2 rounded-xl border text-xs font-mono outline-hidden transition-all ${
                  isLightMode
                    ? 'bg-white border-slate-300 text-slate-900 focus:border-amber-500 disabled:opacity-60'
                    : 'bg-zinc-900/90 border-zinc-800 text-white focus:border-amber-400 disabled:opacity-60'
                }`}
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isTyping}
                className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black disabled:opacity-40 transition-opacity cursor-pointer font-bold"
                title="Send query"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
