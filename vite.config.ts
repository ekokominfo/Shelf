import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Shelf/',
  // Source archives are not application entrypoints. The authored HTML's
  // import map is resolved by its iframe, never by Vite's dependency scanner.
  optimizeDeps: { entries: ['index.html'] },
});
