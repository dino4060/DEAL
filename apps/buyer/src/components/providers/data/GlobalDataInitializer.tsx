// components/providers/data/GlobalDataInitializer.tsx
import { getCachedUserCart, getCurrentUser, getDefaultAddress } from '@/functions/getStore';
import { getIsAuthenticated } from "@/functions/getIsAuthenticated";
import { Fragment } from 'react';
import { GlobalDataHydrator } from './GlobalDataHydrator';
import { GlobalDataCleaner } from './GlobalDataCleaner';

export const GlobalDataInitializer = async ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = await getIsAuthenticated();

  if (!isAuthenticated)
    return <GlobalDataCleaner>{children}</GlobalDataCleaner>;

  const [currentUser, defaultAddress, cart] = await Promise.all([
    getCurrentUser(),
    getDefaultAddress(),
    getCachedUserCart(),
  ]);

  return (
    <Fragment>
      {children}
      <GlobalDataHydrator
        currentUser={currentUser}
        defaultAddress={defaultAddress}
        cart={cart}
      />
    </Fragment>
  );
};