import { ApiClient } from '@/lib/request';
import { Job } from '@/types/job';
import { Meta } from '@/types/meta';
import { Payment } from '@/types/payment';

export const getPayments = async (params) => {
  const { data } = await ApiClient.get<Meta<Payment[]>>('/payments', { params });
  return data;
};

export const importPayment = async (body: any) => {
  const { data } = await ApiClient.post<{ data: Job }>('/payments/import', body, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return data;
};
