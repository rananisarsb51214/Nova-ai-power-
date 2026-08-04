import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Bot, HardDrive, BookOpen, Sparkles, Cpu, Code, Code2, ArrowRight, CornerDownLeft, Command, Shield, Database, Workflow, Briefcase, Film, Palette, Check, Flame, Zap } from 'lucide-react';
import { TabType } from '../types';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

export interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: TabType) => void;
}

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Agents' | 'Memory Snippets' | 'Documentation' | 'Tools';
  tab: TabType;
  icon: React.ElementType;
  tags?: string[];
  payload?: string;
}

const STATIC_AGENTS: SearchResultItem[] = [
  {
    id: 'agent-1',
    title: 'Market Research Agent',
    subtitle: 'Competitor analysis, web scraping & market trend extraction',
    category: 'Agents',
    tab: 'agents',
    icon: Bot,
    tags: ['Scraping', 'Research', 'Market']
  },
  {
    id: 'agent-2',
    title: 'Code Reviewer Agent',
    subtitle: 'Automated security audits, TypeScript linting & code optimization',
    category: 'Agents',
    tab: 'agents',
    icon: Code,
    tags: ['Security', 'Audit', 'Dev']
  },
  {
    id: 'agent-3',
    title: 'Customer Support Bot',
    subtitle: 'Automated Tier-1 resolution, FAQ reasoning & ticket routing',
    category: 'Agents',
    tab: 'agents',
    icon: Bot,
    tags: ['Support', 'Automation', 'CRM']
  },
  {
    id: 'agent-4',
    title: 'Vibe Responding Agent',
    subtitle: 'Comment-to-sale closing, objection busters & multi-channel social vibe response',
    category: 'Agents',
    tab: 'vibe_responding',
    icon: Flame,
    tags: ['Vibe', 'Responding', 'Sales', 'TikTok', 'Instagram', 'DM']
  },
  {
    id: 'agent-5',
    title: 'Vibe Coding Agent',
    subtitle: 'Flow-state AI coding, Super God ECom Money Machine & instant React/Express code generator',
    category: 'Agents',
    tab: 'vibe_coding',
    icon: Zap,
    tags: ['Vibe', 'Coding', 'Super God', 'React', 'TypeScript', 'Express']
  },
  {
    id: 'agent-nova-video',
    title: 'Nova AI Demo Video & Live Templates',
    subtitle: 'Generate high-converting TikTok Reels, Meta video ads & Shopify product commercials with live template library',
    category: 'Tools',
    tab: 'nova_video_demo',
    icon: Film,
    tags: ['Nova', 'Video', 'Reels', 'TikTok', 'Templates', 'Meta Ads', 'Shopify']
  },
  {
    id: 'agent-6',
    title: 'Automated QA & Testing Agent',
    subtitle: 'End-to-end integration test runner & bug regression detector',
    category: 'Agents',
    tab: 'agents',
    icon: Shield,
    tags: ['QA', 'Testing', 'CI/CD']
  },
  {
    id: 'agent-7',
    title: 'Data Analysis & BI Agent',
    subtitle: 'SQL query writer, revenue forecasting & anomaly detection',
    category: 'Agents',
    tab: 'agents',
    icon: Cpu,
    tags: ['Data', 'SQL', 'Analytics']
  }
];

const STATIC_DOCS: SearchResultItem[] = [
  {
    id: 'doc-1',
    title: 'Developer Quickstart Guide',
    subtitle: 'Installation, environment setup & running the dev server',
    category: 'Documentation',
    tab: 'docs',
    icon: BookOpen,
    tags: ['Quickstart', 'Setup', 'NPM']
  },
  {
    id: 'doc-2',
    title: 'Server-Side SDK Integration',
    subtitle: '@google/genai TypeScript SDK usage and API key protection',
    category: 'Documentation',
    tab: 'docs',
    icon: Code,
    tags: ['Gemini', 'SDK', 'Backend']
  },
  {
    id: 'doc-3',
    title: 'Cloud Firestore & Auth Architecture',
    subtitle: 'Real-time syncing, document rules and persistent user preferences',
    category: 'Documentation',
    tab: 'docs',
    icon: Database,
    tags: ['Firebase', 'Firestore', 'Auth']
  },
  {
    id: 'doc-4',
    title: 'Multi-Model LLM Gateway',
    subtitle: 'Switching dynamically between Gemini 2.5, GPT-4o, Claude 3.5 & DeepSeek',
    category: 'Documentation',
    tab: 'docs',
    icon: Sparkles,
    tags: ['LLMs', 'Gateway', 'AI Hub']
  },
  {
    id: 'doc-5',
    title: '100 Coding Skills Reference',
    subtitle: 'System prompts, specialized skills & execute-first architecture',
    category: 'Documentation',
    tab: 'docs',
    icon: Cpu,
    tags: ['Skills', 'Prompts', 'AI Coding']
  },
  {
    id: 'doc-6',
    title: 'Commercial Video Generation',
    subtitle: '30s vertical cinematic video ad pipeline and motion synthesis',
    category: 'Documentation',
    tab: 'docs',
    icon: Film,
    tags: ['Video', 'Commercial', 'Media']
  },
  {
    id: 'doc-7',
    title: 'Enterprise Security & RBAC',
    subtitle: 'Role-based access control, API key encryption & security compliance',
    category: 'Documentation',
    tab: 'docs',
    icon: Shield,
    tags: ['Security', 'RBAC', 'Compliance']
  }
];

