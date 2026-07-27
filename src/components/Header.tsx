import React, { useState } from 'react';
import { Search, Sparkles, Command, Bot, Code, Cpu, Palette, Briefcase, Workflow, Share2, Shield, X } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

const SEARCHABLE_ITEMS = [
  { title: 'Multi-Model AI Hub', tab: 'hub' as TabType, category: 'Tools', description: 'Switch between Gemini, GPT-4o, Claude 3.5 Sonnet, Grok, Llama and DeepSeek.' },
  { title: 'AI Development Studio', tab: 'dev' as TabType, category: 'Tools', description: 'Generate full-stack apps, SaaS dashboards, and backend APIs.' },
  { title: 'AI Agent Platform', tab: 'agents' as TabType, category: 'Tools', description: 'Deploy autonomous agents, multi-agent workflows, and RAG knowledge.' },
  { title: 'AI Commercial Studio', tab: 'commercial' as TabType, category: 'Tools', description: '30s vertical cinematic AI commercial: BUILD FIRST. QUIT LATER.' },
  { title: 'AI Creative Studio', tab: 'creative' as TabType, category: 'Tools', description: 'Generate stunning AI images, voice assets, and brand kits.' },
  { title: 'Business & CRM Dashboard', tab: 'business' as TabType, category: 'Tools', description: 'Kanban boards, ERP metrics, and revenue analytics.' },
  { title: 'Automation & Workflows', tab: 'automation' as TabType, category: 'Tools', description: 'Visual workflow builder, triggers, and automated actions.' },
  { title: 'Social Media Suite', tab: 'social' as TabType, category: 'Tools', description: 'Viral captions, thread scripts, and content planner.' },
  { title: 'Enterprise Security & API Keys', tab: 'enterprise' as TabType, category: 'Tools', description: 'RBAC, security compliance, encryption, and API keys.' },
];

export function Header({ currentTab, onSelectTab }: HeaderProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = SEARCHABLE_ITEMS.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between shrink-0 relative z-40">
      <div className="flex items-center space-x-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search tools, agents, or projects (Press '/' to focus)..."
            className="w-full pl-10 pr-10 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Search Dropdown Results */}
          {isOpen && query.trim().length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Ecosystem Search Results ({filteredItems.length})
              </div>
              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onSelectTab(item.tab);
                        setIsOpen(false);
                        setQuery('');
                      }}
                      className="w-full text-left p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all flex items-start space-x-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.description}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No matching tools or workflows found for "{query}".
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <span className="inline-flex items-center space-x-1 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-medium border border-indigo-200/50 dark:border-indigo-900/50">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span>Nova AI Engine v3.0</span>
        </span>
      </div>
    </header>
  );
}
