import {
  Box,
  Center,
  Loader,
  Pagination,
  PaginationProps,
  Select,
  Space,
  Stack,
  Table as MTable,
  TableProps,
  Text,
} from '@mantine/core';
import qs from 'qs';
import Table from 'rc-table';
import { CustomizeComponent, TableComponents } from 'rc-table/lib/interface';
import { TableProps as RCTableProps } from 'rc-table/lib/Table';
import { FC, ReactComponentElement, useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
const Cell = ({ children }) => (
  <td>
    <Text align="left" size="sm">
      {children}
    </Text>
  </td>
);
const HeaderCell = ({ children }) => (
  <th>
    <Text align="left" size="sm">
      {children}
    </Text>
  </th>
);

const BodyWrapper: CustomizeComponent = ({ children }) => (
  <>
    <tbody>{children}</tbody>
  </>
);

const components: TableComponents<any> = {
  table: MTable,
  header: {
    // wrapper: HeaderWrapper,
    // row: HeaderRow,
    cell: HeaderCell,
  },
  body: {
    wrapper: BodyWrapper,
    //   row: BodyRow,
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    console.log('filter table change', filter);
  }, [filter]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const params = qs.parse(searchParams.toString());
    console.log(params);
  }, [searchParams]);

  useEffect(() => {
    if (!isMounted) return;
    setSearchParams(qs.stringify({ page, limit, filter }));
  }, [page, limit, filter]);

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
          highlightOnHover
          emptyText={() => (
            <div>{loading ? <Loader /> : <Text>Không có dữ liệu</Text>}</div>
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
            padding: theme.spacing.sm,
          })}
        >
          <Pagination {...pagination} page={page} onChange={(p) => setPage(p)} />

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
            value={(pagination?.limit || limit) + ''}
            data={[
              { value: '10', label: '10' },
              { value: '20', label: '20' },
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
