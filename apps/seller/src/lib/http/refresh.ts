// src/http/refresh.ts
import { fetchSafely } from ".";
import type { TApiDefinition, TApiResult } from "../../types/base.types";
import { api } from "../api";
import { createAppError } from "../constants";

type TAuthContextCallback = {
  updateAccessToken: ((token: string) => void) | null;
  clean: (() => void) | null;
};

export const authContextCallback: TAuthContextCallback = {
  updateAccessToken: null,
  clean: null,
};

export const handleRefresh = async <T,>(currentApi: TApiDefinition<T>, currentResult: TApiResult<T>) => {
  if (currentResult.success || currentResult.status !== 401) {
    console.log(`>>> refreshToken: bypass`);
    return currentResult;
  }

  if (!(authContextCallback.updateAccessToken && authContextCallback.clean)) {
    console.error(`>>> refreshToken: have not initialized authContextAdapter yet`);
    return createAppError<T>('Lỗi chưa khởi tạo Auth Context Adapter');
  }

  const refreshResult = await fetchSafely(api.auth.refresh());

  if (!(refreshResult.success && refreshResult.data.isAuthenticated)) {
    console.log(`>>> refreshToken: clean`);
    authContextCallback.clean();
    window.location.reload();
  }

  console.log(`>>> refreshToken: update`);
  authContextCallback.updateAccessToken(refreshResult.data.accessToken);
  return fetchSafely(currentApi);
}