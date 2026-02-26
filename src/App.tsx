import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Diagnostic from './pages/Diagnostic';
import ViralEngine from './pages/ViralEngine';
import EmailBuilder from './pages/EmailBuilder';
import Calendar from './pages/Calendar';
import Footer from './components/Footer';
import AuthModal from './components/modals/AuthModal';
import LanguageModal from './components/modals/LanguageModal';
import PricingModal from './components/modals/PricingModal';

function AppContent() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      <Routes>
        <Route path="/" element={
          <>
            <Header 
              onOpenAuth={() => setIsAuthModalOpen(true)} 
              onOpenLang={() => setIsLangModalOpen(true)} 
            />
            <main>
              <LandingPage onOpenPricing={() => setIsPricingModalOpen(true)} />
            </main>
            <Footer />
          </>
        } />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/diagnostic" element={<Diagnostic />} />
        <Route path="/dashboard/viral-engine" element={<ViralEngine />} />
        <Route path="/dashboard/email-builder" element={<EmailBuilder />} />
        <Route path="/dashboard/calendar" element={<Calendar />} />
        
        {/* Editor Route */}
        <Route path="/editor/:id" element={<Editor />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
      {isLangModalOpen && <LanguageModal onClose={() => setIsLangModalOpen(false)} />}
      {isPricingModalOpen && <PricingModal onClose={() => setIsPricingModalOpen(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

