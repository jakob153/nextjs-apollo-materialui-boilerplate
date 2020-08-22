import React, { FC, useContext, useEffect } from 'react';
import { NextComponentType, NextPageContext } from 'next';
import { useRouter } from 'next/router';

import { UserContext } from '../context/UserContext';

import IndexPage from '../../pages/index';

const protectedRoutes = ['/dashboard'];

// interface Props {
//   component: NextComponentType<NextPageContext, any, {}>;
//   pageProps: any;
// }

const ProtectedRoute: FC = ({ children }) => {
  const router = useRouter();
  const userContext = useContext(UserContext);

  useEffect(() => {
    router.events.on('beforeHistoryChange', (url: string) => {
      if (protectedRoutes.includes(url) && !userContext?.user.loggedIn) {
        router.events.emit('routeChangeError', '/');
      }
    });
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
