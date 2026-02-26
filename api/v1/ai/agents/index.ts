import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getUserTier } from '../../../utils/rbac';

const MOCK_AGENTS = [
    {
        id: 'general_assistant',
        name: 'Assistente Everest',
        specialty: 'Geral',
        required_tier: 'STARTER',
        description: 'Seu assistente base para ideias e estruturação rápida.',
        avatar_icon: 'bot',
    },
    {
        id: 'sales_copywriter',
        name: 'Mestre em Copywriting',
        specialty: 'Vendas & Funis',
        required_tier: 'EXPERT',
        description: 'Cria copies de vendas de alta conversão baseadas em neurolinguística.',
        avatar_icon: 'pen-tool',
    },
    {
        id: 'ux_designer',
        name: 'UX/UI Concierge',
        specialty: 'Design & Interfaces',
        required_tier: 'EXPERT',
        description: 'Analisa e sugere melhorias de luxo e conversão na sua interface.',
        avatar_icon: 'layout',
    },
    {
        id: 'growth_hacker',
        name: 'Growth Hacker Pro',
        specialty: 'Escala & Viralidade',
        required_tier: 'AGENCY_PRO',
        description: 'Desenvolve mecanismos de produto virais ($100k MRR frameworks).',
        avatar_icon: 'trending-up',
    },
    {
        id: 'brand_strategist',
        name: 'Estrategista de Luxo',
        specialty: 'Posicionamento Premium',
        required_tier: 'AGENCY_PRO',
        description: 'Arquitetura de marca e diferenciação anticompetitiva.',
        avatar_icon: 'award',
    }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const user = getUserTier(req);
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Retorna todos os agentes, a interface fará o "Paywall" visual nas requisições.
    return res.status(200).json({ agents: MOCK_AGENTS });
}
