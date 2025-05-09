import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import Markdown from "vite-plugin-react-markdown";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    Markdown(),
    react({
      include: [/\.tsx$/, /\.md$/], // <-- add .md 
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer], // Usamos tailwindcss directamente
    },
  },
})