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
  Film,
  HardDrive,
  Code2,
  ChevronRight,
  Zap,
  Flame,
  CheckCircle2,
  X
} from 'lucide-react';
import { User } from 'firebase/auth';
import { motion } from 'motion/react';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  user: User | null;
  onSignOut: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ currentTab, onSelectTab, user, onSignOut, mobileOpen, onCloseMobile }: SidebarProps) {
  const menuItems = [
    { id: 'hub', label: 'Multi-Model AI Hub', icon: Bot, badge: '10 Models' },
    { id: 'nova_video_demo', label: 'Nova AI Video & Templates', icon: Film, badge: 'Video AI' },
    { id: 'vibe_responding', label: 'Vibe Responding Agent', icon: Flame, badge: 'Vibe AI' },
    { id: 'vibe_coding', label: 'Vibe Coding Agent', icon: Zap, badge: 'Flow Code' },
    { id: 'dev', label: 'AI Development Studio', icon: Code, badge: 'Full-Stack' },
    { id: 'agents', label: 'AI Agent Platform', icon: Cpu, badge: 'Autonomous' },
    { id: 'repo_inspector', label: 'Python GenAI Inspector', icon: Code2, badge: 'Python AI' },
    { id: 'commercial', label: 'AI Commercial Studio', icon: Film, badge: '30s Ad' },
    { id: 'skills', label: '100 Coding Skills', icon: Sparkles, badge: '100 Skills' },
    { id: 'memory', label: 'Database Memory Vault', icon: HardDrive, badge: 'Firestore' },
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

  const sidebarContent = (
    <aside className="w-72 h-full bg-slate-950/80 backdrop-blur-2xl text-slate-300 flex flex-col border-r border-white/10 shrink-0 select-none shadow-2xl relative z-30">
      {/* Glow Orbs */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div id="tour-step-brand" className="p-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-white/20 flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="font-bold text-white text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Nova AI Power
              </h1>
            </div>
            <p className="text-[11px] text-indigo-400/90 font-mono flex items-center gap-1">
              <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400" />
              <span>Super Enterprise v3.0</span>
            </p>
          </div>
        </div>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400/80 flex items-center justify-between">
          <span>Workspace Modules</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              id={`tour-step-${item.id}`}
              key={item.id}
              onClick={() => {
                onSelectTab(item.id as TabType);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`relative w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 group ${
                isActive
                  ? 'text-white bg-gradient-to-r from-indigo-600/90 to-purple-600/90 border border-white/20 shadow-lg shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.06] border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3 z-10">
                <div className={`p-1.5 rounded-xl transition-colors ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-900/60 text-slate-400 group-hover:text-indigo-400 group-hover:bg-slate-900'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span>{item.label}</span>
              </div>

              <div className="flex items-center space-x-1.5 z-10">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium transition-all ${
                  isActive 
                    ? 'bg-white/20 text-white border border-white/30 shadow-inner' 
                    : 'bg-slate-900/80 text-slate-400 border border-white/5 group-hover:border-white/10'
                }`}>
                  {item.badge}
                </span>
              </div>
            </button>
          );
        })}

        <div className="pt-5 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400/80 flex items-center justify-between">
          <span>Website & Ecosystem</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
        </div>

        <div className="grid grid-cols-1 gap-1">
          {webPages.map((page) => {
            const isActive = currentTab === page.id;
            return (
              <button
                key={page.id}
                onClick={() => {
                  onSelectTab(page.id as TabType);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between group ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <span>{page.label}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                  isActive ? 'text-indigo-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                }`} />
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Session Footer */}
      <div className="p-4 border-t border-white/10 bg-slate-950/90 backdrop-blur-md">
        <div className="flex items-center space-x-3 mb-3 p-2 bg-slate-900/60 border border-white/5 rounded-2xl">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 border border-white/20 flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
            {user?.email ? user.email[0].toUpperCase() : <UserIcon className="w-4 h-4" />}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-xs font-semibold text-white truncate">{user?.email || user?.phoneNumber || 'Authenticated User'}</p>
            <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">Firestore Connected</span>
            </p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="w-full py-2.5 px-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-300 hover:text-red-200 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-2 group"
        >
          <LogOut className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" 
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 max-w-xs w-full h-full">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

