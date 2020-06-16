import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      success
    }
  }
`;
