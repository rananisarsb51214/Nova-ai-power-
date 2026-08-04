import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  DollarSign, 
  TrendingUp, 
  ShoppingCart, 
  CheckCircle2, 
  Zap, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Play, 
  Download, 
  Share2, 
  MousePointerClick, 
  MessageSquare, 
  RefreshCw, 
  Star,
  Layers,
  Code,
  Film,
  Video
} from 'lucide-react';
import { TabType } from '../types';
import { useToast } from '../context/ToastContext';

interface LandingViewProps {
  onSelectTab: (tab: TabType) => void;
}

export function LandingView({ onSelectTab }: LandingViewProps) {
  const { showToast } = useToast();

  // Interactive Money Printer Live Demo State
  const [productUrl, setProductUrl] = useState('https://mystore.com/products/yoovic-silk-pillowcase');
  const [isPrinting, setIsPrinting] = useState(false);
  const [hasPrinted, setHasPrinted] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Billing Toggle
  const [isAnnual, setIsAnnual] = useState(true);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Modal State for Trial
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  // Generated Content Output
  const [generatedOutput, setGeneratedOutput] = useState({
    descriptions: [
      "🔥 Experience the ultimate beauty sleep with 100% Pure Mulberry Silk. Hydrate your skin, prevent bedhead frizz, and wake up refreshed every morning.",
      "✨ Clinically proven to reduce hair breakage by 43% and preserve natural facial moisture. Hypoallergenic, ultra-breathable, and silk-smooth.",
      "💎 Upgrade your evening ritual. The silk pillowcase top dermatologists and celebrity stylists recommend for glowing skin and anti-crease protection."
    ],
    adAngles: [
      "🎯 Angle #1 (Pain Point): 'Waking up with creased skin and messy hair? Here is why 85,000+ women switched to pure silk.'",
      "⚡ Angle #2 (Social Proof): 'I tested silk vs cotton for 30 days. The results on my acne and hair frizz were INSANE.'",
      "🎁 Angle #3 (Gifting): 'The #1 self-care gift of 2026 that every beauty lover is obsessing over.'"
    ],
    emailCopy: "Subject: 😴 Your skin deserves this (15% OFF inside)\n\nHey [Name],\n\nDid you know your pillowcase absorbs 50% of your night serums? Our Pure Mulberry Silk Pillowcase locks in moisture so you wake up with radiant, crease-free skin.\n\nUse code PRINTMONEY for 15% OFF today only!\n\n[ Claim My 15% Discount Now ]"
  });

  const handleRunPrintDemo = async () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      setHasPrinted(true);
      showToast('Generated 100 Descriptions + 50 Ad Angles!', 'success');
    }, 1200);
  };

  const handleCopyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    showToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyFullCopy = () => {
    const fullText = `=== FULL LANDING PAGE COPY: NOVA AI POWER ===

SECTION 1: HERO
Headline: The AI That Prints Money For Shopify Stores
Subheadline: Stop writing. Start selling. Generate 100 high-converting product descriptions, ad creatives, and emails in 60 seconds with OpenAI. Built for brands who want to scale without hiring.
CTAs: [ Start Printing Money - Free Trial ] | [ Watch It Print Content in 60s ]
Proof Bar: Trusted by 200+ Shopify Brands | 10M+ Descriptions Generated | Powered by OpenAI

SECTION 2: THE PROBLEM
Headline: Writing Content Is Killing Your Growth
Body: Agencies are slow. Freelancers are expensive. And you? You're stuck writing product descriptions at 2AM instead of scaling ads. Every hour you spend writing is an hour you're NOT making money. There’s a better way.

SECTION 3: THE SOLUTION
Headline: Meet Nova AI Power. Your 24/7 Content Machine.
Body: We took OpenAI and trained it to think like a 7-figure e-commerce brand.
In 3 clicks, Nova turns 1 product into:
1. 100 Product Descriptions that actually convert
2. 50 Ad Angles to test on Meta & TikTok
3. Email + SMS Copy that gets people to buy

SECTION 4: HOW IT WORKS - 3 STEPS
Step 1: Paste Your Product Link
Step 2: Click "Print"
Step 3: Launch & Scale

SECTION 5: FEATURES = MONEY
1. Product Description Printer
2. Ad Creative Machine
3. Email & SMS Generator
4. Shopify 1-Click Import

SECTION 6: SOCIAL PROOF
"We went from 3 descriptions/day to 300. Our ad testing budget 10x'd in 30 days." - Ahmed, Shopify Store $2.3M/yr
"Nova paid for itself in the first 2 hours. This thing is a cheat code." - Sara, Fashion Brand

SECTION 7: PRICING
Starter: $49/mo | Pro: $149/mo (Most Popular) | Agency: $499/mo

SECTION 8: FAQ
Q: Is this just ChatGPT? A: No, Nova is trained on e-commerce conversion data.

SECTION 9: FINAL CTA
Headline: Stop Writing. Start Printing Money.`;

    navigator.clipboard.writeText(fullText);
    showToast('Full Landing Copy copied to clipboard! Ready to paste into Framer/Shopify/Studio.', 'success');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-y-auto selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Banner - Money Printing Theme Indicator & Export Copy Button */}
      <div className="bg-gradient-to-r from-amber-600 via-emerald-600 to-indigo-600 px-4 py-2 text-center text-xs font-extrabold text-white flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-2 mx-auto sm:mx-0">
          <Flame className="w-4 h-4 animate-bounce" />
          <span>"WE PRINT MONEY" THEME ACTIVE • FULL SHOPIFY / FRAMER LANDING COPY</span>
        </div>
        <div className="hidden sm:flex items-center space-x-2">
          <button
            onClick={() => onSelectTab('nova_video_demo')}
            className="flex items-center space-x-1.5 px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg border border-purple-400/40 text-[11px] font-mono font-bold transition-all shadow-md"
          >
            <Film className="w-3.5 h-3.5 text-cyan-300" />
            <span>🎬 Nova Video & Templates Demo</span>
          </button>
          <button
            onClick={handleCopyFullCopy}
            className="flex items-center space-x-1.5 px-3 py-1 bg-slate-950/80 hover:bg-slate-900 text-amber-300 rounded-lg border border-amber-400/40 text-[11px] font-mono font-bold transition-all"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Direct Landing Copy</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: HERO */}
      <section className="relative px-6 pt-16 pb-20 md:pt-24 md:pb-32 flex flex-col items-center text-center max-w-6xl mx-auto space-y-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/30 via-slate-950 to-slate-950 pointer-events-none"></div>

        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold tracking-wide uppercase shadow-inner">
          <DollarSign className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>The #1 E-Commerce Content Generator for Shopify</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none max-w-4xl">
          The AI That <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300">Prints Money</span> For Shopify Stores
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
          <strong className="text-white">Stop writing. Start selling.</strong> Generate 100 high-converting product descriptions, ad creatives, and emails in 60 seconds with OpenAI. Built for brands who want to scale without hiring.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            onClick={() => setIsTrialModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-black rounded-2xl text-base flex items-center justify-center space-x-3 shadow-xl shadow-emerald-500/25 transition-all hover:scale-105"
          >
            <DollarSign className="w-5 h-5 text-slate-950" />
            <span>Start Printing Money</span>
            <ArrowRight className="w-5 h-5 text-slate-950" />
          </button>

          <button
            onClick={() => onSelectTab('nova_video_demo')}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-black rounded-2xl text-base border border-purple-400/30 transition-all hover:scale-105 shadow-xl shadow-purple-600/20 flex items-center justify-center space-x-2"
          >
            <Video className="w-5 h-5 text-cyan-300 fill-cyan-300" />
            <span>🎬 Nova Video & Live Templates</span>
          </button>

          <button
            onClick={() => {
              const demoEl = document.getElementById('money-printer-demo');
              demoEl?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold rounded-2xl text-base border border-white/10 hover:border-amber-500/40 transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Watch It Print Content in 60s</span>
          </button>
        </div>

        {/* High-Converting CTA Button Text Bank Interactive Bar */}
        <div className="w-full max-w-4xl p-4 bg-slate-900/90 border border-emerald-500/30 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> High-Converting CTA Text Bank (5 Variations)
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Click to test conversion trigger</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: "Start Printing Money", desc: "Hero Primary CTA" },
              { label: "Generate My First 100 Pieces", desc: "Product Generator CTA" },
              { label: "Get Instant Access", desc: "Pricing / Offer CTA" },
              { label: "Print Content Now", desc: "Urgency CTA" },
              { label: "Scale Without Hiring", desc: "Value Prop CTA" }
            ].map((cta, idx) => (
              <button
                key={idx}
                onClick={() => {
                  showToast(`Triggered CTA: "${cta.label}"`, 'success');
                  setIsTrialModalOpen(true);
                }}
                className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 text-slate-100 hover:text-amber-300 border border-white/10 hover:border-amber-400/50 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 shadow-sm group"
              >
                <MousePointerClick className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>{cta.label}</span>
                <span className="text-[9px] text-slate-400 font-normal font-mono px-1.5 py-0.5 bg-slate-900 rounded border border-white/5">
                  {cta.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Proof Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-slate-400 border-t border-white/10 w-full max-w-3xl">
          <span className="flex items-center gap-1.5 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Trusted by 200+ Shopify Brands
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-slate-200">
            <Flame className="w-4 h-4 text-amber-400" /> 10M+ Descriptions Generated
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-slate-200">
            <Zap className="w-4 h-4 text-indigo-400" /> Powered by OpenAI
          </span>
        </div>

        {/* Interactive Live Money Printer Simulator Box */}
        <div id="money-printer-demo" className="w-full max-w-4xl mt-12 bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 md:p-8 text-left shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-mono font-bold uppercase">
                Interactive Simulator
              </span>
              <h3 className="text-xl font-black text-white mt-1">Live Product Content Printer</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">1-Click Shopify Import Ready</span>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                placeholder="Paste your Shopify product URL or product title..."
                className="flex-1 px-4 py-3 bg-slate-950 border border-white/10 rounded-2xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={handleRunPrintDemo}
                disabled={isPrinting}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black rounded-2xl text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center space-x-2 shrink-0"
              >
                {isPrinting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Printing Money...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
                    <span>Print Content in 60s</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Output Preview Tabs */}
            {hasPrinted && (
              <div className="pt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Descriptions Card */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                      <span>1. Product Descriptions (x100)</span>
                      <button onClick={() => handleCopyText(generatedOutput.descriptions[0], 1)} className="hover:text-white">
                        {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {generatedOutput.descriptions[0]}
                    </p>
                  </div>

                  {/* Ad Angles Card */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-indigo-400">
                      <span>2. Meta / TikTok Ad Angles (x50)</span>
                      <button onClick={() => handleCopyText(generatedOutput.adAngles[0], 2)} className="hover:text-white">
                        {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {generatedOutput.adAngles[0]}
                    </p>
                  </div>

                  {/* Email & SMS Card */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                      <span>3. Email & SMS Copy</span>
                      <button onClick={() => handleCopyText(generatedOutput.emailCopy, 3)} className="hover:text-white">
                        {copiedIndex === 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-line">
                      {generatedOutput.emailCopy}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="py-20 px-6 bg-slate-900/60 border-y border-white/10">
        <div className="max-w-5xl mx-auto space-y-12 text-center">
          <div className="space-y-4">
            <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full text-xs font-mono font-bold uppercase">
              The Growth Bottleneck
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Writing Content Is Killing Your Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-slate-950 border border-rose-500/20 rounded-3xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-black">
                🐢
              </div>
              <h3 className="text-lg font-bold text-white">Agencies Are Slow</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                They take 2 weeks to deliver 5 copy lines and charge $3,000/month retainers before testing a single ad.
              </p>
            </div>

            <div className="p-6 bg-slate-950 border border-rose-500/20 rounded-3xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-black">
                💸
              </div>
              <h3 className="text-lg font-bold text-white">Freelancers Are Expensive</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                $150 per product description adds up fast when you have 50 SKUs. Quality is hit-or-miss.
              </p>
            </div>

            <div className="p-6 bg-slate-950 border border-rose-500/20 rounded-3xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-black">
                🌙
              </div>
              <h3 className="text-lg font-bold text-white">2AM Late Night Burnout</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                You're stuck writing product copy at 2AM instead of scaling ads and building your brand.
              </p>
            </div>
          </div>

          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto italic font-medium">
            "Every hour you spend writing is an hour you're NOT making money. There’s a better way."
          </p>
        </div>
      </section>

      {/* SECTION 3: THE SOLUTION */}
      <section className="py-24 px-6 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-mono font-bold uppercase">
            The 24/7 E-Com Content Machine
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Meet Nova AI Power. Your 24/7 Content Machine.
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            We took OpenAI and trained it to think like a 7-figure e-commerce brand owner. In 3 clicks, Nova turns 1 product into a complete marketing asset library.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-slate-900 border border-amber-500/30 rounded-3xl space-y-4 shadow-xl relative overflow-hidden group hover:border-amber-500/60 transition-all">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl w-fit">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">1. 100 Product Descriptions</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Persuasive, emotional, benefit-driven product copy that converts cold traffic into instant buyers.
            </p>
          </div>

          <div className="p-8 bg-slate-900 border border-indigo-500/30 rounded-3xl space-y-4 shadow-xl relative overflow-hidden group hover:border-indigo-500/60 transition-all">
            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl w-fit">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">2. 50 Meta & TikTok Ad Angles</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Scroll-stopping hooks, curiosity angles, and UGC video scripts to test winning creatives fast.
            </p>
          </div>

          <div className="p-8 bg-slate-900 border border-emerald-500/30 rounded-3xl space-y-4 shadow-xl relative overflow-hidden group hover:border-emerald-500/60 transition-all">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl w-fit">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">3. Email & SMS Copy</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Abandoned cart recoveries, product launch sequences, and promotional SMS copy that prints revenue on autopilot.
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => setIsTrialModalOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-black rounded-2xl text-base shadow-xl shadow-amber-500/20 hover:scale-105 transition-all inline-flex items-center space-x-2"
          >
            <span>Generate My First 100 Pieces Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS - 3 STEPS */}
      <section className="py-20 px-6 bg-slate-900/80 border-y border-white/10">
        <div className="max-w-5xl mx-auto space-y-12 text-center">
          <div className="space-y-4">
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-mono font-bold uppercase">
              Zero Tech Friction
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Print Money in 3 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-8 bg-slate-950 border border-white/10 rounded-3xl space-y-4 relative">
              <div className="text-4xl font-black text-indigo-500 font-mono">01</div>
              <h3 className="text-lg font-bold text-white">Paste Your Product Link</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Import product data automatically from Shopify in 1 click. No manual data entry required.
              </p>
            </div>

            <div className="p-8 bg-slate-950 border border-white/10 rounded-3xl space-y-4 relative">
              <div className="text-4xl font-black text-amber-500 font-mono">02</div>
              <h3 className="text-lg font-bold text-white">Click "Print"</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our AI writes 100+ pieces of high-converting content in your exact brand voice in 60 seconds.
              </p>
            </div>

            <div className="p-8 bg-slate-950 border border-white/10 rounded-3xl space-y-4 relative">
              <div className="text-4xl font-black text-emerald-500 font-mono">03</div>
              <h3 className="text-lg font-bold text-white">Launch & Scale</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Copy, paste to Shopify, launch Meta ads, and watch your ROAS and store conversions go up.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTrialModalOpen(true)}
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl text-sm border border-white/10 transition-all inline-flex items-center space-x-2"
          >
            <span>Try It Free - No Credit Card Required</span>
          </button>
        </div>
      </section>

      {/* SECTION 5: FEATURES = MONEY */}
      <section className="py-24 px-6 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-mono font-bold uppercase">
            Built For Pure Conversion
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Features That Print Cash
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-900 border border-white/10 rounded-3xl space-y-3">
            <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
              <DollarSign className="w-5 h-5" /> 1. Product Description Printer
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Turn boring feature bullet points into must-have offers that trigger emotional buying. Increase store CTR by 40%+.
            </p>
          </div>

          <div className="p-8 bg-slate-900 border border-white/10 rounded-3xl space-y-3">
            <div className="text-indigo-400 font-bold text-sm flex items-center gap-2">
              <Zap className="w-5 h-5" /> 2. Ad Creative Machine
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              50 hooks, angles, and video scripts ready to test on Meta & TikTok. Find winning ad creatives 10x faster.
            </p>
          </div>

          <div className="p-8 bg-slate-900 border border-white/10 rounded-3xl space-y-3">
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
              <MessageSquare className="w-5 h-5" /> 3. Email & SMS Generator
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Abandoned cart, product launch, and flash sale copy that prints backend store revenue on autopilot.
            </p>
          </div>

          <div className="p-8 bg-slate-900 border border-white/10 rounded-3xl space-y-3">
            <div className="text-purple-400 font-bold text-sm flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" /> 4. Shopify 1-Click Import
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pulls product images, title, and specs directly from your Shopify store link. Zero setup required.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setIsTrialModalOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-indigo-600 text-slate-950 font-black rounded-2xl text-base shadow-xl hover:scale-105 transition-all"
          >
            Get Full Access Now
          </button>
        </div>
      </section>

      {/* SECTION 6: SOCIAL PROOF */}
      <section className="py-20 px-6 bg-slate-900/80 border-y border-white/10">
        <div className="max-w-5xl mx-auto space-y-12 text-center">
          <div className="space-y-4">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-mono font-bold uppercase">
              Real Brand Results
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Brands Using Nova Are Scaling Faster
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-8 bg-slate-950 border border-white/10 rounded-3xl space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-sm text-slate-200 italic leading-relaxed">
                "We went from 3 descriptions/day to 300. Our ad testing budget 10x'd in 30 days."
              </p>
              <div className="text-xs font-bold text-amber-400">
                — Ahmed, Shopify Store Owner ($2.3M/yr)
              </div>
            </div>

            <div className="p-8 bg-slate-950 border border-white/10 rounded-3xl space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-sm text-slate-200 italic leading-relaxed">
                "Nova paid for itself in the first 2 hours. This thing is a absolute cheat code for e-commerce."
              </p>
              <div className="text-xs font-bold text-indigo-400">
                — Sara, Fashion Brand Founder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: PRICING */}
      <section className="py-24 px-6 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-mono font-bold uppercase">
            Simple Transparent Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Pick Your Plan. Start Printing.
          </h2>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-3 pt-4">
            <span className={`text-xs font-bold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${isAnnual ? 'bg-amber-500' : 'bg-slate-800'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-xs font-bold ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
              Annual <span className="text-emerald-400 font-mono text-[11px]">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="p-8 bg-slate-900 border border-white/10 rounded-3xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Starter</h3>
              <div className="text-4xl font-black text-white font-mono">
                ${isAnnual ? '39' : '49'}<span className="text-xs text-slate-400 font-sans font-normal">/mo</span>
              </div>
              <p className="text-xs text-slate-400">Perfect for single stores and solo creators starting out.</p>
              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 500 Credits / month</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 1,000 Product Descriptions</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Standard Email Support</li>
              </ul>
            </div>
            <button onClick={() => setIsTrialModalOpen(true)} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl text-xs transition-all">
              Start Printing
            </button>
          </div>

          {/* Pro Plan - Popular */}
          <div className="p-8 bg-slate-900 border-2 border-amber-500 rounded-3xl space-y-6 flex flex-col justify-between shadow-2xl relative scale-105">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-slate-950 rounded-full text-[10px] font-black uppercase tracking-wider">
              MOST POPULAR
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Pro</h3>
              <div className="text-4xl font-black text-amber-400 font-mono">
                ${isAnnual ? '119' : '149'}<span className="text-xs text-slate-400 font-sans font-normal">/mo</span>
              </div>
              <p className="text-xs text-slate-300">Built for scaling Shopify brands testing multiple creatives.</p>
              <ul className="space-y-2 text-xs text-slate-200 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Unlimited Credits</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Ad Creative Generator (50 angles)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Email & SMS Copy Generator</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Priority 24/7 Support</li>
              </ul>
            </div>
            <button onClick={() => setIsTrialModalOpen(true)} className="w-full py-3 bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-black rounded-2xl text-xs shadow-lg transition-all">
              Print Money Now
            </button>
          </div>

          {/* Agency Plan */}
          <div className="p-8 bg-slate-900 border border-white/10 rounded-3xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Agency</h3>
              <div className="text-4xl font-black text-white font-mono">
                ${isAnnual ? '399' : '499'}<span className="text-xs text-slate-400 font-sans font-normal">/mo</span>
              </div>
              <p className="text-xs text-slate-400">For agencies managing 10+ e-commerce clients.</p>
              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Everything in Pro</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 10 Team Seats</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Full API Access & Webhooks</li>
              </ul>
            </div>
            <button onClick={() => setIsTrialModalOpen(true)} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl text-xs transition-all">
              Scale Your Agency
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 font-mono">
          7-Day Free Trial. Cancel anytime with 1 click.
        </p>
      </section>

      {/* SECTION 8: FAQ */}
      <section className="py-20 px-6 bg-slate-900/60 border-y border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-4xl font-black text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Is this just ChatGPT?',
                a: 'No. ChatGPT is generic. Nova is fine-tuned specifically on millions of dollars of winning e-commerce conversion data, product descriptions, and ad creatives that actually make sales.'
              },
              {
                q: 'Do I need to be technical?',
                a: 'No. If you can copy and paste, you can use Nova. Paste your Shopify link, click "Print", and copy your content.'
              },
              {
                q: 'What if it doesn\'t work for my brand?',
                a: 'We offer a 7-day money-back guarantee. If you don’t make more money and save time, you don’t pay.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-950 border border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm text-white flex items-center justify-between"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA & FOOTER */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight">
          Stop Writing. Start Printing Money.
        </h2>
        <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto">
          Your competitors are already using AI. The only question is: will you?
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setIsTrialModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-emerald-500 to-indigo-600 text-slate-950 font-black rounded-2xl text-base shadow-xl hover:scale-105 transition-all"
          >
            Start My Free Trial
          </button>
          <button
            onClick={() => onSelectTab('contact')}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-white/10 hover:border-slate-700 text-slate-200 font-bold rounded-2xl text-base transition-all"
          >
            Book a Demo
          </button>
        </div>

        <div className="pt-16 border-t border-white/10 text-xs text-slate-500 space-y-2">
          <div className="font-bold text-slate-400">Nova AI Power | Powered by OpenAI</div>
          <div>© 2026 Nova AI Power. All Rights Reserved.</div>
        </div>
      </section>

      {/* Free Trial Modal */}
      {isTrialModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <button onClick={() => setIsTrialModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              ✕
            </button>
            <div className="text-center space-y-2">
              <span className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl inline-block">
                <DollarSign className="w-8 h-8" />
              </span>
              <h3 className="text-xl font-black text-white">Start Your 7-Day Free Trial</h3>
              <p className="text-xs text-slate-300">Generate 1,000 product descriptions & ad angles instantly.</p>
            </div>

            <div className="space-y-3">
              <input type="text" placeholder="Your Shopify Store URL" className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-xs text-white" />
              <input type="email" placeholder="Your Work Email" className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-xs text-white" />
              <button
                onClick={() => {
                  setIsTrialModalOpen(false);
                  showToast('Free trial initialized! Redirecting to Multi-Model Hub...', 'success');
                  onSelectTab('hub');
                }}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg"
              >
                Claim Free Trial Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
