import { ProjectSchema, EditorStateSchema, UserSchema } from '../types/api';

const BASE_URL = '/api/v1';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || `HTTP Error ${res.status}`);
  }
  if (res.status === 204) return;
  return res.json();
};

export const api = {
  auth: {
    login: async (credentials: any): Promise<{ token: string; user: UserSchema }> => {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await handleResponse(res);
      localStorage.setItem('token', data.token);
      return data;
    },
    register: async (credentials: any): Promise<{ token: string; user: UserSchema }> => {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await handleResponse(res);
      localStorage.setItem('token', data.token);
      return data;
    },
    logout: () => {
      localStorage.removeItem('token');
    }
  },
  projects: {
    list: async (): Promise<ProjectSchema[]> => {
      const res = await fetch(`${BASE_URL}/projects`, {
        headers: getHeaders()
      });
      const data = await handleResponse(res);
      return data.projects || [];
    },
    create: async (data: { name: string; description?: string }): Promise<ProjectSchema> => {
      const res = await fetch(`${BASE_URL}/projects`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },
    delete: async (id: string): Promise<void> => {
      const res = await fetch(`${BASE_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      return handleResponse(res);
    }
  },
  editor: {
    generate: async (prompt: string, context?: any): Promise<string> => {
      const res = await fetch(`${BASE_URL}/editor/generate`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ prompt, context })
      });
      const data = await handleResponse(res);
      return data.generated_content;
    },
    save: async (projectId: string, state: EditorStateSchema): Promise<void> => {
      const res = await fetch(`${BASE_URL}/editor/save/${projectId}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(state)
      });
      return handleResponse(res);
    }
  }
};

