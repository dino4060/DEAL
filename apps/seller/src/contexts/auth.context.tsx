// src/contexts/auth.context.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import type { TChildrenComponent } from '../types/base.types';
import type { TCurrentShop } from '../types/shop.types';
import { local } from '../lib/storage/local';
import { ACCESS_TOKEN, CURRENT_SHOP } from '../lib/constants';
import { authContextCallback } from '../lib/http/refresh';

// Context //

type TAuthContext = {
  accessToken: string | null;
  currentShop: TCurrentShop | null;
  updateAccessToken: (token: string) => void;
  updateCurrentShop: (shop: TCurrentShop) => void;
  clean: () => void;
};

const AuthContext = createContext<TAuthContext | null>(null);

// Provider //

export const AuthContextProvider = ({ children }: TChildrenComponent) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentShop, setCurrentShop] = useState<TCurrentShop | null>(null);

  const updateAccessToken = (token: string) => {
    console.log('AuthContext: setAccessToken:', token);
    local.set(ACCESS_TOKEN, token);
    setAccessToken(token);
  };

  const updateCurrentShop = (shop: TCurrentShop) => {
    console.log('AuthContext: UpdateCurrentShop:', shop);
    local.set(CURRENT_SHOP, shop);
    setCurrentShop(shop);
  };

  const clean = () => {
    console.log('AuthContext: clean');
    local.remove(ACCESS_TOKEN);
    local.remove(CURRENT_SHOP);
    setAccessToken(null);
    setCurrentShop(null);
  };

  useEffect(() => {
    authContextCallback.updateAccessToken = updateAccessToken;
    authContextCallback.clean = clean;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        currentShop,
        updateAccessToken,
        updateCurrentShop,
        clean
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook //

export const useAuthContext = (): TAuthContext => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within an AuthContextProvider');
  return context;
};
