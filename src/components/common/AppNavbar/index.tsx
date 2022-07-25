import { Box, Code, createStyles, Group, Navbar, ScrollArea } from '@mantine/core';
import { IconBuildingStore, IconCash, IconGauge, IconShoppingCart } from '@tabler/icons';

import { LinksGroup } from './LinkGroups';

// import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
// import { UserButton } from '../UserButton/UserButton';
// import { Logo } from './Logo';

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
  // { label: 'Analytics', icon: IconPresentationAnalytics },
  // { label: 'Contracts', icon: IconFileAnalytics },
  // { label: 'Settings', icon: IconAdjustments },
  // {
  //   label: 'Security',
  //   icon: IconLock,
  //   links: [
  //     { label: 'Enable 2FA', link: '/' },
  //     { label: 'Change password', link: '/' },
  //     { label: 'Recovery codes', link: '/' },
  //   ],
  // },
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
      width={{ sm: 320 }}
      className={classes.navbar}
    >
      <Navbar.Section grow component={ScrollArea}>
        {links}
      </Navbar.Section>

      {/* <Navbar.Section className={classes.footer}></Navbar.Section> */}
    </Navbar>
  );
}
