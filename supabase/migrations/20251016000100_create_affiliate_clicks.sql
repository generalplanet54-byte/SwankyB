create extension if not exists pgcrypto;

create table if not exists affiliate_clicks (
  id uuid primary key default gen_random_uuid(),
  product_id text not null,
  product_name text,
  product_url text,
  affiliate_url text not null,
  click_source text,
  referer text,
  user_agent text,
  ip_hash text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_affiliate_clicks_product_id on affiliate_clicks(product_id);
create index if not exists idx_affiliate_clicks_created_at on affiliate_clicks(created_at);
