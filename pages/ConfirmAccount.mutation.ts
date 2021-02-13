import { gql } from '@apollo/client';

export const CONFIRM_ACCOUNT = gql`
  mutation CONFIRM_ACCOUNT($emailToken: String!) {
    confirmAccount(emailToken: $emailToken)
  }
`;
