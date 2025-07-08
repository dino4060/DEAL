import axiosClient, { AxiosError, AxiosResponse } from "axios";

/**
 * Creates an initial 'axios' instance with custom settings.
 */

const axios = axiosClient.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
  withCredentials: true
});

axios.interceptors.response.use(
  (axiosRes: AxiosResponse) => axiosRes.data,
  async (axiosError: AxiosError) => {
    return axiosError?.response?.data ?? Promise.reject(axiosError);
  }
);

export default axios;