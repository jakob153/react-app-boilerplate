import { gql } from '@apollo/client';

export const RESET_PASSWORD_CONFIRM_MUTATION = gql`
  mutation resetPasswordConfirm(
    $oldPassword: String!
    $newPassword: String!
    $emailToken: String!
  ) {
    resetPasswordConfirm(
      oldPassword: $oldPassword
      newPassword: $newPassword
      emailToken: $emailToken
    ) {
      success
    }
  }
`;