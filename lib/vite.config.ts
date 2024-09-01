import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({rollupTypes: true, tsconfigPath: './tsconfig.app.json'})],
  build: {
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'react-zoom-controller',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'react',
          'react-dom': 'ReactDOM'
        }
      }
    },
  },
})
