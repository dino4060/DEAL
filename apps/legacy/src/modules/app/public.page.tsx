import { Navigate, Outlet } from 'react-router';
import { Layout } from 'antd';
import './style.scss';
import { PublicHeader } from '../../components/app';


const PublicPage = () => {
    const isAuthenticated = Boolean(localStorage.getItem('token'));

    if (isAuthenticated === true) {
        return <Navigate to="/homepage" />;
    }

    return (
        <Layout className='app-layout'>
            <PublicHeader />
            <Layout>
                <Outlet />
            </Layout>
        </Layout >
    );
};

export default PublicPage;