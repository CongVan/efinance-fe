import 'dayjs/locale/vi';

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
import { getPayments } from './query';

export const Payments: React.FC = () => {
  const [searchParams] = useSearchParams();

  const params = useMemo(() => {
    const p = qs.parse(searchParams.toString());

    return isEmpty(p) ? DEFAULT_FILTER_SHOPEE : p;
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

export default Payments;
