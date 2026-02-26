import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface FeatureDetailModalProps {
  featureKey: string;
  icon: React.ElementType;
  onClose: () => void;
}

export default function FeatureDetailModal({ featureKey, icon: Icon, onClose }: FeatureDetailModalProps) {
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
        className="relative w-full max-w-2xl glass-card p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >

        <button onClick={onClose} className="absolute top-6 right-6 text-text-muted hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <Icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl font-display font-black text-white uppercase tracking-tighter">
            {t(`features.${featureKey}Title`)}
          </h2>
        </div>

        
        <div className="text-text-muted">
          <p className="text-2xl font-medium mb-8 text-white leading-tight">
            {t(`features.${featureKey}Desc`)}
          </p>
          <p className="text-lg leading-relaxed mb-10 font-medium">
            {t(`features.${featureKey}Detail`) !== `features.${featureKey}Detail` 
              ? t(`features.${featureKey}Detail`) 
              : "This is a detailed description of the feature. It provides more in-depth information about how it works, its benefits, and why it's essential for your workflow. We are constantly improving our platform to deliver the best experience."}
          </p>

          <ul className="space-y-4 mb-10">
            {[
              "Seamless integration with your existing tools",
              "Real-time analytics and reporting",
              "24/7 dedicated customer support"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-4 text-white/80 font-medium">
                <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="btn-primary px-10">
            Got it
          </button>
        </div>

      </motion.div>
    </div>
  );
}
