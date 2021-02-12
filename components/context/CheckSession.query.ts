import { gql } from '@apollo/client';

export const CHECK_SESSION = gql`
  query CHECK_SESSION {
    checkSession {
      user {
        email
        username
      }
    }
  }
`;
