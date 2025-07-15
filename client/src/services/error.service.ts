import { AxiosError } from 'axios';
import type { ApiError, FieldErrors } from '@/types/api/error.types';
import type { FieldErrors as FormFieldErrors } from 'react-hook-form';

/**
 * Service for handling API errors and mapping them to form fields
 */
export class ErrorService {
  /**
   * Extract field errors from API response
   */
  static extractFieldErrors(error: unknown): FieldErrors | null {
    if (!this.isAxiosError(error)) {
      return null;
    }

    const response = error.response?.data;
    if (!response) {
      return null;
    }

    // Handle NestJS validation errors
    if (response.message && Array.isArray(response.message)) {
      return this.parseNestJSValidationErrors(response.message);
    }

    // Handle custom field errors
    if (response.errors && typeof response.errors === 'object') {
      return response.errors;
    }

    return null;
  }

  /**
   * Parse NestJS class-validator error messages
   */
  private static parseNestJSValidationErrors(messages: string[]): FieldErrors {
    const errors: FieldErrors = {};

    messages.forEach((message) => {
      // Extract field name from validation message
      // Example: "title must be at least 2 characters"
      const match = message.match(/^(\w+)\s+(.+)$/);
      if (match) {
        const [, field, errorMessage] = match;
        if (!errors[field]) {
          errors[field] = [];
        }
        (errors[field] as string[]).push(errorMessage);
      } else {
        // If we can't parse the field, add to general errors
        if (!errors.general) {
          errors.general = [];
        }
        (errors.general as string[]).push(message);
      }
    });

    return errors;
  }

  /**
   * Map API field errors to React Hook Form format
   */
  static mapToFormErrors<T extends Record<string, any>>(
    fieldErrors: FieldErrors
  ): Partial<FormFieldErrors<T>> {
    const formErrors: Partial<FormFieldErrors<T>> = {};

    Object.entries(fieldErrors).forEach(([field, messages]) => {
      const message = Array.isArray(messages) ? messages[0] : messages;
      formErrors[field as keyof T] = {
        type: 'server',
        message,
      } as any;
    });

    return formErrors;
  }

  /**
   * Get user-friendly error message
   */
  static getErrorMessage(error: unknown): string {
    if (!this.isAxiosError(error)) {
      return error instanceof Error ? error.message : 'An unexpected error occurred';
    }

    const response = error.response?.data as ApiError;
    
    if (response?.message) {
      if (Array.isArray(response.message)) {
        return response.message[0] || 'Validation failed';
      }
      return response.message;
    }

    // Fallback messages based on status code
    switch (error.response?.status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'You are not authenticated. Please log in.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'This operation conflicts with existing data.';
      case 422:
        return 'The provided data is invalid.';
      case 500:
        return 'An internal server error occurred. Please try again later.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }

  /**
   * Type guard for Axios errors
   */
  private static isAxiosError(error: unknown): error is AxiosError<ApiError> {
    return !!(error && typeof error === 'object' && 'isAxiosError' in error);
  }

  /**
   * Handle form submission errors
   */
  static handleFormError<T extends Record<string, any>>(
    error: unknown,
    setError: (name: keyof T, error: any) => void,
    showToast?: (message: string) => void
  ): void {
    const fieldErrors = this.extractFieldErrors(error);
    
    if (fieldErrors) {
      // Set field-specific errors
      Object.entries(fieldErrors).forEach(([field, message]) => {
        if (field !== 'general') {
          setError(field as keyof T, {
            type: 'server',
            message: Array.isArray(message) ? message[0] : message,
          });
        }
      });
    }

    // Show general error message
    const message = this.getErrorMessage(error);
    if (showToast) {
      showToast(message);
    }
  }
}