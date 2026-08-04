import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Video, 
  Film, 
  Zap, 
  DollarSign, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  Flame, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sliders, 
  Layers, 
  Layers2, 
  Wand2, 
  ShoppingCart, 
  Tv, 
  Smartphone, 
  Monitor, 
  Square, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  Music, 
  ShieldCheck, 
  Star, 
  Plus, 
  Eye, 
  Clock, 
  TrendingUp, 
  HardDrive 
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface VideoTemplate {
  id: string;
  title: string;
  category: 'ugc' | 'commercial' | 'meta_ads' | 'unboxing' | 'flash_sale' | 'showcase';
  duration: string;
  aspectRatio: '9:16' | '16:9' | '1:1';
  roasBoost: string;
  bgGradient: string;
  hookText: string;
  script: { scene: string; visual: string; audio: string; durationSec: number }[];
  tags: string[];
}

export function NovaVideoDemo() {
  const { showToast } = useToast();
  const { user } = useAuth();

  // Active Method Tab
  const [activeMethod, setActiveMethod] = useState<'text_to_video' | 'shopify_url' | 'viral_hooks' | 'photo_motion'>('text_to_video');

  // Input States
  const [productTitle, setProductTitle] = useState('Yoovic Mulberry Silk Pillowcase');
  const [productUrl, setProductUrl] = useState('https://mystore.com/products/yoovic-silk-pillowcase');
  const [brandStyle, setBrandStyle] = useState('Luxury & Aesthetic');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9' | '1:1'>('9:16');
  const [voiceGender, setVoiceGender] = useState<'female_us' | 'male_us' | 'british_accent'>('female_us');
  
  // Generation & Player State
  const [isGenerating, setIsGenerating] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderStage, setRenderStage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [copiedScriptIndex, setCopiedScriptIndex] = useState<number | null>(null);

  // Template Filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Video Storyboard State
  const [storyboard, setStoryboard] = useState([
    {
      scene: "Scene 1: Hook (0-3s)",
      visual: "Close-up split face: Dull morning hair vs glowing hydrated skin resting on pure silk.",
      audio: "Stop sleeping on cotton! Your pillowcase is absorbing 50% of your night serums.",
      durationSec: 3,
      bgColor: "from-purple-900 via-slate-900 to-indigo-950",
      caption: "Stop sleeping on cotton! 😱"
    },
    {
      scene: "Scene 2: Problem (3-7s)",
      visual: "Fast cut demonstrating friction damage & facial sleep creases on cheap pillowcases.",
      audio: "Cotton causes friction that creates sleep wrinkles and destroys hair cuticle moisture.",
      durationSec: 4,
      bgColor: "from-rose-950 via-slate-900 to-slate-950",
      caption: "Cotton causes friction & sleep wrinkles! 💔"
    },
    {
      scene: "Scene 3: Solution (7-12s)",
      visual: "Smooth slow-motion shot pouring liquid silk onto Yoovic Pillowcase, glowing water droplets bouncing off.",
      audio: "Switch to Yoovic 100% Pure Mulberry Silk. Clinically proven to reduce hair frizz by 43%.",
      durationSec: 5,
      bgColor: "from-emerald-950 via-slate-900 to-teal-950",
      caption: "Switch to Yoovic Pure Mulberry Silk ✨"
    },
    {
      scene: "Scene 4: Call To Action (12-15s)",
      visual: "End screen showing 15% OFF discount badge, glowing Shopify star reviews, and 'Shop Now' button.",
      audio: "Click below now to claim your 15% OFF limited launch offer!",
      durationSec: 3,
      bgColor: "from-amber-950 via-slate-900 to-slate-950",
      caption: "Claim 15% OFF Launch Offer Today! 🛍️"
    }
  ]);

  // Video Templates Data
  const videoTemplates: VideoTemplate[] = [
    {
      id: 'template-1',
      title: 'Viral 3-Second Hook UGC Reel',
      category: 'ugc',
      duration: '15s',
      aspectRatio: '9:16',
      roasBoost: '+420% ROAS',
      bgGradient: 'from-purple-600 via-indigo-600 to-pink-600',
      hookText: 'Stop scrolling! Here is the $30 beauty trick dermatologists won\'t tell you...',
      script: [
        { scene: 'Hook', visual: 'Creator pointing at camera with shocking face', audio: 'Stop scrolling!', durationSec: 3 },
        { scene: 'Demo', visual: 'Applying product on skin', audio: 'This transformed my morning routine', durationSec: 8 },
        { scene: 'CTA', visual: 'Shopify order page', audio: 'Link in bio for 20% off', durationSec: 4 }
      ],
      tags: ['TikTok', 'Instagram Reel', 'UGC']
    },
    {
      id: 'template-2',
      title: 'Shopify 30s High-End TV Commercial',
      category: 'commercial',
      duration: '30s',
      aspectRatio: '16:9',
      roasBoost: '+310% Conversion',
      bgGradient: 'from-slate-900 via-amber-950 to-slate-950',
      hookText: 'Experience Luxury Unfiltered. Designed for those who demand perfection.',
      script: [
        { scene: 'Cinematic Intro', visual: 'Macro shot of product texture in studio light', audio: 'Elegance redefined.', durationSec: 8 },
        { scene: 'Feature Highlight', visual: '3D explosion view of product materials', audio: 'Handcrafted with precision.', durationSec: 12 },
        { scene: 'Outro', visual: 'Brand logo with subtle sparkle effect', audio: 'Order yours at shopify.com', durationSec: 10 }
      ],
      tags: ['Commercial', 'HD 4K', 'Shopify']
    },
    {
      id: 'template-3',
      title: 'Meta Ad Hook & Objection Buster',
      category: 'meta_ads',
      duration: '20s',
      aspectRatio: '9:16',
      roasBoost: '+510% CTR',
      bgGradient: 'from-indigo-900 via-blue-900 to-cyan-900',
      hookText: 'Is this $49 product actually worth the hype? I tested it for 14 days.',
      script: [
        { scene: 'Objection Hook', visual: 'Creator holding product with skeptic face', audio: 'Is it actually worth it?', durationSec: 4 },
        { scene: '14-Day Test', visual: 'Before vs After side by side comparison', audio: 'Look at day 1 vs day 14', durationSec: 10 },
        { scene: 'Verdict', visual: 'Thumbs up with star reviews', audio: '10/10 recommend. Grab yours!', durationSec: 6 }
      ],
      tags: ['Meta Ads', 'Facebook', 'Comparison']
    },
    {
      id: 'template-4',
      title: 'Aesthetic Unboxing & ASMR Experience',
      category: 'unboxing',
      duration: '25s',
      aspectRatio: '9:16',
      roasBoost: '+290% Engagement',
      bgGradient: 'from-emerald-900 via-teal-950 to-slate-950',
      hookText: 'Unboxing my package from Nova AI. The packaging alone is 10/10 😍',
      script: [
        { scene: 'Box Opening', visual: 'Crisp ASMR sound cutting box tape', audio: 'ASMR packaging rustle', durationSec: 5 },
        { scene: 'Reveal', visual: 'Lifting velvet lining to reveal product', audio: 'Look at this metallic finish!', durationSec: 12 },
        { scene: 'Try On', visual: 'First reaction using product', audio: 'I am never going back.', durationSec: 8 }
      ],
      tags: ['Unboxing', 'ASMR', 'Viral']
    },
    {
      id: 'template-5',
      title: 'Black Friday & Scarcity Flash Sale',
      category: 'flash_sale',
      duration: '15s',
      aspectRatio: '1:1',
      roasBoost: '+680% Urgency',
      bgGradient: 'from-rose-900 via-red-950 to-amber-950',
      hookText: '🚨 FLASH SALE WARNING! 50% OFF ends in 4 hours or until stock runs out.',
      script: [
        { scene: 'Urgency Alert', visual: 'Flashing countdown timer with 50% badge', audio: 'Warning: 80% stock already sold out!', durationSec: 4 },
        { scene: 'Product Highlight', visual: 'Fast collage of top 3 product colorways', audio: 'Get yours before it sells out.', durationSec: 7 },
        { scene: 'Final Call', visual: 'Big green SHOP NOW button pulse', audio: 'Tap shop now before midnight!', durationSec: 4 }
      ],
      tags: ['Flash Sale', 'Urgency', 'Square Ad']
    },
    {
      id: 'template-6',
      title: 'Shopify Bestseller Product Showcase',
      category: 'showcase',
      duration: '30s',
      aspectRatio: '16:9',
      roasBoost: '+350% Revenue',
      bgGradient: 'from-cyan-900 via-slate-900 to-indigo-950',
      hookText: 'Meet our #1 viral product that sold out 4 times in 2026.',
      script: [
        { scene: 'Bestseller Badge', visual: 'Award badge spinning onto product stage', audio: 'Over 100,000 happy customers.', durationSec: 6 },
        { scene: 'Customer Rave', visual: 'Scrolling 5-star customer reviews', audio: 'Read why everyone is obsessed.', durationSec: 14 },
        { scene: 'Guarantee', visual: '30-day money back guarantee seal', audio: 'Try it risk-free today.', durationSec: 10 }
      ],
      tags: ['Showcase', 'Social Proof', 'Shopify']
    }
  ];

  // Playback timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackTime((prev) => {
          const next = prev + 0.5;
          if (next >= 15) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Sync scene index with playback time
  useEffect(() => {
    if (playbackTime < 3) setCurrentSceneIndex(0);
    else if (playbackTime < 7) setCurrentSceneIndex(1);
    else if (playbackTime < 12) setCurrentSceneIndex(2);
    else setCurrentSceneIndex(3);
  }, [playbackTime]);

  const handleGenerateVideo = () => {
    setIsGenerating(true);
    setRenderProgress(0);
    setIsPlaying(false);

    const stages = [
      'Extracting product value propositions from Shopify URL...',
      'Synthesizing 7-figure viral ad hook & voiceover audio track...',
      'Generating 4K scene frames with cinematic motion lighting...',
      'Applying animated caption overlays & auto-beat synchronization...',
      'Finalizing 1080p MP4 render complete!'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setRenderProgress(current * 20);
      setRenderStage(stages[current - 1]);

      if (current >= 5) {
        clearInterval(interval);
        setIsGenerating(false);
        setIsPlaying(true);
        showToast('Nova AI Video Rendered Successfully! 🎬', 'success');
      }
    }, 800);
  };

  const handleSaveToMemoryVault = async () => {
    try {
      if (!user) {
        showToast('Please sign in to save generated videos to your Memory Vault.', 'info');
        return;
      }
      await addDoc(collection(db, 'memory_vault'), {
        userId: user.uid,
        title: `Nova Video: ${productTitle}`,
        content: JSON.stringify({
          productTitle,
          productUrl,
          aspectRatio,
          storyboard
        }),
        type: 'video_demo',
        createdAt: Date.now()
      });
      showToast('Video concept saved to Firestore Memory Vault!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to save to Memory Vault', 'error');
    }
  };

  const filteredTemplates = selectedCategory === 'all' 
    ? videoTemplates 
    : videoTemplates.filter(t => t.category === selectedCategory);

  const handleLoadTemplate = (tpl: VideoTemplate) => {
    setProductTitle(tpl.title);
    setAspectRatio(tpl.aspectRatio);
    setStoryboard(tpl.script.map((s, idx) => ({
      scene: `Scene ${idx + 1}: ${s.scene}`,
      visual: s.visual,
      audio: s.audio,
      durationSec: s.durationSec,
      bgColor: tpl.bgGradient,
      caption: s.audio
    })));
    showToast(`Loaded Template: "${tpl.title}" into Live Studio!`, 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-y-auto selection:bg-indigo-500 selection:text-white">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-950 border-b border-white/10 p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Film className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Nova AI Power • Demo Video & Live Templates Studio</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              AI Commercial & Viral Reel Generator
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Generate high-converting TikTok Reels, Meta Video Ads, and 30s Shopify Product Commercials in 60 seconds with OpenAI & Gemini Video AI.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleSaveToMemoryVault}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-indigo-500/40 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shadow-lg"
            >
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <span>Save to Memory Vault</span>
            </button>
            <button
              onClick={handleGenerateVideo}
              disabled={isGenerating}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-black rounded-xl text-xs transition-all shadow-xl shadow-indigo-500/25 flex items-center space-x-2"
            >
              <Zap className="w-4 h-4 fill-white text-white" />
              <span>{isGenerating ? 'Rendering Video...' : 'Print New Demo Video'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full p-6 md:p-8 space-y-12">
        
        {/* Method Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              id: 'text_to_video',
              title: 'Method 1: Text-to-Video Script',
              desc: 'Turn product idea into full 15s/30s UGC Reel with voiceover',
              icon: Wand2,
              badge: 'Fastest'
            },
            {
              id: 'shopify_url',
              title: 'Method 2: Shopify URL Import',
              desc: 'Auto-pull images & title from Shopify for 1-click video',
              icon: ShoppingCart,
              badge: '1-Click'
            },
            {
              id: 'viral_hooks',
              title: 'Method 3: Viral Hook Machine',
              desc: 'Generate 50 scroll-stopping ad hooks with caption overlays',
              icon: Flame,
              badge: 'Meta Ads'
            },
            {
              id: 'photo_motion',
              title: 'Method 4: Product Photo Motion',
              desc: 'Animate static product photos with 3D camera pan & glow',
              icon: Sparkles,
              badge: '3D FX'
            }
          ].map((method) => {
            const Icon = method.icon;
            const isActive = activeMethod === method.id;
            return (
              <button
                key={method.id}
                onClick={() => setActiveMethod(method.id as any)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between space-y-3 ${
                  isActive
                    ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                    : 'bg-slate-950 border-white/10 hover:border-white/20 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${isActive ? 'bg-indigo-500 text-white' : 'bg-slate-900 text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                    isActive ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'bg-slate-900 text-slate-500'
                  }`}>
                    {method.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-black text-white">{method.title}</h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{method.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* SECTION 1: LIVE STUDIO WORKSPACE & PLAYER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Controls & Input Parameters (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-white/10 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Generator Parameters</h2>
              </div>
              <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> OpenAI / Gemini Ready
              </span>
            </div>

            {/* Inputs based on selected method */}
            {activeMethod === 'shopify_url' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Shopify Product URL</label>
                <input
                  type="text"
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                  placeholder="https://mystore.com/products/..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Product Title / Niche Concept</label>
              <input
                type="text"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                placeholder="e.g. Yoovic Silk Pillowcase"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Aspect Ratio</label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded-xl border border-white/10">
                  {[
                    { id: '9:16', label: '9:16', icon: Smartphone },
                    { id: '16:9', label: '16:9', icon: Monitor },
                    { id: '1:1', label: '1:1', icon: Square }
                  ].map((ratio) => {
                    const RIcon = ratio.icon;
                    return (
                      <button
                        key={ratio.id}
                        onClick={() => setAspectRatio(ratio.id as any)}
                        className={`py-1.5 text-[11px] font-mono font-bold rounded-lg flex flex-col items-center justify-center space-y-0.5 transition-all ${
                          aspectRatio === ratio.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <RIcon className="w-3.5 h-3.5" />
                        <span>{ratio.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Brand Aesthetic</label>
                <select
                  value={brandStyle}
                  onChange={(e) => setBrandStyle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Luxury & Aesthetic">Luxury & Aesthetic</option>
                  <option value="Casual UGC Creator">Casual UGC Creator</option>
                  <option value="High-Energy Cyber Tech">High-Energy Cyber Tech</option>
                  <option value="Minimalist Clean">Minimalist Clean</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Voiceover Voice</label>
              <select
                value={voiceGender}
                onChange={(e) => setVoiceGender(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="female_us">Female US (Trendy UGC TikTok Voice)</option>
                <option value="male_us">Male US (Energetic Commercial Voice)</option>
                <option value="british_accent">British Voice (Luxury Brand Narrator)</option>
              </select>
            </div>

            <button
              onClick={handleGenerateVideo}
              disabled={isGenerating}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-black rounded-2xl text-xs sm:text-sm shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Rendering Scene ({renderProgress}%)...</span>
                </>
              ) : (
                <>
                  <Video className="w-4 h-4 text-slate-950 fill-slate-950" />
                  <span>Generate Demo Commercial Video</span>
                </>
              )}
            </button>

            {/* Rendering Progress Bar */}
            {isGenerating && (
              <div className="space-y-2 p-3 bg-slate-950 rounded-xl border border-indigo-500/30">
                <div className="flex justify-between text-[11px] font-mono text-indigo-300">
                  <span>{renderStage}</span>
                  <span>{renderProgress}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300"
                    style={{ width: `${renderProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Interactive Live Video Player & Storyboard (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Video Player Canvas Box */}
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <Film className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-black text-white uppercase tracking-wider">Live Video Player Preview</span>
                </div>
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-mono font-bold">
                  {aspectRatio} • 1080p 60fps
                </span>
              </div>

              {/* Video Player Frame Container */}
              <div className="relative mx-auto bg-slate-950 border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center min-h-[360px] max-h-[460px]">
                
                {/* Dynamic Background Motion Animation */}
                <div className={`absolute inset-0 bg-gradient-to-br ${storyboard[currentSceneIndex]?.bgColor || 'from-indigo-950 to-slate-950'} transition-all duration-700 flex flex-col items-center justify-between p-6 text-center select-none`}>
                  
                  {/* Floating particle effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none animate-pulse" />

                  {/* Top Overlay Badge */}
                  <div className="w-full flex items-center justify-between text-xs font-mono text-slate-300 z-10">
                    <span className="px-2 py-0.5 bg-slate-950/80 rounded-md border border-white/10 text-amber-300">
                      NOVA AI VIDEO
                    </span>
                    <span className="px-2 py-0.5 bg-slate-950/80 rounded-md border border-white/10 text-cyan-300">
                      {storyboard[currentSceneIndex]?.scene || 'Scene Preview'}
                    </span>
                  </div>

                  {/* Center Visual Mockup Content */}
                  <div className="my-auto space-y-3 max-w-md z-10">
                    <div className="p-3 bg-slate-900/80 border border-white/20 rounded-2xl backdrop-blur-md shadow-2xl inline-block">
                      <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto mb-1" />
                      <span className="text-xs font-extrabold text-white block">{productTitle}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">100% Pure Mulberry Silk</span>
                    </div>

                    {/* Live Animated Caption */}
                    <div className="px-4 py-2 bg-slate-950/90 border border-amber-500/40 rounded-xl text-xs sm:text-sm font-black text-amber-300 shadow-xl max-w-xs mx-auto animate-bounce">
                      "{storyboard[currentSceneIndex]?.caption}"
                    </div>
                  </div>

                  {/* Bottom Audio Track Visualizer */}
                  <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 z-10">
                    <div className="flex items-center space-x-1">
                      <Music className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="truncate max-w-[180px]">Voiceover: {voiceGender.toUpperCase()}</span>
                    </div>

                    <div className="flex items-center space-x-1 text-emerald-400 font-bold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+420% ROAS</span>
                    </div>
                  </div>
                </div>

                {/* Center Play Button Overlay when paused */}
                {!isPlaying && (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="relative z-20 w-16 h-16 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl border border-white/30 transition-transform hover:scale-110"
                  >
                    <Play className="w-8 h-8 fill-white translate-x-0.5" />
                  </button>
                )}
              </div>

              {/* Player Controls Bar */}
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-2xl border border-white/10 text-xs">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <button
                    onClick={() => {
                      setPlaybackTime(0);
                      setIsPlaying(true);
                    }}
                    className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-white/10"
                    title="Replay from start"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-white/10"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                </div>

                {/* Time Scrubber Progress */}
                <div className="flex-1 mx-4 space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>{playbackTime.toFixed(1)}s</span>
                    <span>15.0s</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full transition-all duration-300"
                      style={{ width: `${(playbackTime / 15) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => showToast('MP4 Video HD File exported!', 'success')}
                    className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl font-bold flex items-center space-x-1 hover:bg-emerald-500/30 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export MP4</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Storyboard Script Breakdown Accordion */}
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <h3 className="text-xs font-black text-white uppercase tracking-wider">AI Shot-by-Shot Storyboard Script</h3>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">4 Scenes • 15 Seconds</span>
              </div>

              <div className="space-y-3">
                {storyboard.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      currentSceneIndex === idx
                        ? 'bg-slate-950 border-amber-500/50 shadow-lg'
                        : 'bg-slate-950/60 border-white/5 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {item.scene}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`${item.scene}: ${item.audio}`);
                          setCopiedScriptIndex(idx);
                          showToast('Scene voiceover copied!', 'success');
                          setTimeout(() => setCopiedScriptIndex(null), 2000);
                        }}
                        className="text-slate-400 hover:text-white"
                      >
                        {copiedScriptIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <p className="text-xs text-slate-200 font-medium mb-1">
                      <strong className="text-indigo-300">Visual:</strong> {item.visual}
                    </p>
                    <p className="text-xs text-slate-300 italic">
                      <strong className="text-emerald-400 font-normal">Voiceover:</strong> "{item.audio}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: LIVE TEMPLATES LIBRARY */}
        <div className="space-y-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold uppercase">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Tested High-ROAS Templates</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
                Live Video Templates Library
              </h2>
              <p className="text-xs text-slate-400">
                1-Click load pre-tested viral video formats directly into the generator above.
              </p>
            </div>

            {/* Template Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Templates' },
                { id: 'ugc', label: 'TikTok/Reels UGC' },
                { id: 'commercial', label: '30s Commercial' },
                { id: 'meta_ads', label: 'Meta Ad Hooks' },
                { id: 'unboxing', label: 'Unboxing ASMR' },
                { id: 'flash_sale', label: 'Flash Sale' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-slate-900 border border-white/10 hover:border-indigo-500/50 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between group transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-[10px] font-mono font-bold">
                      {tpl.aspectRatio} • {tpl.duration}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {tpl.roasBoost}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-white group-hover:text-indigo-300 transition-colors">
                    {tpl.title}
                  </h3>

                  <div className="p-3 bg-slate-950 rounded-2xl border border-white/10 text-xs text-slate-300 italic">
                    "{tpl.hookText}"
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tpl.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded-lg border border-white/5">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleLoadTemplate(tpl)}
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-1.5"
                  >
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    <span>Use Template</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(tpl.script, null, 2));
                      showToast('Template script JSON copied!', 'success');
                    }}
                    className="p-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-xl border border-white/10"
                    title="Copy Script JSON"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
