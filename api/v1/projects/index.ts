import type { VercelRequest, VercelResponse } from '@vercel/node';
import { pool } from '../../utils/db';
import { getUserFromRequest } from '../../utils/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const user = getUserFromRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const result = await pool.query(
        'SELECT id, name, description, thumbnail, last_updated, owner_id FROM projects WHERE owner_id = $1 ORDER BY last_updated DESC',
        [user.id]
      );
      return res.status(200).json({ projects: result.rows });
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
      const result = await pool.query(
        'INSERT INTO projects (name, description, owner_id) VALUES ($1, $2, $3) RETURNING id, name, description, thumbnail, last_updated, owner_id',
        [name, description, user.id]
      );
      return res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
