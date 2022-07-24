import {
  ActionIcon,
  Button,
  Container,
  Group,
  Space,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import {
  Accordion,
  AppShell,
  Aside,
  Burger,
  Divider,
  Header,
  MediaQuery,
  Menu,
  Navbar,
  Text,
  useMantineTheme,
} from '@mantine/core';
import React, { useState } from 'react';
import { Link, NavLink, To, useMatch, useResolvedPath } from 'react-router-dom';
import { Box, CurrencyDollar, Dashboard } from 'tabler-icons-react';

const NavItem: React.FC<{ icon: any; to: To }> = ({ icon, children, to }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Button
      component={NavLink}
      to={to}
      variant={match ? 'light' : 'subtle'}
      color={match ? 'primary' : 'gray'}
      styles={{
        root: { height: '48px' },
        inner: { justifyContent: 'start', padding: 'md' },
      }}
      fullWidth
      leftIcon={
        <ActionIcon color={match ? 'primary' : 'gray'} size="lg" radius="md">
          {icon}
        </ActionIcon>
      }
    >
      {children}
    </Button>
  );
};

export default function Layout({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="xs"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 260 }}
        >
          <>
            <NavItem to="/" icon={<Dashboard />}>
              Dashboard
            </NavItem>
            <NavItem to="/orders" icon={<Box />}>
              Đơn hàng
            </NavItem>
            <NavItem to="/payments" icon={<CurrencyDollar />}>
              Thanh toán
            </NavItem>
          </>
        </Navbar>
      }
      header={
        <Header height={56} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
              weight={700}
              transform="uppercase"
            >
              Ecomfy
            </Text>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
