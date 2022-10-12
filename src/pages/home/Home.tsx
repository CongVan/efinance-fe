import { createStyles, Grid, Group, Paper, Text, ThemeIcon } from '@mantine/core';
import { IconBox, IconCoin, IconPercentage } from '@tabler/icons';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';

import { formatCurrency, formatNumber, formatPercentage } from '@/lib/format';
import { stringifyParameter } from '@/lib/parameter';
import { OrderVerifyStatus } from '@/types/order';

import { getStatistics } from './query';

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  value: {
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1,
  },

  unit: {
    lineHeight: 1,
    display: 'flex',
    color: theme.colors.dark[6],
    // alignItems: 'flex-end',
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },

  more: {
    alignSelf: 'flex-end',
    color: theme.colors.primary,
    cursor: 'pointer',
  },
}));

interface StatItem {
  title: string;
  value: string;
  link?: string;
  icon: any;
  unit?: string;
  large?: boolean;
}

const Home = () => {
  const { data, isValidating } = useSWR(['/dashboard/statistics'], getStatistics);
  const { classes } = useStyles();

  const statsData = useMemo(() => {
    if (isValidating || !data) return [];
    const stats: StatItem[] = [];
    stats.push({
      title: 'Đơn hàng',
      value: formatNumber(data.orders.total),
      icon: IconBox,
      unit: 'đơn',
      large: true,
    });
    stats.push({
      title: 'Doanh thu',
      icon: IconCoin,
      large: true,
      value: formatCurrency(data.payment.total_amount),
    });
    stats.push({
      title: 'Đối xoát sai',
      unit: 'đơn',
      value: formatNumber(data.orders.fail),
      link: `/orders?${stringifyParameter({
        filter: { verify_status: OrderVerifyStatus.WRONG },
      })}`,
      icon: IconCoin,
    });
    stats.push({
      title: 'Đối xoát đúng',
      unit: 'đơn',
      value: formatNumber(data.orders.success),
      icon: IconCoin,
    });
    stats.push({
      title: 'Giao hàng thành công',
      icon: IconPercentage,
      value: formatPercentage(data.orders.delivered_rate),
    });
    stats.push({
      title: 'Giao hàng thất bại',
      icon: IconPercentage,
      value: formatPercentage(data.orders.undelivered_rate),
    });

    return stats;
  }, [data]);

  const renderOrderStats = () => {
    if (!data) return null;

    return statsData.map((stat, index) => {
      return (
        <Grid.Col lg={stat.large ? 6 : 3} key={index}>
          <Paper withBorder p="md" radius="md">
            <Group position="apart">
              <Text size="xs" color="dimmed" className={classes.title}>
                {stat.title}
              </Text>
              <ThemeIcon color="gray" variant="light" size={38} radius="md">
                <stat.icon size={28} stroke={1.5} />
              </ThemeIcon>
              {/* <Icon className={classes.icon} size={22} stroke={1.5} /> */}
            </Group>
            <Group position="apart">
              <Group align="baseline" spacing="xs" mt={25}>
                <Text className={classes.value}>{stat.value}</Text>
                {stat.unit && (
                  <Text
                    // color={stat.diff > 0 ? 'teal' : 'red'}
                    size="md"
                    weight={500}
                    className={classes.unit}
                  >
                    <span>{stat.unit}</span>
                    {/* <DiffIcon size={16} stroke={1.5} /> */}
                  </Text>
                )}
              </Group>
              {stat.link && (
                <Text
                  variant="link"
                  component={Link}
                  to={stat.link}
                  className={classes.more}
                >
                  Chi tiết
                </Text>
              )}
            </Group>
          </Paper>
        </Grid.Col>
      );
    });
  };

  return (
    <div className={classes.root}>
      <Grid>{renderOrderStats()}</Grid>
    </div>
  );
};

export default Home;
