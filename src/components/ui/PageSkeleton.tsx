import { Center, Skeleton, Table } from '@mantine/core';

export const PageSkeleton = () => {
  return (
    <Center>
      <Skeleton width={80} height={14} />
      <Table>
        <thead>
          <th>
            <Skeleton width={60} height={4} />
          </th>
          <th>
            <Skeleton width={60} height={4} />
          </th>
          <th>
            <Skeleton width={60} height={4} />
          </th>
        </thead>
      </Table>
    </Center>
  );
};
