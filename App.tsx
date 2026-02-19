
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EndUserPortal from './pages/EndUserPortal';
import L1AgentWorkspace from './pages/L1AgentWorkspace';
import ITManagerPortal from './pages/ITManagerPortal';
import GlobalNavBar from './components/GlobalNavBar';

const ComingSoon: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="flex flex-col h-[calc(100vh-56px)] items-center justify-center bg-bg-page p-6">
      <div className="bg-bg-surface border border-border p-12 rounded-card shadow-card text-center max-w-md w-full">
        <h2 className="text-page-title font-semibold text-text-primary mb-4">{title} Workspace</h2>
        <p className="text-body text-text-secondary">This module is currently under development. Please check back later for the AI-powered ITSM experience.</p>
        <button 
          onClick={() => window.location.hash = '#/'}
          className="mt-8 bg-primary text-white font-medium text-body px-5 py-2.5 rounded-btn hover:bg-primary-dark transition-colors"
        >
          Return to Selection
        </button>
      </div>
    </div>
  );
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isEndUser = location.pathname.includes('end-user');
  const isL1Agent = location.pathname.includes('l1-agent');
  const isITManager = location.pathname.includes('it-manager');

  // Map paths to persona names
  const getPersonaName = () => {
    if (location.pathname.includes('end-user')) return 'End User Portal';
    if (location.pathname.includes('l1-agent')) return 'L1 Agent Portal';
    if (location.pathname.includes('l2-agent')) return 'L2/L3 Specialist Portal';
    if (location.pathname.includes('it-manager')) return 'IT Manager Dashboard';
    if (location.pathname.includes('unified')) return 'Unified Enterprise Dashboard';
    return '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hide global nav on specific workspaces which have their own Navs */}
      {!isLanding && !isEndUser && !isL1Agent && !isITManager && <GlobalNavBar personaName={getPersonaName()} />}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/persona/end-user" element={<EndUserPortal />} />
          <Route path="/persona/l1-agent" element={<L1AgentWorkspace />} />
          <Route path="/persona/l1-agent/ticket/:id" element={<L1AgentWorkspace />} />
          <Route path="/persona/it-manager" element={<ITManagerPortal />} />
          <Route path="/persona/l2-agent" element={<ComingSoon title="L2/L3 Specialist" />} />
          <Route path="/unified" element={<ComingSoon title="Unified Dashboard" />} />
        </Routes>
      </MainLayout>
    </HashRouter>
  );
};

export default App;
