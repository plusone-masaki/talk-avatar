import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/talk-avatar/**/*.ts', 'src/talk-avatar/**/*.vue'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('/src/talk-avatar/', '/'),
        content
      })
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/talk-avatar/index.ts'),
      name: 'TalkAvatar',
      fileName: 'index'
    },
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: false,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
}) 