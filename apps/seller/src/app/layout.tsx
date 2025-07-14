// src/app/layout.tsx
import { Layout } from 'antd';
import { AppContent } from '../components/layout/AppContent';
import { AppFooter } from '../components/layout/AppFooter';
import { AppHeader } from '../components/layout/AppHeader';
import { AppSider } from '../components/layout/AppSider';
import './global.css';
import type { TChildrenComponent } from '../types/base.types';
import { useEffect } from 'react';
import { fetchSafely } from '../lib/http';
import { api } from '../lib/api';

export const AppLayout = ({ children }: TChildrenComponent) => {
  useEffect(() => {
    fetchSafely(api.auth.getCurrentShop());
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent>
          {children}
        </AppContent>
      </Layout>
      <AppFooter />
    </Layout>
  );
};