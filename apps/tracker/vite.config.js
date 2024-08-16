import { defineConfig } from 'vite'
import * as path from 'path';

export default defineConfig({
  configFile: false,
  emptyOutDir: false,
  publicDir: false,
  build: {
    outDir: path.resolve(__dirname, "../../public/"),
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'tr.mjs'),
      name: 'tr',
      formats: ['umd'],
    },
    rollupOptions: {
      output: {
        entryFileNames: () => '[name].mjs'
      }
    }
  }

});
