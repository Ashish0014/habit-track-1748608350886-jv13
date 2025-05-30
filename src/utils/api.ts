import { ApiResponse } from '../types';

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    
    const data = await response.json();
    return {
      data,
      status: response.status,
    };
  } catch (error) {
    return {
      data: {} as T,
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 500,
    };
  }
}