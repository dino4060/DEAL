// src/app/products/manage/page.tsx
import React, { useState } from 'react';
import styles from './styles.module.css';
import { exampleProducts, examplePagination, bulkActionItems } from './example';
import { ProductPageHeader } from '../../../components/product/ProductPageHeader';
import { ProductActions } from '../../../components/product/ProductActions';
import { ProductTable } from '../../../components/product/ProductTable';
import { ProductTableFooter } from '../../../components/product/ProductTableFooter';

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

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className={styles.pageContainer}>
      <ProductPageHeader
        onBulkActionToggle={() => setBulkActionDropdownOpen(!bulkActionDropdownOpen)}
        isBulkActionDropdownOpen={bulkActionDropdownOpen}
      />

      <ProductActions
        selectedCount={selectedRowKeys.length}
        hasSelected={hasSelected}
      />

      <ProductTable
        products={exampleProducts}
        loading={loading}
        selectedRowKeys={selectedRowKeys}
        onSelectChange={onSelectChange}
        onSelectAllChange={onSelectAllChange}
        expandedRows={expandedRows}
        toggleExpand={toggleExpand}
      />

      <ProductTableFooter
        pagination={examplePagination}
      />
    </div>
  );
};