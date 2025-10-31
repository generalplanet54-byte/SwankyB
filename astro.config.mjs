import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const projectRoot = dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    })
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': resolve(projectRoot, 'src'),
      },
    },
    ssr: {
      external: ['node:async_hooks']
    }
  }
});
