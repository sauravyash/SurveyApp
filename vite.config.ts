import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import 'dotenv/config';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'env': process.env,
    'ENV_VAR_BACKEND_URL': new String(process.env.SURVEY_BACKEND_URL),
  },
  plugins: [
    react(),
    // markdown loader
    {
      name: "markdown-loader",
      transform(code, id) {
        if (id.slice(-3) === ".md") {
          // For .md files, get the raw content
          return `export default \`${code}\`;`;
        }
      }
    }
  ],
})
