import React, { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import Sidebar from '../components/shared/Sidebar';
import UpgradeGate from '../components/shared/UpgradeGate';
import PricingModal from '../components/modals/PricingModal';

export default function Calendar() {
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isLocked] = useState(true);

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      <Sidebar currentPath="/dashboard/calendar" />
      
      <main className="flex-1 overflow-y-auto custom-scrollbar relative">
        <header className="px-6 md:px-10 py-8 flex items-center justify-between border-b border-white/5 sticky top-0 bg-background/50 backdrop-blur-xl z-20">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <CalendarDays className="w-6 h-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tighter">90-Day Editorial Calendar</h1>
            </div>
            <p className="text-text-muted font-medium text-sm md:text-base">Mapeamento trimestral gerado pelo motor estratégico do Everest.</p>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto h-[calc(100vh-140px)]">
          <UpgradeGate 
            isLocked={isLocked} 
            requiredTier="expert" 
            onUpgradeClick={() => setIsPricingOpen(true)}
          >
            <div className="glass-card p-12 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center h-full">
              <CalendarDays className="w-16 h-16 text-primary/50 mb-6" />
              <h2 className="text-2xl font-bold font-display text-white mb-2">Visão 3 Meses</h2>
              <p className="text-text-muted max-w-lg mb-8">Planeje sua linha do tempo de 90 dias baseada em SEO ou tendências virais com apenas um clique.</p>
              <button className="btn-primary px-8 py-3">Gerar Calendário GenAI</button>
            </div>
          </UpgradeGate>
        </div>
      </main>

      {isPricingOpen && <PricingModal onClose={() => setIsPricingOpen(false)} />}
    </div>
  );
}
