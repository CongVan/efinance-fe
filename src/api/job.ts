import { ApiClient } from '@/lib/request';

interface JobStatistic {
  done: number;
  fail: number;
  pending: number;
  running: number;
}
export const getJobStatistic = async (params: { name: string }) => {
  const { data } = await ApiClient.get<JobStatistic>('/jobs/statistic', { params });
  return data;
};
