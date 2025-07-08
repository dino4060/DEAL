import { Flex, message, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import ProductList, { TProduct } from "../../components/product/product.list";
import { IApiRes, TPage } from "../../types/backend.type";
import { callListProducts } from "../../config/api.config";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

const ManageProducts = () => {
    const [data, setData] = useState<TPage<TProduct> | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    const fetchListProducts = async () => {
        try {
            const apiRes: IApiRes<TPage<TProduct>> = await callListProducts();
            setData(apiRes.result);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                message.error(`Axios error: ${error.message}`);
            } else {
                message.error('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchListProducts();
    }, []);

    return (
        <>
            <Flex>
                <h1 className='dmon-title-header'>Manage Products</h1>
            </Flex>
            <Content
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 400,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <ProductList
                    loading={loading}
                    data={data}
                >
                </ProductList >
            </Content>
        </>
    );
};

export default ManageProducts;