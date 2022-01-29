import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: "frontend/",
  build: {
    outDir: "../public/"
  },
  plugins: [vue()]
})
