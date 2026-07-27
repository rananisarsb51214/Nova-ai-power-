import React, { useState } from 'react';
import { Share2, Sparkles, MessageSquare, Calendar, Copy, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function SocialSuite() {
  const { user } = useAuth();
  const [topic, setTopic] = useState('Launching NISAR AI Studio - The Ultimate Open AI Workspace');
  const [platform, setPlatform] = useState('Twitter / X');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim() || loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Create an engaging social media post for ${platform} about: "${topic}". Include relevant hashtags and emojis.`,
          model: 'gemini-2.5-flash',
          systemInstruction: 'You are an expert social media growth marketer.'
        })
      });
      const data = await res.json();
      setGeneratedContent(data.text || 'No post generated.');
    } catch (err: any) {
      setGeneratedContent(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-600" />
            Social Media Suite & Content Planner
          </h2>
          <p className="text-xs text-slate-500">Generate viral captions, thread scripts, and carousels for all social platforms</p>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden p-6 gap-6">
        <div className="w-1/2 flex flex-col space-y-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">AI Content Generator</h3>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Target Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="Twitter / X">Twitter / X Thread</option>
                <option value="LinkedIn">LinkedIn Professional Post</option>
                <option value="Instagram">Instagram Caption & Reels Script</option>
                <option value="YouTube">YouTube Video Script / Shorts</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Topic / Announcement</label>
              <textarea
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              ></textarea>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/25 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Crafting Content...' : 'Generate Social Post'}</span>
            </button>
          </div>
        </div>

        <div className="w-1/2 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Generated Output</h3>
              {generatedContent && (
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-200 rounded-xl text-xs font-medium transition-all flex items-center space-x-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              )}
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-mono min-h-[220px]">
              {generatedContent || 'Generated post will appear here...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
