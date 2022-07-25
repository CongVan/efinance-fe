import { Box, Card, Grid, Loader, Stack, Text, Title } from '@mantine/core';
import { useEffect } from 'react';
import useSWR from 'swr';
import { Box as BoxIcon, CurrencyDollar, Dashboard } from 'tabler-icons-react';

import { AppContainer } from '@/components/common';
import { formatCurrency, formatNumber } from '@/lib/format';

import { getStatistics } from './query';

export const Home = () => {
  const { data, error } = useSWR(['/dashboard/statistics'], getStatistics);

  useEffect(() => {
    console.log('d', data);
  }, [data]);

  return (
    <AppContainer title={'Dashboard'}>
      {!data && !error ? (
        <Loader />
      ) : (
        <>
          <Grid grow>
            <Grid.Col md={1}>
              <Card>
                <Stack
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <Title order={3}>Đơn hàng</Title>
                  <BoxIcon size={48} />
                </Stack>
                <Title>{formatNumber(data?.orders?.total || 0)}</Title>
              </Card>
            </Grid.Col>
            <Grid.Col md={1}>
              <Card>
                <Stack
                  color="theme.red"
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <Title order={3}>Doanh thu</Title>
                  <CurrencyDollar size={48} />
                </Stack>
                <Title>{formatCurrency(data?.payment.total_amount || 0)}</Title>
              </Card>
            </Grid.Col>
          </Grid>
        </>
      )}
    </AppContainer>
  );
};
