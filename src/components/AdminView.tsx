import React, { useState } from 'react';
import { Shield, Users, Activity, Database, Server, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export function AdminView() {
  const { showToast } = useToast();
  const [syncing, setSyncing] = useState(false);

  const handleSyncDatabase = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      showToast('PostgreSQL & Supabase schemas synchronized successfully!', 'success');
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-y-auto p-8 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-indigo-400" />
            Nova AI Admin Panel & System Governance
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage users, organizations, real-time database sync, and server telemetry.</p>
        </div>

        <button
          onClick={handleSyncDatabase}
          disabled={syncing}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          <span>{syncing ? 'Syncing Schema...' : 'Sync Database Schema'}</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs">Active Users</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <h3 className="text-3xl font-black text-white">1,482</h3>
          <p className="text-[10px] text-emerald-400 font-mono">+12.4% from last week</p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs">API Requests / Min</span>
            <Activity className="w-4 h-4 text-violet-400" />
          </div>
          <h3 className="text-3xl font-black text-white">8,940</h3>
          <p className="text-[10px] text-emerald-400 font-mono">99.99% Success Rate</p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs">PostgreSQL DB Load</span>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-3xl font-black text-white">14.2%</h3>
          <p className="text-[10px] text-emerald-400 font-mono">Optimal Performance</p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs">System Status</span>
            <Server className="w-4 h-4 text-indigo-400" />
          </div>
          <h3 className="text-3xl font-black text-emerald-400">Operational</h3>
          <p className="text-[10px] text-slate-400 font-mono">All regions green</p>
        </div>
      </div>

      {/* System Logs Table */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
        <h3 className="text-sm font-bold text-white">Recent System Audit Logs</h3>
        <div className="space-y-2 font-mono text-xs">
          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between">
            <span className="text-emerald-400">[200 OK] POST /api/v1/skills/sync</span>
            <span className="text-slate-500">12s ago • nisarrsna@gmail.com</span>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between">
            <span className="text-emerald-400">[200 OK] GET /api/v1/models/stream</span>
            <span className="text-slate-500">45s ago • System Daemon</span>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between">
            <span className="text-indigo-400">[INFO] PostgreSQL migration v3.2 applied</span>
            <span className="text-slate-500">2m ago • Admin Console</span>
          </div>
        </div>
      </div>
    </div>
  );
}
