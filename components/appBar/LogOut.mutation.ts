import { gql } from '@apollo/client';

export const LOG_OUT = gql`
  mutation logOut {
    logOut {
      success
    }
  }
`;
