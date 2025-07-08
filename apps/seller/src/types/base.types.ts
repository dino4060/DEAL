// src/types/base.types.ts

export type TChildrenComponent = {
  children: React.ReactNode
};

export type TMainType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export type THttpMethod = typeof HttpMethod[keyof typeof HttpMethod];


// @ts-ignore
export type TApiDefinition<T> = {
  route: string;
  method: THttpMethod;
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