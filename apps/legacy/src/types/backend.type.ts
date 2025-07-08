export interface IApiRes<T> {
    success: boolean;
    code: number;
    error: string;
    result: T;
}

export type TPage<T> = {
    totalPage: number;
    totalElements: number;
    page: number;
    size: number;
    content: T[];
}

export interface IAccount {
    authenticated: boolean;
    token: string;
}
