import React from 'react';
import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { TabType } from '../types';

interface PricingViewProps {
  onSelectTab: (tab: TabType) => void;
}

export function PricingView({ onSelectTab }: PricingViewProps) {
  const { showToast } = useToast();

  const plans = [
    {
      name: 'Developer Free',
      price: '$0',
      period: 'forever',
      description: 'Ideal for indie developers, hobbyists, and AI enthusiasts.',
      features: ['Access to Gemini 2.5 Flash', '10 Coding Skills basic access', 'Client-side local persistence', 'Community support'],
      popular: false,
      cta: 'Get Started Free'
    },
    {
      name: 'Pro Engineer',
      price: '$49',
      period: 'per month',
      description: 'For professional engineers and high-velocity creators.',
      features: ['All 10 AI Models unlocked', 'All 100 Expert Coding Skills', 'Firestore Cloud Synchronization', 'Autonomous Agent Platform', 'Priority API Routing'],
      popular: true,
      cta: 'Start Pro Free Trial'
    },
    {
      name: 'Enterprise AI',
      price: '$199',
      period: 'per month',
      description: 'For growing teams and businesses requiring maximum security.',
      features: ['Dedicated VPC & Custom Models', 'Advanced RBAC & Audit Logs', 'SSO & SAML Authentication', '24/7 Dedicated Support', 'Custom RAG Knowledge Bases'],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-y-auto px-6 py-20">
      <div className="max-w-5xl mx-auto space-y-16 w-full">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-indigo-950 text-indigo-400 text-xs font-semibold border border-indigo-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Pricing Plans</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white">Invest in World-Class AI Infrastructure</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">Scale your engineering output with predictable pricing and zero hidden fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'bg-slate-900 border-indigo-500 shadow-2xl shadow-indigo-500/10 ring-2 ring-indigo-500/50'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                </div>

                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-xs text-slate-400">/{plan.period}</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-3 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => {
                    showToast(`Successfully subscribed to ${plan.name}!`, 'success');
                    onSelectTab('hub');
                  }}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center space-x-2 ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
