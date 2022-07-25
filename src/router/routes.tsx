import type { PathRouteProps } from 'react-router-dom';

import { Home } from '@/pages/home';
import { Orders } from '@/pages/orders';
import { OrderHistoryImport } from '@/pages/orders/history-import';
import { Payments } from '@/pages/payments';
import { PaymentHistoryImport } from '@/pages/payments/history-import';

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/orders',
    element: <Orders />,
  },
  {
    path: '/orders/history-import',
    element: <OrderHistoryImport />,
  },
  {
    path: '/payments',
    element: <Payments />,
  },
  {
    path: '/payments/history-import',
    element: <PaymentHistoryImport />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
