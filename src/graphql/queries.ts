import gql from 'graphql-tag';

export const GET_USERINFO = gql`
  query GetUser($id: Int!) {
    getUser(id: $id) {
      nick
      email
      snsId
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories($id: Int!) {
    getCategories(id: $id) {
      user {
        id
        nick
      }
      domain
      subdomain
    }
  }
`;

export const GET_QUESTIONS = gql`
  query GetQuestions($id: Int!) {
    getQuestions(id: $id) {
      owner {
        id
        nick
      }
      category {
        domain
        subdomain
      }
      importance
      questionContent
      answer
    }
  }
`;
