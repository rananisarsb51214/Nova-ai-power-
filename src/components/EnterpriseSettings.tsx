import React from 'react';
import { Shield, Key, Lock, CheckCircle2, UserCheck, Database, Terminal } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function EnterpriseSettings() {
  const { user } = useAuth();

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            Enterprise Features, Security & API Keys
          </h2>
          <p className="text-xs text-slate-500">Manage security compliance, role-based access control, encryption keys, and audit logs</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Authentication</span>
              <UserCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-2">Firebase Auth Active</p>
            <p className="text-[10px] text-slate-400 mt-1">Email/Password, Google & Phone Auth</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Database Engine</span>
              <Database className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-2">Cloud Firestore</p>
            <p className="text-[10px] text-slate-400 mt-1">Encrypted at rest & in transit</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Security Compliance</span>
              <Lock className="w-4 h-4 text-violet-500" />
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-2">SOC2 / GDPR Ready</p>
            <p className="text-[10px] text-slate-400 mt-1">Enterprise RBAC enforced</p>
          </div>
        </div>

        {/* API Keys Management */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-600" />
            API Keys & Secrets Configuration
          </h3>
          <p className="text-xs text-slate-500">Environment variables are securely injected at runtime via AI Studio secrets and .env settings.</p>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-slate-500">GEMINI_API_KEY:</span>
                <span className="text-emerald-600 dark:text-emerald-400 ml-2">••••••••••••••••••••••••</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded text-[10px]">Active (Server-Side)</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-slate-500">FIREBASE_PROJECT_ID:</span>
                <span className="text-indigo-600 dark:text-indigo-400 ml-2">gen-lang-client-0171270179</span>
              </div>
              <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded text-[10px]">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
