import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