const STATIC_TOOLS: SearchResultItem[] = [
  { id: 'tool-1', title: 'Multi-Model AI Hub', subtitle: 'Switch between Gemini, GPT-4o, Claude 3.5 Sonnet, Grok, Llama & DeepSeek', category: 'Tools', tab: 'hub', icon: Sparkles },
  { id: 'tool-2', title: 'AI Development Studio', subtitle: 'Generate full-stack apps, SaaS dashboards, and backend APIs', category: 'Tools', tab: 'dev', icon: Code },
  { id: 'tool-3', title: 'AI Agent Platform', subtitle: 'Deploy autonomous agents, multi-agent workflows, and RAG knowledge', category: 'Tools', tab: 'agents', icon: Cpu },
  { id: 'tool-11', title: 'Python GenAI Repository Inspector', subtitle: 'Inspect Python GenAI codebases, AST auditing & Google GenAI SDK analysis (rananisarsb51214)', category: 'Tools', tab: 'repo_inspector', icon: Code2, tags: ['Python', 'GenAI', 'AST', 'Inspector'] },
  { id: 'tool-4', title: 'AI Commercial Studio', subtitle: '30s vertical cinematic AI commercial generator', category: 'Tools', tab: 'commercial', icon: Film },
  { id: 'tool-5', title: '100 Coding Skills Library', subtitle: 'Curated skills, framework templates and prompt engineering guides', category: 'Tools', tab: 'skills', icon: Sparkles },
  { id: 'tool-6', title: 'Database Memory Vault', subtitle: 'Real-time persistent cloud memory store for prompts & codebase states', category: 'Tools', tab: 'memory', icon: HardDrive },
  { id: 'tool-7', title: 'AI Creative Studio', subtitle: 'Generate stunning AI images, voice assets, and brand kits', category: 'Tools', tab: 'creative', icon: Palette },
  { id: 'tool-8', title: 'Business & Productivity Dashboard', subtitle: 'Kanban boards, ERP metrics, and revenue analytics', category: 'Tools', tab: 'business', icon: Briefcase },
  { id: 'tool-9', title: 'Automation & Workflows', subtitle: 'Visual workflow builder, triggers, and automated actions', category: 'Tools', tab: 'automation', icon: Workflow },
  { id: 'tool-10', title: 'Enterprise Settings & Keys', subtitle: 'RBAC, security compliance, encryption, and API key management', category: 'Tools', tab: 'enterprise', icon: Shield }
];

