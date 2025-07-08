import { TProduct } from '../components/product/product.list';
import { IAccount, IApiRes, TPage } from '../types/backend.type';
import axios from './axios.config';

const seller = '/seller/api/v1';

const access = 'access';

const product = 'product';

export const callLogin = (username: string, password: string): Promise<IApiRes<IAccount>> => {
    return axios.post<IApiRes<IAccount>>(`${seller}/${access}/login/username`, { username, password }) as any;
}

export const callListProducts = (): Promise<IApiRes<TPage<TProduct>>> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No token found');
    }


    return axios.get<IApiRes<TPage<TProduct>>>(`${seller}/${product}/list`, {
        headers: { Authorization: `Bearer ${token}` }
    }) as any;
}