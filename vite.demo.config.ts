import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/demo',
  plugins: [vue()],
  build: {
    outDir: 'demo',
    emptyOutDir: true
  },
})
