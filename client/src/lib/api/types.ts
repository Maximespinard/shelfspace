export interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
}

/**
 * Backend API response wrapper (before interceptor processing)
 */
export interface ApiResponseWrapper<T> {
  message: string;
  data: T;
}

/**
 * Frontend API response (after interceptor unwrapping)
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export type ApiContext = 'auth' | 'category' | 'item';