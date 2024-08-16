import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';

export default defineConfig({
  root: ".",
  base: "/dashboard/",
  build: {
    outDir: path.resolve(__dirname, "../../public/dashboard/"),
    emptyOutDir: true,
  },
  plugins: [vue()]
})
