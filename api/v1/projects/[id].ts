import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../../utils/db';
import { getUserFromRequest } from '../../utils/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const user = getUserFromRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid project ID' });
  }

  try {
    const { data: project, error: checkError } = await supabase
      .from('projects')
      .select('id')
      .eq('id', id)
      .eq('owner_id', user.id)
      .single();

    if (checkError || !project) {
      return res.status(404).json({ error: 'Project not found or unauthorized' });
    }

    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
