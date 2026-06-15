import { useAuthStore } from '../../store/auth.store';
import { apiUrl } from '../../config/runtime';

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const { token, clearAuth } = useAuthStore.getState();

  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
    options.body = JSON.stringify(options.body);
  }

  const response = await fetch(apiUrl(path), { ...options, headers });

  if (response.status === 401) {
    clearAuth();
    // Redirect to login if not already there and not on landing
    if (window.location.pathname !== '/login' && window.location.pathname !== '/' && window.location.pathname !== '/signup') {
      window.location.href = '/login';
    }
    throw new ApiError('Unauthorized. Session expired.', 401);
  }

  let data: any = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMessage = data?.message || data?.error || response.statusText || 'Request failed';
    throw new ApiError(errorMessage, response.status, data);
  }

  // Parse standard API envelopes: { success: true, data }
  if (data && typeof data === 'object' && 'success' in data && 'data' in data) {
    return data.data as T;
  }

  return data as T;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestInit) => request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: any, options?: RequestInit) => request<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: any, options?: RequestInit) => request<T>(path, { ...options, method: 'PUT', body }),
  patch: <T>(path: string, body?: any, options?: RequestInit) => request<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T>(path: string, options?: RequestInit) => request<T>(path, { ...options, method: 'DELETE' }),
};
