import React from 'react';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface UpgradeGateProps {
  children: React.ReactNode;
  isLocked: boolean;
  requiredTier: 'expert' | 'scale';
  onUpgradeClick: () => void;
}

export default function UpgradeGate({ children, isLocked, requiredTier, onUpgradeClick }: UpgradeGateProps) {
  const { t } = useLanguage();

  if (!isLocked) {
    return <>{children}</>;
  }

  const tierNames = {
    expert: 'Plano Expert',
    scale: 'Agency Pro'
  };

  return (
    <div className="relative group rounded-2xl overflow-hidden w-full h-full min-h-[300px]">
      {/* Blurred Content */}
      <div className="absolute inset-0 z-0 blur-md opacity-30 pointer-events-none select-none">
        {children}
      </div>

      {/* Glass Lock Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
        <div className="absolute inset-0 bg-background/60 backdrop-blur-xl"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-20 flex flex-col items-center max-w-sm glass-card p-8 rounded-3xl border border-white/10"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 mb-6 group-hover:scale-110 transition-transform duration-500">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold font-display tracking-tight text-white mb-2">
            Poder Exclusivo
          </h3>
          <p className="text-text-muted mb-6 leading-relaxed">
            Esta funcionalidade estratégica é restrita aos assinantes do <span className="text-primary font-semibold">{tierNames[requiredTier]}</span>.
          </p>
          <button 
            onClick={onUpgradeClick}
            className="w-full btn-primary py-3 px-6 shadow-[0_0_30px_rgba(var(--color-primary),0.3)] hover:shadow-[0_0_40px_rgba(var(--color-primary),0.5)] transition-all"
          >
            Escale Hoje
          </button>
        </motion.div>
      </div>
    </div>
  );
}
