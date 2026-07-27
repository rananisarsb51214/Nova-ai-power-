import React from 'react';
import { Sparkles, ArrowRight, Code, Shield, Cpu, Zap, CheckCircle2, Bot, Layers } from 'lucide-react';
import { TabType } from '../types';

interface LandingViewProps {
  onSelectTab: (tab: TabType) => void;
}

export function LandingView({ onSelectTab }: LandingViewProps) {
  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-y-auto">
      {/* Hero Section */}
      <div className="relative px-6 py-24 md:py-32 flex flex-col items-center text-center max-w-5xl mx-auto space-y-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950 pointer-events-none"></div>

        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>Nova AI Power v3.0 • The Ultimate Enterprise AI Ecosystem</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
          Build, Scale & Automate With <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400">Autonomous AI Power</span>
        </h1>

        <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
          Unleash 10 world-class AI models, 100 expert coding skills, autonomous multi-agent workflows, and enterprise-grade security in a single unified platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <button
            onClick={() => onSelectTab('hub')}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-sm flex items-center justify-center space-x-3 shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <span>Launch Multi-Model Hub</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSelectTab('skills')}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold rounded-2xl text-sm border border-slate-800 hover:border-slate-700 transition-all"
          >
            Explore 100 Coding Skills
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 w-full max-w-4xl">
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl text-center">
            <h4 className="text-3xl font-black text-white">10+</h4>
            <p className="text-xs text-slate-400 mt-1">AI Engines</p>
          </div>
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl text-center">
            <h4 className="text-3xl font-black text-white">100</h4>
            <p className="text-xs text-slate-400 mt-1">Expert Skills</p>
          </div>
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl text-center">
            <h4 className="text-3xl font-black text-white">99.9%</h4>
            <p className="text-xs text-slate-400 mt-1">Uptime SLA</p>
          </div>
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl text-center">
            <h4 className="text-3xl font-black text-white">SOC2</h4>
            <p className="text-xs text-slate-400 mt-1">Enterprise Ready</p>
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div className="bg-slate-900/50 border-t border-slate-800/80 py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Engineered for High-Velocity Engineering Teams</h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">Everything you need to build production software, automate repetitive workflows, and govern enterprise AI access.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Multi-Model AI Hub</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Instantly switch between Gemini 2.5, GPT-4o, Claude 3.5 Sonnet, Grok, and Llama 3 with real-time prompt streaming.</p>
            </div>

            <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-600/20 text-violet-400 flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Autonomous Agent Platform</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Deploy multi-agent swarms with RAG memory, automated GitHub PR creation, and real-time step monitoring.</p>
            </div>

            <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Enterprise Security & RBAC</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Role-based access control, API key vaulting, encrypted audit logs, and SOC2 compliance monitoring.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
