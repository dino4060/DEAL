import { TApiResponse } from "@/types/base.types";

export * from "./string";
export * from "./resources";

export const initialApiResponse: TApiResponse<any> = {
    success: true,
    status: 1,
    code: 1,
    error: '',
    data: {} as any,
}
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE',
}