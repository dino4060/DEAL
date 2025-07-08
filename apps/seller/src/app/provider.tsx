// src/app/provider.tsx
import { Fragment } from 'react/jsx-runtime';
import { MessageContextProvider } from '../contexts/message.context';
import type { TChildrenComponent } from '../types/base.types';
import { AuthContextProvider } from '../contexts/auth.context';

export const AppProvider = ({ children }: TChildrenComponent) => {
  return (
    <Fragment>
      <MessageContextProvider>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </MessageContextProvider>
    </Fragment>
  );
};