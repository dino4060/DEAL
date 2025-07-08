// src/lib/http/config.ts
import type { TApiDefinition, TApiResponse, THttpMethod } from "../../types/base.types";
import { env } from "../env";

export function buildEndpoint(domain: string, route: string, query?: any): RequestInfo {
  const endpoint = `${domain}/api/v1${route}`;
  console.log(`>>> buildEndpoint: ${endpoint}`);

  if (!query) return endpoint;
  const queryRecord: Record<string, string> = query;
  const queryString = new URLSearchParams(queryRecord).toString();
  return `${endpoint}?${queryString}`;
}

export function buildOptions(method: THttpMethod, body?: any): RequestInit {
  if (!body) return { method };
  return {
    method,
    body: JSON.stringify(body),
  }
}

export function shouldAuth(route: string, withAuth: boolean = false): boolean {
  if (withAuth) return true;

  if (!route || typeof route !== 'string') throw new Error('>>> shouldAuth: invalid endpoint');
  const normalized = route.toLowerCase().trim();
  if (normalized.startsWith('/public')) return false;

  return true;
}

export const normalizeResponse = async <T>(response: Response) => {
  const json = await response.json() as TApiResponse<T>;

  if (!json.success) {
    console.warn(`>>> normalizeResponse: fetch error: ${json.error}`);
  }

  return json;
}

export const normalizeError = <T>(error: any) => {
  console.error(`>>> normalizeError: fetch error: ${error.message || 'Lỗi không xác định'}`);

  return {
    success: false,
    status: 500,
    code: 0,
    error: 'Lỗi không xác định',
    data: {} as T
  }
}

export const fetchByTemplate = async <T = any>(
  api: TApiDefinition<T>,
  fetchCore: (endpoint: RequestInfo, options?: RequestInit, withAuth?: boolean) => Promise<Response>
): Promise<TApiResponse<T>> => {

  const domain = env.BACKEND_URL;
  const { route, method, withAuth, query, body } = api

  try {
    const response = await fetchCore(
      buildEndpoint(domain, route, query),
      buildOptions(method, body),
      shouldAuth(route, withAuth),
    );
    return normalizeResponse<T>(response)

  } catch (error: any) {
    return normalizeError<T>(error)
  }
}