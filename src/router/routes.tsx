import { lazy } from 'react';
import type { PathRouteProps } from 'react-router-dom';

const Home = lazy(() => import('@/pages/home/Home'));
const Orders = lazy(() => import('@/pages/orders'));
const OrderHistoryImport = lazy(() => import('@/pages/orders/history-import'));
const Payments = lazy(() => import('@/pages/payments'));
const PaymentHistoryImport = lazy(() => import('@/pages/payments/history-import'));

export const privateRoutes: Array<PathRouteProps> = [
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

export const routes: Array<PathRouteProps> = [];
