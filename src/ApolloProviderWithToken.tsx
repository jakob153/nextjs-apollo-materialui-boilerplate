import React, { FC, useContext } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { UserContext } from './components/user/UserContext';

const ApolloProviderWithToken: FC = ({ children }) => {
  const { user } = useContext(UserContext);

  const http = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API,
    credentials: 'include',
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      ...(user.authToken && { authorization: `Bearer ${user.authToken}` }),
    },
  }));

  const apolloClient = new ApolloClient({
    link: authLink.concat(http),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloProviderWithToken;
