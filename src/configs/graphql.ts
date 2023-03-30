import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GRAPHQL_BASE_URI } from './constant';

const client = new ApolloClient({
  uri: GRAPHQL_BASE_URI,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
      refetchWritePolicy: 'overwrite',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default client;
