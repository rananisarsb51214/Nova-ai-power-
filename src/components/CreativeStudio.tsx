import React, { useState } from 'react';
import { Palette, Sparkles, Image as ImageIcon, Volume2, Wand2, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export function CreativeStudio() {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('Cyberpunk neon Tokyo street at night, cinematic lighting, 8k resolution');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [generating, setGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    if (!prompt.trim() || generating) return;
    setGenerating(true);
    // Simulate high-end AI image generation with Unsplash source or SVG preview fallback
    setTimeout(() => {
      setImageUrl(`https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3`);
      setGenerating(false);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-600" />
            AI Creative Studio (Image, Voice & Brand Kits)
          </h2>
          <p className="text-xs text-slate-500">Generate stunning visuals, marketing assets, and brand kits with generative AI</p>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden p-6 gap-6">
        {/* Controls */}
        <div className="w-1/2 flex flex-col space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-indigo-600" />
              Image & Graphic Generator
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Prompt Description</label>
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Aspect Ratio</label>
              <div className="grid grid-cols-3 gap-2">
                {['1:1', '16:9', '9:16'].map(ratio => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`py-2 text-xs font-medium rounded-xl border transition-all ${
                      aspectRatio === ratio
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateImage}
              disabled={generating}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/25 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{generating ? 'Generating Asset...' : 'Generate AI Image'}</span>
            </button>
          </div>
        </div>

        {/* Preview Canvas */}
        <div className="w-1/2 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm items-center justify-center">
          {imageUrl ? (
            <div className="relative group max-w-md w-full">
              <img src={imageUrl} alt="Generated AI Asset" className="rounded-2xl shadow-xl w-full object-cover aspect-square" />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center space-x-3">
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-white text-slate-900 font-medium rounded-xl text-xs flex items-center space-x-2 shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Download HD</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-3 text-slate-400">
              <ImageIcon className="w-12 h-12 mx-auto opacity-50" />
              <p className="text-sm">Generated graphics will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
