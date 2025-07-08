import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import './style.scss';
import '@arco-design/web-react/dist/css/arco.css';
import HomePage from './modules/home/home.page';
import ManageOrders from './modules/order/manage-orders.page';
import ManageCancellations from './modules/order/manage-cancellations.page';
import ManageProducts from './modules/product/manage-products.page';
import ProductRatings from './modules/product/product-ratings.page';
import PrivatePage from './modules/app/private.page';
import PublicPage from './modules/app/public.page';
import { Login, Signup } from './modules/access';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route element={<PublicPage />}>
          {/* account */}
          <Route path='access'>
            <Route index element={<Navigate to='/access/login' />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
        </Route>

        {/* private routes */}
        <Route element={<PrivatePage />}>
          {/* homepage */}
          <Route index element={<Navigate to='/homepage' />} />
          <Route path='homepage' element={<HomePage />} />

          {/* order */}
          <Route path='order'>
            <Route index element={<Navigate to='/order/manage' />} />
            <Route path='manage' element={<ManageOrders />} />
            <Route path='cancellation' element={<ManageCancellations />} />
          </Route>

          {/* product */}
          <Route path='product'>
            <Route index element={<Navigate to='/product/manage' />} />
            <Route path='manage' element={<ManageProducts />} />
            <Route path='rating' element={<ProductRatings />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode >
);
