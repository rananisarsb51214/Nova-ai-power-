import React, { useState } from 'react';
import { Briefcase, Kanban, Plus, TrendingUp, Users, DollarSign, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export function BusinessDashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Launch Q3 Marketing Campaign', status: 'in_progress', priority: 'high' },
    { id: '2', title: 'Optimize Firestore Security Rules', status: 'todo', priority: 'medium' },
    { id: '3', title: 'Client Onboarding Automation', status: 'done', priority: 'high' }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks(prev => [...prev, { id: Date.now().toString(), title: newTaskTitle, status: 'todo', priority: 'medium' }]);
    setNewTaskTitle('');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            Business & Productivity (CRM, ERP & Kanban)
          </h2>
          <p className="text-xs text-slate-500">Manage business operations, Kanban boards, and enterprise analytics</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Total ARR</span>
              <DollarSign className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">$148,250</p>
            <span className="text-[10px] text-emerald-500 font-medium mt-1 inline-block">+14.2% this month</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Active Workspaces</span>
              <Users className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">1,284</p>
            <span className="text-[10px] text-indigo-500 font-medium mt-1 inline-block">+85 new today</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">AI Task Executions</span>
              <TrendingUp className="w-4 h-4 text-violet-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">48,920</p>
            <span className="text-[10px] text-violet-500 font-medium mt-1 inline-block">99.98% success rate</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Database Sync</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">Firestore</p>
            <span className="text-[10px] text-emerald-500 font-medium mt-1 inline-block">Real-time active</span>
          </div>
        </div>

        {/* Kanban Task Manager */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Kanban className="w-4 h-4 text-indigo-600" />
              Project Kanban Board
            </h3>
            <form onSubmit={handleAddTask} className="flex items-center space-x-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="New task title..."
                className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
              <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-medium">Add</button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['todo', 'in_progress', 'done'].map(status => (
              <div key={status} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">{status.replace('_', ' ')}</h4>
                <div className="space-y-2.5">
                  {tasks.filter(t => t.status === status).map(task => (
                    <div key={task.id} className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
                      <p className="font-medium text-slate-900 dark:text-white">{task.title}</p>
                      <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-mono ${
                        task.priority === 'high' ? 'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {task.priority} priority
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
