import { verifyToken } from './auth';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export type Tier = 'STARTER' | 'EXPERT' | 'AGENCY_PRO';

export const TIER_LIMITS = {
    STARTER: {
        projects: 1,
        ai_requests_per_month: 10,
        allowed_agents: ['general_assistant'],
    },
    EXPERT: {
        projects: 10,
        ai_requests_per_month: 200,
        allowed_agents: ['general_assistant', 'sales_copywriter', 'ux_designer'],
    },
    AGENCY_PRO: {
        projects: 9999, // Uncapped conceptually
        ai_requests_per_month: 9999, // Uncapped conceptually
        allowed_agents: ['general_assistant', 'sales_copywriter', 'ux_designer', 'growth_hacker', 'brand_strategist'],
    },
};

export const getUserTier = (req: VercelRequest): { id: string; role: string; tier?: Tier } | null => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    const token = authHeader.split(' ')[1];
    return verifyToken(token); // Assuming token payload has tier. We will update auth to include it.
};

export const requireTier = (req: VercelRequest, res: VercelResponse, requiredTier: Tier) => {
    const user = getUserTier(req);
    if (!user) {
        res.status(401).json({ error: 'Unauthorized' });
        return null;
    }

    const userTier = (user.tier || 'STARTER') as Tier;

    const tiersRanking = ['STARTER', 'EXPERT', 'AGENCY_PRO'];
    if (tiersRanking.indexOf(userTier) < tiersRanking.indexOf(requiredTier)) {
        res.status(403).json({ error: `Tier limit reached. Upgrade to ${requiredTier} to proceed.` });
        return null;
    }

    return { user, tier: userTier, limits: TIER_LIMITS[userTier] };
};
