import type { PathRouteProps } from 'react-router-dom';

import { Home } from '@/pages/home';
import { Orders } from '@/pages/orders';
import { Payments } from '@/pages/payments';

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
    path: '/payments',
    element: <Payments />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
