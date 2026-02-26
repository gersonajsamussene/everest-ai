import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../../utils/db';
import { getUserFromRequest } from '../../utils/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const user = getUserFromRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const { data: projects, error } = await supabase
        .from('projects')
        .select('id, name, description, thumbnail, last_updated, owner_id')
        .eq('owner_id', user.id)
        .order('last_updated', { ascending: false });

      if (error) throw error;
      return res.status(200).json({ projects: projects || [] });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    try {
      const { data: project, error } = await supabase
        .from('projects')
        .insert([{ name, description, owner_id: user.id }])
        .select('id, name, description, thumbnail, last_updated, owner_id')
        .single();

      if (error) throw error;
      return res.status(201).json(project);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
