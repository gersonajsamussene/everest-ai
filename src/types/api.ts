export interface ProjectSchema {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  last_updated: string;
  owner_id: string;
}

export interface EditorStateSchema {
  project_id: string;
  content: any;
  settings: any;
  version: number;
}

export interface UserSchema {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
}
