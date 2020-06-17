import { gql } from '@apollo/client';

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($username: String!, $email: String!) {
    resetPassword(username: $username, email: $email) {
      success
    }
  }
`;
