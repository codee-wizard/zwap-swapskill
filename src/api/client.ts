import axios from 'axios';
import { APP_CONFIG } from '@/constants/config';

export const apiClient = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: 10_000,
});

// Attach auth token from localStorage if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('zwap-token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fakeDelay = (ms = APP_CONFIG.apiDelay) =>
  new Promise<void>((r) => setTimeout(r, ms));
