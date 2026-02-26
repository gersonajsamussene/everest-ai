import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Zap, TrendingUp, Search, Lock, Activity } from 'lucide-react';
import Sidebar from '../components/shared/Sidebar';
import UpgradeGate from '../components/shared/UpgradeGate';
import PricingModal from '../components/modals/PricingModal';

export default function ViralEngine() {
  const navigate = useNavigate();
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(true); // Simulando o estado Starter/Expert

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      <Sidebar currentPath="/dashboard/viral-engine" />
      
      <main className="flex-1 overflow-y-auto custom-scrollbar relative">
        <header className="px-6 md:px-10 py-8 flex items-center justify-between border-b border-white/5 sticky top-0 bg-background/50 backdrop-blur-xl z-20">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tighter">Viral Engine</h1>
            </div>
            <p className="text-text-muted font-medium text-sm md:text-base">Mapeamento de tendências, hooks e score viral assistido por GenAI.</p>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto h-[calc(100vh-140px)]">
          <UpgradeGate 
            isLocked={isLocked} 
            requiredTier="expert" 
            onUpgradeClick={() => setIsPricingOpen(true)}
          >
            {/* Real Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="md:col-span-2 space-y-8">
                <div className="glass-card p-8 rounded-3xl border border-white/5">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-display font-bold text-white">Trending Hooks (Marketing)</h2>
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
                      <input 
                        type="text" 
                        placeholder="Pesquisar nicho..." 
                        className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { hook: 'A verdade brutal sobre [Assunto] que ninguém te conta:', score: 98, trend: 'up' },
                      { hook: 'Como eu fui de 0 a [Resultado] em [Tempo] usando esta estrutura simples:', score: 92, trend: 'up' },
                      { hook: 'Parei de fazer [Prática Comum]. E o meu faturamento triplicou.', score: 87, trend: 'stable' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                        <div className="flex-1">
                          <p className="text-white font-medium group-hover:text-primary transition-colors">{item.hook}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 ml-4 shrink-0">
                          <div className="flex items-center gap-2">
                            <Activity className={`w-4 h-4 \${item.trend === 'up' ? 'text-green-400' : 'text-yellow-400'}`} />
                            <span className="font-bold text-white">{item.score}</span>
                          </div>
                          <span className="text-[10px] uppercase tracking-widest text-text-muted">Viral Score</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass-card p-6 rounded-3xl border border-primary/20 bg-primary/5">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-4">
                    <Zap className="w-5 h-5 text-primary" fill="currentColor" fillOpacity={0.2} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">GenAI Insights</h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    A IA detectou uma saturação de 45% nos hooks de 'Como Fazer' esta semana. Utilize os ganchos de 'Curiosidade Negativa' (Ex: A Verdade Brutal) para um aumento projetado de 3x no CTR orgânico.
                  </p>
                </div>
              </div>
              
            </div>
          </UpgradeGate>
        </div>
      </main>

      {isPricingOpen && <PricingModal onClose={() => setIsPricingOpen(false)} />}
    </div>
  );
}
