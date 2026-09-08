import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Set base to '/<repo-name>/' for GitHub Pages.
// Change to '/' if using a custom domain or deploying to root.
export default defineConfig({
  plugins: [react()],
  base: '/centum-astra/',
})
