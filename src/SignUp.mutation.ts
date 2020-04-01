import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation signUp($input: AuthInput!) {
    signUp(input: $input) {
      success
    }
  }
`;
