import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Zap, 
  Settings, 
  Share2, 
  Sparkles,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { api } from '../services/api';

export default function Editor() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const response = await api.editor.generate(prompt);
      setContent(prev => prev + (prev ? '\n\n' : '') + response);
      setPrompt('');
    } catch (error: any) {
      console.error('Generation failed', error);
      if (error.message && (error.message.includes('401') || error.message.includes('Unauthorized'))) {
        api.auth.logout();
        navigate('/');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!id || isSaving) return;
    setIsSaving(true);
    try {
      await api.editor.save(id, {
        project_id: id,
        content: { text: content },
        settings: {},
        version: 1
      });
    } catch (error: any) {
       console.error('Save failed', error);
       if (error.message && (error.message.includes('401') || error.message.includes('Unauthorized'))) {
         api.auth.logout();
         navigate('/');
       }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Editor Header */}
      <header className="px-8 py-4 border-b border-white/5 flex items-center justify-between bg-background/50 backdrop-blur-xl z-20">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-all font-bold"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="h-8 w-[1px] bg-white/10"></div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-lg font-display font-black text-white uppercase tracking-tighter">Project #{id?.substring(0, 4)}</h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-primary/20 text-primary font-black uppercase tracking-widest border border-primary/20">Draft</span>
            </div>
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em]">{isSaving ? 'Saving...' : 'All changes saved'}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hidden sm:flex">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-xs font-black uppercase tracking-widest text-text-muted">Cloud Connected</span>
          </div>
          <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-all font-bold">
            <Settings className="w-5 h-5" />
          </button>
          <button onClick={handleSave} className="btn-primary py-2.5 px-6 flex items-center gap-2">
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbar */}
        <aside className="w-20 border-r border-white/5 flex flex-col items-center py-8 gap-6 bg-background/30 hidden md:flex">
          <button className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center border border-primary-glow shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:scale-105 transition-all">
            <Sparkles className="w-6 h-6" />
          </button>
          <div className="w-8 h-[1px] bg-white/5"></div>
          <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-text-muted flex items-center justify-center hover:text-white hover:bg-white/10 transition-all font-bold">
            <Zap className="w-6 h-6" />
          </button>
        </aside>

        {/* Editor Area */}
        <main className="flex-1 relative overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-12 lg:p-24 custom-scrollbar">
            <div className="max-w-4xl mx-auto">
               <textarea 
                 className="w-full bg-transparent border-none focus:outline-none text-4xl lg:text-6xl font-display font-black text-white placeholder:text-white/5 resize-none h-fit overflow-hidden uppercase tracking-tighter"
                 placeholder="Main Headline..."
                 rows={1}
               />
               <textarea 
                 value={content}
                 onChange={(e) => setContent(e.target.value)}
                 className="w-full bg-transparent border-none focus:outline-none text-xl lg:text-2xl font-medium text-text-muted placeholder:text-white/5 resize-none mt-10 leading-relaxed min-h-[500px]"
                 placeholder="Start typing your AI-powered strategy..."
               />
            </div>
          </div>

          {/* AI Floating Input */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6">
            <form 
              onSubmit={handleGenerate}
              className="glass-card !rounded-full p-2 flex items-center gap-2 shadow-[0_0_50px_rgba(139,92,246,0.15)] group focus-within:border-primary/50 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
              </div>
              <input 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
                type="text" 
                placeholder="Ask Everest AI to generate or refine..."
                className="flex-1 bg-transparent border-none focus:outline-none text-white px-2 font-medium"
              />
              <button 
                type="submit"
                disabled={!prompt.trim() || isGenerating}
                className="bg-primary text-white p-3 rounded-full hover:scale-105 transition-all disabled:opacity-50"
              >
                <ArrowLeft className="w-6 h-6 rotate-180" />
              </button>
            </form>
          </div>
        </main>

        {/* Right Sidebar - Context/Tools */}
        <aside className="w-80 border-l border-white/5 bg-background/30 p-8 hidden xl:flex flex-col gap-8 overflow-y-auto custom-scrollbar">
          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-muted mb-6">AI Context</h3>
            <div className="glass-card p-6 !rounded-2xl border-primary/20 bg-primary/5">
              <p className="text-sm text-white/80 font-medium leading-relaxed mb-4">You are currently building a high-conversion SEO strategy for SDE professionals.</p>
              <button className="text-xs font-black text-primary uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1"> <span>Edit Context</span> <ChevronDown className="w-3 h-3" /> </button>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-muted mb-6">Suggestions</h3>
            <div className="space-y-4">
              {[
                "Add more technical keywords",
                "Expand on the CTA section",
                "Simplify the value proposition"
              ].map((s, i) => (
                <div key={i} className="glass-card p-4 !rounded-xl text-xs font-bold text-white/60 hover:text-white hover:bg-white/5 cursor-pointer transition-all border-white/5">
                  {s}
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

