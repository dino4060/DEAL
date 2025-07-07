import { Navigate, Outlet } from 'react-router';
import { Layout } from 'antd';
import './style.scss';
import { PrivateHeader, PrivateMenu } from '../../components/app';

const PrivatePage = () => {
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  if (isAuthenticated === false) {
    return <Navigate to="/access/login" />;
  }


  return (
    <Layout className='app-layout'>
      <PrivateHeader />
      <Layout>
        <PrivateMenu />
        <Layout className='outlet-layout'>
          <Outlet />
        </Layout>
      </Layout>
    </Layout >
  );
};

export default PrivatePage;