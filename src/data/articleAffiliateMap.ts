// Map article slugs to product IDs from `launchProducts`.
// Edit these mappings if you want different affiliate products per article.

export const articleAffiliateMap: Record<string, string[]> = {
  'braun-series-9-pro-vs-series-8-electric-shaver-review': ['prod-braun-series-9-pro-plus', 'prod-braun-series-8'],
  'best-all-in-one-mens-grooming-trimmer-kits-2024': ['prod-braun-series-7-kit', 'prod-braun-series-8'],
  'complete-guide-premium-mens-grooming': ['prod-clinique-lotion', 'prod-braun-series-7-kit'],
  'complete-modern-gentlemans-grooming-guide-essential-tools': ['prod-braun-series-9-pro-plus', 'prod-manscaped-beard-hedger'],
  'luxury-fragrances-modern-gentleman-guide': ['prod-tom-ford-oud-wood'],
  'premium-skincare-luxury-beauty-products-review': ['prod-clinique-lotion'],
  'premium-wireless-earbuds-2024-audio-guide': ['prod-sony-wf-1000xm4', 'prod-apple-airpods-pro'],
  'travel-grooming-essentials-portable-shavers-guide': ['prod-manscaped-chairman-pro', 'prod-manscaped-beard-hedger'],
  'ultimate-mens-wallet-guide-premium-leather': ['prod-ridge-wallet']
};
