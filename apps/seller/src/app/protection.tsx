// src/app/protection.tsx
import { Navigate } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import { CURRENT_SHOP } from '../lib/constants';
import { local } from '../lib/storage/local';
import type { TChildrenComponent } from '../types/base.types';
import { ShopStatus, type TCurrentShop } from '../types/shop.types';

export const AppProtection = ({ children }: TChildrenComponent) => {
  const currentShop = local.get<TCurrentShop>(CURRENT_SHOP);
  console.log('AppProtection: currentShop:', currentShop);

  if (!currentShop) return <Navigate to='/login' />;

  const isVerifying = currentShop.status === ShopStatus.VERIFYING;
  console.log('AppProtection: isVerifying:', isVerifying);

  if (isVerifying) return <Navigate to='/verify' />;

  return <Fragment>{children}</Fragment>;
};

// import { Navigate } from 'react-router';
// import { Fragment } from 'react/jsx-runtime';
// import { ACCESS_TOKEN } from '../lib/constants';
// import type { TChildrenComponent } from '../types/base.types';

// export const AppProtection = ({ children }: TChildrenComponent) => {
//   const isLogin = Boolean(localStorage.getItem(ACCESS_TOKEN));
//   console.log('>>> AppProtection: isLogin: ', isLogin);

//   if (!isLogin) return <Navigate to='/login' />;

//   return <Fragment>{children}</Fragment>;
// };

/*
I request:
1. after pass if (!isLogin). check if (isVerifying)
- isVerifying: getCurrentShop from local, check status. 
- true => navigate to /verify
- false => continue the flow
- meta code
(
// src/types/shop.types.ts
import type { TMainType } from "./base.types";

// NESTED TYPES //

export const BusinessType = {
  INDIVIDUAL: 'INDIVIDUAL',
  COMPANY: 'COMPANY',
  ENTERPRISE: 'ENTERPRISE'
} as const;

export type TBusinessType = (typeof BusinessType)[keyof typeof BusinessType];

export const ShopStatus = {
  VERIFYING: 'VERIFYING',
  REVIEWING: 'REVIEWING',
  LIVE: 'LIVE',
  DEACTIVATED: 'DEACTIVATED',
  SUSPENDED: 'SUSPENDED',
  CLOSED: 'CLOSED',
  DELETED: 'DELETED',
} as const;

export type TShopStatus = (typeof ShopStatus)[keyof typeof ShopStatus];

// MAIN TYPES //

export type TShop = TMainType & {
  code: string;
  name: string;
  photo: string;
  status: TShopStatus;
  contactEmail: string;
  contactPhone: string;
  businessType: TBusinessType;
};

)
*/