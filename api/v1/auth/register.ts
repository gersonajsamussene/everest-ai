import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../../utils/db';
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
    
    const { data: user, error } = await supabase
      .from('users')
      .insert([{ name, email, password_hash: passwordHash }])
      .select('id, name, email, role, created_at')
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(400).json({ error: 'Email already exists' });
      }
      throw error;
    }

    const token = generateToken(user.id, user.role);

    return res.status(201).json({ token, user });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
