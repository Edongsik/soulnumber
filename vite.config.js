// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ⭐️ 변경된 부분
  base: process.env.BASE_URL || '/' 
})