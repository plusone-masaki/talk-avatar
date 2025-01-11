import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/demo',
  base: '/talk-avatar',
  plugins: [vue()],
  build: {
    outDir: '../../docs',
    emptyOutDir: true
  },
})
