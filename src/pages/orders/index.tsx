import 'dayjs/locale/vi';

import { ActionIcon, Badge, CopyButton, Text, Tooltip } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons';
import { isEmpty } from 'lodash';
import qs from 'qs';
import { ColumnsType } from 'rc-table/lib/interface';
// import { usePagination } from '@mantine/hooks';
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';

import { AppContainer } from '@/components/common';
import { ETable } from '@/components/ui';
import { DEFAULT_FILTER_SHOPEE } from '@/constants';
import { formatToLocalDate } from '@/lib/date';
import { formatCurrency, formatNumber } from '@/lib/format';
import { Order } from '@/types/order';

import { Filter, ImportModal } from './components';
import { getOrders } from './query';
export const Orders: React.FC = () => {
  const [searchParams] = useSearchParams();

  const params = useMemo(() => {
    const p = qs.parse(searchParams.toString());
    return isEmpty(p) ? DEFAULT_FILTER_SHOPEE : p;
  }, [searchParams]);
  const { data, error } = useSWR(['/orders', params], getOrders);

  const columns: ColumnsType<Order> = React.useMemo(
    () => [
      {
        title: 'Mã đơn',
        dataIndex: 'code',
        key: 'code',
        render: (code) => {
          return (
            <CopyButton value={code} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? 'Đã sao chép' : 'Sao chép'}
                  withArrow
                  position="right"
                >
                  <Text
                    sx={{
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'baseline',
                    }}
                    onClick={copy}
                  >
                    {code}
                    <ActionIcon color={copied ? 'teal' : 'gray'}>
                      {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                    </ActionIcon>
                  </Text>
                </Tooltip>
              )}
            </CopyButton>
          );
        },
      },
      {
        title: 'Thời gian đặt hàng',
        dataIndex: 'date',
        key: 'date',
        render: (date) => `${formatToLocalDate(date)}`,
      },
      // {
      //   title: 'Trạng thái đơn hàng',
      //   dataIndex: 'status',
      //   key: 'status',
      // },
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
        title: 'Chênh lệch',
        dataIndex: 'payment',
        key: 'different',
        render: (payment, record) =>
          formatCurrency((record.total_income || 0) - (payment.amount || 0)),
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

  const meta = useMemo(() => {
    return data?.pagination;
  }, [data]);

  return (
    <AppContainer
      title={`Đơn hàng`}
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
export default Orders;
