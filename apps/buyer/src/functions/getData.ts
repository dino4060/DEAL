// src/functions/getData.ts
import { api } from '@/lib/api';
import { serverFetch } from '@/lib/fetch/fetch.server';
import { TAddress } from '@/types/address.types';
import { TUser } from '@/types/auth.types';
import { cache } from 'react';
import { TCart } from '@/types/cart.types';

export const getCurrentUser = cache(async (): Promise<TUser | null> => {
  const { success, data } = await serverFetch(api.auth.getCurrentUser());

  return success ? data : null;
});

export const getDefaultAddress = cache(async (): Promise<TAddress | null> => {
  const { success, data } = await serverFetch(api.addresses.getDefault());

  return success ? data : null;
});

export const getCachedUserCart = cache(async (): Promise<TCart | null> => {
  const { success, data } = await serverFetch<TCart>(api.carts.getCart());

  return success ? data : null;
});