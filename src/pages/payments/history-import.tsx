import { Badge } from '@mantine/core';
import qs from 'qs';
import { ColumnsType } from 'rc-table/lib/interface';
import React, { useState } from 'react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';

import { AppContainer } from '@/components/common';
import { HistoryImport } from '@/components/job';
import { ETable } from '@/components/ui';
import { formatToLocalDate } from '@/lib/date';
import { formatNumber } from '@/lib/format';
import { Job, JOB_STATUS, JobStatus } from '@/types/job';
import { Meta } from '@/types/meta';

export const PaymentHistoryImport = () => {
  const [meta, setMeta] = useState(null);

  const onSuccess = (d: Meta<Job[]>) => {
    setMeta(d?.pagination);
  };
  return (
    <AppContainer
      title={`Lịch sử tải lên thanh toán`}
      count={formatNumber(meta?.total_rows)}
    >
      <HistoryImport name={'import_payment_shopee'} onSuccess={onSuccess} />
    </AppContainer>
  );
};

export default PaymentHistoryImport;
