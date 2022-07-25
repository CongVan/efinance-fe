import 'dayjs/locale/vi';

import { Button, Grid, Select } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import qs from 'qs';
import { ColumnsType } from 'rc-table/lib/interface';
import { ColumnProps } from 'rc-table/lib/sugar/Column';
// import { usePagination } from '@mantine/hooks';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';

import { AppContainer } from '@/components/common';
import { ETable } from '@/components/ui';
import { useTablePagination } from '@/hooks/use_table_pagination';
import { defaultRange, formatDateFilter, formatToLocalDate } from '@/lib/date';
import { formatCurrency, formatNumber } from '@/lib/format';
import { Meta } from '@/types/meta';
import { Order } from '@/types/order';

import { Filter, ImportModal } from './components';
import { getPayments } from './query';
export const Payments: React.FC = () => {
  const [searchParams] = useSearchParams();

  const params = useMemo(() => {
    return qs.parse(searchParams.toString());
  }, [searchParams]);

  const { data, error } = useSWR(['/payments', params], getPayments);

  const columns: ColumnsType<Order> = React.useMemo(
    () => [
      {
        title: 'Mã đơn',
        dataIndex: 'order_code',
        key: 'order_code',
      },
      {
        title: 'Thời gian thanh toán',
        dataIndex: 'date',
        key: 'date',
        render: (date) => `${formatToLocalDate(date)}`,
      },
      {
        title: 'Số tiền',
        dataIndex: 'amount',
        key: 'amount',
        render: (income) => formatCurrency(income),
      },
      {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
      },
    ],
    [],
  );

  const refetch = () => {};

  const meta = useMemo(() => {
    return data?.pagination;
  }, [data]);

  return (
    <AppContainer
      title={`Thanh toán`}
      count={formatNumber(meta?.total_rows)}
      extraHeader={<ImportModal />}
    >
      <ETable
        rowKey={'id'}
        columns={columns}
        data={data?.data}
        loading={!data && !error}
        FilterComponent={Filter}
        pagination={{
          total: meta?.total_pages,
        }}
      />
    </AppContainer>
  );
};
