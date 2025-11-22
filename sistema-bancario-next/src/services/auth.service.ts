import { api } from '@/lib/api';
import { AuthModel, AuthResponse } from '@/types';

export const authService = {
  async login(credentials: AuthModel): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      '/token/',
      credentials,
      { skipAuth: true }
    );

    // Salva os tokens no localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
    }

    return response;
  },

  async refreshToken(refresh: string): Promise<{ access: string }> {
    return api.post<{ access: string }>(
      '/token/refresh/',
      { refresh },
      { skipAuth: true }
    );
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  },

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  },
};
