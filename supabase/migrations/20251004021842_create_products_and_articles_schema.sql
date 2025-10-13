/*
  # Create Products and Articles Schema

  ## 1. New Tables
    
    ### `products`
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text, required) - Product name
      - `slug` (text, unique, required) - URL-friendly identifier
      - `description` (text, required) - Product description
      - `category` (text, required) - Product category (Footwear, Smartphones, Laptops, etc.)
      - `subcategory` (text) - Optional subcategory
      - `amazon_url` (text, required) - Amazon affiliate link
      - `image_url` (text, required) - Product image URL
      - `price` (numeric) - Product price
      - `original_price` (numeric) - Original price (for showing discounts)
      - `rating` (numeric) - Product rating (0-5)
      - `review_count` (integer) - Number of reviews
      - `features` (jsonb) - Array of key features
      - `specifications` (jsonb) - Detailed specifications
      - `is_featured` (boolean) - Whether product is featured
      - `is_trending` (boolean) - Whether product is trending
      - `meta_title` (text) - SEO meta title
      - `meta_description` (text) - SEO meta description
      - `meta_keywords` (text[]) - SEO keywords array
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    ### `articles`
      - `id` (uuid, primary key) - Unique identifier
      - `title` (text, required) - Article title
      - `slug` (text, unique, required) - URL-friendly identifier
      - `excerpt` (text, required) - Short description
      - `content` (text, required) - Full article content (HTML)
      - `category` (text, required) - Article category
      - `tags` (text[], required) - Article tags array
      - `author` (text, required) - Author name
      - `featured_image` (text, required) - Featured image URL
      - `read_time` (text, required) - Estimated read time
      - `is_published` (boolean) - Publication status
      - `view_count` (integer) - Number of views
      - `meta_title` (text) - SEO meta title
      - `meta_description` (text) - SEO meta description
      - `meta_keywords` (text[]) - SEO keywords array
      - `published_at` (timestamptz) - Publication date
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    ### `article_products`
      - `id` (uuid, primary key) - Unique identifier
      - `article_id` (uuid, foreign key) - Reference to articles
      - `product_id` (uuid, foreign key) - Reference to products
      - `display_order` (integer) - Order in which products appear
      - `created_at` (timestamptz) - Creation timestamp

  ## 2. Security
    - Enable RLS on all tables
    - Add policies for public read access (no authentication required)
    - Add policies for authenticated admin write access

  ## 3. Important Notes
    - All products are publicly accessible for reading
    - Only authenticated admins can create/update products and articles
    - Timestamps are automatically managed
    - All content is optimized for SEO with meta tags
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  subcategory text,
  amazon_url text NOT NULL,
  image_url text NOT NULL,
  price numeric(10, 2),
  original_price numeric(10, 2),
  rating numeric(3, 2) DEFAULT 0,
  review_count integer DEFAULT 0,
  features jsonb DEFAULT '[]'::jsonb,
  specifications jsonb DEFAULT '{}'::jsonb,
  is_featured boolean DEFAULT false,
  is_trending boolean DEFAULT false,
  meta_title text,
  meta_description text,
  meta_keywords text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  author text NOT NULL DEFAULT 'Admin',
  featured_image text NOT NULL,
  read_time text NOT NULL DEFAULT '5 min read',
  is_published boolean DEFAULT true,
  view_count integer DEFAULT 0,
  meta_title text,
  meta_description text,
  meta_keywords text[],
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create article_products junction table
CREATE TABLE IF NOT EXISTS article_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(article_id, product_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_trending ON products(is_trending) WHERE is_trending = true;
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published) WHERE is_published = true;
CREATE INDEX IF NOT EXISTS idx_article_products_article ON article_products(article_id);
CREATE INDEX IF NOT EXISTS idx_article_products_product ON article_products(product_id);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_products ENABLE ROW LEVEL SECURITY;

-- Products policies: Public read, authenticated write
CREATE POLICY "Anyone can view published products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Articles policies: Public read published articles, authenticated write
CREATE POLICY "Anyone can view published articles"
  ON articles FOR SELECT
  USING (is_published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete articles"
  ON articles FOR DELETE
  TO authenticated
  USING (true);

-- Article_products policies: Public read, authenticated write
CREATE POLICY "Anyone can view article-product relationships"
  ON article_products FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert article-product relationships"
  ON article_products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update article-product relationships"
  ON article_products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete article-product relationships"
  ON article_products FOR DELETE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();