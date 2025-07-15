export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FieldErrors {
  [key: string]: string | string[];
}

export class ApiErrorResponse extends Error {
  statusCode: number;
  errors?: FieldErrors;
  
  constructor(statusCode: number, message: string, errors?: FieldErrors) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = 'ApiErrorResponse';
  }
}