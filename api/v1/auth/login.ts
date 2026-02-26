import type { VercelRequest, VercelResponse } from '@vercel/node';
import { pool } from '../../utils/db';
import { comparePassword, generateToken } from '../../utils/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Validation failed' });
  }

  try {
    const result = await pool.query(
      'SELECT id, name, email, role, password_hash, created_at FROM users WHERE email = $1',
      [email]
    );

    const userRecord = result.rows[0];

    if (!userRecord || !(await comparePassword(password, userRecord.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const { password_hash, ...user } = userRecord;
    const token = generateToken(user.id, user.role);

    return res.status(200).json({ token, user });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
