import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: mode === 'production' ? '/7007/' : '/',
    server: {
      port: 3000
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // React 相关
            'react-vendor': ['react', 'react-dom'],
            
            // 动画库
            'gsap-vendor': ['gsap'],
            'framer-motion': ['framer-motion', '@motionone/utils'],
            
            // 物理引擎
            'matter-js': ['matter-js'],
            
            // 其他大型库
            'lottie': ['react-lottie'],
            'styled-components': ['styled-components'],
            
            // 工具库
            'utils': ['clsx', 'tailwind-merge', 'lenis', 'buffer'],
            'icons': ['react-icons']
          }
        }
      },
      chunkSizeWarningLimit: 1000
    }
  }
})
