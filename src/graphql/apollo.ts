import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  cache,
  link,
  connectToDevTools: true,
});

export default client;
