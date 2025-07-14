// src/app/products/manage/example.ts

export const exampleProducts = [
  {
    key: '1',
    id: '1729597742115949370',
    name: 'Bút bi dùng cho học sinh, viết chữ rất đẹp',
    thumb: 'https://placehold.co/60x60/A0A0A0/FFFFFF?text=Product',
    skus: [
      { id: 'sku1', code: '4001', tierOptionValue: 'Màu xanh', retailPrice: 2000, inventory: { stocks: 100, sales: 50, total: 150 }, status: 'LIVE' },
      { id: 'sku2', code: '4002', tierOptionValue: 'Màu đỏ', retailPrice: 2500, inventory: { stocks: 80, sales: 20, total: 100 }, status: 'DEACTIVATED' },
    ],
    retailPriceRange: '2.000đ - 5.000đ',
    updatedAt: '14/03/2023 10:08',
    status: 'DEACTIVATED',
  },
  {
    key: '2',
    id: '1729597583576304442',
    name: 'Bút bi dùng cho học sinh, viết chữ rất đẹp',
    thumb: 'https://placehold.co/60x60/A0A0A0/FFFFFF?text=Product',
    skus: [
      { id: 'sku3', code: '4003', tierOptionValue: 'Màu đen', retailPrice: 3000, inventory: { stocks: 120, sales: 60, total: 180 }, status: 'LIVE' },
    ],
    retailPriceRange: '3.000đ',
    updatedAt: '14/03/2023 09:51',
    status: 'LIVE',
  },
];

export const examplePagination = {
  totalElements: 100,
  totalPages: 10,
  page: 1,
  size: 10,
};

export const bulkActionItems = [
  { key: 'activate', label: 'Kích hoạt' },
  { key: 'deactivate', label: 'Hủy kích hoạt' },
  { key: 'delete', label: 'Xóa' },
  { key: 'commission', label: 'Đặt hoa hồng liên kết' },
  { key: 'discount', label: 'Đặt giảm giá' },
  { key: 'alert', label: 'Đặt cảnh báo' },
];