/* eslint-disable no-undef */
import { Code, createStyles, Navbar, ScrollArea } from '@mantine/core';
import { IconBuildingStore, IconCash, IconShoppingCart } from '@tabler/icons';

import { LinksGroup } from './LinkGroups';

const mockdata = [
  { label: 'Thống kê', icon: IconBuildingStore, link: '/' },
  {
    label: 'Đơn hàng',
    icon: IconShoppingCart,
    initiallyOpened: true,
    link: '/orders',
    links: [
      { label: 'Danh sách', link: '/orders' },
      { label: 'Lịch sử tải lên', link: '/orders/history-import' },
    ],
  },
  {
    label: 'Thanh toán',
    icon: IconCash,
    initiallyOpened: true,
    link: '/payments',
    links: [
      { label: 'Danh sách', link: '/payments' },
      { label: 'Lịch sử tải lên', link: '/payments/history-import' },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    padding: theme.spacing.sm,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  // links: {
  //   marginLeft: -theme.spacing.md,
  //   marginRight: -theme.spacing.md,
  // },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function AppNavbar({ opened }) {
  const { classes } = useStyles();
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <Navbar
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 280 }}
      className={classes.navbar}
    >
      <Navbar.Section grow component={ScrollArea}>
        {links}
      </Navbar.Section>
      {__APP_VERSION__ && (
        <Navbar.Section>
          <Code color={'gray'}>Build {__APP_VERSION__}</Code>
        </Navbar.Section>
      )}

      {/* <Navbar.Section className={classes.footer}></Navbar.Section> */}
    </Navbar>
  );
}
