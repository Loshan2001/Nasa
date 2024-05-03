import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path'; 

// https://vitejs.dev/config/
export default defineConfig({
  //plugins: [react()],
  plugins: [reactRefresh()],
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@import "${path.resolve(__dirname, 'src/styles/variables.scss')}";`,
      },
    },
  },
  server : {
    port : 3000,
  }
})
