import { usePagination } from '@mantine/hooks';
import { PaginationParams } from '@mantine/hooks/lib/use-pagination/use-pagination';
import { useState } from 'react';

interface Props extends PaginationParams {}
export const useTablePagination = (props: Partial<Props>) => {
  const [page, setPage] = useState(props.page || 1);
  const [totalPage, setTotalPage] = useState(0);

  const pagination = usePagination({ siblings: 0, page, total: totalPage, ...props });

  return {
    ...pagination,
    page,
    totalPage,
    setTotalPage,
    setPage,
  };
};
