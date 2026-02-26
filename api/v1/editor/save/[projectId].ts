import type { VercelRequest, VercelResponse } from '@vercel/node';
import { pool } from '../../../utils/db';
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
    // Check if user owns the project
    const projectCheck = await pool.query('SELECT owner_id FROM projects WHERE id = $1', [projectId]);
    if (projectCheck.rowCount === 0 || projectCheck.rows[0].owner_id !== user.id) {
      return res.status(404).json({ error: 'Project not found or unauthorized' });
    }

    // Upsert editor state
    await pool.query(
      `INSERT INTO editor_states (project_id, content_json, settings_json, version, updated_at)
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
       ON CONFLICT (project_id) DO UPDATE SET
       content_json = EXCLUDED.content_json,
       settings_json = EXCLUDED.settings_json,
       version = EXCLUDED.version,
       updated_at = CURRENT_TIMESTAMP`,
      [projectId, JSON.stringify(content || {}), JSON.stringify(settings || {}), version || 1]
    );

    // Update project last_updated timestamp
    await pool.query('UPDATE projects SET last_updated = CURRENT_TIMESTAMP WHERE id = $1', [projectId]);

    return res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
