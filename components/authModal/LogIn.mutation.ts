import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation logIn($usernameOrEmail: String!, $password: String!) {
    logIn(usernameOrEmail: $usernameOrEmail, password: $password) {
      user {
        username
        email
        authToken
      }
    }
  }
`;
