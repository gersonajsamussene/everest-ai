import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-[30%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[140px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">{t('testimonials.title')}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-10 hover:bg-white/5 transition-all group"
            >

              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-primary text-primary" strokeWidth={0} />)}
              </div>
              <p className="text-white/80 mb-10 text-xl font-medium italic leading-relaxed">"{t(`testimonials.t${i}Quote`)}"</p>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-[1px]">
                  <div className="w-full h-full rounded-[15px] bg-background flex items-center justify-center font-display font-black text-xl text-white">
                    {t(`testimonials.t${i}Name`).charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-white">{t(`testimonials.t${i}Name`)}</h4>
                  <p className="text-sm text-text-muted font-semibold uppercase tracking-wider">{t(`testimonials.t${i}Role`)}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
