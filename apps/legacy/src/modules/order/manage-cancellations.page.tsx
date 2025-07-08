import { Flex, theme } from "antd";
import { Content } from "antd/es/layout/layout";

const ManageCancellations = () => {
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    return (
        <>
            <Flex>
                <h1 className='dmon-title-header'>Manage Cancellations</h1>
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
                Manage Cancellations
            </Content>
        </>
    );
};

export default ManageCancellations;