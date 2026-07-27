import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { TabType } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { MultiModelHub } from './components/MultiModelHub';
import { DevStudio } from './components/DevStudio';
import { AgentPlatform } from './components/AgentPlatform';
import { CreativeStudio } from './components/CreativeStudio';
import { BusinessDashboard } from './components/BusinessDashboard';
import { AutomationSuite } from './components/AutomationSuite';
import { SocialSuite } from './components/SocialSuite';
import { EnterpriseSettings } from './components/EnterpriseSettings';
import { AiCommercialStudio } from './components/AiCommercialStudio';
import { SkillsLibrary } from './components/SkillsLibrary';
import { LandingView } from './components/LandingView';
import { PricingView } from './components/PricingView';
import { DocsView } from './components/DocsView';
import { BlogView } from './components/BlogView';
import { ContactView } from './components/ContactView';
import { AdminView } from './components/AdminView';
import { signOut } from 'firebase/auth';

export default function App() {
  const { user, loading, auth } = useAuth();
  const [currentTab, setCurrentTab] = useState<TabType>('hub');

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-mono text-slate-400">Loading Nova AI Power...</p>
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
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans">
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        user={user}
        onSignOut={handleSignOut}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header currentTab={currentTab} onSelectTab={setCurrentTab} />
        {currentTab === 'hub' && <MultiModelHub />}
        {currentTab === 'dev' && <DevStudio />}
        {currentTab === 'agents' && <AgentPlatform />}
        {currentTab === 'commercial' && <AiCommercialStudio />}
        {currentTab === 'skills' && <SkillsLibrary />}
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
      </main>
    </div>
  );
}
