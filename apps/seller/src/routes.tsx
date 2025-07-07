// src/routes.ts
import { AppLayout } from './app/layout';
import { About } from './app/about/page';
import { Login } from './app/auth/login';
import { Register } from './app/auth/register';
import { Dashboard } from './app/dashboard/page';
import { HomePage } from './app/page';
import { Settings } from './app/settings/page';
import { DashboardLayout } from './app/dashboard/layout';
import { AppProtection } from './protection';

export const routes = [
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <About /> },
      {
        path: 'auth',
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
      {
        element: <AppProtection />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardLayout />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: 'settings', element: <Settings /> },
            ],
          },
        ]
      }

    ],
  },
  // { path: '*', element: <NotFoundPage /> },
];