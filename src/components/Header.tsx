import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, User, Zap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onOpenAuth: () => void;
  onOpenLang: () => void;
}

export default function Header({ onOpenAuth, onOpenLang }: HeaderProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.features'), href: '#features' },
    { name: t('nav.howItWorks'), href: '#how-it-works' },
    { name: t('nav.pricing'), href: '#pricing' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className={`glass-header rounded-3xl transition-all duration-500 border border-white/10 ${
          isScrolled ? 'px-6 py-3 shadow-2xl' : 'px-8 py-4'
        }`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-primary" fill="currentColor" fillOpacity={0.2} />
              </div>
              <span className="font-display font-black text-2xl tracking-tighter text-white uppercase italic">Everest</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-sm font-bold text-text-muted hover:text-white transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={onOpenLang}
                className="p-3 rounded-xl hover:bg-white/5 text-text-muted hover:text-white transition-all flex items-center gap-2 border border-transparent hover:border-white/10"
              >
                <Globe className="w-5 h-5" />
              </button>
              <button 
                onClick={onOpenAuth}
                className="text-sm font-bold text-white hover:text-primary transition-colors px-4 py-2"
              >
                {t('nav.login')}
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="btn-primary py-3 px-6 flex items-center gap-2 group"
              >
                <span>{t('hero.cta')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-xl font-bold text-white hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-white/10" />
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => { onOpenLang(); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-4 text-white font-bold"
                >
                  <Globe className="w-6 h-6" />
                  <span>Language</span>
                </button>
                <button 
                  onClick={() => { onOpenAuth(); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-4 text-white font-bold"
                >
                  <User className="w-6 h-6" />
                  <span>{t('nav.login')}</span>
                </button>
                <button 
                  onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }}
                  className="btn-primary w-full py-4 text-center justify-center font-black uppercase tracking-widest"
                >
                  {t('hero.cta')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
