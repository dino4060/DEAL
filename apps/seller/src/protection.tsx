// src/protection.tsx
import { Navigate, Outlet } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import { ACCESS_TOKEN } from './lib/constants';

export const AppProtection = () => {
  const isAuthenticated = Boolean(localStorage.getItem(ACCESS_TOKEN));
  console.log('>>> AppProtection: isAuthenticated: ', isAuthenticated);

  if (!isAuthenticated) return <Navigate to='/' />;

  return <Fragment><Outlet /></Fragment>;
};