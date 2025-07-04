import { env } from "../env";

/**
 * Create URL to access files from backend
 */
export function getFileUrl(
  fileName: string,
  resource: string,
  id: string | number
): string {
  if (!fileName) throw new Error(">>> getFileUrl: fileName is empty");

  const domain = env.BACKEND_URL;
  const endpoint = env.FILES_ENDPOINT;

  return `${domain}${endpoint}${resource}/${id}/${encodeURIComponent(
    fileName
  )}`;
}

export function getFile(fileName: string): string {
  if (!fileName) throw new Error(">>> getFileUrl: fileName is empty");

  const domain = env.BACKEND_URL;
  const endpoint = env.FILES_ENDPOINT;

  return `${domain}${endpoint}/${encodeURIComponent(fileName)}`;
}
