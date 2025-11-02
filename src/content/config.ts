import { defineCollection, z } from 'astro:content';

// Define the products collection schema
const productsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    name: z.string(),
    brand: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    affiliate_url: z.string().url().optional(),
    price: z.number().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
  }),
});

// Export the collections
export const collections = {
  products: productsCollection,
};