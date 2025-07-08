/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_PORT: number;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_FILES_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
