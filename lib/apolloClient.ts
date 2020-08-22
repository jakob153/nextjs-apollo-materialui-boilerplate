import { useMemo } from 'react';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

type InitialState = NormalizedCacheObject | null;

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient(authToken?: string) {
  const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_BACKEND}/graphql`,
    credentials: 'include',
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      ...(authToken && {
        authorization: `Bearer ${authToken}`,
      }),
    },
  }));

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState: InitialState = null,
  authToken?: string
) {
  const _apolloClient = apolloClient ?? createApolloClient(authToken);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: InitialState, authToken?: string) {
  const store = useMemo(() => initializeApollo(initialState, authToken), [
    initialState,
  ]);
  return store;
}
