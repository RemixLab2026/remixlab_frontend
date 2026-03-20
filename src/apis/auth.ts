import axios from 'axios';

export interface AuthPayload {
  email: string;
  password: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
});

export const login = async (payload: AuthPayload) => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};

export const signup = async (payload: AuthPayload) => {
  const { data } = await api.post('/auth/signup', payload);
  return data;
};
