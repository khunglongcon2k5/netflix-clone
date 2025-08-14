import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    modules: {
      generateScopedName: mode === 'development'
        ? '[name]__[local]___[hash:base64:3]'
        : '[hash:base64:5]',

      localsConvention: 'camelCaseOnly'
    }
  }
}))