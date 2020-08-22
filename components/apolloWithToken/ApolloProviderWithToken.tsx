import React, { FC, useContext } from 'react';
import { ApolloProvider, NormalizedCacheObject } from '@apollo/client';

import { useApollo } from '../../lib/apolloClient';

import { UserContext } from '../context/UserContext';

interface Props {
  initialApolloState: NormalizedCacheObject;
}

const ApolloProviderWithToken: FC<Props> = ({
  children,
  initialApolloState,
}) => {
  const userContext = useContext(UserContext);
  const apolloClient = useApollo(
    initialApolloState,
    userContext?.user.authToken
  );

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloProviderWithToken;
