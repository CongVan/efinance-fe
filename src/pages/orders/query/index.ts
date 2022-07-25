import { AxiosRequestConfig } from 'axios';

import { ApiClient } from '@/lib/request';
import { Job } from '@/types/job';
import { Meta } from '@/types/meta';
import { Order } from '@/types/order';

export const getOrders = async (params) => {
  const { data } = await ApiClient.get<Meta<Order[]>>('/orders', { params });
  return data;
};

export const importOrder = async (body: any) => {
  const { data } = await ApiClient.post<{ data: Job }>('/orders/import', body, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return data;
};

export const getHistoryImportOrders = async (params) => {
  const { data } = await ApiClient.get<Meta<Job[]>>('/jobs', {
    params: {
      name: 'import_order',
      ...params,
    },
  });
  return data;
};
