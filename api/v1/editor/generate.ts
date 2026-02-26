import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getUserFromRequest } from '../../utils/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const user = getUserFromRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // TODO: In Phase 4, replace this with actual OpenAI/Gemini API call.
    // Simulating AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const generatedContent = `[AI Gerado via Serverless]: Aqui está uma expansão baseada em: "${prompt}". A arquitetura Vercel garante que este processamento ocorra na Edge, escalando instantaneamente.`;

    return res.status(200).json({ generated_content: generatedContent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
