import gql from 'graphql-tag';

export const GET_USERINFO = gql`
  query GetUser($id: Int!) {
    getUser(id: $id) {
      email
      nick
      snsId
    }
  }
`;
