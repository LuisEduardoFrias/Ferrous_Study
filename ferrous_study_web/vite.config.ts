import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import Markdown from "vite-plugin-react-markdown";
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vite.dev/config/
export default defineConfig({
   plugins: [
      TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
      Markdown(),
      dynamicImport(/* options */),
      react({
         include: [/\.tsx$/, /\.md$/], // <-- add .md 
      }),
   ],
   resolve: {
      alias: [
         { find: '@', replacement: path.join(__dirname, 'src/markdowns') }
      ],
   },
   css: {
      postcss: {
         plugins: [tailwindcss, autoprefixer], // Usamos tailwindcss directamente
      },
   },
})
