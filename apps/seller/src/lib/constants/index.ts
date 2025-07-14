import type { TApiRes } from "../../types/base.types";
export * from "./string";
export * from "./resources";

export const initialApiRes: TApiRes<any> = {
  success: true,
  status: 1,
  code: 1,
  error: '',
  data: {} as any,
}

export const createAppError = <T,>(error: string): TApiRes<T> => {
  return {
    success: false,
    status: 500,
    code: 0,
    error,
    data: {} as T,
  }
}