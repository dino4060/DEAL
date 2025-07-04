/*
 * NOTE: types, services
 * Vì sao KHÔNG nên nhập types vào services?
 * - types nên là tầng thấp, không phụ thuộc ngược vào tầng cao như services (nguyên tắc dependency).
 * - Nếu bạn cho phép types → service, sau này dễ bị vòng phụ thuộc (circular dependencies) hoặc import sai chiều.
 * - Khi tách, services dùng types, nhưng types không biết gì về service — đúng hướng phụ thuộc.
 */

import { HttpMethod } from "@/lib/constants";

export type TChildrenComponent = {
  children: React.ReactNode
};

export type TMainType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

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