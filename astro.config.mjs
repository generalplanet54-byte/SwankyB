import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // Keep your custom index.css
    }),
  ],
  output: 'server',
  adapter: cloudflare({
    mode: 'directory',
    routes: {
      extend: {
        exclude: [{ pattern: '/assets/*' }]
      }
    },
    platformProxy: {
      enabled: false
    }
  }),
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
