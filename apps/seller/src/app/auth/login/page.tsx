// src/app/auth/login/page.tsx
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router';
import { useAuthContext } from '../../../contexts/auth.context';
import { useMessageContext } from '../../../contexts/message.context';
import { api } from '../../../lib/api';
import { FailureIcon, SuccessIcon } from '../../../lib/constants';
import { fetchSafely } from '../../../lib/http';
import type { TAuthEmailBody } from '../../../types/auth.types';
import { AuthLayout } from '../layout';
import styles from '../styles.module.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const message = useMessageContext();
  const auth = useAuthContext();

  const onFinish = async (values: TAuthEmailBody) => {
    // do login
    const loginResult = await fetchSafely(api.auth.login(values));

    if (!loginResult.success) {
      console.warn('Login failed:', loginResult.error);
      message.error(loginResult.error + FailureIcon);
      return;
    }
    auth.updateAccessToken(loginResult.data.accessToken);

    // do getCurrentShop
    const shopResult = await fetchSafely(api.auth.getCurrentShop());

    if (!shopResult.success) {
      console.warn('GetCurrentShop failed:', shopResult.error);
      message.error(shopResult.error + FailureIcon);
      return;
    }
    auth.updateCurrentShop(shopResult.data);

    // navigate to home
    console.log('Login successfully:', loginResult.data);
    message.success('Đăng nhập thành công' + SuccessIcon);
    navigate('/');
  };

  return (
    <AuthLayout>
      <div className={styles['auth-card-header']}>
        <h2>Đăng nhập</h2>
        <p>
          Bạn chưa có tài khoản doanh nghiệp ? <Link to="/signup">Đăng ký</Link>
        </p>
      </div>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Email không nên trống !' }]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: 'Mật khẩu không nên trống !' }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};