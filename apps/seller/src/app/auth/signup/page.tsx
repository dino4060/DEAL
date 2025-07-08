// // src/app/auth/signup/page.tsx
// import { Button, Form, Input } from 'antd';
// import { Link, useNavigate } from 'react-router';
// import { AuthLayout } from '../layout';
// import styles from '../styles.module.css';
// import { api } from '../../../lib/api';
// import { fetchSafely } from '../../../lib/http';
// import type { TAuthEmailBody } from '../../../types/auth.types';
// import { useMessageContext } from '../../../contexts/message.context';
// import { FailureIcon, SuccessIcon } from '../../../lib/constants';

// export const SignupPage = () => {
//   const navigate = useNavigate();
//   const message = useMessageContext();

//   const onFinish = async (values: TAuthEmailBody) => {
//     const response = await fetchSafely(api.auth.signup(values));

//     if (response.success) {
//       console.log('Signup successfully:', response.data);
//       message.success('Đăng ký thành công' + SuccessIcon);
//       navigate('/');
//     } else {
//       console.error('Signup failed:', response.error);
//       message.error('Đăng ký thành công' + FailureIcon);
//     }
//   };

//   return (
//     <AuthLayout>
//       <div className={styles['auth-card-header']}>
//         <h2>Đăng kí</h2>
//         <p>
//           Bạn đã có tài khoản doanh nghiệp ? <Link to="/login">Đăng nhập</Link>
//         </p>
//       </div>
//       <Form
//         name="signup"
//         initialValues={{ remember: true }}
//         onFinish={onFinish}
//         layout="vertical"
//       >
//         <Form.Item
//           name="email"
//           label="Email"
//           rules={[{ required: true, message: 'Không nên để trống email !' }]}
//         >
//           <Input placeholder="Nhập email" />
//         </Form.Item>

//         <Form.Item
//           name="password"
//           label="Mật khẩu"
//           rules={[{ required: true, message: 'Không nên để trống mật khẩu !' }]}
//         >
//           <Input.Password placeholder="Nhập mật khẩu" />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" block size="large">
//             Đăng kí
//           </Button>
//         </Form.Item>
//       </Form>
//     </AuthLayout>
//   );
// };

import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router';
import { AuthLayout } from '../layout';
import styles from '../styles.module.css';
import { api } from '../../../lib/api';
import { fetchSafely } from '../../../lib/http';
import type { TAuthEmailBody } from '../../../types/auth.types';
import { useMessageContext } from '../../../contexts/message.context';
import { FailureIcon, SuccessIcon } from '../../../lib/constants';
import { useAuthContext } from '../../../contexts/auth.context';

export const SignupPage = () => {
  const navigate = useNavigate();
  const message = useMessageContext();
  const auth = useAuthContext();

  const onFinish = async (values: TAuthEmailBody) => {
    const signupResult = await fetchSafely(api.auth.signup(values));

    if (!signupResult.success) {
      console.warn('Signup failed:', signupResult.error);
      message.error(signupResult.error + FailureIcon);
      return;
    }

    auth.updateAccessToken(signupResult.data.accessToken);

    const shopResult = await fetchSafely(api.auth.getCurrentShop());

    if (!shopResult.success) {
      console.warn('GetCurrentShop failed:', shopResult.error);
      message.error(shopResult.error + FailureIcon);
      return;
    }

    auth.updateCurrentShop(shopResult.data);

    console.log('Signup successfully:', signupResult.data);
    message.success('Đăng ký thành công' + SuccessIcon);
    navigate('/');
  };

  return (
    <AuthLayout>
      <div className={styles['auth-card-header']}>
        <h2>Đăng kí</h2>
        <p>
          Bạn đã có tài khoản doanh nghiệp ? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
      <Form
        name="signup"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Không nên để trống email !' }]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: 'Không nên để trống mật khẩu !' }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Đăng kí
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};