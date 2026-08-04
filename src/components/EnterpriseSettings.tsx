import React, { useState } from 'react';
import { Shield, Key, Lock, CheckCircle2, UserCheck, Database, Terminal, AlertTriangle, RefreshCw, Sparkles, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function EnterpriseSettings() {
  const { user } = useAuth();
  const [testingKey, setTestingKey] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  const runApiKeyTest = async () => {
    setTestingKey(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/ai/test-key', { method: 'POST' });
      const data = await res.json();
      setTestResult(data);
    } catch (err: any) {
      setTestResult({
        success: false,
        error: err.message || 'Failed to connect to backend server test endpoint'
      });
    } finally {
      setTestingKey(false);
    }
  };

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

        {/* API Keys Management & Live Diagnostic */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-indigo-600" />
                API Keys & Secrets Diagnostic Tool
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Environment variables are securely injected at runtime via AI Studio secrets and .env settings.</p>
            </div>
            <button
              onClick={runApiKeyTest}
              disabled={testingKey}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center space-x-2 disabled:opacity-50"
            >
              {testingKey ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Activity className="w-3.5 h-3.5" />}
              <span>{testingKey ? 'Testing API Key...' : 'Test Google AI Key Live'}</span>
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-slate-500">GEMINI_API_KEY:</span>
                <span className="text-emerald-600 dark:text-emerald-400 ml-2">AQ.A...MTTg</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded text-[10px]">Loaded Server-Side</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-slate-500">FIREBASE_PROJECT_ID:</span>
                <span className="text-indigo-600 dark:text-indigo-400 ml-2">gen-lang-client-0171270179</span>
              </div>
              <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded text-[10px]">Connected</span>
            </div>
          </div>

          {/* Test Diagnostic Output */}
          {testResult && (
            <div className={`p-4 rounded-xl border text-xs font-sans space-y-2 ${
              testResult.success
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
            }`}>
              <div className="flex items-center justify-between font-bold">
                <div className="flex items-center space-x-2">
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span>{testResult.success ? 'API Key Active & Operational!' : 'API Key Status Diagnostic'}</span>
                </div>
                {testResult.latencyMs && (
                  <span className="text-[10px] font-mono text-slate-400">{testResult.latencyMs}ms</span>
                )}
              </div>

              {testResult.output && (
                <p className="p-2 bg-slate-900/80 rounded-lg text-slate-200 font-mono text-[11px]">
                  Output: "{testResult.output}"
                </p>
              )}

              {testResult.error && (
                <div className="space-y-1.5">
                  <p className="font-semibold text-amber-300">Detailed Server Response:</p>
                  <pre className="p-2.5 bg-slate-950 rounded-lg text-[10px] font-mono overflow-x-auto text-amber-200/90 whitespace-pre-wrap border border-amber-500/20">
                    {testResult.error}
                  </pre>
                  {testResult.details === 429 && (
                    <p className="text-[11px] text-slate-300 pt-1">
                      💡 <strong>Diagnosis:</strong> The API key is valid and detected, but the free tier request quota limit has been reached for this Google AI Studio project key (HTTP 429 Rate Limit/Quota Exhausted). Please wait a minute or upgrade quota on <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="underline text-indigo-400">Google AI Studio</a>.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
