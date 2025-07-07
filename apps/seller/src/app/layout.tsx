// src/app/layout.tsx
import { Layout } from 'antd';
import { Outlet } from 'react-router';
import { AppContent } from '../components/layout/AppContent';
import { AppHeader } from '../components/layout/AppHeader';
import { AppSider } from '../components/layout/AppSider';
import { AppFooter } from '../components/layout/AppFooter';

export const AppLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent>
          <Outlet />
        </AppContent>
      </Layout>
      <AppFooter />
    </Layout>
  );
};