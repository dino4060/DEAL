// src/components/product/ProductTable.tsx
import React from 'react';
import styles from '../../app/products/manage/styles.module.css';

type Product = typeof import('../../app/products/manage/example').exampleProducts[0];
type Sku = typeof import('../../app/products/manage/example').exampleProducts[0]['skus'][0];

type ProductTableProps = {
  products: Product[];
  loading: boolean;
  selectedRowKeys: React.Key[];
  onSelectChange: (key: React.Key, checked: boolean) => void;
  onSelectAllChange: (checked: boolean) => void;
  expandedRows: React.Key[];
  toggleExpand: (key: React.Key) => void;
};

export const ProductTable = ({
  products,
  loading,
  selectedRowKeys,
  onSelectChange,
  onSelectAllChange,
  expandedRows,
  toggleExpand,
}: ProductTableProps) => {

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

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th style={{ width: '30px' }}>
            <input type="checkbox" onChange={(e) => onSelectAllChange(e.target.checked)} checked={selectedRowKeys.length === products.length && products.length > 0} />
          </th>
          <th>Sản phẩm</th>
          <th style={{ width: '10%' }}>Số lượng</th>
          <th style={{ width: '15%' }}>Giá bán lẻ</th>
          <th style={{ width: '10%' }}>Doanh số</th> {/* Đã thêm lại cột Doanh số */}
          <th style={{ width: '15%' }}>Cập nhật</th>
          <th style={{ width: '10%' }}>Trạng thái</th>
          <th style={{ width: '10%' }}>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          Array(5).fill(0).map((_, i) => renderSkeletonRow(i))
        ) : (
          products.map((product) => (
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
                  {product.skus.length}
                </td>
                <td>
                  {product.retailPriceRange}
                </td>
                <td>{product.skus.reduce((sum, sku) => sum + sku.inventory.sales, 0)}</td> {/* Dữ liệu cột Doanh số */}
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
  );
};