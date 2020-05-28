import gql from 'graphql-tag';

export const GET_USERINFO = gql`
  query GetUser($id: Int!) {
    getUser(id: $id) {
      id
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
      id
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

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: Int!) {
    deleteQuestion(id: $id)
  }
`;

export const EDIT_QUESTION = gql`
  mutation EditQuestion(
    $id: Int!
    $owner: Int
    $category: Int
    $importance: ImportanceEnum
    $questionContent: String
    $answer: String
  ) {
    editQuestion(
      id: $id
      owner: $owner
      category: $category
      importance: $importance
      questionContent: $questionContent
      answer: $answer
    )
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: Int, $domain: String) {
    deleteQuestion(id: $id, domain: $domain)
  }
`;

// editCategory(id: Int!, domain: String, subdomain: String): Boolean!

export const EDIT_CATEGORY = gql`
  mutation EditCategory($id: Int!, $domain: String, $subdomain: String) {
    editCategory(id: $id, domain: $domain, subdomain: $subdomain)
  }
`;

// local query =============================

export const WHAT_SIDEBAR = gql`
  query WhatSidebar {
    whatSidebar @client
  }
`;

export const SET_SIDEBAR = gql`
  mutation SetSidebar($status: String!) {
    setSidebar(status: $status) @client
  }
`;
