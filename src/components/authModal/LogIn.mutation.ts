import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation logIn($input: AuthInput!) {
    logIn(input: $input) {
      user {
        email
      }
    }
  }
`;
