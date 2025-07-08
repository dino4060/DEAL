function getEnvSafely<T>(value: T, name: string): T {
  if (value) return value;
  throw new Error(`>>> getEnv: Missing ${name}`);
}

export const env = {
  BACKEND_URL: getEnvSafely(import.meta.env.VITE_BACKEND_URL, 'VITE_BACKEND_URL'),
  FILES_ENDPOINT: getEnvSafely(import.meta.env.VITE_FILES_ENDPOINT, 'VITE_FILES_ENDPOINT'),
};