// src/app/provider.tsx
import { Fragment } from 'react/jsx-runtime';
import { StoreProvider } from '../contexts/provider';
import type { TChildrenComponent } from '../types/base.types';

export const AppProvider = ({ children }: TChildrenComponent) => {
  return (
    <Fragment>
      <StoreProvider>
        {children}
      </StoreProvider>
    </Fragment>
  );
};