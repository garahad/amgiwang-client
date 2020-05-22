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
      id
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
        id
        domain
        subdomain
      }
      importance
      questionContent
      answer
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation AddCategory($user: Int!, $domain: String!, $subdomain: String) {
    addCategory(user: $user, domain: $domain, subdomain: $subdomain)
  }
`;

export const ADD_QUESTION = gql`
  mutation AddQuestion(
    $owner: Int!
    $category: Int!
    $importance: ImportanceEnum!
    $questionContent: String!
    $answer: String!
  ) {
    addQuestion(
      owner: $owner
      category: $category
      importance: $importance
      questionContent: $questionContent
      answer: $answer
    )
  }
`;
