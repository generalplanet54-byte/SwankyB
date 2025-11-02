// Cloudflare Access API Client
// Handles authentication headers for Cloudflare Access protected endpoints

const CF_ACCESS_CLIENT_ID = 'e9e80d44ece840fcdae6a8c06e53efcc.access';

// Get Access Client Secret from environment (set in Cloudflare Pages dashboard)
const CF_ACCESS_CLIENT_SECRET = typeof window !== 'undefined' 
  ? window.CF_ACCESS_CLIENT_SECRET 
  : process.env.CF_ACCESS_CLIENT_SECRET;

export interface ApiRequestOptions extends RequestInit {
  skipAuth?: boolean;
}

/**
 * Enhanced fetch with Cloudflare Access authentication
 */
export async function apiRequest(url: string, options: ApiRequestOptions = {}) {
  const { skipAuth = false, headers = {}, ...restOptions } = options;

  // Prepare headers
  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Add Cloudflare Access headers if not skipping auth and credentials are available
  if (!skipAuth && CF_ACCESS_CLIENT_ID && CF_ACCESS_CLIENT_SECRET) {
    requestHeaders['CF-Access-Client-Id'] = CF_ACCESS_CLIENT_ID;
    requestHeaders['CF-Access-Client-Secret'] = CF_ACCESS_CLIENT_SECRET;
  }

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers: requestHeaders,
    });

    // If we get a 302 redirect to Access login, the credentials might be wrong/missing
    if (response.status === 302) {
      const location = response.headers.get('location');
      if (location?.includes('cloudflareaccess.com') || location?.includes('/access/login')) {
        console.warn('API request redirected to Cloudflare Access login. Check credentials or bypass rules.');
        throw new Error('Authentication required - Cloudflare Access blocking request');
      }
    }

    return response;
  } catch (error) {
    console.error('API Request failed:', { url, error });
    throw error;
  }
}

/**
 * API request with JSON response parsing
 */
export async function apiJson<T = any>(url: string, options: ApiRequestOptions = {}): Promise<T> {
  const response = await apiRequest(url, options);
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
  get: <T = any>(url: string, options?: ApiRequestOptions) => 
    apiJson<T>(url, { method: 'GET', ...options }),
  
  post: <T = any>(url: string, data?: any, options?: ApiRequestOptions) => 
    apiJson<T>(url, { 
      method: 'POST', 
      body: data ? JSON.stringify(data) : undefined,
      ...options 
    }),
  
  put: <T = any>(url: string, data?: any, options?: ApiRequestOptions) => 
    apiJson<T>(url, { 
      method: 'PUT', 
      body: data ? JSON.stringify(data) : undefined,
      ...options 
    }),
  
  delete: <T = any>(url: string, options?: ApiRequestOptions) => 
    apiJson<T>(url, { method: 'DELETE', ...options }),
};

// Export for backwards compatibility
export { apiRequest as fetch };