// src/components/layout/AppContent.tsx
import { Layout } from 'antd';
import type { TChildrenComponent } from '../../types/base.types';

const { Content } = Layout;

export const AppContent = ({ children }: TChildrenComponent) => {

  return (
    <Layout style={{ padding: '24px' }}>
      <Content
        style={{
          minHeight: 280,
          background: '#f5f5f5'
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};