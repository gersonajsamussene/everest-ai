import type { VercelRequest, VercelResponse } from '@vercel/node';
import { pool } from '../../utils/db';
import { hashPassword, generateToken } from '../../utils/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password || password.length < 8) {
    return res.status(400).json({ error: 'Validation failed' });
  }

  try {
    const passwordHash = await hashPassword(password);
    
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, role, created_at',
      [name, email, passwordHash]
    );

    const user = result.rows[0];
    const token = generateToken(user.id, user.role);

    return res.status(201).json({ token, user });
  } catch (error: any) {
    if (error.code === '23505') { // Unique violation
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
