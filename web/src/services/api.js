import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// NAMED export: authAPI
export const authAPI = {
  test: () => api.get('/auth/test'),
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  dashboard: () => api.get('/auth/dashboard'),
  profile: () => api.get('/auth/profile'),
};

// Optional default export of the axios instance
export default api;
