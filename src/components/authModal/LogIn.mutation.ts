import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation logIn($input: LogInInput!) {
    logIn(input: $input) {
      user {
        username
        email
        authToken
      }
    }
  }
`;
