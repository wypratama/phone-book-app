import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';
import { GRAPHQL_BASE_URI } from './constant';

const client = new ApolloClient({
  uri: GRAPHQL_BASE_URI,
  cache: new InMemoryCache(),
});

export default client;
