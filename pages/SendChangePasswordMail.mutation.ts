import { gql } from '@apollo/client';

export const SEND_CHANGE_PASSWORD_MAIL = gql`
  mutation sendChangePasswordMail($email: String!) {
    sendChangePasswordMail(email: $email)
  }
`;
