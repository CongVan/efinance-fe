import {
  Box,
  Loader,
  Pagination,
  PaginationProps,
  Select,
  Stack,
  Table as MTable,
  TableProps,
  Text,
} from '@mantine/core';
import qs from 'qs';
import Table from 'rc-table';
import { CustomizeComponent, TableComponents } from 'rc-table/lib/interface';
import { TableProps as RCTableProps } from 'rc-table/lib/Table';
import { FC, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PAGE_SIZE } from '@/constants';

const Cell = ({ children, ...props }) => (
  <td {...props}>
    <Text align="left" size="sm" color={'dark'}>
      {children}
    </Text>
  </td>
);

const HeaderCell = ({ children, ...props }) => (
  <th {...props}>
    <Text align="left" size="sm">
      {children}
    </Text>
  </th>
);

const BodyWrapper: CustomizeComponent = ({ children, ...props }) => (
  <>
    <tbody {...props}>{children}</tbody>
  </>
);

const BodyRow: CustomizeComponent = ({ children, ...props }) => (
  <>
    <tr>{children}</tr>
  </>
);

const CustomTable = (props) => {
  return <MTable highlightOnHover color="dark" {...props} />;
};
const components: TableComponents<any> = {
  table: CustomTable,
  header: {
    // wrapper: HeaderWrapper,
    // row: HeaderRow,
    cell: HeaderCell,
  },
  body: {
    wrapper: BodyWrapper,
    row: BodyRow,
    cell: Cell,
  },
};
export const ETable: FC<
  RCTableProps &
    TableProps & {
      loading?: boolean;
      defaultFilter?: any;
      initialFilter?: any;
      // eslint-disable-next-line no-undef
      FilterComponent?: any;
      filterProps?: any;
      onParamsChange?: (params) => void;
      pagination?: PaginationProps & { limit?: number; onPageSizeChange?: (v) => void };
    }
> = ({ loading, pagination, FilterComponent, initialFilter, ...props }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    return qs.parse(searchParams.toString());
  }, [searchParams]);

  const [isMounted, setIsMounted] = useState(false);
  const [filter, setFilter] = useState(params.filter || {});
  const [page, setPage] = useState(+params.page || 1);
  const [limit, setLimit] = useState(+params.limit || PAGE_SIZE);
  const [sort, setSort] = useState('date desc');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const params = qs.parse(searchParams.toString());
    console.log(params);
  }, [searchParams]);

  useEffect(() => {
    if (!isMounted) return;
    setSearchParams(qs.stringify({ page, limit, sort, filter }));
  }, [page, limit]);

  useEffect(() => {
    if (!isMounted) return;
    setSearchParams(qs.stringify({ page: 1, limit, sort, filter }));
  }, [filter]);

  const onChangeFilter = (f) => {
    setFilter(f);
  };

  return (
    <Box>
      {FilterComponent && (
        <Box mb={'sm'}>
          <FilterComponent filter={filter} onChange={onChangeFilter} />
        </Box>
      )}

      <Box
        sx={(theme) => ({
          overflow: 'auto',
          background: theme.white,
          padding: theme.spacing.sm,
        })}
      >
        <Table
          striped
          scroll={{ x: 900 }}
          highlightOnHover
          emptyText={() => (
            <div>
              {loading ? <Loader variant="dots" /> : <Text>Không có dữ liệu</Text>}
            </div>
          )}
          components={components}
          {...props}
        />
      </Box>
      {pagination?.total > 1 && (
        <Stack
          sx={(theme) => ({
            marginTop: '1rem',
            background: theme.white,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            padding: theme.spacing.sm,
          })}
        >
          <Pagination total={pagination.total} page={page} onChange={(p) => setPage(p)} />

          <Select
            label="Mỗi trang"
            variant="default"
            styles={{
              root: {
                display: 'flex',
                alignItems: 'center',
              },
              label: {
                margin: '0 4px',
              },
              input: {
                width: 80,
              },
            }}
            value={limit + ''}
            data={[
              { value: '10', label: '10' },
              { value: '25', label: '25' },
              { value: '50', label: '50' },
              { value: '100', label: '100' },
            ]}
            onChange={(p) => setLimit(+p)}
          />
        </Stack>
      )}
    </Box>
  );
};
