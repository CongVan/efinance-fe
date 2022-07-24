import 'dayjs/locale/vi';

import { Badge, Button, Grid, Select } from '@mantine/core';
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
import { getOrders } from './query';
export const Orders: React.FC = () => {
  const [searchParams] = useSearchParams();

  const params = useMemo(() => {
    return qs.parse(searchParams.toString());
  }, [searchParams]);
  const { data, error } = useSWR(['/orders', params], getOrders);

  const columns: ColumnsType<Order> = React.useMemo(
    () => [
      {
        title: 'Mã đơn',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: 'Thời gian đặt hàng',
        dataIndex: 'date',
        key: 'date',
        render: (date) => `${formatToLocalDate(date)}`,
      },
      {
        title: 'Trạng thái đơn hàng',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Tổng doanh thu',
        dataIndex: 'total_income',
        key: 'total_income',
        render: (income) => formatCurrency(income),
      },
      {
        title: 'Tổng thanh toán',
        dataIndex: 'payment',
        key: 'total_pay',
        render: (payment) => formatCurrency(payment?.amount),
      },
      {
        title: 'Ngày thanh toán',
        dataIndex: 'payment',
        key: 'payment_date',
        render: (payment) => formatToLocalDate(payment?.date),
      },

      {
        title: 'Đối xoát',
        dataIndex: 'verify_status',
        key: 'verify_status',
        render: (status) => {
          return (
            <Badge color={status === 'OK' ? 'green' : 'red'}>
              {status === 'OK' ? 'Đúng' : 'Sai'}
            </Badge>
          );
        },
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
      title={`Đơn hàng ${meta?.total_rows ? `(${formatNumber(meta?.total_rows)})` : ''}`}
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
