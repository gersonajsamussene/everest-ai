import React from 'react';
import { Zap, Twitter, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/');
  };

  return (
    <footer className="bg-background pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div 
              className="flex items-center gap-2 mb-8 cursor-pointer group w-fit"
              onClick={handleLogoClick}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-all">
                <Zap className="w-6 h-6 text-primary" fill="currentColor" fillOpacity={0.2} />
              </div>
              <span className="font-display font-black text-2xl tracking-tighter text-white uppercase italic">Everest</span>
            </div>
            <p className="text-text-muted font-medium mb-8 leading-relaxed max-w-xs">
              Scaling the peaks of human potential through generative artificial intelligence.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-display font-black uppercase tracking-widest text-sm mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Features', 'How It Works', 'Pricing', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-text-muted font-bold hover:text-primary transition-colors text-sm uppercase tracking-wider">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-black uppercase tracking-widest text-sm mb-8">Ecosystem</h4>
            <ul className="space-y-4">
              {['Dashboard', 'Editor', 'Templates', 'API docs'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => navigate(item === 'Dashboard' ? '/dashboard' : '#')}
                    className="text-text-muted font-bold hover:text-primary transition-colors text-sm uppercase tracking-wider flex items-center gap-2"
                  >
                    {item}
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-black uppercase tracking-widest text-sm mb-8">Stay Updated</h4>
            <p className="text-text-muted text-sm font-medium mb-6">Join our alpha list for exclusive AI insights.</p>
            <div className="flex gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl focus-within:border-primary/50 transition-all">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border-none focus:outline-none text-white px-4 py-2 flex-1 text-sm font-medium"
              />
              <button className="bg-primary text-white p-2.5 rounded-xl hover:bg-primary-glow transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5">
          <p className="text-text-muted text-xs font-black uppercase tracking-[0.2em] mb-4 md:mb-0">
            © 2024 Everest AI. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>

  );
}
