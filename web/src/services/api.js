import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// NAMED export: authAPI
export const authAPI = {
  test: () => api.get('/auth/test'),
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  dashboard: () => api.get('/auth/dashboard'),
  profile: (token) =>
    api.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

// Optional default export of the axios instance
export default api;
