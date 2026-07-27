import React, { useState } from 'react';
import { GeneratedProject } from '../types';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Code, Terminal, Play, Sparkles, Database, Save, CheckCircle2, Layers } from 'lucide-react';

export function DevStudio() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [prompt, setPrompt] = useState('Build a modern SaaS landing page with dark mode, pricing cards, and interactive FAQ accordion.');
  const [projectType, setProjectType] = useState<'fullstack' | 'website' | 'saas' | 'api' | 'mobile'>('website');
  const [generatedCode, setGeneratedCode] = useState<string>('// Enter prompt above and click "Generate Code" to build your application.');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate a production-ready, clean TypeScript React component or full-stack structure for the following requirement: "${prompt}". Project type: ${projectType}. Provide well-structured JSX and Tailwind CSS code.`,
          model: 'gemini-2.5-flash',
          systemInstruction: 'You are an elite principal software engineer. Output clean, fully functional code blocks and explanations.'
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setGeneratedCode(data.text || '// No code generated.');
      showToast('Code generated successfully with Gemini AI!', 'success');
    } catch (err: any) {
      setGeneratedCode(`// Error generating code: ${err.message}`);
      showToast('Failed to generate code: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToFirestore = async () => {
    if (!user) {
      showToast('Please sign in to save projects to Firestore.', 'error');
      return;
    }
    setSaving(true);
    try {
      await addDoc(collection(db, 'projects'), {
        userId: user.uid,
        title: prompt.slice(0, 40) + '...',
        description: prompt,
        type: projectType,
        code: generatedCode,
        createdAt: Date.now()
      });
      setSavedSuccess(true);
      showToast('Project saved successfully to Firestore!', 'success');
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      showToast('Failed to save project: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Header Controls */}
      <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-600" />
            AI Development Studio
          </h2>
          <p className="text-xs text-slate-500">Generate full-stack apps, SaaS components, databases, and APIs with AI</p>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value as any)}
            className="px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="website">Website / Landing Page</option>
            <option value="saas">SaaS Dashboard</option>
            <option value="fullstack">Full-Stack App</option>
            <option value="api">REST API / Backend</option>
            <option value="mobile">Mobile App Layout</option>
          </select>

          <button
            onClick={handleSaveToFirestore}
            disabled={saving}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-xs flex items-center space-x-2 shadow-sm transition-all disabled:opacity-50"
          >
            {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{savedSuccess ? 'Saved to Firestore!' : 'Save Project'}</span>
          </button>
        </div>
      </div>

      {/* Prompt input bar */}
      <div className="p-4 bg-white dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 flex items-center space-x-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to build (e.g. 'Crypto portfolio tracker with charts')..."
          className="flex-1 px-4 py-2.5 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-sm shadow-lg shadow-indigo-600/25 flex items-center space-x-2 transition-all disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{loading ? 'Building...' : 'Generate Code'}</span>
        </button>
      </div>

      {/* Code Editor & Preview Split View */}
      <div className="flex-1 flex overflow-hidden p-6 gap-6">
        <div className="flex-1 flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              <span className="ml-2 text-slate-300">AppGenEngine.tsx</span>
            </div>
            <span>TypeScript + React</span>
          </div>
          <div className="flex-1 p-4 overflow-auto font-mono text-xs text-indigo-200 leading-relaxed">
            <pre>{generatedCode}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
