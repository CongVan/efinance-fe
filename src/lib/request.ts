import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';

import { getSession } from './session';

export const ApiClient = axios.create({
  baseURL: (import.meta.env.VITE_API_ENDPOINT || 'http://localhost:8000') + '/api',
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'repeat', encode: true });
  },
});

// export const initialAPIClient = () => {
//   if (!ApiClient) {
//     ApiClient = axios.create({
//       baseURL: (import.meta.env.VITE_API_ENDPOINT || 'http://localhost:8000') + '/api',
//       headers: {
//         'X-Session': localStorage.getItem('session_id'),
//       },
//       paramsSerializer(params) {
//         return qs.stringify(params, { arrayFormat: 'repeat', encode: true });
//       },
//     });
//   }

//   return ApiClient;
// };

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers['sessionId'] = getSession();
  console.info(`[${config.method}] ${config.url}: ${JSON.stringify(config.params)}`);
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  // console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // console.log('response', response.headers);

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
