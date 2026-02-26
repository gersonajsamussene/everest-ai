import React from 'react';
import { motion } from 'motion/react';
import { Clock, TrendingDown, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Problem() {
  const { t } = useLanguage();

  const problems = [
    { icon: Clock, key: 'p1' },
    { icon: TrendingDown, key: 'p2' },
    { icon: AlertTriangle, key: 'p3' }
  ];

  return (
    <section className="py-20 relative px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto overflow-hidden">
      <div className="grid md:grid-cols-3 gap-8">
        {problems.map((p, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 p-10 hover:border-primary/50 transition-colors group"
          >
            <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(139,92,246,0.1)] group-hover:scale-110 transition-transform">
              <p.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold mb-3 text-white">{t(`problem.${p.key}Title`)}</h3>
              <p className="text-text-muted text-lg leading-relaxed">{t(`problem.${p.key}Desc`)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

  );
}
