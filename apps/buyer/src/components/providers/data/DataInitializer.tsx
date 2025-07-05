// components/providers/data/GlobalDataInitializer.tsx
import { getCachedUserCart, getCurrentUser, getDefaultAddress } from '@/functions/getData';
import { getIsAuthenticated } from "@/functions/getIsAuthenticated";
import { Fragment } from 'react';
import { DataHydrator } from './DataHydrator';
import { DataCleaner } from './DataCleaner';
import { TChildrenComponent } from '@/types/base.types';

export const DataInitializer = async ({ children }: TChildrenComponent) => {
  const isAuthenticated = await getIsAuthenticated();

  if (!isAuthenticated)
    return <DataCleaner>{children}</DataCleaner>;

  const [currentUser, defaultAddress, cart] = await Promise.all([
    getCurrentUser(),
    getDefaultAddress(),
    getCachedUserCart(),
  ]);

  return (
    <Fragment>
      {children}
      <DataHydrator
        currentUser={currentUser}
        defaultAddress={defaultAddress}
        cart={cart}
      />
    </Fragment>
  );
};