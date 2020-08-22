import React, { FC, useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';

import { useApollo } from '../lib/apolloClient';

import { UserContextProvider } from '../context/UserContext';

import Navbar from '../components/appBar/AppBar';

import theme from '../theme';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
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
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Container>
              <Component {...pageProps} />
            </Container>
          </ThemeProvider>
        </ApolloProvider>
      </UserContextProvider>
    </>
  );
};

export default MyApp;
