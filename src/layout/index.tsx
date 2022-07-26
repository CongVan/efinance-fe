import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppNavbar } from '@/components/common';

export default function Layout({ children }) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
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
      navbar={<AppNavbar opened={opened} />}
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
