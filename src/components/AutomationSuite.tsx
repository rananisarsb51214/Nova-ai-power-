import React, { useState } from 'react';
import { Workflow, Plus, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export function AutomationSuite() {
  const { user } = useAuth();
  const [workflows, setWorkflows] = useState([
    { id: '1', name: 'New Lead AI Summary', trigger: 'Stripe Payment Received', action: 'Generate AI Brief & Email Slack', active: true, executions: 1420 },
    { id: '2', name: 'GitHub PR Code Security Audit', trigger: 'GitHub Push / PR', action: 'Run DeepSeek Coder Security Review', active: true, executions: 840 },
  ]);
  const [wfName, setWfName] = useState('');
  const [wfTrigger, setWfTrigger] = useState('New Firestore Document');
  const [wfAction, setWfAction] = useState('Run Gemini AI Summarizer');

  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wfName.trim()) return;
    setWorkflows(prev => [
      ...prev,
      { id: Date.now().toString(), name: wfName, trigger: wfTrigger, action: wfAction, active: true, executions: 0 }
    ]);
    setWfName('');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Workflow className="w-5 h-5 text-indigo-600" />
            Automation & Visual Workflows
          </h2>
          <p className="text-xs text-slate-500">Connect APIs, triggers, webhooks, and AI actions without code</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Create Workflow Box */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Create Automated Workflow</h3>
          <form onSubmit={handleCreateWorkflow} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Workflow Name</label>
              <input
                type="text"
                required
                value={wfName}
                onChange={(e) => setWfName(e.target.value)}
                placeholder="e.g. Daily SEO Report"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Trigger Event</label>
              <select
                value={wfTrigger}
                onChange={(e) => setWfTrigger(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="New Firestore Document">New Firestore Document</option>
                <option value="Stripe Payment Received">Stripe Payment Received</option>
                <option value="Scheduled Cron (Daily)">Scheduled Cron (Daily)</option>
                <option value="Incoming Webhook">Incoming Webhook</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">AI / API Action</label>
              <select
                value={wfAction}
                onChange={(e) => setWfAction(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="Run Gemini AI Summarizer">Run Gemini AI Summarizer</option>
                <option value="Generate Social Media Post">Generate Social Media Post</option>
                <option value="Send Email via SendGrid">Send Email via SendGrid</option>
                <option value="Post Notification to Slack">Post Notification to Slack</option>
              </select>
            </div>

            <button
              type="submit"
              className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md shadow-indigo-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Create Workflow</span>
            </button>
          </form>
        </div>

        {/* Active Workflows list */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">Active Automated Workflows ({workflows.length})</h3>
          {workflows.map(wf => (
            <div key={wf.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{wf.name}</h4>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-slate-500 font-mono">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">{wf.trigger}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded">{wf.action}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs font-mono text-slate-400">{wf.executions.toLocaleString()} executions</span>
                <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs font-medium rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
