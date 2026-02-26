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
  role: 'USER' | 'ADMIN';
  tier?: 'STARTER' | 'EXPERT' | 'AGENCY_PRO';
  created_at: string;
}

export interface AgentSchema {
  id: string;
  name: string;
  specialty: string;
  required_tier: 'STARTER' | 'EXPERT' | 'AGENCY_PRO';
  description: string;
  avatar_icon: string;
}
