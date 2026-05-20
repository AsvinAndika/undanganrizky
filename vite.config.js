import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), 
//     tailwindcss()
//   ],
// })

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('framer-motion')) return 'animation'
          if (id.includes('react-dom') || id.includes('react/')) return 'vendor'
        }
      }
    }
  }
})