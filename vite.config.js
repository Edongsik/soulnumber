// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/soulnumber/" // 👈 이 설정이 반드시 있어야 합니다!
})