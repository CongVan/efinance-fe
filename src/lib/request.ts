import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';

export const ApiClient = axios.create({
  baseURL: (import.meta.env.VITE_API_ENDPOINT || 'http://localhost:8000') + '/api',
  withCredentials: true,
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'repeat', encode: true });
  },
});

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  console.info(`[${config.method}] ${config.url}: ${JSON.stringify(config.params)}`);
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  // console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // console.info(
  //   `[${response.config.method}] ${response.config.url}: ${JSON.stringify(
  //     response.data,
  //   )}`,
  // );
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};
ApiClient.interceptors.request.use(onRequest, onRequestError);
ApiClient.interceptors.response.use(onResponse, onResponseError);

// export const ApiFetcher = (url,...params) =>
