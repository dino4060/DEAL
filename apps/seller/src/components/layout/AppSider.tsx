// src/components/layout/AppSider.tsx
import { Layout, Menu, theme } from 'antd';
import { getMenuItems } from '../../helpers/layout.helper';

const { Sider } = Layout;

export const AppSider = () => {
  const { token: { colorBgContainer } } = theme.useToken();

  const menuItems = getMenuItems();

  return (
    <Sider
      width={250}
      style={{ background: colorBgContainer }}
      breakpoint="lg"
      collapsedWidth="0"
    // onBreakpoint={(broken) => console.log('>>> AppSider: onBreakpoint', broken)}
    // onCollapse={(collapsed, type) => console.log('>>> AppSider: onCollapse', collapsed, type)}
    >
      <Menu
        mode="inline"
        defaultOpenKeys={['1']}
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0, padding: '15px 5px' }}
        items={menuItems}
      />
    </Sider>
  );
};
