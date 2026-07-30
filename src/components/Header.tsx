import React, { useState } from 'react';
import { Search, Sparkles, Command, Bot, Code, Cpu, Palette, Briefcase, Workflow, Share2, Shield, X } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenSearch?: () => void;
}

export function Header({ currentTab, onSelectTab, onOpenSearch }: HeaderProps) {

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between shrink-0 relative z-40">
      <div className="flex items-center space-x-4 flex-1 max-w-xl">
        <button
          onClick={onOpenSearch}
          className="w-full pl-3.5 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-between text-left group"
        >
          <div className="flex items-center space-x-2.5">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            <span>Search agents, memory snippets, docs or tools...</span>
          </div>

          <div className="flex items-center space-x-1 shrink-0">
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md border border-slate-300 dark:border-slate-600 shadow-sm flex items-center gap-0.5">
              <Command className="w-3 h-3" />
              <span>K</span>
            </kbd>
          </div>
        </button>
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
