// src/components/product/ProductTableFooter.tsx
import React from 'react';
import styles from '../../app/product/manage/styles.module.css';

type PaginationData = typeof import('../../app/product/manage/example').examplePagination;

type ProductTableFooterProps = {
  pagination: PaginationData;
};

export const ProductTableFooter = ({ pagination }: ProductTableFooterProps) => {
  return (
    <div className={styles.footer}>
      <span className={styles.paginationText}>
        {pagination.page * pagination.size - pagination.size + 1}-
        {Math.min(pagination.page * pagination.size, pagination.totalElements)} của {pagination.totalElements} mục
      </span>
      <button className={styles.paginationButton}>{'<'}</button>
      {Array.from({ length: pagination.totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`${styles.paginationButton} ${pagination.page === i + 1 ? styles.paginationButtonActive : ''}`}
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
  );
};