import { Button, Flex, Form, Input, message } from 'antd';
import { useState } from 'react';
import { callLogin } from '../../config/api.config';
import { IAccount, IApiRes } from '../../types/backend.type';
import { useNavigate } from 'react-router';

type TForm = {
    username?: string;
    password?: string;
};

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        const { username, password } = values;
        setIsSubmit(true);
        const apiRes: IApiRes<IAccount> = await callLogin(username, password);
        setIsSubmit(false);

        if (apiRes.success) {
            localStorage.setItem('token', apiRes.result.token); //accessToken
            messageApi.open({
                type: 'success',
                content: `Welcome back to SShop Business Center!`,
            });
            navigate('/homepage');
        } else {
            messageApi.open({
                type: 'error',
                content: `Login failed since ${apiRes.error}`,
            });
        }


    };

    return (
        <>
            {contextHolder}
            <Flex justify='center'>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }
                    }
                    style={{ maxWidth: 600, flex: 1, marginTop: 60 }}
                    // initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<TForm>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Your username should not be empty!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<TForm>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Your password should not be empty!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" loading={isSubmit}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form >
            </Flex >

        </>
    );
};

export default Login;