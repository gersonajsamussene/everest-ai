import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../../../utils/db';
import { getUserFromRequest } from '../../../utils/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const user = getUserFromRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { projectId } = req.query;
  if (!projectId || typeof projectId !== 'string') {
    return res.status(400).json({ error: 'Invalid project ID' });
  }

  const { content, settings, version } = req.body;

  try {
    const { data: projectCheck, error: checkError } = await supabase
      .from('projects')
      .select('owner_id')
      .eq('id', projectId)
      .single();

    if (checkError || !projectCheck || projectCheck.owner_id !== user.id) {
      return res.status(404).json({ error: 'Project not found or unauthorized' });
    }

    const { error: upsertError } = await supabase
      .from('editor_states')
      .upsert({
        project_id: projectId,
        content_json: content || {},
        settings_json: settings || {},
        version: version || 1,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'project_id' });

    if (upsertError) throw upsertError;

    const { error: updateError } = await supabase
      .from('projects')
      .update({ last_updated: new Date().toISOString() })
      .eq('id', projectId);

    if (updateError) throw updateError;

    return res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
