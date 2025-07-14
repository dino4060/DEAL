// src/app/verify/page.tsx
import { Button, Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../../contexts/auth.context';
import { useMessageContext } from '../../contexts/message.context';
import { api } from '../../lib/api';
import { FailureIcon, SuccessIcon } from '../../lib/constants';
import { fetchSafely } from '../../lib/http';
import type { TVerifyShopBody } from '../../types/shop.types';
import { BusinessType } from '../../types/shop.types';
import styles from './styles.module.css';

export const VerifyPage = () => {
  const navigate = useNavigate();
  const message = useMessageContext();
  const auth = useAuthContext();

  const onFinish = async (values: TVerifyShopBody) => {
    const verifyResult = await fetchSafely(api.shops.verifyShop(values));

    if (!verifyResult.success) {
      console.warn('verifyShop failed:', verifyResult.error);
      message.error(verifyResult.error + FailureIcon);
      return;
    }

    const shopInfoResult = await fetchSafely(api.auth.getCurrentShop());

    if (!shopInfoResult.success) {
      console.warn('getCurrentShop failed:', shopInfoResult.error);
      message.error(shopInfoResult.error + FailureIcon);
      return;
    }

    auth.updateCurrentShop(shopInfoResult.data);

    console.log('verifyShop successfully:', verifyResult.data);
    message.success('Xác minh cửa hàng thành công' + SuccessIcon);
    navigate('/');
  };

  return (
    <div className={styles['verify-container']}>
      <div className={styles['verify-card']}>
        <div className={styles['verify-card-header']}>
          <h2>Xác minh cửa hàng</h2>
          <p>Vui lòng cung cấp thông tin để xác minh doanh nghiệp của bạn.</p>
        </div>
        <Form
          name="verify-shop"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="businessType"
            label="Loại hình doanh nghiệp"
            rules={[{ required: true, message: 'Vui lòng chọn loại hình doanh nghiệp!' }]}
          >
            <Select placeholder="Chọn loại hình">
              {Object.values(BusinessType).map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="name"
            label="Tên cửa hàng/doanh nghiệp"
            rules={[{ required: true, message: 'Vui lòng nhập tên cửa hàng!' }]}
          >
            <Input placeholder="Nhập tên" />
          </Form.Item>

          <Form.Item
            name="contactEmail"
            label="Email liên hệ"
            rules={[
              { required: true, message: 'Vui lòng nhập email liên hệ!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input placeholder="Nhập email liên hệ" />
          </Form.Item>

          <Form.Item
            name="contactPhone"
            label="Số điện thoại liên hệ"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại liên hệ!' }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item className={styles['verify-button-submit']}>
            <Button type="primary" htmlType="submit" block size="large">
              Gửi xác minh
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

/**
 * I request you completed VerifyPage
 * - its flow: design 1 ant form friendly and the form at center
 * - call api to update
 * - navigate to home /
 * - you have to flow base code and current conventions
 * - you don't comment in code. You should explain outside
 */