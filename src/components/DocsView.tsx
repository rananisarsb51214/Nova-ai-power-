import React, { useState } from 'react';
import { BookOpen, Terminal, Code, Cpu, Shield, Search, Copy, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export function DocsView() {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const sampleCode = `import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateNovaResponse(prompt: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  return response.text;
}`;

  const copySnippet = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    showToast('Code snippet copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-y-auto px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-12 w-full">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-950 text-indigo-400 text-xs font-mono mb-4 border border-indigo-800">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Nova AI Power Documentation v3.0</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">Developer Quickstart Guide</h1>
          <p className="text-sm text-slate-400 mt-2">Learn how to integrate Nova AI Power APIs, multi-model hubs, and 100 coding skills into your stack.</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-400" />
            1. Installation & Environment Setup
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Clone the repository and configure your environment variables. Ensure your Gemini API key is securely stored in your server environment.
          </p>
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl font-mono text-xs text-slate-300 space-y-1">
            <p className="text-indigo-400"># Install dependencies</p>
            <p>npm install</p>
            <p className="text-indigo-400 mt-2"># Run development server</p>
            <p>npm run dev</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-indigo-400" />
              2. Server-Side SDK Integration
            </h2>
            <button
              onClick={copySnippet}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl font-mono text-xs text-slate-200 overflow-x-auto whitespace-pre leading-relaxed">
            {sampleCode}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            3. Security & Rate Limiting
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            All API calls are proxied through secure server routes. Never expose API keys on the client browser. Refer to the Enterprise Security panel for RBAC configurations.
          </p>
        </div>
      </div>
    </div>
  );
}
