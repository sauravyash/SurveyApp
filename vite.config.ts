import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {config} from 'dotenv';
config();

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'env': process.env,
    'ENV_VAR_BACKEND_URL': new String(process.env.VITE_SURVEY_BACKEND_URL),
    'ENV_VAR_SURVEY_TYPE': new String(process.env.VITE_SURVEY_TYPE),
    'process.env': {}
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
