import React, { FC, useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import { ApolloProvider } from '@apollo/client';

import AppBar from '../components/appBar/AppBar';
import UserContextProvider from '../components/context/UserContext';

import { useApollo } from '../lib/apolloClient';

import theme from '../theme';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={apolloClient}>
          <UserContextProvider>
            <AppBar />
            <Container>
              <Component {...pageProps} />
            </Container>
          </UserContextProvider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
