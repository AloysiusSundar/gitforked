import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://aloysiussundar.github.io',
  base: '/gitforked',
  vite: {
    build: {
      emptyOutDir: true,
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'lucide-react', 'clsx', 'tailwind-merge'],
    },
    ssr: {
      noExternal: ['lucide-react', 'clsx', 'tailwind-merge'],
    },
  },
  integrations: [mdx(), tailwind(), react()],
});
