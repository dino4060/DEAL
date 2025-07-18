// src/components/product/ProductTableFooter.tsx
import { Pagination } from 'antd';
import styles from '../../app/product/manage/styles.module.css';

type PaginationData = typeof import('../../app/product/manage/example').examplePagination;

type ProductTableFooterProps = {
  pagination: PaginationData;
};

export const ProductTableFooter = ({ pagination }: ProductTableFooterProps) => {
  const { page, size, totalElements } = pagination;
  return (
    <div className={styles.footer}>
      <Pagination
        total={totalElements}
        showTotal={(total, range) => `${range[0]}-${range[1]} trên ${total} sản phẩm`}
        defaultPageSize={size}
        defaultCurrent={page}
        locale={{ items_per_page: '/ trang' }}
      />
    </div>
  );
};