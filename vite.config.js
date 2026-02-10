import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_BASE_URL || "/";

  return {
    plugins: [react(), tailwindcss(), flowbiteReact()],
    server: {
      watch: {
        ignored: ["**/index.json"],
      },
    },
    base,
  };
});
