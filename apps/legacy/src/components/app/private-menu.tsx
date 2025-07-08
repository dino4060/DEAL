import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { useNavigate } from "react-router";
import { HomeFilled as IconHome, SnippetsFilled as IconOrder, ProductFilled as IconProduct } from '@ant-design/icons';
import './style.scss';

const items: MenuProps['items'] = [
    {
        key: '/homepage',
        icon: <IconHome />,
        label: 'Homepage',
    },
    {
        key: '/order',
        icon: <IconOrder />,
        label: 'Orders',
        children: [
            {
                key: '/order/manage',
                label: 'Manage orders',
            },
            {
                key: '/order/cancellation',
                label: 'Manage cancellations',
            }
        ],
    },
    {
        key: '/product',
        icon: <IconProduct />,
        label: 'Products',
        children: [
            {
                key: '/product/manage',
                label: 'Manage products',
            },
            {
                key: '/product/rating',
                label: 'Product ratings',
            }
        ],
    },
];

const PrivateMenu = () => {
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const navigate = useNavigate();

    const onOpenChange = (keys: string[]) => {
        //keys: [old key, new key]
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    };

    const onSelect = (info: any) => {
        //keyPath: [selectedKey, openKey]
        const { keyPath: [selectedKey, openKey] } = info;
        const openKeys = openKey === undefined ? [] : [openKey];
        setOpenKeys(openKeys);
        navigate(selectedKey);
    };


    return (
        <Sider>
            <Menu
                mode="inline"
                defaultSelectedKeys={['/homepage']}
                defaultOpenKeys={['/homepage']}
                items={items}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                onSelect={onSelect}
            />
        </Sider>
    );
};

export default PrivateMenu;