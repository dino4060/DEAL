// src/components/product/ProductPageHeader.tsx
import React from 'react';
import styles from '../../app/products/manage/styles.module.css';
import { bulkActionItems } from '../../app/products/manage/example';

type ProductPageHeaderProps = {
  onBulkActionToggle: () => void;
  isBulkActionDropdownOpen: boolean;
};

export const ProductPageHeader = ({ onBulkActionToggle, isBulkActionDropdownOpen }: ProductPageHeaderProps) => {
  return (
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
            onClick={onBulkActionToggle}
          >
            Hành động hàng loạt
            <svg className={styles.icon} style={{ marginLeft: '5px' }} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
          {isBulkActionDropdownOpen && (
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
  );
};