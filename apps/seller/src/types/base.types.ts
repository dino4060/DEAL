import type { HttpMethod } from "../lib/constants";

export type TChildrenComponent = {
  children: React.ReactNode
};

export type TMainType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

// @ts-ignore
export type TApiDefinition<T> = {
  route: string;
  method: HttpMethod;
  withAuth?: boolean;
  query?: object;
  body?: object;
};

export type TApiResponse<T> = {
  success: boolean;
  status: number;
  code: number;
  error: string;
  data: T;
}

export type TPagination = {
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
}

export type TPageRes<T> = {
  pagination: TPagination,
  items: T[]
}

export type TDeletedRes = {
  isDeleted: boolean;
  count: number;
};