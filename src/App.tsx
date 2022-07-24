import './App.css';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter as Router } from 'react-router-dom';
import { SWRConfig } from 'swr';

import Routings from '@/router/Routings';

import Layout from './layout';
import { ApiMiddleware } from './lib/swr';

function App() {
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
              <Routings />
            </Layout>
          </Router>
        </NotificationsProvider>
      </MantineProvider>
    </SWRConfig>
  );
}

export default App;
