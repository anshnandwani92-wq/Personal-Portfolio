import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), 'PUBLIC_');

export default defineConfig({
  site: env.PUBLIC_SITE_URL || process.env.PUBLIC_SITE_URL || 'https://example.com',
  output: 'server',
  adapter: cloudflare(),
  redirects: { '/services/paid-media': '/services/martech-data-audit' },
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
