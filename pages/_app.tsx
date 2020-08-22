import React, { FC, useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';

import { UserContextProvider } from '../components/context/UserContext';
import ApolloProviderWithToken from '../components/apolloWithToken/ApolloProviderWithToken';
import AppBar from '../components/appBar/AppBar';
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';

import theme from '../theme';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>NextJS | Material UI | Apollo GraphQL</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <UserContextProvider>
        <ApolloProviderWithToken
          initialApolloState={pageProps.initialApolloState}
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar />
            <Container>
              <ProtectedRoute>
                <Component {...pageProps} />
              </ProtectedRoute>
            </Container>
          </ThemeProvider>
        </ApolloProviderWithToken>
      </UserContextProvider>
    </>
  );
};

export default MyApp;
