// src/app/products/manage/page.tsx
import React, { useState } from 'react';
import styles from './styles.module.css';

// Dữ liệu ví dụ cho bảng
const exampleProducts = [
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

const examplePagination = {
  totalElements: 100,
  totalPages: 10,
  page: 1,
  size: 10,
};

const bulkActionItems = [
  { key: 'activate', label: 'Kích hoạt' },
  { key: 'deactivate', label: 'Hủy kích hoạt' },
  { key: 'delete', label: 'Xóa' },
  { key: 'commission', label: 'Đặt hoa hồng liên kết' },
  { key: 'discount', label: 'Đặt giảm giá' },
  { key: 'alert', label: 'Đặt cảnh báo' },
];

export const ManageProductsPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [bulkActionDropdownOpen, setBulkActionDropdownOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<React.Key[]>([]);

  const onSelectChange = (key: React.Key, checked: boolean) => {
    if (checked) {
      setSelectedRowKeys((prev) => [...prev, key]);
    } else {
      setSelectedRowKeys((prev) => prev.filter((k) => k !== key));
    }
  };

  const onSelectAllChange = (checked: boolean) => {
    if (checked) {
      setSelectedRowKeys(exampleProducts.map((p) => p.key));
    } else {
      setSelectedRowKeys([]);
    }
  };

  const toggleExpand = (key: React.Key) => {
    setExpandedRows((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const renderSkeletonRow = (key: number) => (
    <tr key={key}>
      <td>
        <div className={styles.skeletonRow}>
          <div className={styles.skeletonCell} style={{ width: '20px', height: '20px' }}></div>
          <div className={styles.skeletonProductInfo}>
            <div className={styles.skeletonAvatar}></div>
            <div className={styles.skeletonProductInfoText}>
              <div className={styles.skeletonText} style={{ width: '80%' }}></div>
              <div className={styles.skeletonText} style={{ width: '50%' }}></div>
            </div>
          </div>
          <div className={styles.skeletonText} style={{ width: '80%' }}></div>
          <div className={styles.skeletonText} style={{ width: '60%' }}></div>
          <div className={styles.skeletonText} style={{ width: '40%' }}></div>
          <div className={styles.skeletonText} style={{ width: '70%' }}></div>
          <div className={styles.skeletonText} style={{ width: '50%' }}></div>
          <div className={styles.skeletonText} style={{ width: '70%' }}></div>
          <div className={styles.skeletonText} style={{ width: '60%' }}></div>
        </div>
      </td>
    </tr>
  );

  const hasSelected = selectedRowKeys.length > 0; // Biến kiểm tra có lựa chọn hay không

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>Quản lý sản phẩm</h1>
          <a href="#" className={styles.helpLink}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.44 13.3 13 14 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.7-.93 2.35z" />
            </svg>
            Hướng dẫn & Trợ giúp
          </a>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.button}>Gói sản phẩm</button>
          <div className={styles.dropdownContainer}>
            <button
              className={styles.button}
              onClick={() => setBulkActionDropdownOpen(!bulkActionDropdownOpen)}
            >
              Hành động hàng loạt
              <svg className={styles.icon} style={{ marginLeft: '5px' }} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
            {bulkActionDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                {bulkActionItems.map((item) => (
                  <li key={item.key} className={styles.dropdownMenuItem}>
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className={`${styles.button} ${styles.buttonPrimary}`}>Thêm sản phẩm mới</button>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <div className={styles.statusFilters}>
          <button className={`${styles.statusButton} ${styles.statusButtonActive}`}>Tất cả 0</button>
          <button className={styles.statusButton}>Đang hoạt động 0</button>
          <button className={styles.statusButton}>Bị hủy kích hoạt 0</button>
          <button className={styles.statusButton}>Đang xem xét 1</button>
          <button className={styles.statusButton}>Bị đình chỉ 0</button>
          <button className={styles.statusButton}>Bản nháp</button>
          <button className={styles.statusButton}>Đã xóa</button>
        </div>
        <div className={styles.filterRow}>
          <div className={styles.inputWithIcon}>
            <svg className={styles.inputPrefixIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <input type="text" className={styles.searchInput} placeholder="Tìm kiếm theo tên sản phẩm, ID hoặc SKU của người bán" />
          </div>
          <select className={styles.select} defaultValue="price">
            <option value="price">Giá</option>
            <option value="name">Tên</option>
          </select>
          <select className={styles.select} defaultValue="category">
            <option value="category">Danh mục</option>
          </select>
          <button className={styles.button}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
            </svg>
            Lọc
          </button>
          <button className={styles.button}>Đặt lại</button>
        </div>
        {/* Phần hành động hàng loạt luôn được render */}
        <div className={styles.selectedActions}>
          <span>Đã chọn: {selectedRowKeys.length}</span>
          <button className={styles.button} disabled={!hasSelected}>Kích hoạt</button>
          <button className={styles.button} disabled={!hasSelected}>Hủy kích hoạt</button>
          <button className={styles.button} disabled={!hasSelected}>Xóa</button>
          <button className={styles.button} disabled={!hasSelected}>Đặt hoa hồng liên kết</button>
          <button className={styles.button} disabled={!hasSelected}>Đặt giảm giá</button>
          <button className={styles.button} disabled={!hasSelected}>Đặt cảnh báo</button>
        </div>
      </div>

      {/* Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: '30px' }}>
              <input type="checkbox" onChange={(e) => onSelectAllChange(e.target.checked)} checked={selectedRowKeys.length === exampleProducts.length && exampleProducts.length > 0} />
            </th>
            <th>Sản phẩm</th>
            <th style={{ width: '10%' }}>Số lượng</th>
            <th style={{ width: '15%' }}>Giá bán lẻ</th>
            <th style={{ width: '10%' }}>Doanh số</th>
            <th style={{ width: '15%' }}>Cập nhật</th>
            <th style={{ width: '10%' }}>Trạng thái</th>
            <th style={{ width: '10%' }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array(5).fill(0).map((_, i) => renderSkeletonRow(i))
          ) : (
            exampleProducts.map((product) => (
              <React.Fragment key={product.key}>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRowKeys.includes(product.key)}
                      onChange={(e) => onSelectChange(product.key, e.target.checked)}
                    />
                  </td>
                  <td>
                    <div className={styles.tableRowProductInfo}>
                      <img src={product.thumb} alt={product.name} className={styles.productThumb} />
                      <div>
                        <div className={styles.productName}>{product.name}</div>
                        <div className={styles.productId}>ID:{product.id}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    {product.skus.length > 1 ? (
                      <span>{product.skus.reduce((sum, sku) => sum + sku.inventory.stocks, 0)}</span>
                    ) : (
                      <span>{product.skus[0]?.inventory.stocks || 0}</span>
                    )}
                  </td>
                  <td>{product.retailPriceRange}</td>
                  <td>{product.skus.reduce((sum, sku) => sum + sku.inventory.sales, 0)}</td>
                  <td>{product.updatedAt}</td>
                  <td>
                    <span className={`${styles.statusTag} ${product.status === 'LIVE' ? styles.statusTagLive : styles.statusTagDeactivated}`}>
                      {product.status === 'LIVE' ? 'Đang hoạt động' : 'Bị hủy kích hoạt'}
                    </span>
                  </td>
                  <td>
                    <a href="#" className={styles.actionLink}>
                      {product.status === 'DEACTIVATED' ? 'Kích hoạt' : 'Hủy kích hoạt'}
                    </a>
                    <a href="#" className={`${styles.actionLink} ${styles.actionLinkSecondary}`}>Chỉnh sửa</a>
                    <a href="#" className={`${styles.actionLink} ${styles.actionLinkDanger}`}>
                      <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </a>
                  </td>
                </tr>
                {product.skus.length > 1 && (
                  <tr>
                    <td colSpan={9} style={{ padding: 0 }}>
                      <div className={styles.expandedRowFooter}>
                        <span>Tổng {product.skus.length} SKU</span>
                        <button className={styles.expandButton} onClick={() => toggleExpand(product.key)}>
                          {expandedRows.includes(product.key) ? (
                            <>
                              Thu gọn
                              <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                              </svg>
                            </>
                          ) : (
                            <>
                              Mở rộng
                              <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                      {expandedRows.includes(product.key) && (
                        <table className={styles.expandedTable}>
                          <thead>
                            <tr>
                              <th style={{ width: '25%' }}>SKU</th>
                              <th style={{ width: '10%' }}>Số lượng</th>
                              <th style={{ width: '15%' }}>Giá bán lẻ</th>
                              <th style={{ width: '10%' }}>Doanh số</th>
                              <th style={{ width: '10%' }}>Trạng thái</th>
                              <th style={{ width: '10%' }}>Hành động</th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.skus.map((sku) => (
                              <tr key={sku.id}>
                                <td>
                                  <span>{sku.code}</span>
                                  <span style={{ marginLeft: '5px', color: 'rgba(0,0,0,0.45)' }}>{sku.tierOptionValue}</span>
                                </td>
                                <td>{sku.inventory.stocks}</td>
                                <td>{sku.retailPrice}</td>
                                <td>{sku.inventory.sales}</td>
                                <td>
                                  <span className={`${styles.statusTag} ${sku.status === 'LIVE' ? styles.statusTagLive : styles.statusTagDeactivated}`}>
                                    {sku.status === 'LIVE' ? 'Đang hoạt động' : 'Bị hủy kích hoạt'}
                                  </span>
                                </td>
                                <td>
                                  <a href="#" className={styles.actionLink}>
                                    {sku.status === 'DEACTIVATED' ? 'Kích hoạt' : 'Hủy kích hoạt'}
                                  </a>
                                  <a href="#" className={`${styles.actionLink} ${styles.actionLinkSecondary}`}>Chỉnh sửa</a>
                                  <a href="#" className={`${styles.actionLink} ${styles.actionLinkDanger}`}>
                                    <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                    </svg>
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>

      {/* Footer */}
      <div className={styles.footer}>
        <span className={styles.paginationText}>
          {examplePagination.page * examplePagination.size - examplePagination.size + 1}-
          {Math.min(examplePagination.page * examplePagination.size, examplePagination.totalElements)} của {examplePagination.totalElements} mục
        </span>
        <button className={styles.paginationButton}>{'<'}</button>
        {Array.from({ length: examplePagination.totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`${styles.paginationButton} ${examplePagination.page === i + 1 ? styles.paginationButtonActive : ''}`}
          >
            {i + 1}
          </button>
        ))}
        <button className={styles.paginationButton}>{'>'}</button>
        <select className={styles.select} defaultValue="50" style={{ marginLeft: '10px' }}>
          <option value="10">10 mục mỗi trang</option>
          <option value="20">20 mục mỗi trang</option>
          <option value="50">50 mục mỗi trang</option>
        </select>
      </div>
    </div>
  );
};
