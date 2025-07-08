import { CopyOutlined, DownOutlined as DownIcon } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import { Badge, Button, Dropdown, message, Space, Table, Tag, Tooltip } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import React, { useState } from 'react';
import { TPage } from '../../types/backend.type';

export type TProduct = {
    id: string;
    status: string;
    name: string;
    thumb: string;
    retailPrice: number;
    updatedAt: Date;
    metric: {
        stocks: number;
        sales: number;
    };
    skus: TSku[];
}

export type TSku = {
    status: string;
    skuCode: string;
    tierName: string;
    retailPrice: number;
    inventory: {
        stocks: number;
        sales: number;
    }
}

type TProps = {
    loading: boolean;
    data: TPage<TProduct> | undefined;
}

// const columns: TableProps<DataType>['columns'] = [
const columns: TableProps<TProduct>['columns'] = [
    Table.SELECTION_COLUMN,
    {
        title: 'Product', key: 'product',
        render: (_, { id, name }) => (
            <div>
                {/* Hàng trên là name của sản phẩm */}
                {renderProductName(name)}

                {/* Hàng dưới là id của sản phẩm với icon copy */}
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center' }}>
                    <strong>SPU:</strong>
                    <span style={{ marginLeft: 4, marginRight: 8 }}>{renderProductName(id, 14)}</span>
                    <Tooltip title="Copy ID">
                        <Button
                            icon={<CopyOutlined />}
                            size="small"
                            onClick={() => handleCopy(id)}
                        />
                    </Tooltip>
                </div>
            </div>
        ),
    },
    Table.EXPAND_COLUMN,
    {
        title: 'SKUs', key: 'skus',
        render: (_, { skus }) => {
            return skus.length;
        },
    },
    {
        title: 'Stocks', key: 'stocks',
        render: (_, { metric }) => {
            return metric.stocks;
        },
    },
    { title: 'Retail Price', dataIndex: 'retailPrice', key: 'Retail Price', },
    {
        title: 'Sales', key: 'sales',
        render: (_, { metric }) => {
            return metric.sales;
        },
    },
    {
        title: 'Updated On', key: 'updatedOn',
        render: (_, { updatedAt }) => {
            // Ensure updatedAt is a valid date
            const date = new Date(updatedAt);

            // Get date (yyyy-mm-dd format)
            const dateOnly = date.toISOString().split('T')[0];

            // Get time (hh:mm:ss format)
            const timeOnly = date.toTimeString().split(' ')[0];

            return (
                <>
                    <div>{dateOnly}</div>
                    <div>{timeOnly}</div>
                </>
            );
        }
    },
    {
        title: 'Status', key: 'status',
        render: (_, { status }) => {
            let color = 'green';
            //Product Status: DRAFT, REVIEWING, LIVE, DEACTIVATED, SUSPENDED, DELETED
            switch (status) {
                case 'DRAFT':
                    color = 'geekblue';
                    break;
                case 'REVIEWING':
                    color = 'gold';
                    break;
                case 'LIVE':
                    color = 'green';
                    break;
                case 'DEACTIVATED':
                    color = 'geekblue';
                    break;
                case 'SUSPENDED':
                    color = 'volcano';
                    break;
                case 'DELETED':
                    color = 'volcano';
                    break;
            }
            return (
                <Tag color={color} key={status}>
                    {status.toUpperCase()}
                </Tag>
            );
        }
    },
    {
        title: '',
        key: 'action',
        render: () => (
            //_, record
            <Space size="middle" direction='vertical'>
                <a>Edit</a>
                <a>Deactivate</a>
                <Dropdown menu={{ items }}>
                    <a> <DownIcon /> </a>
                </Dropdown>
            </Space>
        ),
    },
];


// Hàm xử lý sao chép ID vào clipboard
const handleCopy = (id: string) => {
    // Sử dụng Clipboard API để sao chép vào clipboard
    navigator.clipboard.writeText(id).then(() => {
        // Thông báo thành công
        message.success('Copied to clipboard');
    }).catch(() => {
        // Thông báo lỗi nếu không sao chép được
        message.error('Copy Failed');
    });
};


// Hàm để cắt tên sản phẩm và thêm dấu ba chấm nếu quá dài
const renderProductName = (text: string, maxLength = 20) => {
    // const maxLength = 20; // Số ký tự tối đa

    // Nếu văn bản dài hơn maxLength, cắt bớt và thêm dấu "..."
    const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

    return (
        <div
            style={{
                whiteSpace: 'nowrap',  // Ngăn không cho văn bản xuống dòng
                overflow: 'hidden',    // Ẩn phần văn bản bị cắt
                textOverflow: 'ellipsis',  // Thêm dấu "..." nếu văn bản bị cắt
            }}
        >
            {truncatedText}
        </div>
    );
};


const items = [
    { key: '1', label: 'Action 1' },
    { key: '2', label: 'Action 2' },
];

const expandColumns: TableColumnsType<TSku> = [
    {
        title: 'Stock-Keeping Unit', key: 'sku',
        render: (_, { skuCode, tierName }) => (
            <div>
                {/* Hàng trên là name của sản phẩm */}
                {renderProductName(tierName)}

                {/* Hàng dưới là id của sản phẩm với icon copy */}
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center' }}>
                    <strong>SKU:</strong>
                    <span style={{ marginLeft: 4, marginRight: 8 }}>{renderProductName(skuCode, 14)}</span>
                    <Tooltip title="Copy ID">
                        <Button
                            icon={<CopyOutlined />}
                            size="small"
                            onClick={() => handleCopy(skuCode)}
                        />
                    </Tooltip>
                </div>
            </div>
        ),
    },
    {
        title: 'Stocks', key: 'stocks',
        render: (_, { inventory }) => {
            return inventory.stocks;
        },
    },
    { title: 'Retail Price', dataIndex: 'retailPrice', key: 'retailPrice' },
    {
        title: 'Sales', key: 'sales',
        render: (_, { inventory }) => {
            return inventory.sales;
        },
    },
    {
        title: 'Status', key: 'status',
        render: (_, { status }) => {
            let color = 'green';
            //SKU Status: LIVE, DEACTIVATED, DELETED
            switch (color) {
                case 'LIVE':
                    color = 'green';
                    break;
                case 'DEACTIVATED':
                    color = 'geekblue';
                    break;
                case 'DELETED':
                    color = 'volcano';
                    break;
            }
            return (
                <Badge color={color} text={status} />
            );
        },
    },
    {
        title: '',
        key: 'actionV2',
        render: () => (
            <Space size="middle">
                <a>Edit</a>
                <a>Deactivate</a>
            </Space>
        ),
    },
];

const expandedRowRender = (record: TProduct) => {
    const expandSource = record?.skus ?? [];
    return (
        <Table
            //<ExpandedDataType>
            columns={expandColumns}
            dataSource={expandSource}
            rowKey="skuCode"
            pagination={false}
        />
    );
}

const ProductList = (props: TProps) => {
    const { loading, data } = props;
    const dataSource = data?.content ?? [];
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<TProduct> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <>
            <Table
                //<DataType>
                columns={columns}
                dataSource={dataSource}
                rowKey="id"
                rowSelection={rowSelection}
                expandable={{ expandedRowRender }}
                loading={loading}
                pagination={{
                    current: data?.page,
                    pageSize: data?.size,
                    total: data?.totalElements,
                    // onChange: handlePageChange,
                }}
            />
        </>
    );
};

export default ProductList;