import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { config } from 'dotenv';
import basicSsl from '@vitejs/plugin-basic-ssl';
import mkcert from 'vite-plugin-mkcert'

config();

const survey_type = process.env.VITE_SURVEY_TYPE || "public";

const env = loadEnv(survey_type, process.cwd(), '')

export default defineConfig(({ mode }) => {
  // loads .env, .env.local, and .env.<mode>
  const env = loadEnv(survey_type, process.cwd(), '') // '' = include all, or 'VITE_' to filter

  return {
    // If you want the mode available in app code:
    define: {
      'env': {
        ...process.env
      }, 
      'process.env': {
        "VITE_SURVEY_BACKEND_URL": env.VITE_SURVEY_BACKEND_URL || "",
        mode: JSON.stringify(mode)
      }
    },
    plugins: [
      react(),
      basicSsl(),
      {
        name: 'markdown-loader',
        transform(code, id) {
          if (id.endsWith('.md')) return `export default \`${code}\``
        }
      },
      mkcert() 
    ]
  }
})
