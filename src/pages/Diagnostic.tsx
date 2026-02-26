import React from 'react';
import { Activity } from 'lucide-react';
import Sidebar from '../components/shared/Sidebar';

export default function Diagnostic() {
  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      <Sidebar currentPath="/dashboard/diagnostic" />
      
      <main className="flex-1 overflow-y-auto custom-scrollbar relative">
        <header className="px-6 md:px-10 py-8 flex items-center justify-between border-b border-white/5 sticky top-0 bg-background/50 backdrop-blur-xl z-20">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Activity className="w-6 h-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tighter">Full Diagnostic</h1>
            </div>
            <p className="text-text-muted font-medium text-sm md:text-base">Diagnóstico profundo do seu nicho, persona e riscos.</p>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-3xl mx-auto">
            <div className="glass-card p-8 rounded-3xl border border-white/5">
              <h2 className="text-xl font-display font-bold text-white mb-6">Iniciar Diagnóstico com IA</h2>
              <div className="space-y-6">
                 <div>
                   <label className="block text-xs font-black text-white/50 uppercase tracking-widest mb-2 ml-1">URL de Referência ou Nicho</label>
                   <input 
                     type="text" 
                     className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-primary/50 transition-all font-medium" 
                     placeholder="Ex: marketingsa.com ou Mercado Imobiliário" 
                   />
                 </div>
                 
                 <div>
                   <label className="block text-xs font-black text-white/50 uppercase tracking-widest mb-2 ml-1">Perfil da Empresa (1-2 frases)</label>
                   <textarea 
                     className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-primary/50 transition-all font-medium min-h-[100px]" 
                     placeholder="Descreva rápido o que vende e pra quem." 
                   />
                 </div>
                 
                 <button className="w-full py-4 bg-primary hover:bg-primary-glow text-white rounded-2xl font-black text-lg transition-all shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                   Gerar Relatório Master (Deduze 1 Token)
                 </button>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
}
