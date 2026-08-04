import React from 'react';
import { Search, Command, Menu, Sparkles, Bell, Shield, Database, Cpu } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenSearch?: () => void;
  onToggleMobileMenu?: () => void;
}

export function Header({ currentTab, onSelectTab, onOpenSearch, onToggleMobileMenu }: HeaderProps) {
  return (
    <header className="h-16 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl px-4 md:px-6 flex items-center justify-between shrink-0 relative z-30 shadow-md">
      <div className="flex items-center space-x-3 flex-1 max-w-xl">
        {/* Mobile menu trigger */}
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 border border-white/5 transition-colors"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search trigger bar */}
        <button
          id="tour-step-search"
          onClick={onOpenSearch}
          className="w-full pl-3.5 pr-3 py-2 text-xs bg-slate-900/80 border border-white/10 rounded-2xl text-slate-400 hover:border-indigo-500/50 hover:text-white hover:bg-slate-900 transition-all flex items-center justify-between text-left group shadow-inner"
        >
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <Search className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform shrink-0" />
            <span className="truncate">Search 10+ AI models, memory vault, skills, or tools...</span>
          </div>

          <div className="flex items-center space-x-1 shrink-0">
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-300 rounded-lg border border-white/10 shadow-sm flex items-center gap-1 group-hover:border-indigo-500/40 transition-colors">
              <Command className="w-3 h-3 text-indigo-400" />
              <span>K</span>
            </kbd>
          </div>
        </button>
      </div>

      <div className="flex items-center space-x-3">
        {/* Getting Started Tour Trigger */}
        <button
          id="tour-trigger-btn"
          onClick={() => {
            const event = new CustomEvent('nova_start_tour');
            window.dispatchEvent(event);
          }}
          className="px-3 py-1.5 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 shadow-md shadow-indigo-600/20 border border-indigo-400/30"
          title="Start Interactive Tour"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-200 animate-pulse" />
          <span className="hidden sm:inline">Getting Started Tour</span>
        </button>

        {/* Firestore Live Status Badge */}
        <div id="tour-step-status" className="hidden sm:flex items-center space-x-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[11px] font-medium">Firestore Live</span>
        </div>

        {/* Engine Version Badge */}
        <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-full text-xs font-medium shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[11px]">Nova Engine v3.0</span>
        </div>

        {/* Quick Notifications Button */}
        <button
          onClick={onOpenSearch}
          className="p-2 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-white/10 rounded-xl transition-all relative"
          title="Notifications & Quick Command"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}

