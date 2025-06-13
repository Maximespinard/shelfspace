interface GetErrorMessageParams {
  context?: 'auth' | 'category' | 'item';
  status?: number;
  raw?: string | string[];
  fallback?: string;
}

/**
 * Resolves error messages based on status code and feature context
 * @returns an array of messages to show in the UI
 */
export function getErrorMessage({
  context,
  status,
  raw,
  fallback = 'An unexpected error occurred',
}: GetErrorMessageParams): string[] {
  const messages: string[] = Array.isArray(raw) ? raw : [raw ?? fallback];

  if (!status) return messages;

  switch (context) {
    case 'auth':
      if (status === 409 && raw?.includes('email'))
        return ['An account with this email already exists'];
      if (status === 409 && raw?.includes('username'))
        return ['This username is already taken'];
      if (status === 401) return ['Invalid email or password'];
      break;

    case 'category':
      if (status === 409) return ['A category with this name already exists'];
      if (status === 400) return ['Invalid category name or color'];
      break;

    case 'item':
      if (status === 409) return ['An item with this name already exists'];
      if (status === 400) return ['Missing or invalid item fields'];
      break;
  }

  return messages;
}
