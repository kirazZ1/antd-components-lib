import { defineConfig } from 'vite'
import { viteMockServe } from "vite-plugin-mock"
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "./src/server/mock",
      supportTs: true
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "vue" :"vue/dist/vue.esm-bundler.js"
    }
  },
})
