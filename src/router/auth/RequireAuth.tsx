import { Center, Loader } from '@mantine/core';
import React from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

const RequireAuth = ({ children, redirectTo = '/login' }: PrivateRouteProps) => {
  // add your own authentication logic here
  const isAuthenticated = true;

  return isAuthenticated ? (
    <React.Suspense
      fallback={
        <Center>
          <Loader variant="dots" />
        </Center>
      }
    >
      {children as React.ReactElement}
    </React.Suspense>
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default RequireAuth;
