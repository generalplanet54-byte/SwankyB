import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_BOLT_DATABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_BOLT_DATABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * If env vars are missing at build time, don't throw during module import.
 * Instead export a fallback client that returns rejected promises with a clear error.
 * This prevents the entire app from being a blank page and makes the failure visible.
 */
export const SUPABASE_CONFIGURED = !!supabaseUrl && !!supabaseAnonKey;

function createFallbackClient(): any {
  const err = new Error('Supabase is not configured. Set VITE_BOLT_DATABASE_URL and VITE_BOLT_DATABASE_ANON_KEY (or VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) in your build environment.');
  const tableHandler = {
    get(_t: any, prop: string) {
      // common chainable methods used in this project
      if (prop === 'select' || prop === 'insert' || prop === 'update' || prop === 'delete') {
        return async () => ({ data: null, error: err });
      }
      // methods like .eq(), .order() that return a chainable object
      return () => ({ select: async () => ({ data: null, error: err }) });
    }
  } as any;

  return new Proxy({}, {
    get(_target, prop: string) {
      if (prop === 'from') {
        return (_tableName: string) => new Proxy({}, tableHandler);
      }
      // any other method returns a rejected promise for clarity
      return async () => ({ data: null, error: err });
    }
  });
}

export const supabase: SupabaseClient | any = SUPABASE_CONFIGURED
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : createFallbackClient();

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  subcategory?: string;
  amazon_url: string;
  image_url: string;
  price: number;
  original_price?: number;
  rating: number;
  review_count: number;
  features: string[];
  specifications?: Record<string, any>;
  is_featured: boolean;
  is_trending: boolean;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  featured_image: string;
  read_time: string;
  is_published: boolean;
  view_count: number;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface ArticleProduct {
  id: string;
  article_id: string;
  product_id: string;
  display_order: number;
  created_at: string;
}
