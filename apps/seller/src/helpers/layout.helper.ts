import {
  CreditCardOutlined,
  HomeOutlined,
  ProductOutlined,
  RocketOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  SoundOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import React from 'react';

type MenuItemData = {
  label: string;
  icon?: any,
  path?: string;
  children?: MenuItemData[];
};

const menuItemData: (MenuItemData | '-line-')[] = [
  { label: 'Trang chủ', icon: HomeOutlined, path: '/' },
  '-line-',
  {
    label: 'Đơn hàng', icon: ShoppingCartOutlined,
    children: [
      { label: 'Quản lý đơn hàng', path: '/orders/manage' },
      { label: 'Quản lý hủy đơn hàng', path: '/orders/cancel' },
      { label: 'Quản lý đơn trả hàng', path: '/orders/returns' },
      { label: 'Cài đặt vận chuyển', path: '/orders/shipping-settings' },
    ],
  },
  '-line-',
  {
    label: 'Sản phẩm', icon: ProductOutlined,
    children: [
      { label: 'Quản lý sản phẩm', path: '/products/manage' },
      { label: 'Điểm sản phẩm', path: '/products/score' },
      { label: 'Đấu thầu', path: '/products/bidding' },
      { label: 'Cơ hội sản phẩm', path: '/products/opportunities' },
      { label: 'Chuẩn đoán giá', path: '/products/price-diagnosis' },
    ],
  },
  '-line-',
  {
    label: 'Marketing', icon: SoundOutlined,
    children: [
      { label: 'Khuyến mãi', path: '/marketing/promotions' },
      { label: 'Chiến dịch', path: '/marketing/campaigns' },
      { label: 'Trang cửa hàng', path: '/marketing/shop-page' },
      { label: 'Đăng ký ưu đãi chớp nhoáng', path: '/marketing/flash-deals' },
    ],
  },
  {
    label: 'Phát triển', icon: RocketOutlined,
    children: [
      { label: 'Mall', path: '/development/mall' },
      { label: 'Star Shop', path: '/development/star-shop' },
      { label: 'Nhiệm vụ và phần thưởng', path: '/development/tasks-rewards' },
    ],
  },
  '-line-',
  {
    label: 'Tình trạng tài khoản', icon: SolutionOutlined,
    children: [
      { label: 'Tình trạng cửa hàng', path: '/account-status/shop' },
      { label: 'Chấm điểm của hàng', path: '/account-status/shop-score' },
      { label: 'Tình trạng tài khoản DEAL', path: '/account-status/deal' },
    ],
  },
  {
    label: 'Tài chính', icon: CreditCardOutlined,
    children: [
      { label: 'Giao dịch', path: '/finance/transactions' },
      { label: 'Số tiền rút', path: '/finance/withdrawals' },
      { label: 'Hóa đơn', path: '/finance/invoices' },
    ],
  },
];

export const getMenuItems = (): MenuProps['items'] => {
  return menuItemData.map((item, index) => {
    const level1Key = String(index + 1);

    if (item === '-line-')
      return {
        key: level1Key,
        type: 'divider'
      };


    if (!item.children)
      return {
        key: level1Key,
        icon: React.createElement(item.icon),
        label: item.label,
      };

    return {
      key: level1Key,
      icon: React.createElement(item.icon),
      label: item.label,
      children: item.children.map((child, childIndex) => {
        const level2Key = `${level1Key}.${String(childIndex + 1)}`;
        return {
          key: level2Key,
          label: child.label,
        };
      }),
    };
  });
};
