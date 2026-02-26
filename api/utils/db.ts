import { Pool } from 'pg';

// Em ambiente de desenvolvimento local, defina a variável DATABASE_URL no .env
// Em produção (Vercel), a variável DATABASE_URL será provida pelo Vercel Postgres/Supabase.
const isProd = process.env.NODE_ENV === 'production';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProd ? { rejectUnauthorized: false } : undefined,
});

export const initDb = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        thumbnail VARCHAR(255),
        owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS editor_states (
        project_id UUID PRIMARY KEY REFERENCES projects(id) ON DELETE CASCADE,
        content_json JSONB DEFAULT '{}',
        settings_json JSONB DEFAULT '{}',
        version INTEGER DEFAULT 1,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database initialized successfully.');
  } catch (err) {
    console.error('Error initializing database', err);
  } finally {
    client.release();
  }
};
