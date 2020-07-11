import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation logIn($usernameOrEmail: String!) {
    logIn(usernameOrEmail: $usernameOrEmail) {
      user {
        username
        email
        authToken
      }
    }
  }
`;
