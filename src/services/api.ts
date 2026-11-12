import type { ApiResponse } from '../types';

/**
 * Service API générique prêt à être étendu pour vos appels backend
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${BASE_URL}${endpoint}`;
    const requestHeaders = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    try {
      // Exemple prêt à l'emploi avec les headers préparés
      if (options.method && requestHeaders) {
        // En attente d'un vrai backend
      }

      return {
        data: {} as T,
        status: 200,
        message: 'Requête simulée réussie',
        success: true
      };
    } catch (error) {
      throw new Error(`Échec de la requête vers ${url}: ${error}`);
    }
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  put<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiService();
