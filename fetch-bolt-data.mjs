import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const BOLT_DATABASE_URL = "https://wuwczwpfnswwctumvqsq.supabase.co";
const BOLT_DATABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1d2N6d3BmbnN3d2N0dW12cXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1Mzg4ODMsImV4cCI6MjA3NTExNDg4M30.EGziTHFcFPQprqmSrvvfxzEEHY2HVuknezkpGidd3UA";

const supabase = createClient(BOLT_DATABASE_URL, BOLT_DATABASE_ANON_KEY);

async function fetchBoltData() {
  try {
    console.log('Fetching articles from Bolt AI database...');
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (articlesError) {
      console.error('Error fetching articles:', articlesError);
      return;
    }

    console.log(`Found ${articles?.length || 0} articles in Bolt AI database`);
    
    console.log('\nFetching article-product relationships...');
    const { data: articleProducts, error: apError } = await supabase
      .from('article_products')
      .select(`
        article_id,
        display_order,
        products (*)
      `)
      .order('display_order', { ascending: true });

    if (apError) {
      console.error('Error fetching article-products:', apError);
      return;
    }

    console.log(`Found ${articleProducts?.length || 0} article-product relationships`);

    // Save to file for inspection
    fs.writeFileSync('/tmp/bolt-articles.json', JSON.stringify(articles, null, 2));
    fs.writeFileSync('/tmp/bolt-article-products.json', JSON.stringify(articleProducts, null, 2));
    
    console.log('\nData saved to:');
    console.log('- /tmp/bolt-articles.json');
    console.log('- /tmp/bolt-article-products.json');

    if (articles && articles.length > 0) {
      console.log('\nArticles Summary:');
      articles.forEach(article => {
        console.log(`  - ${article.title} (slug: ${article.slug}, updated: ${article.updated_at})`);
      });
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

fetchBoltData();
