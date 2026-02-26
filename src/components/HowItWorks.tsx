import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden">
      {/* Background Ornament */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-secondary/5 rounded-full blur-[140px] -z-10"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tighter uppercase"
          >
            {t('howItWorks.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-muted max-w-2xl mx-auto text-xl font-medium"
          >
            {t('howItWorks.subtitle')}
          </motion.p>
        </div>

        <div className="glass-card relative overflow-hidden mb-16 max-w-5xl mx-auto group">
          <div className="aspect-video w-full bg-gradient-to-br from-surface to-background flex items-center justify-center overflow-hidden relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
             
             <motion.div 
               initial={{ rotate: 10, scale: 0.8, opacity: 0 }}
               whileInView={{ rotate: 3, scale: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, type: "spring" }}
               className="relative z-10 text-center"
             >
                <div className="w-32 h-32 bg-primary/20 backdrop-blur-xl rounded-3xl mx-auto mb-8 flex items-center justify-center border border-primary/30 shadow-[0_0_50px_rgba(139,92,246,0.3)]">
                   <span className="text-white font-display text-4xl font-black">AI</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">100% Attribution</h3>
             </motion.div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {[1, 2, 3].map((step, i) => (
            <motion.div 
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="flex flex-col items-center text-center p-10 glass-card group hover:bg-white/5"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-primary-glow flex items-center justify-center text-2xl font-display font-black mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                0{step}
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-primary-glow transition-colors">{t(`howItWorks.step${step}Title`)}</h3>
              <p className="text-text-muted text-lg leading-relaxed">{t(`howItWorks.step${step}Desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

  );
}
