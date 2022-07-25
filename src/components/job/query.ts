import { ApiClient } from '@/lib/request';
import { Job } from '@/types/job';
import { Meta } from '@/types/meta';

export const getJobs = async (params) => {
  const { data } = await ApiClient.get<Meta<Job[]>>('/jobs', {
    params: {
      ...params,
    },
  });
  return data;
};
