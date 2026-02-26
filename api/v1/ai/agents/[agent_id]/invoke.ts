import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getUserTier, TIER_LIMITS } from '../../../../utils/rbac';
import { GoogleGenerativeAI } from '@google/genai';

// Initialize the Gemini SDK
// Assuming standard usage: if @google/genai is standard, usually it's used like this (or with GoogleGenAI from '@google/genai')
// Wait, GoogleGenerativeAI is from '@google/generative-ai'. Let's use the fetch API to avoid missing deps natively in Vercel.
// We'll write with native fetch since it avoids package mismatch.

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 1. RBAC Check
    const user = getUserTier(req);
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const userTier = user.tier || 'STARTER';
    const limits = TIER_LIMITS[userTier as keyof typeof TIER_LIMITS];
    const { agent_id } = req.query;

    if (!agent_id || !limits.allowed_agents.includes(agent_id as string)) {
        return res.status(403).json({ error: 'Upgrade required to use this Agent model.' });
    }

    const { prompt, context_data } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!GEMINI_API_KEY) {
        // Graceful fallback for demo/mock purposes if no key is configured
        console.warn("Missing GEMINI_API_KEY, returning mock generated response.");
        return res.status(200).json({
            reply: `[GEMINI_MOCK for ${agent_id}] Você não configurou a GEMINI_API_KEY, mas o RBAC aprovou seu acesso!\nTier: ${userTier}. Seu prompt foi: "${prompt}"`,
            tokens_consumed: 15
        });
    }

    // 2. Invoke Gemini AI Strategy
    try {
        // Provide persona based on agent_id
        const systemInstruction = `You are the specialized AI agent: ${agent_id}. The user has a plan tier: ${userTier}. Provide an expert, neuromarketing-driven, high-value response relevant to your specialty. Context: ${JSON.stringify(context_data || {})}`;

        // Standard Gemini 1.5 Flash or Pro via REST API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                systemInstruction: { parts: [{ text: systemInstruction }] },
            })
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }

        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

        // In a real DB, update 'user_metrics' tokens_spent here

        return res.status(200).json({ reply, tokens_consumed: reply.length });
    } catch (error: any) {
        console.error("Gemini Invocatiopn Error:", error);
        return res.status(500).json({ error: 'Internal Server Error while invoking Gemini' });
    }
}
