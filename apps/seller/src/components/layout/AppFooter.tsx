// src/components/layout/AppFooter.tsx
import { Layout } from 'antd';

const { Footer } = Layout;

export const AppFooter = () => {
  return (
    <Footer style={{ textAlign: 'center', color: 'white', background: 'black' }}>
      DEAL ©{new Date().getFullYear()} Created by Dino4060
    </Footer>
  )
}