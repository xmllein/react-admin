import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //设置别名
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      types: path.resolve(__dirname, './types'),
    },
  },
  plugins: [
    react(),
    viteMockServe({
      mockPath: 'mock',
      enable: true,
      logger: true,
    }),
  ],
  server: {
    port: 3000, //启动端口
    // 设置 https 代理
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     rewrite: (path: string) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      // 打包优化
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        },
      },
    },
  },
})
