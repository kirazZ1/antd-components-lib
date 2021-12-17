import { defineConfig } from 'vite'
import { viteMockServe } from "vite-plugin-mock"
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "./src/server/mock",
      supportTs: true
    })
  ],

})
