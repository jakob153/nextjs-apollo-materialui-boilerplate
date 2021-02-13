import { gql } from '@apollo/client';

export const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $newPassword: String!
    $changePasswordToken: String!
  ) {
    changePassword(
      newPassword: $newPassword
      changePasswordToken: $changePasswordToken
    )
  }
`;
