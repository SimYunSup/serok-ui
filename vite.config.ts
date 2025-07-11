import { defineConfig } from "vite"
import tsconfigPaths from 'vite-tsconfig-paths'
import react from "@vitejs/plugin-react"

export default defineConfig({
  // resolve: {
  //   alias: {
  //     "@spectrum-web-components/styles": "./node_modules/@spectrum-web-components/styles",
  //   }
  // },
  plugins: [
    react(),
    tsconfigPaths(),
  ],
})
