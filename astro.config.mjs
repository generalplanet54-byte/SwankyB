import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      configPath: './wrangler.toml'
    }
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    })
  ],
  vite: {
    build: {
      rollupOptions: {
        external: ['__STATIC_CONTENT_MANIFEST']
      }
    }
  }
});
