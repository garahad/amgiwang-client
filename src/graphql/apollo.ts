import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

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
  typeDefs,
  resolvers,
  connectToDevTools: true,
});

cache.writeData({
  data: {
    whatSidebar: 'category',
  },
});

export default client;
