// src/routes.ts
import { Outlet } from 'react-router';
import { AboutPage } from './app/about/page';
import { LoginPage } from './app/auth/login/page';
import { SignupPage } from './app/auth/signup/page';
import { DashboardPage } from './app/dashboard/page';
import { HomePage } from './app/home/page';
import { SettingPage } from './app/settings/page';
import { VerifyPage } from './app/verify/page';
import { AppLayout } from './app/layout';
import { AppProvider } from './app/provider';
import { AppProtection } from './app/protection';

export const routes = [
  {
    element: <AppProvider><Outlet /></AppProvider>,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'verify', element: <VerifyPage /> },
      {
        element: <AppProtection><AppLayout><Outlet /></AppLayout></AppProtection>,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'about', element: <AboutPage /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'settings', element: <SettingPage /> }
        ],
      },
    ]
  }
  // { path: '*', element: <NotFoundPage /> },
];