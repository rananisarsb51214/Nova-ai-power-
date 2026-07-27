import React, { useState } from 'react';
import { Cpu, Play, Plus, CheckCircle2, Bot, Terminal, Shield, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export function AgentPlatform() {
  const { user } = useAuth();
  const [agents, setAgents] = useState([
    { id: '1', name: 'Market Research Agent', role: 'Competitor Analysis & Web Scraping', status: 'idle', trigger: 'Scheduled daily' },
    { id: '2', name: 'Code Reviewer Agent', role: 'Security & Quality Audits', status: 'ready', trigger: 'On Git PR' },
    { id: '3', name: 'Customer Support Bot', role: 'Automated Tier-1 Resolution', status: 'active', trigger: 'Webhook event' },
  ]);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentRole, setNewAgentRole] = useState('');
  const [runningAgentId, setRunningAgentId] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([
    'System initialized. Agent network online.',
    'RAG Knowledge Base connected to Firestore.'
  ]);

  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentName.trim()) return;
    const newAgent = {
      id: Date.now().toString(),
      name: newAgentName,
      role: newAgentRole || 'General Assistant',
      status: 'idle',
      trigger: 'Manual execution'
    };
    setAgents(prev => [...prev, newAgent]);
    setNewAgentName('');
    setNewAgentRole('');
  };

  const handleRunAgent = (id: string, name: string) => {
    setRunningAgentId(id);
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] Starting execution for agent "${name}"...`, ...prev]);
    setTimeout(() => {
      setLogs(prev => [`[${new Date().toLocaleTimeString()}] Agent "${name}" successfully completed task pipeline.`, ...prev]);
      setRunningAgentId(null);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600" />
            AI Agent Platform & Multi-Agent Workflows
          </h2>
          <p className="text-xs text-slate-500">Build autonomous agents, RAG knowledge bases, and multi-agent pipelines</p>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden p-6 gap-6">
        {/* Agent List */}
        <div className="w-1/2 flex flex-col space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Deploy New AI Agent</h3>
            <form onSubmit={handleCreateAgent} className="space-y-3">
              <input
                type="text"
                value={newAgentName}
                onChange={(e) => setNewAgentName(e.target.value)}
                placeholder="Agent Name (e.g. Legal Contract Analyzer)"
                className="w-full px-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <input
                type="text"
                value={newAgentRole}
                onChange={(e) => setNewAgentRole(e.target.value)}
                placeholder="Role / Goal Description..."
                className="w-full px-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md shadow-indigo-600/20"
              >
                <Plus className="w-4 h-4" />
                <span>Create Autonomous Agent</span>
              </button>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">Active Agents ({agents.length})</h3>
            {agents.map(agent => (
              <div key={agent.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{agent.name}</h4>
                    <p className="text-xs text-slate-500">{agent.role}</p>
                    <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded">
                      Trigger: {agent.trigger}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleRunAgent(agent.id, agent.name)}
                  disabled={runningAgentId === agent.id}
                  className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-medium rounded-xl transition-all flex items-center space-x-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{runningAgentId === agent.id ? 'Running...' : 'Run'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Execution Logs */}
        <div className="w-1/2 flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-medium">Agent Execution Console</span>
            </div>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Stream
            </span>
          </div>
          <div className="flex-1 p-4 overflow-auto font-mono text-xs text-emerald-300 space-y-2">
            {logs.map((log, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <span className="text-slate-500">›</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
