import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    whatSidebar: String!
  }

  extend type Mutation {
    setSidebar(status: String!): Boolean
  }
`;
