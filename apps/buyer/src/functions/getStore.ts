// src/functions/getStore.ts
import { api } from '@/lib/api';
import { serverFetch } from '@/lib/fetch/fetch.server';
import { TAddress } from '@/types/address.types';
import { TUser } from '@/types/auth.types';
import { cache } from 'react';
import { TCart } from '@/types/cart.types';

export const getCurrentUser = cache(async (): Promise<TUser | null> => {
  const res = await serverFetch(api.auth.getCurrentUser());

  if (res.success) {
    console.log(">>> getCurrentUser: Success");
    return res.data;
  } else {
    console.warn(">>> getCurrentUser: Failure : ", res.code, res.error);
    return null;
  }
});

export const getDefaultAddress = cache(async (): Promise<TAddress | null> => {
  const res = await serverFetch(api.addresses.getDefault());

  if (res.success) {
    console.log(">>> getDefaultAddress: Success");
    return res.data;
  } else {
    console.warn(">>> getDefaultAddress: Failure : ", res.code, res.error);
    return null;
  }
});

export const getCachedUserCart = cache(async (): Promise<TCart | null> => {
  const res = await serverFetch<TCart>(api.carts.getCart());

  if (res.success) {
    console.log(">>> getCachedUserCart: Success");
    return res.data;
  } else {
    console.warn(">>> getCachedUserCart: Failure : ", res.code, res.error);
    return null;
  }
});