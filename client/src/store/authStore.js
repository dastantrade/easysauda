'use client';

import { create } from 'zustand';
import api from '@/lib/api';

function setTokenCookie(name, value) {
  document.cookie = `${name}=${value}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
}

function removeTokenCookie(name) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

function saveTokens(accessToken, refreshToken) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  setTokenCookie('accessToken', accessToken);
}

function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  removeTokenCookie('accessToken');
}

const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),

  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    saveTokens(data.accessToken, data.refreshToken);
    set({ user: data.user, isAuthenticated: true });
    return data.user;
  },

  register: async (name, email, password, language) => {
    const { data } = await api.post('/auth/register', { name, email, password, language });
    saveTokens(data.accessToken, data.refreshToken);
    set({ user: data.user, isAuthenticated: true });
    return data.user;
  },

  logout: () => {
    clearTokens();
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        set({ isLoading: false });
        return;
      }
      const { data } = await api.get('/auth/me');
      set({ user: data.user, isAuthenticated: true, isLoading: false });
    } catch {
      clearTokens();
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

export default useAuthStore;
