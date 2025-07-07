// src/components/layout/AppContent.tsx
import { Breadcrumb, Layout, theme } from 'antd';
import type { TChildrenComponent } from '../../types/base.types';

const { Content } = Layout;

export const AppContent = ({ children }: TChildrenComponent) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb
        items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        style={{ margin: '16px 0' }}
      />
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};