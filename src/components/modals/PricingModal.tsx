import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function PricingModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/80 backdrop-blur-md" 
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto custom-scrollbar no-scrollbar"
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-50 text-white/50 hover:text-white transition-colors">
          <X className="w-8 h-8" />
        </button>
        
        <div className="text-center mb-12 pt-10 px-4">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-4 text-white uppercase tracking-tighter">
            Escale seu <span className="text-gradient-premium">Império Digital</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto font-medium">
            Escolha o mecanismo perfeito para a sua fase atual de crescimento empresarial. Sem taxas ocultas. Cancele quando quiser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pb-12 items-end">
          
          {/* STARTER */}
          <div className="glass-card p-8 rounded-3xl border border-white/5 relative flex flex-col h-full opacity-90 hover:opacity-100 transition-opacity">
            <h3 className="text-2xl font-display font-bold text-white mb-2">Starter</h3>
            <p className="text-text-muted text-sm mb-6">Para validação e presença mínima digital.</p>
            <div className="mb-8">
              <span className="text-5xl font-black text-white">$29</span>
              <span className="text-white/40 ml-2">/mês</span>
            </div>
            
            <ul className="flex-1 space-y-4 mb-8">
              {['1 Full Diagnostic Mensal', '20 Gerações AI / mês', '1 Landing Page Básica', 'Strategy Room Start', 'Suporte Email 48h'].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80 text-sm">
                  <Check className="w-5 h-5 text-white/40 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors border border-white/10">
              Começar Validação
            </button>
          </div>

          {/* EXPERT (THE HIGHLIGHT - HORMOZI OFFER) */}
          <div className="glass-card p-10 rounded-3xl border border-primary/50 relative flex flex-col h-full transform md:-translate-y-4 shadow-[0_0_50px_rgba(139,92,246,0.15)] bg-primary/5">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-white shadow-lg">
              Mais Popular
            </div>
            <h3 className="text-3xl font-display font-bold text-white mb-2">Expert Growth</h3>
            <p className="text-primary-glow text-sm mb-6 font-medium">O Motor MRR. Transforme o SaaS no seu crescimento contínuo.</p>
            <div className="mb-8">
              <span className="text-6xl font-black text-white">$97</span>
              <span className="text-white/40 ml-2">/mês</span>
            </div>
            
            <ul className="flex-1 space-y-4 mb-8">
              {['Conteúdos AI Ilimitados (Fair Use)', 'Integrated Viral Engine', 'Email Sequence Builder', 'Landing Pages Ilimitadas', 'Calendário Editorial 90 Dias', 'Priority Support (12h)'].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-white text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                  </div>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <button className="w-full btn-primary py-4 text-lg font-bold">
              Desbloquear Crescimento
            </button>
          </div>

          {/* AGENCY PRO (THE DECOY) */}
          <div className="glass-card p-8 rounded-3xl border border-white/5 relative flex flex-col h-full">
            <h3 className="text-2xl font-display font-bold text-white mb-2">Agency Pro</h3>
            <p className="text-text-muted text-sm mb-6">Para dominar o mercado.</p>
            <div className="mb-8">
              <span className="text-5xl font-black text-white">$127</span>
              <span className="text-white/40 ml-2">/mês</span>
            </div>
            
            <ul className="flex-1 space-y-4 mb-8">
              {['Tudo do Expert Growth', 'Partial White-label', 'API Access Oficial', 'Advanced Growth Dashboard', 'Premium AI Consulting', 'Dedicated Account Manager'].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80 text-sm">
                  <Check className="w-5 h-5 text-white/40 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors border border-white/20">
              Escalar Operação
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
