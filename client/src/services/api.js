import axios from 'axios';

const API_BASE = `${import.meta.env.VITE_API_URL}/api` || 'http://localhost:5001/api';

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000, // 10 seconds timeout
});

// Interceptor to attach a mock token or handle standard logic before request
api.interceptors.request.use(
  (config) => {
    // Add token to headers if it exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    console.error('API Error:', error.response || error.message);
    return Promise.reject(new Error(message));
  }
);

export const authApi = {
  register: (payload) => api.post('/auth/register', payload),
  login: (payload) => api.post('/auth/login', payload),
  me: () => api.get('/auth/me'),
};

export default api;
