import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Shield, BarChart, Smartphone, Globe, Lock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import FeatureDetailModal from './modals/FeatureDetailModal';

export default function Features() {
  const { t } = useLanguage();
  const [selectedFeature, setSelectedFeature] = useState<{ key: string, icon: any } | null>(null);

  const features = [
    { icon: Zap, key: 'f1' },
    { icon: Shield, key: 'f2' },
    { icon: BarChart, key: 'f3' },
    { icon: Smartphone, key: 'f4' },
    { icon: Globe, key: 'f5' },
    { icon: Lock, key: 'f6' }
  ];

  return (
    <section id="features" className="py-32 relative px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="absolute top-[20%] right-0 w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] -z-10"></div>

      <div className="py-20 px-4 md:px-16 overflow-hidden">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tighter uppercase"
          >
            {t('features.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-muted max-w-2xl mx-auto text-xl font-medium"
          >
            {t('features.subtitle')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setSelectedFeature({ key: f.key, icon: f.icon })}
              className="glass-card p-10 hover:bg-white/5 transition-all cursor-pointer group hover:border-primary/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                <f.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-primary-glow transition-colors">{t(`features.${f.key}Title`)}</h3>
              <p className="text-text-muted text-lg leading-relaxed line-clamp-2">{t(`features.${f.key}Desc`)}</p>
              
              <div className="mt-8 flex items-center text-primary font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More →
              </div>
            </motion.div>
          ))}
        </div>
      </div>


      {selectedFeature && (
        <FeatureDetailModal 
          featureKey={selectedFeature.key} 
          icon={selectedFeature.icon} 
          onClose={() => setSelectedFeature(null)} 
        />
      )}
    </section>
  );
}
