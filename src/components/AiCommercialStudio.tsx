import React, { useState, useEffect } from 'react';
import { Film, Play, Pause, RotateCcw, Sparkles, Video, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export function AiCommercialStudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSecond, setCurrentSecond] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const timelineSteps = [
    { second: 0, title: 'Opening Shot: Dark ChatGPT Interface', type: 'chat', text: 'I want to quit my job and start a business.' },
    { second: 6, title: 'AI Realistic Typing Response', type: 'ai-typing', text: 'Do you have 6 months of savings?\n\nA validated business idea?\n\nYour first paying customer?\n\nIf not, you\'re not ready.' },
    { second: 12, title: 'Cinematic Cut: Software Developer Coding', type: 'cinematic', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80', label: 'Software Developer Coding' },
    { second: 16, title: 'Cinematic Cut: AI Startup Founder & Launch', type: 'cinematic', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80', label: 'AI Startup Founder & Product Launch' },
    { second: 20, title: 'Cinematic Cut: Customer Call & Stripe Revenue', type: 'cinematic', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80', label: 'Customer Call & Stripe Payment Received' },
    { second: 24, title: 'Cinematic Cut: Dashboard Analytics Increasing', type: 'cinematic', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80', label: 'Dashboard Analytics Scaling' },
    { second: 28, title: 'Ending: Build First. Quit Later.', type: 'ending', text: 'BUILD FIRST.\nQUIT LATER.\n\nFollow for AI Business.' },
  ];

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSecond((prev) => {
          if (prev >= 30) {
            setIsPlaying(false);
            return 30;
          }
          const nextSec = prev + 1;
          // Determine active step based on second
          const current = timelineSteps.slice().reverse().findIndex(s => s.second <= nextSec);
          if (current !== -1) {
            setActiveStep(timelineSteps.length - 1 - current);
          }
          return nextSec;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleRestart = () => {
    setCurrentSecond(0);
    setActiveStep(0);
    setIsPlaying(true);
  };

  const currentScene = timelineSteps[activeStep] || timelineSteps[0];

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Header */}
      <div className="p-6 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between backdrop-blur">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-amber-500" />
            AI Commercial Studio — 30s Vertical Cinematic Commercial
          </h2>
          <p className="text-xs text-slate-400">Teal & Orange Color Grading • Smooth Gimbal Motion • High-Contrast Commercial Look</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause Commercial' : 'Play 30s Commercial'}</span>
          </button>
          <button
            onClick={handleRestart}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Commercial Viewport */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
        {/* Vertical Phone Frame (9:16 aspect ratio simulation) */}
        <div className="relative w-full max-w-sm aspect-[9/16] bg-slate-900 rounded-[40px] border-4 border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-between group">
          
          {/* Top Status Bar */}
          <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-black/80 to-transparent z-30 flex items-center justify-between px-6 text-[10px] font-mono text-slate-400">
            <span>9:41</span>
            <div className="w-20 h-4 bg-black rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2"></div>
            <div className="flex items-center space-x-1.5">
              <span>5G</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
          </div>

          {/* Video Scene Content */}
          <div className="flex-1 relative flex flex-col items-center justify-center p-6 text-center overflow-hidden">
            
            {/* Cinematic Teal & Orange Lighting Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/40 via-transparent to-amber-950/40 pointer-events-none z-10"></div>

            {currentScene.type === 'chat' && (
              <div className="w-full space-y-4 z-25 animate-in fade-in zoom-in duration-300">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-amber-400 shadow-xl">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl text-left shadow-2xl">
                  <p className="text-[10px] font-mono text-slate-400 mb-1">User Prompt (Dark ChatGPT):</p>
                  <p className="text-sm font-medium text-slate-100">"{currentScene.text}"</p>
                </div>
              </div>
            )}

            {currentScene.type === 'ai-typing' && (
              <div className="w-full space-y-3 z-25 animate-in fade-in zoom-in duration-300">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mx-auto text-white shadow-lg shadow-indigo-500/30">
                  AI
                </div>
                <div className="p-4 bg-slate-900/95 border border-amber-500/30 rounded-2xl text-left shadow-2xl space-y-2">
                  <p className="text-[10px] font-mono text-amber-400">Nova AI Engine (Analyzing Reality):</p>
                  <p className="text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">{currentScene.text}</p>
                </div>
              </div>
            )}

            {currentScene.type === 'cinematic' && (
              <div className="absolute inset-0 z-20 overflow-hidden">
                <img 
                  src={currentScene.image} 
                  alt={currentScene.label} 
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000 filter contrast-125 saturate-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40"></div>
                <div className="absolute bottom-12 inset-x-6 p-4 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-amber-400 mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                    <span>CINEMATIC SEQUENCE</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{currentScene.label}</h4>
                </div>
              </div>
            )}

            {currentScene.type === 'ending' && (
              <div className="w-full space-y-4 z-25 animate-in fade-in zoom-in duration-500">
                <div className="p-6 bg-black border-2 border-amber-500/50 rounded-3xl shadow-2xl space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto font-black text-xl shadow-xl shadow-amber-500/25">
                    N
                  </div>
                  <p className="text-xl font-black tracking-widest text-white leading-tight whitespace-pre-wrap font-sans">{currentScene.text}</p>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Controls / Progress */}
          <div className="p-4 bg-slate-950/90 border-t border-slate-800 z-35 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{currentSecond}s / 30s</span>
              <span className="text-amber-400 font-bold">{currentScene.title}</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300"
                style={{ width: `${(currentSecond / 30) * 100}%` }}
              ></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
