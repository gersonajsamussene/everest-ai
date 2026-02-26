import React, { useState } from 'react';
import { Mail, Search } from 'lucide-react';
import Sidebar from '../components/shared/Sidebar';
import UpgradeGate from '../components/shared/UpgradeGate';
import PricingModal from '../components/modals/PricingModal';

export default function EmailBuilder() {
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isLocked] = useState(true);

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      <Sidebar currentPath="/dashboard/email-builder" />
      
      <main className="flex-1 overflow-y-auto custom-scrollbar relative">
        <header className="px-6 md:px-10 py-8 flex items-center justify-between border-b border-white/5 sticky top-0 bg-background/50 backdrop-blur-xl z-20">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Mail className="w-6 h-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tighter">Email Sequence Builder</h1>
            </div>
            <p className="text-text-muted font-medium text-sm md:text-base">Mapeia, gera e exporta funis de nutrição inteiros via IA.</p>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto h-[calc(100vh-140px)]">
          <UpgradeGate 
            isLocked={isLocked} 
            requiredTier="expert" 
            onUpgradeClick={() => setIsPricingOpen(true)}
          >
            <div className="glass-card p-12 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center h-full">
              <Mail className="w-16 h-16 text-primary/50 mb-6" />
              <h2 className="text-2xl font-bold font-display text-white mb-2">Seus Funis de Venda</h2>
              <p className="text-text-muted max-w-lg mb-8">Arraste, solte e peça para o Everest AI construir seus emails de lançamento de semente, PLF ou abandono de carrinho.</p>
              <button className="btn-primary px-8 py-3">Criar Primeira Sequência</button>
            </div>
          </UpgradeGate>
        </div>
      </main>

      {isPricingOpen && <PricingModal onClose={() => setIsPricingOpen(false)} />}
    </div>
  );
}
