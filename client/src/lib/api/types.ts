export interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export type ApiContext = 'auth' | 'category' | 'item';