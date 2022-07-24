import { AxiosRequestConfig } from 'axios';

import { ApiClient } from '@/lib/request';
import { Job } from '@/types/job';
import { Meta } from '@/types/meta';
import { Payment } from '@/types/payment';
interface Statistics {
  orders: {
    total: number;
  };
  payment: {
    total_amount: number;
  };
}
export const getStatistics = async (params) => {
  const { data } = await ApiClient.get<Statistics>('/dashboard/statistics', {
    params,
  });
  return data;
};
