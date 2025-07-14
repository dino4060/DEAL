// src/lib/http/index.ts
import type { TApiDefinition } from "../../types/base.types";
import { ACCESS_TOKEN } from "../constants";
import { local } from "../storage/local";
import { fetchByTemplate } from "./config";

const buildHeader = async (
  options: RequestInit = {},
  withAuth: boolean = true
): Promise<HeadersInit> => {
  // create header
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // get accessToken
  const accessToken = local.get(ACCESS_TOKEN);

  // include accessToken
  if (withAuth && accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  return headers;
}

const fetchCore = async (
  endpoint: RequestInfo,
  options: RequestInit = {},
  withAuth: boolean = true
) => {
  // config headers (include access token)
  const headers = await buildHeader(options, withAuth);

  // config credentials (include refresh token)
  const credentials = "include";

  // fetch
  return await fetch(endpoint, {
    ...options,
    credentials,
    headers,
  });
}

export const fetchSafely = async <T = any>(api: TApiDefinition<T>) => {
  return fetchByTemplate<T>(api, fetchCore);
}