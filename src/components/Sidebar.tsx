import React from 'react';
import { TabType } from '../types';
import { 
  Bot, 
  Code, 
  Cpu, 
  Palette, 
  Briefcase, 
  Workflow, 
  Share2, 
  Shield, 
  Sparkles,
  LogOut,
  User as UserIcon,
  Film
} from 'lucide-react';
import { User } from 'firebase/auth';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  user: User | null;
  onSignOut: () => void;
}

export function Sidebar({ currentTab, onSelectTab, user, onSignOut }: SidebarProps) {
  const menuItems = [
    { id: 'hub', label: 'Multi-Model AI Hub', icon: Bot, badge: '10 Models' },
    { id: 'dev', label: 'AI Development Studio', icon: Code, badge: 'Full-Stack' },
    { id: 'agents', label: 'AI Agent Platform', icon: Cpu, badge: 'Autonomous' },
    { id: 'commercial', label: 'AI Commercial Studio', icon: Film, badge: '30s Ad' },
    { id: 'skills', label: '100 Coding Skills', icon: Sparkles, badge: '100 Skills' },
    { id: 'creative', label: 'AI Creative Studio', icon: Palette, badge: 'Media' },
    { id: 'business', label: 'Business & Productivity', icon: Briefcase, badge: 'ERP/CRM' },
    { id: 'automation', label: 'Automation & Workflows', icon: Workflow, badge: 'Builder' },
    { id: 'social', label: 'Social Media Suite', icon: Share2, badge: 'Suite' },
    { id: 'enterprise', label: 'Enterprise & Security', icon: Shield, badge: 'Secure' },
  ];

  const webPages = [
    { id: 'landing', label: 'Landing Page' },
    { id: 'pricing', label: 'Pricing Plans' },
    { id: 'docs', label: 'Documentation' },
    { id: 'blog', label: 'Engineering Blog' },
    { id: 'contact', label: 'Contact & Support' },
    { id: 'admin', label: 'Admin Panel' },
  ];

  return (
    <aside className="w-72 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/80 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-white text-base tracking-tight">Nova AI Power</h1>
          <p className="text-xs text-slate-400 font-mono">Super AI Toolbox v3.0</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Workspace Modules
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id as TabType)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}>
                {item.badge}
              </span>
            </button>
          );
        })}

        <div className="pt-4 px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Website & Ecosystem
        </div>
        {webPages.map((page) => {
          const isActive = currentTab === page.id;
          return (
            <button
              key={page.id}
              onClick={() => onSelectTab(page.id as TabType)}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-slate-800 text-white font-bold border-l-2 border-indigo-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              {page.label}
            </button>
          );
        })}
      </nav>

      {/* User Session Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-semibold shrink-0">
              {user?.email ? user.email[0].toUpperCase() : <UserIcon className="w-4 h-4" />}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-white truncate">{user?.email || user?.phoneNumber || 'Authenticated User'}</p>
              <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Connected to Firestore
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-medium transition-all flex items-center justify-center space-x-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
