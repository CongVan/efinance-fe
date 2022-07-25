import { Badge } from '@mantine/core';
import qs from 'qs';
import { ColumnsType } from 'rc-table/lib/interface';
import React from 'react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';

import { ETable } from '@/components/ui';
import { formatToLocalDate } from '@/lib/date';
import { Job, JOB_STATUS, JobStatus } from '@/types/job';
import { Meta } from '@/types/meta';

import { getJobs } from './query';
type JobNameType = 'import_order' | 'import_payment';

export const HistoryImport: React.FC<{
  name: JobNameType;
  onSuccess?: (data: Meta<Job[]>) => void;
}> = ({ name, onSuccess }) => {
  const [searchParams] = useSearchParams();

  const params = useMemo(() => {
    return qs.parse(searchParams.toString());
  }, [searchParams]);

  const { data, error } = useSWR(
    ['/jobs-order', { ...params, name, sort: 'created_at desc' }],
    getJobs,
    {
      onSuccess: onSuccess,
    },
  );

  const meta = useMemo(() => {
    return data?.pagination;
  }, [data]);

  const statusColors: { [k in JobStatus]: string } = {
    done: 'green',
    fail: 'red',
    in_progress: 'blue',
    pending: 'default',
  };

  const columns: ColumnsType<Job> = React.useMemo(
    () => [
      {
        title: 'Thời gian',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (date) => `${formatToLocalDate(date)}`,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
          return <Badge color={statusColors[status]}>{JOB_STATUS[status]}</Badge>;
        },
      },
    ],
    [],
  );

  return (
    <ETable
      rowKey={'id'}
      columns={columns}
      data={data?.data}
      loading={!data && !error}
      pagination={{
        total: meta?.total_pages,
      }}
    />
  );
};
