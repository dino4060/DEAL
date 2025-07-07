/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_STRIPE_PUBLIC_KEY: string;
  readonly VITE_ANALYTICS_ID: string;
  readonly VITE_SOME_DEV_SETTING: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
