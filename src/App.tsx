import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { TabType } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthModal } from './components/AuthModal';
import { MultiModelHub } from './components/MultiModelHub';
import { DevStudio } from './components/DevStudio';
import { VibeRespondingAgent } from './components/VibeRespondingAgent';
import { VibeCodingAgent } from './components/VibeCodingAgent';
import { NovaVideoDemo } from './components/NovaVideoDemo';
import { AgentPlatform } from './components/AgentPlatform';
import { CreativeStudio } from './components/CreativeStudio';
import { BusinessDashboard } from './components/BusinessDashboard';
import { AutomationSuite } from './components/AutomationSuite';
import { SocialSuite } from './components/SocialSuite';
import { EnterpriseSettings } from './components/EnterpriseSettings';
import { AiCommercialStudio } from './components/AiCommercialStudio';
import { SkillsLibrary } from './components/SkillsLibrary';
import { DatabaseMemoryVault } from './components/DatabaseMemoryVault';
import { RepoInspector } from './components/RepoInspector';
import { LandingView } from './components/LandingView';
import { PricingView } from './components/PricingView';
import { DocsView } from './components/DocsView';
import { BlogView } from './components/BlogView';
import { ContactView } from './components/ContactView';
import { AdminView } from './components/AdminView';
import { GettingStartedTour } from './components/GettingStartedTour';
import { signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function App() {
  const { user, loading, auth } = useAuth();
  const [currentTab, setCurrentTab] = useState<TabType>('hub');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useKeyboardShortcuts({
    onSelectTab: setCurrentTab,
    onToggleSearch: () => setIsSearchOpen((prev) => !prev),
  });

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#030712] text-white relative overflow-hidden">
        {/* Floating background gradient glow */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none animate-float-reverse" />

        <div className="text-center space-y-4 relative z-10 p-8 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-2xl shadow-2xl max-w-sm w-full mx-4">
          <div className="relative w-14 h-14 mx-auto">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 blur-md opacity-70 animate-pulse" />
            <div className="relative w-14 h-14 rounded-2xl bg-slate-900 border border-white/20 flex items-center justify-center text-white shadow-xl">
              <Sparkles className="w-7 h-7 text-indigo-400 animate-spin" />
            </div>
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Nova AI Power</h2>
            <p className="text-xs font-mono text-indigo-400 mt-1">Initialising Enterprise Suite...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthModal isOpen={true} />;
  }

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#030712] text-slate-100 font-sans relative selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Background Mesh & Glowing Orbs */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none z-0" />
      <div className="fixed -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none z-0 animate-float-slow" />
      <div className="fixed -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none z-0 animate-float-reverse" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/5 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* Main Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        user={user}
        onSignOut={handleSignOut}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Workspace Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        <Header 
          currentTab={currentTab} 
          onSelectTab={setCurrentTab} 
          onOpenSearch={() => setIsSearchOpen(true)}
          onToggleMobileMenu={() => setMobileSidebarOpen((prev) => !prev)}
        />

        {/* Dynamic Animated View Wrapper */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 8, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.995 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              {currentTab === 'hub' && <MultiModelHub />}
              {currentTab === 'nova_video_demo' && <NovaVideoDemo />}
              {currentTab === 'vibe_responding' && <VibeRespondingAgent />}
              {currentTab === 'vibe_coding' && <VibeCodingAgent />}
              {currentTab === 'dev' && <DevStudio />}
              {currentTab === 'agents' && <AgentPlatform />}
              {currentTab === 'commercial' && <AiCommercialStudio />}
              {currentTab === 'skills' && <SkillsLibrary />}
              {currentTab === 'memory' && <DatabaseMemoryVault />}
              {currentTab === 'repo_inspector' && <RepoInspector />}
              {currentTab === 'landing' && <LandingView onSelectTab={setCurrentTab} />}
              {currentTab === 'pricing' && <PricingView onSelectTab={setCurrentTab} />}
              {currentTab === 'docs' && <DocsView />}
              {currentTab === 'blog' && <BlogView />}
              {currentTab === 'contact' && <ContactView />}
              {currentTab === 'admin' && <AdminView />}
              {currentTab === 'creative' && <CreativeStudio />}
              {currentTab === 'business' && <BusinessDashboard />}
              {currentTab === 'automation' && <AutomationSuite />}
              {currentTab === 'social' && <SocialSuite />}
              {currentTab === 'enterprise' && <EnterpriseSettings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Global Command Palette Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTab={setCurrentTab}
      />

      {/* Interactive Getting Started Tour */}
      <GettingStartedTour onSelectTab={setCurrentTab} />
    </div>
  );
}

