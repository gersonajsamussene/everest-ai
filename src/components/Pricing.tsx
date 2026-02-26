import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Pricing({ onOpenPricing }: { onOpenPricing: () => void }) {
  const { t } = useLanguage();

  const plans = ['starter', 'pro', 'enterprise'];

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tighter uppercase"
          >
            {t('pricing.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-muted max-w-2xl mx-auto text-xl font-medium"
          >
            {t('pricing.subtitle')}
          </motion.p>
        </div>


        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div 
              key={plan}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card p-10 relative group transition-all duration-500 ${plan === 'pro' ? 'border-primary/50 shadow-[0_0_40px_rgba(139,92,246,0.15)] ring-1 ring-primary/20 scale-105 z-10' : 'hover:border-white/20'}`}
            >
              {plan === 'pro' && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary text-white text-xs font-black rounded-full uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(139,92,246,0.5)] z-20">
                  {t('pricing.mostPopular')}
                </div>
              )}
              <h3 className="text-3xl font-display font-black mb-1 uppercase tracking-tight text-white">{t(`pricing.${plan}Name`)}</h3>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-black text-white">{t(`pricing.${plan}Price`)}</span>
                {plan !== 'enterprise' && <span className="text-text-muted font-bold">/mo</span>}
              </div>
              <p className="text-text-muted mb-10 text-lg font-medium leading-tight h-12">{t(`pricing.${plan}Desc`)}</p>
              
              <ul className="space-y-5 mb-12">
                {[1, 2, 3, 4].map(f => (
                  <li key={f} className="flex items-center gap-4 text-white/80 font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                    </div>
                    <span>{t(`pricing.${plan}F${f}`)}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={onOpenPricing}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all duration-300 transform group-hover:-translate-y-1 ${
                  plan === 'pro' 
                    ? 'bg-primary text-white shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.4)]' 
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                {t('pricing.cta')}
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
