import React from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
export default function Hero({ onOpenPricing }: { onOpenPricing: () => void }) {
  const { t } = useLanguage();

  return (
    <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 min-h-[90vh] overflow-hidden">
      {/* Mesh Background Orbs */}
      <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-secondary/10 rounded-full blur-[100px] -z-10"></div>

      <div className="flex-1 text-left z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-glow text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {t('hero.badge')}
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[100px] font-display font-black tracking-tighter mb-6 leading-[0.9] uppercase">
            <span className="block">{t('hero.title').split(' ')[0]}</span>
            <span className="text-gradient-premium">{t('hero.title').split(' ').slice(1).join(' ')}</span>
          </h1>
        </motion.div>


        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl md:text-2xl text-text-muted max-w-xl mb-10 font-medium leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>


        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <a href="#how-it-works" className="btn-primary w-full sm:w-auto text-lg px-8 py-4">
            {t('hero.cta1')}
          </a>
          <button onClick={onOpenPricing} className="btn-secondary w-full sm:w-auto text-lg px-8 py-4">
            {t('hero.cta2')}
          </button>
        </motion.div>
      </div>
      <div className="flex-1 w-full relative">
         <motion.div 
           initial={{ opacity: 0, x: 50, rotateY: -10 }}
           animate={{ opacity: 1, x: 0, rotateY: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative group"
         >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[40px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative aspect-[4/3] w-full max-w-2xl mx-auto glass-card flex items-center justify-center shadow-2xl overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent"></div>
               <div className="w-5/6 h-5/6 rounded-2xl bg-background/50 border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center p-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 mb-6">
                    <Zap className="w-8 h-8 text-primary" fill="currentColor" fillOpacity={0.2} />
                  </div>
                  <span className="font-display text-4xl text-white font-bold tracking-tighter mb-2">Everest Platform</span>
                  <div className="flex gap-2">
                    <div className="h-1 w-8 bg-primary rounded-full"></div>
                    <div className="h-1 w-12 bg-white/20 rounded-full"></div>
                    <div className="h-1 w-4 bg-white/20 rounded-full"></div>
                  </div>
               </div>
            </div>
         </motion.div>
      </div>
    </section>

  );
}
