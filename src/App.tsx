import './App.css';

import { Loader, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter as Router } from 'react-router-dom';
import useSWR, { SWRConfig } from 'swr';

import Routings from '@/router/Routings';

import Layout from './layout';
import { ApiClient } from './lib/request';
import { getSession, setSession } from './lib/session';
import { ApiMiddleware } from './lib/swr';

function App() {
  const { data, error, isValidating } = useSWR(
    getSession() ? null : '/auth/session',
    () => ApiClient.get('/auth/session'),
    {
      onSuccess(data, key, config) {
        setSession(data.data.session);
      },
    },
  );

  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        revalidateOnFocus: false,
        use: [ApiMiddleware],
      }}
    >
      <MantineProvider>
        <NotificationsProvider position="top-right">
          <Router>
            <Layout>
              {isValidating ? (
                <>
                  <Loader variant="dots" />
                </>
              ) : (
                <Routings />
              )}
            </Layout>
          </Router>
        </NotificationsProvider>
      </MantineProvider>
    </SWRConfig>
  );
}

export default App;
