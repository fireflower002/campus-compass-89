import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials: { username: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: { username: string; password: string; email: string }) =>
    api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Timetable APIs
export const timetableAPI = {
  get: () => api.get('/timetable'),
  create: (timetableData: any) => api.post('/timetable', timetableData),
  update: (id: string, timetableData: any) => api.put(`/timetable/${id}`, timetableData),
  delete: (id: string) => api.delete(`/timetable/${id}`),
};

// Attendance APIs
export const attendanceAPI = {
  mark: (attendanceData: { subjectId: string; date: string; status: 'present' | 'absent' }) =>
    api.post('/attendance', attendanceData),
  getBySubject: (subjectId: string) => api.get(`/attendance/subject/${subjectId}`),
  getByDate: (date: string) => api.get(`/attendance/date/${date}`),
  getStats: () => api.get('/attendance/stats'),
};

// Notes APIs
export const notesAPI = {
  getAll: () => api.get('/notes'),
  create: (noteData: any) => api.post('/notes', noteData),
  update: (id: string, noteData: any) => api.put(`/notes/${id}`, noteData),
  delete: (id: string) => api.delete(`/notes/${id}`),
  upload: (file: FormData) => api.post('/notes/upload', file, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

// User APIs
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (userData: any) => api.put('/user/profile', userData),
  updatePassword: (passwordData: { oldPassword: string; newPassword: string }) =>
    api.put('/user/password', passwordData),
  uploadAvatar: (file: FormData) => api.post('/user/avatar', file, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export default api;