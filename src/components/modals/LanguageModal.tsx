import React from 'react';
import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Language } from '../../i18n/translations';

const languages: { code: Language; name: string; native: string }[] = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'ar', name: 'Arabic', native: 'العربية' },
  { code: 'zh', name: 'Chinese', native: '中文' }
];

export default function LanguageModal({ onClose }: { onClose: () => void }) {
  const { language, setLanguage, t } = useLanguage();

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
        
        <h2 className="text-3xl font-display font-black mb-8 text-white uppercase tracking-tighter">{t('lang.title')}</h2>


        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                onClose();
              }}
              className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
                language === lang.code 
                  ? 'border-primary bg-primary/20 text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]' 
                  : 'border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10 text-text-muted hover:text-white'
              }`}
            >
              <div className="text-left">
                <div className={`font-display font-bold text-lg ${language === lang.code ? 'text-white' : ''}`}>{lang.native}</div>
                <div className="text-sm opacity-60 font-medium uppercase tracking-wider">{lang.name}</div>
              </div>
              {language === lang.code && <Check className="w-5 h-5 text-primary" strokeWidth={3} />}
            </button>

          ))}
        </div>
      </motion.div>
    </div>
  );
}
