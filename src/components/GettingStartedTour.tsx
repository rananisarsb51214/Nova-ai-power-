import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, X, Compass, Bot, HardDrive, Shield, Search, Code } from 'lucide-react';
import { TabType } from '../types';

interface TourStep {
  targetId: string | null;
  title: string;
  description: string;
  badge: string;
  icon: any;
  tabToSelect?: TabType;
  position?: 'right' | 'bottom' | 'center';
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: 'tour-step-brand',
    title: 'Welcome to Nova AI Power',
    description: 'Your enterprise AI Operating System is loaded with 10+ AI models, 100 coding skills, real-time Firestore database memory vault, and live performance analytics.',
    badge: 'Overview',
    icon: Compass,
    position: 'right'
  },
  {
    targetId: 'tour-step-hub',
    title: 'Multi-Model AI Hub',
    description: 'Test and benchmark top LLMs (Google Gemini 2.0 Flash, GPT-4o, Claude 3.5, Grok 2, DeepSeek Coder) with real-time response latency analytics.',
    badge: '10 Models',
    icon: Bot,
    tabToSelect: 'hub',
    position: 'right'
  },
  {
    targetId: 'tour-step-skills',
    title: '100 Coding Skills & Dev Studio',
    description: 'Empower your apps with 100 enterprise skills, full-stack React generators, and Python GenAI repo inspection tools.',
    badge: '100 Skills',
    icon: Code,
    tabToSelect: 'skills',
    position: 'right'
  },
  {
    targetId: 'tour-step-memory',
    title: 'Database Memory Vault',
    description: 'Persist your custom prompts, code snippets, and AI outputs directly into your live Firestore database with real-time cloud sync.',
    badge: 'Firestore Live',
    icon: HardDrive,
    tabToSelect: 'memory',
    position: 'right'
  },
  {
    targetId: 'tour-step-search',
    title: 'Global Search & Command Palette',
    description: 'Press Cmd+K (or Ctrl+K) anywhere to instantly search through models, memory vault, skills, or execute workspace commands.',
    badge: 'Cmd + K',
    icon: Search,
    position: 'bottom'
  },
  {
    targetId: 'tour-step-enterprise',
    title: 'Enterprise Security & Key Diagnostic',
    description: 'Includes a live Google AI Studio GEMINI_API_KEY diagnostic testing tool to verify key health and rate-limit status instantly.',
    badge: 'Diagnostics',
    icon: Shield,
    tabToSelect: 'enterprise',
    position: 'right'
  }
];

interface GettingStartedTourProps {
  onSelectTab: (tab: TabType) => void;
}

export function GettingStartedTour({ onSelectTab }: GettingStartedTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    // Check if tour should auto-start on first load
    const tourDone = localStorage.getItem('nova_getting_started_tour_done');
    if (!tourDone) {
      setTimeout(() => {
        setIsOpen(true);
      }, 1000);
    }

    // Listen to manual tour restart event
    const handleStartTour = () => {
      setCurrentStepIndex(0);
      setIsOpen(true);
    };

    window.addEventListener('nova_start_tour', handleStartTour);
    return () => window.removeEventListener('nova_start_tour', handleStartTour);
  }, []);

  // Update highlight position when step changes
  useEffect(() => {
    if (!isOpen) return;

    const step = TOUR_STEPS[currentStepIndex];
    if (step.tabToSelect) {
      onSelectTab(step.tabToSelect);
    }

    if (step.targetId) {
      const el = document.getElementById(step.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        const rect = el.getBoundingClientRect();
        setTargetRect(rect);
        return;
      }
    }
    setTargetRect(null);
  }, [currentStepIndex, isOpen, onSelectTab]);

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex];
  const StepIcon = currentStep.icon;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('nova_getting_started_tour_done', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center">
        {/* Darkened Backdrop with Spotlight cutout overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleComplete}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-all"
        />

        {/* Target Highlight Pulsing Ring */}
        {targetRect && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="fixed pointer-events-none rounded-2xl border-2 border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.5)] z-50 transition-all duration-300"
            style={{
              top: Math.max(8, targetRect.top - 6),
              left: Math.max(8, targetRect.left - 6),
              width: targetRect.width + 12,
              height: targetRect.height + 12,
            }}
          >
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
          </motion.div>
        )}

        {/* Tour Tooltip Card */}
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, y: 15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="relative z-50 w-full max-w-md bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl text-white space-y-4 mx-4"
        >
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <StepIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full text-[10px] font-mono font-bold">
                  {currentStep.badge}
                </span>
                <span className="text-[11px] text-slate-400 font-mono ml-2">
                  Step {currentStepIndex + 1} of {TOUR_STEPS.length}
                </span>
              </div>
            </div>

            <button
              onClick={handleComplete}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              title="Skip Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              {currentStep.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentStep.description}
            </p>
          </div>

          {/* Step Progress Dots */}
          <div className="flex items-center space-x-1.5 pt-1">
            {TOUR_STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStepIndex
                    ? 'w-6 bg-gradient-to-r from-indigo-500 to-purple-500'
                    : 'w-1.5 bg-slate-800'
                }`}
              />
            ))}
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <button
              onClick={handleComplete}
              className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              Skip Tour
            </button>

            <div className="flex items-center space-x-2">
              {!isFirstStep && (
                <button
                  onClick={handlePrev}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center space-x-1.5"
              >
                <span>{isLastStep ? 'Get Started' : 'Next Step'}</span>
                {isLastStep ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
