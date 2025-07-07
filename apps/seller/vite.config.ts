import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  console.log(">>> mode:", mode);
  console.log(">>> port:", env.VITE_APP_PORT);

  return {
    plugins: [react()],
    server: {
      port: Number(env.VITE_APP_PORT),
    },
  };
});
