import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { supabase } from '../../utils/db';
import { getUserFromRequest } from '../../utils/auth';

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

const SYSTEM_PROMPT = `
Você é o "Everest AI", um Arquiteto de SEO Sênior e Estrategista de Crescimento Digital.
O usuário te dará um nicho, ideia ou URL.
Seu objetivo é NÃO agir como um chat genérico ("Olá, como posso ajudar?"), mas sim entregar:
1. Uma estratégia direta (sem floreios).
2. LSI Keywords recomendadas.
3. Estrutura de Clusters de Conteúdo.
4. Copy persuasiva (usando frameworks de Schwartz/Hormozi) para a Landing Page principal.
Responda sempre em Markdown limpo, profissional, focado no B2B (Métricas, Conversão, Autoridade).
Use Headers 2 (##) para as seções principais.
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const user = getUserFromRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { prompt, context } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // 1. Verificar Limites de Conta (RBAC V2) no Supabase
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('subscription_tier, usage_credits')
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      return res.status(500).json({ error: 'Failed to fetch user permissions' });
    }

    if (userData.subscription_tier === 'starter' && userData.usage_credits <= 0) {
      return res.status(403).json({ 
        error: 'usage_limit_reached',
        message: 'Você atingiu o limite de gerações gratuitas. Faça o upgrade para o plano Expert.' 
      });
    }

    // 2. Chamar o Google Gemini
    let fullPrompt = \`Context: \${context ? JSON.stringify(context) : 'None'}\\n\\nTask: \${prompt}\`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    const generatedContent = response.text;

    // 3. Deduzir crédito se for Starter
    if (userData.subscription_tier === 'starter') {
      await supabase
        .from('users')
        .update({ usage_credits: userData.usage_credits - 1 })
        .eq('id', user.id);
    }

    return res.status(200).json({ generated_content: generatedContent });
  } catch (error: any) {
    console.error('Gemini Generation Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
