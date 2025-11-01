/**
 * Newsletter API Client
 * Simple client for interacting with the newsletter endpoint
 * Usage in React components: import { subscribeToNewsletter } from '@/lib/newsletter'
 */

interface SubscribeOptions {
  email: string;
  firstName?: string;
  lastName?: string;
  source?: string;
  sourcePage?: string;
  categories?: string[];
  consent?: boolean;
}

interface ApiResponse {
  success: boolean;
  status?: string;
  error?: string;
}

const API_BASE = '/api';

/**
 * Subscribe email to newsletter
 */
export const subscribeToNewsletter = async (options: SubscribeOptions): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE}/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: options.email,
        firstName: options.firstName,
        lastName: options.lastName,
        source: options.source || 'website',
        sourcePage: options.sourcePage || window.location.pathname,
        categories: options.categories,
        consent: options.consent !== false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      return {
        success: false,
        error: errorData.error || `Failed with status ${response.status}`,
      };
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to subscribe';
    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Unsubscribe email from newsletter
 */
export const unsubscribeFromNewsletter = async (email: string, reason?: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE}/newsletter`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        reason,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      return {
        success: false,
        error: errorData.error || `Failed with status ${response.status}`,
      };
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to unsubscribe';
    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAIL_REGEX.test(email) && email.length <= 254;
};

/**
 * Get current page as source for tracking
 */
export const getCurrentPageSource = (): string => {
  if (typeof window === 'undefined') return '';
  const path = window.location.pathname;
  const match = path.match(/\/(guides|comparisons|articles)\/([^/]+)/);
  if (match) {
    return `${match[1]}: ${match[2]}`;
  }
  return path;
};

export default {
  subscribe: subscribeToNewsletter,
  unsubscribe: unsubscribeFromNewsletter,
  validateEmail,
  getCurrentPageSource,
};
