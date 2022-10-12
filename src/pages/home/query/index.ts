import { ApiClient } from '@/lib/request';

export interface Statistics {
  orders: {
    total: number;
    fail: number;
    success: number;
    total_income: number;
    delivered_rate: number;
    undelivered_rate: number;
    total_discount_shop: number;
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
