import React from 'react';
import { motion } from 'motion/react';
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
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] custom-scrollbar"
      >

        <button onClick={onClose} className="absolute top-6 right-6 text-text-muted hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-black mb-3 text-white uppercase tracking-tighter">{t('pricingModal.title')}</h2>
          <p className="text-text-muted text-lg font-medium">{t('pricingModal.subtitle')}</p>
        </div>


        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-6 border-b border-white/10 font-bold text-white/50 text-sm uppercase tracking-widest w-1/3">{t('pricingModal.features')}</th>
                <th className="p-6 border-b border-white/10 font-display font-black text-center text-white text-xl w-2/9">{t('pricing.starterName')}</th>
                <th className="p-6 border-b border-white/10 font-display font-black text-center text-primary text-2xl w-2/9">{t('pricing.proName')}</th>
                <th className="p-6 border-b border-white/10 font-display font-black text-center text-white text-xl w-2/9">{t('pricing.enterpriseName')}</th>
              </tr>

            </thead>
            <tbody className="text-sm">
              {[1, 2, 3, 4, 5, 6].map((f) => (
                <tr key={f} className="hover:bg-white/5 transition-colors group">
                  <td className="p-6 border-b border-white/5 text-white/70 font-medium text-base group-hover:text-white transition-colors">{t(`pricingModal.f${f}`)}</td>
                  <td className="p-6 border-b border-white/5 text-center">
                    {f <= 3 ? <Check className="w-5 h-5 mx-auto text-white/30" /> : <span className="text-white/5">-</span>}
                  </td>
                  <td className="p-6 border-b border-white/5 text-center">
                    {f <= 5 ? <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mx-auto border border-primary/20 shadow-[0_0_10px_rgba(139,92,246,0.1)]">
                      <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                    </div> : <span className="text-white/5">-</span>}
                  </td>
                  <td className="p-6 border-b border-white/5 text-center">
                    <Check className="w-5 h-5 mx-auto text-white/70" strokeWidth={2.5} />
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
        
        <div className="mt-12 text-center">
          <button onClick={onClose} className="btn-primary text-xl px-12">
            {t('pricingModal.cta')}
          </button>
        </div>

      </motion.div>
    </div>
  );
}
