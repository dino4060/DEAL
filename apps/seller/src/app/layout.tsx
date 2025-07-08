// src/app/layout.tsx
import { Layout } from 'antd';
import { AppContent } from '../components/layout/AppContent';
import { AppFooter } from '../components/layout/AppFooter';
import { AppHeader } from '../components/layout/AppHeader';
import { AppSider } from '../components/layout/AppSider';
import './global.css';
import type { TChildrenComponent } from '../types/base.types';

export const AppLayout = ({ children }: TChildrenComponent) => {
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