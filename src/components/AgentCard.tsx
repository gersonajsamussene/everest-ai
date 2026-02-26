import React from 'react';
import { motion } from 'motion/react';
import { Lock, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AgentCardProps {
    agentId: string;
    name: string;
    specialty: string;
    requiredTier: 'STARTER' | 'EXPERT' | 'AGENCY_PRO';
    description: string;
    onClick: () => void;
}

export default function AgentCard({ agentId, name, specialty, requiredTier, description, onClick }: AgentCardProps) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    let userTier = 'STARTER';

    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            userTier = payload.tier || 'STARTER';
        } catch (e) {
            console.error('Failed to decode token', e);
        }
    }

    const tiersRanking = ['STARTER', 'EXPERT', 'AGENCY_PRO'];
    const isLocked = tiersRanking.indexOf(userTier) < tiersRanking.indexOf(requiredTier);

    return (
        <motion.div
            whileHover={!isLocked ? { y: -5, scale: 1.02 } : {}}
            className={`relative glass-card p-6 overflow-hidden transition-all duration-300 ${isLocked ? 'opacity-75 grayscale-[0.5]' : 'cursor-pointer hover:border-primary/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]'}`}
            onClick={!isLocked ? onClick : undefined}
        >
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${isLocked ? 'bg-white/5 border-white/10 text-white/50' : 'bg-primary/20 border-primary/30 text-primary'}`}>
                    <Zap className="w-6 h-6" />
                </div>

                {isLocked ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                        <Lock className="w-3 h-3" />
                        <span>{requiredTier}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Unlocked</span>
                    </div>
                )}
            </div>

            <div className="relative z-10">
                <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-primary transition-colors">{name}</h3>
                <p className="text-primary text-sm font-bold uppercase tracking-wider mb-3">{specialty}</p>
                <p className="text-text-muted text-sm leading-relaxed mb-6 h-10">{description}</p>
            </div>

            <div className={`pt-4 border-t relative z-10 flex items-center justify-between ${isLocked ? 'border-white/5' : 'border-white/10'}`}>
                <span className={`text-xs font-black uppercase tracking-widest ${isLocked ? 'text-white/30' : 'text-white/70'}`}>
                    {isLocked ? 'Upgrade Required' : 'Invoke Agent'}
                </span>
                {!isLocked && <ArrowRight className="w-4 h-4 text-primary" />}
            </div>

            {isLocked && (
                <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] flex items-center justify-center z-20 opacity-0 hover:opacity-100 transition-opacity">
                    <a href="#pricing" className="px-6 py-2 bg-primary text-white font-bold rounded-full shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105 transition-transform">
                        Unlock {requiredTier}
                    </a>
                </div>
            )}
        </motion.div>
    );
}
