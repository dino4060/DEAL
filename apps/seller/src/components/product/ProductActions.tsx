// src/components/product/ProductActions.tsx
import React from 'react';
import styles from '../../app/products/manage/styles.module.css';

type ProductActionsProps = {
  selectedCount: number;
  hasSelected: boolean;
};

export const ProductActions = ({ selectedCount, hasSelected }: ProductActionsProps) => {
  return (
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
      <div className={styles.selectedActions}>
        <span>Đã chọn: {selectedCount}</span>
        <button className={styles.button} disabled={!hasSelected}>Kích hoạt</button>
        <button className={styles.button} disabled={!hasSelected}>Hủy kích hoạt</button>
        <button className={styles.button} disabled={!hasSelected}>Xóa</button>
        <button className={styles.button} disabled={!hasSelected}>Đặt hoa hồng liên kết</button>
        <button className={styles.button} disabled={!hasSelected}>Đặt giảm giá</button>
        <button className={styles.button} disabled={!hasSelected}>Đặt cảnh báo</button>
      </div>
    </div>
  );
};