export function GlobalSearchModal({ isOpen, onClose, onSelectTab }: GlobalSearchModalProps) {
  const { user } = useAuth();
  const [queryStr, setQueryStr] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Agents' | 'Memory Snippets' | 'Documentation' | 'Tools'>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [memoryItems, setMemoryItems] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Real-time memory snippets fetch from Firestore
  useEffect(() => {
    if (!user) return;
    try {
      const q = query(
        collection(db, 'nova_database_memory'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const items: SearchResultItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          items.push({
            id: docSnap.id,
            title: data.title || 'Saved Snippet',
            subtitle: data.content ? (data.content.length > 80 ? data.content.substring(0, 80) + '...' : data.content) : 'Database Snippet',
            category: 'Memory Snippets',
            tab: 'memory',
            icon: HardDrive,
            tags: [data.category || 'Firestore', 'Memory'],
            payload: data.content
          });
        });
        setMemoryItems(items);
      }, (err) => {
        console.warn('Memory fetch info for search:', err.message);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Memory query error:', e);
    }
  }, [user]);

  // Combined fallback memory items if user has none saved yet
  const effectiveMemoryItems: SearchResultItem[] = memoryItems.length > 0 ? memoryItems : [
    {
      id: 'default-mem-1',
      title: 'Production API Schema v3',
      subtitle: 'GraphQL & REST endpoint definitions with rate-limiting rules',
      category: 'Memory Snippets',
      tab: 'memory',
      icon: HardDrive,
      tags: ['Schema', 'API', 'Firestore']
    },
    {
      id: 'default-mem-2',
      title: 'E-commerce Super God System Prompt',
      subtitle: 'Conversion-optimized prompt for product funnel generation',
      category: 'Memory Snippets',
      tab: 'memory',
      icon: HardDrive,
      tags: ['Prompt', 'E-commerce']
    },
    {
      id: 'default-mem-3',
      title: 'Firebase Security Rules Config',
      subtitle: 'Strict Firestore document read/write authorization patterns',
      category: 'Memory Snippets',
      tab: 'memory',
      icon: HardDrive,
      tags: ['Firebase', 'Security']
    }
  ];

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQueryStr('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Combine all searchable items
  const allSearchableItems: SearchResultItem[] = [
    ...STATIC_AGENTS,
    ...effectiveMemoryItems,
    ...STATIC_DOCS,
    ...STATIC_TOOLS
  ];

  // Filter items by query and active category
  const filteredResults = allSearchableItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const q = queryStr.trim().toLowerCase();
    if (!q) return matchesCategory;

    const matchesTitle = item.title.toLowerCase().includes(q);
    const matchesSubtitle = item.subtitle.toLowerCase().includes(q);
    const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(q));
    const matchesPayload = item.payload?.toLowerCase().includes(q);

    return matchesCategory && (matchesTitle || matchesSubtitle || matchesTags || matchesPayload);
  });

  // Keep selectedIndex bounded
  useEffect(() => {
    setSelectedIndex(0);
  }, [queryStr, activeCategory]);

  // Keyboard Navigation (Arrow keys, Enter, Esc)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredResults.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          handleSelectResult(filteredResults[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex]);

  const handleSelectResult = (item: SearchResultItem) => {
    onSelectTab(item.tab);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Click outside backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-slate-900/95 border border-white/15 rounded-[24px] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[82vh] backdrop-blur-2xl">
        
        {/* Top Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center space-x-3 bg-slate-950/60">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={queryStr}
            onChange={(e) => setQueryStr(e.target.value)}
            placeholder="Search AI agents, database memory snippets, docs or tools..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
          />
          {queryStr && (
            <button
              onClick={() => setQueryStr('')}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block px-2 py-1 text-[10px] font-mono text-slate-400 bg-slate-800 border border-white/10 rounded-lg">
            ESC
          </span>
        </div>

        {/* Category Filters */}
        <div className="px-4 py-2.5 bg-slate-950/40 border-b border-white/10 flex items-center space-x-2 overflow-x-auto text-xs shrink-0 no-scrollbar">
          {(['All', 'Agents', 'Memory Snippets', 'Documentation', 'Tools'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30 border border-white/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              {cat === 'Agents' && <Bot className="w-3.5 h-3.5" />}
              {cat === 'Memory Snippets' && <HardDrive className="w-3.5 h-3.5" />}
              {cat === 'Documentation' && <BookOpen className="w-3.5 h-3.5" />}
              {cat === 'Tools' && <Sparkles className="w-3.5 h-3.5" />}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-3 space-y-1 divide-y divide-slate-800/40">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              const IconComp = item.icon;

              let categoryBadgeColor = 'bg-slate-800 text-slate-400 border-slate-700';
              if (item.category === 'Agents') categoryBadgeColor = 'bg-indigo-950/80 text-indigo-400 border-indigo-800/60';
              if (item.category === 'Memory Snippets') categoryBadgeColor = 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60';
              if (item.category === 'Documentation') categoryBadgeColor = 'bg-cyan-950/80 text-cyan-400 border-cyan-800/60';
              if (item.category === 'Tools') categoryBadgeColor = 'bg-purple-950/80 text-purple-400 border-purple-800/60';

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectResult(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-slate-800/90 border border-indigo-500/50 shadow-md'
                      : 'hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-start space-x-3.5 overflow-hidden">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-indigo-400'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div className="overflow-hidden space-y-0.5">
                      <div className="flex items-center space-x-2 flex-wrap">
                        <span className={`text-xs font-bold transition-colors ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {item.title}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.2 rounded-md border ${categoryBadgeColor}`}>
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate max-w-lg">{item.subtitle}</p>
                      
                      {item.tags && (
                        <div className="flex items-center space-x-1.5 pt-1">
                          {item.tags.map((t, idx) => (
                            <span key={idx} className="text-[9px] font-mono text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center space-x-2 pl-2">
                    {isSelected ? (
                      <span className="inline-flex items-center space-x-1 text-[10px] font-mono text-indigo-400 bg-indigo-950/60 px-2 py-1 rounded-lg border border-indigo-800">
                        <span>Jump to</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center space-y-2">
              <Search className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs font-medium text-slate-400">No results found for "{queryStr}"</p>
              <p className="text-[11px] text-slate-600">Try searching for "Market Research", "Firestore", "Quickstart" or "Multi-Model Hub"</p>
            </div>
          )}
        </div>

        {/* Modal Footer with Shortcuts */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300">↓</kbd>
              <span className="text-slate-500 ml-1">Navigate</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300">↵</kbd>
              <span className="text-slate-500 ml-1">Select</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300">ESC</kbd>
              <span className="text-slate-500 ml-1">Close</span>
            </span>
          </div>

          <div className="flex items-center space-x-1 text-slate-500">
            <Command className="w-3 h-3 text-indigo-400" />
            <span>Nova QuickSearch</span>
          </div>
        </div>

      </div>
    </div>
  );
}
