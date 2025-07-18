// src/components/product/ProductTable.tsx
import React, { Fragment } from 'react';
import styles from '../../app/product/manage/styles.module.css';

type Product = typeof import('../../app/product/manage/example').exampleProducts[0];
// type Sku = typeof import('../../app/products/manage/example').exampleProducts[0]['skus'][0];

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
    <tr key={key} className={styles.skeletonTableRow}>
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
          <div className={styles.skeletonText} style={{ width: '70%' }}></div>
          <div className={styles.skeletonText} style={{ width: '50%' }}></div>
          <div className={styles.skeletonText} style={{ width: '40%' }}></div>
          <div className={styles.skeletonText} style={{ width: '70%' }}></div>
          <div className={styles.skeletonText} style={{ width: '60%' }}></div>
        </div>
      </td>
    </tr>
  );

  return (
    <section className={styles.tables}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.space}>
            <th style={{ width: '10px' }} className={styles.checkbox} >
              <input
                type="checkbox"
                onChange={(e) => onSelectAllChange(e.target.checked)}
                checked={selectedRowKeys.length === products.length && products.length > 0}
              />
            </th>
            <th style={{ width: '30%' }}>Sản phẩm</th>
            <th style={{ width: '10%' }}>Số lượng</th>
            <th style={{ width: '15%' }}>Giá bán lẻ</th>
            <th style={{ width: '10%' }}>Doanh số</th>
            <th style={{ width: '11%' }}>Cập nhật</th>
            <th style={{ width: '12%' }}>Trạng thái</th>
            <th style={{ width: '12%' }}>Hành động</th>
          </tr>
        </thead>
      </table>

      {loading ? (
        Array(5).fill(0).map((_, i) => renderSkeletonRow(i))
      ) : (
        products.map((product) => (
          <table className={styles.table} key={product.key}>
            <tbody>
              {/* Main row */}
              <tr>
                <td style={{ width: '10px' }} className={styles.checkbox} rowSpan={3}>
                  <input
                    type="checkbox"
                    checked={selectedRowKeys.includes(product.key)}
                    onChange={(e) => onSelectChange(product.key, e.target.checked)}
                  />
                </td>
                <td style={{ width: '30%' }}>
                  <div className={styles.tableProductCell}>
                    <img src={product.thumb} alt={product.name} className={styles.productThumb} />
                    <div className={styles.tableProductText}>
                      <div className={styles.productName}>{product.name}</div>
                      <div className={styles.productId}>ID:{product.id}</div>
                    </div>
                  </div>
                </td>
                <td style={{ width: '10%' }}>{product.skus.length}</td>
                <td style={{ width: '15%' }}>{product.retailPriceRange}</td>
                <td style={{ width: '10%' }}>{product.skus.reduce((sum, sku) => sum + sku.inventory.sales, 0)}</td> {/* Dữ liệu cột Doanh số */}
                <td style={{ width: '11%' }}>{product.updatedAt}</td>
                <td style={{ width: '12%' }}>
                  <span className={`${styles.statusTag} ${product.status === 'LIVE' ? styles.statusTagLive : styles.statusTagDeactivated}`}>
                    {product.status === 'LIVE' ? 'Hoạt động' : 'Hủy kích hoạt'}
                  </span>
                </td>
                <td style={{ width: '12%' }}>
                  <a href="#" className={styles.actionLink}>
                    {product.status === 'DEACTIVATED' ? 'Kích hoạt' : 'Hủy kích hoạt'}
                  </a>
                  <a href="#" className={styles.actionLink}>Chỉnh sửa</a>
                  <a href="#" className={`${styles.actionLink} ${styles.actionLinkDanger}`}>Xóa</a>
                </td>
              </tr>

              {/* Division & Side row */}
              {product.skus.length > 1 &&
                <Fragment>

                  <tr>
                    <td colSpan={7} style={{ padding: 0 }}>
                      <div className={styles.tableDivision} />
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={7} style={{ padding: 0 }}>
                      {/* Meta row */}
                      <div className={styles.expandedRowFooter}>
                        <span>Có {product.skus.length} SKU</span>

                        <button className={styles.expandButton}
                          onClick={() => toggleExpand(product.key)}
                          disabled={product.skus.length === 1}
                          style={
                            product.skus.length === 1
                              ? { cursor: 'not-allowed', color: 'rgba(0, 0, 0, 0.3)' }
                              : {}
                          }
                        >
                          {expandedRows.includes(product.key) ? (
                            <Fragment>
                              Thu gọn
                              <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                              </svg>
                            </Fragment>
                          ) : (
                            <Fragment>
                              Mở rộng
                              <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                              </svg>
                            </Fragment>
                          )}
                        </button>
                      </div>

                      {expandedRows.includes(product.key) && (
                          <table className={styles.expandedTable}>
                            <thead>
                              <tr>
                                <th style={{ width: '30%' }}>SKU</th>
                                <th style={{ width: '10%' }}>Số lượng</th>
                                <th style={{ width: '15%' }}>Giá bán lẻ</th>
                                <th style={{ width: '10%' }}>Doanh số</th>
                                <th style={{ width: '11%' }}></th>
                                <th style={{ width: '12%' }}>Trạng thái</th>
                                <th style={{ width: '12%' }}></th>
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
                                  <td></td>
                                  <td>
                                    <span className={`${styles.statusTag} ${sku.status === 'LIVE' ? styles.statusTagLive : styles.statusTagDeactivated}`}>
                                      {sku.status === 'LIVE' ? 'Hoạt động' : 'Hủy kích hoạt'}
                                    </span>
                                  </td>
                                  <td></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                      )}
                    </td>
                  </tr>
                </Fragment>
              }
            </tbody>
          </table>
        ))
      )}
    </section>
  );
};