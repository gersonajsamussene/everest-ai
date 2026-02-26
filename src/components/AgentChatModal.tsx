import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import { api } from '../services/api';

interface AgentChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    agent: string | null;
}

interface Message {
    role: 'user' | 'agent';
    content: string;
}

export default function AgentChatModal({ isOpen, onClose, agent }: AgentChatModalProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'agent', content: `Olá. Eu sou o especialista ${agent || 'desta área'}. Como posso acelerar seus resultados hoje?` }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom on every new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Reset chat when agent changes
    useEffect(() => {
        if (agent) {
            setMessages([{ role: 'agent', content: `Olá. Eu sou o especialista ${agent}. Como posso acelerar seus resultados hoje?` }]);
        }
    }, [agent]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !agent) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await api.ai.agents.invoke(agent, userMessage);
            setMessages(prev => [...prev, { role: 'agent', content: response.reply }]);
        } catch (error: any) {
            setMessages(prev => [...prev, { role: 'agent', content: `[Erro]: ${error.message || 'Não foi possível conectar ao agente.'}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-background/80 backdrop-blur-md"
                />
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    className="relative w-full max-w-2xl bg-[#0B0E14] border border-white/10 rounded-2xl shadow-2xl flex flex-col h-[70vh] overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold font-display uppercase tracking-wider">{agent}</h3>
                                <p className="text-xs text-primary font-medium tracking-widest uppercase">Gemini Agent</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Chat Box */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'agent' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white'}`}>
                                    {msg.role === 'agent' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                </div>
                                <div className={`p-4 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-sm' : 'bg-white/5 border border-white/5 text-white/90 rounded-tl-sm'}`}>
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                                    <Bot className="w-4 h-4" />
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-white/90 rounded-tl-sm flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                    <span className="text-sm font-medium animate-pulse">Consulting the model...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-white/5 bg-background">
                        <form onSubmit={handleSend} className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Ask the expert..."
                                className="w-full bg-white/5 border border-white/10 rounded-full pl-6 pr-14 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-medium"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white disabled:opacity-50 hover:bg-primary-glow transition-all"
                            >
                                <Send className="w-4 h-4 ml-[-2px]" />
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
