import { fileURLToPath, URL } from 'node:url'
import path from 'node:path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/components/index.js"),
      name: "ll-grid-vue3",
      fileName: "ll-grid",
      formats: ["es", "umd"]
    },
    rollupOptions: {
      external: ["vue"],

      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
})
