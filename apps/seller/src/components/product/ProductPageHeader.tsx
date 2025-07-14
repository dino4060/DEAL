// src/components/product/ProductPageHeader.tsx
import styles from '../../app/products/manage/styles.module.css';
import { QuestionCircleOutlined } from '@ant-design/icons';

type ProductPageHeaderProps = {
};

export const ProductPageHeader = ({ }: ProductPageHeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.pageTitle}>Quản lý sản phẩm</h1>

        <a href="#" className={styles.helpLink}>
          <QuestionCircleOutlined />
          Hướng dẫn & Trợ giúp
        </a>
      </div>

      <div className={styles.headerRight}>
        <button className={`${styles.button} ${styles.buttonPrimary}`}>Thêm sản phẩm mới</button>
      </div>
    </div>
  );
};