import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Github, Mail, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await api.auth.login({ email, password });
      } else {
        await api.auth.register({ name, email, password });
      }
      onClose();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

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
        className="relative w-full max-w-md glass-card p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center"
      >

        <button onClick={onClose} className="absolute top-6 right-6 text-text-muted hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-3xl font-display font-black mb-2 text-center text-white uppercase tracking-tighter">
          {isLogin ? t('auth.loginTitle') : t('auth.signupTitle')}
        </h2>
        <p className="text-text-muted text-lg text-center mb-8 font-medium">
          {isLogin ? t('auth.loginDesc') : t('auth.signupDesc')}
        </p>

        {error && (
          <div className="w-full bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 flex items-center gap-3 text-sm font-bold">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-5 w-full" onSubmit={handleSubmit}>
          {!isLogin && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <label className="block text-sm font-bold text-white/50 uppercase tracking-widest mb-2 ml-1">{t('auth.name')}</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-medium text-lg" 
                placeholder="John Doe" 
                required={!isLogin}
              />
            </motion.div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-white/50 uppercase tracking-widest mb-2 ml-1">{t('auth.email')}</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-medium text-lg" 
              placeholder="you@example.com" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-white/50 uppercase tracking-widest mb-2 ml-1">{t('auth.password')}</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-medium text-lg" 
              placeholder="••••••••" 
              required
              minLength={8}
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-primary hover:bg-primary-glow text-white rounded-2xl font-black text-xl transition-all mt-4 shadow-[0_0_20px_rgba(139,92,246,0.2)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="w-6 h-6 animate-spin" />}
            {isLogin ? t('auth.loginBtn') : t('auth.signupBtn')}
          </button>
        </form>

        <p className="text-center text-lg text-text-muted mt-8 font-medium">
          {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
          <button 
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(null); }} 
            className="text-primary hover:text-primary-glow font-black transition-colors"
          >
            {isLogin ? t('auth.signupLink') : t('auth.loginLink')}
          </button>
        </p>

      </motion.div>
    </div>
  );
}
