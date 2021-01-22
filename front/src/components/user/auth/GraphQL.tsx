import gql from 'graphql-tag'

export const FORGET_PASSWORD_MUTATION = gql`
  mutation ForgetPasswordMutation($email: String!) {
    forgetPassword(email: $email) {
      firstName
      lastName
      id
      resetPasswordExpires
    }
  }
`
// export const MAGIC_LINK_MUTATION = gql`
//   mutation MagicLinkMutation($email: String!) {
//     magicLink(email: $email) {
//       firstName
//       lastName
//       id
//       resetPasswordExpires
//     }
//   }
// `
export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!, $timeZone: String, $authDevice: AuthDeviceUpdateInput!) {
    login(email: $email, password: $password, timeZone: $timeZone, authDevice: $authDevice) {
      token
      authDevice {
        id
        deviceToken
        isVerified
      }
      user {
        id
        firstName
        lastName
        email
        userRoleCompanies {
          id
          companieRole
          permissions
          companie {
            id
            name
            isPersonal
            typeCompanie
          }
        }
      }
    }
  }
`

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPasswordMutation(
    $password: String!
    $resetPasswordToken: String!
    $firstName: String
    $lastName: String
    $authDevice: AuthDeviceUpdateInput!
  ) {
    resetPassword(
      password: $password
      resetPasswordToken: $resetPasswordToken
      firstName: $firstName
      lastName: $lastName
      authDevice: $authDevice
    ) {
      token
      authDevice {
        id
        deviceToken
        isVerified
      }
      user {
        id
        firstName
        lastName
        email
        userRoleCompanies {
          id
          companieRole
          permissions
          companie {
            id
            name
            typeCompanie
            isPersonal
          }
        }
      }
    }
  }
`

export const SIGNUP_SELLER_MUTATION = gql`
  mutation SignupSellerMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $productName: String!
    $authDevice: AuthDeviceUpdateInput!
  ) {
    signupSeller(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      productName: $productName
      authDevice: $authDevice
    ) {
      token
      authDevice {
        id
        deviceToken
        isVerified
      }
      user {
        id
        lastName
        firstName
        email
        userRoleCompanies {
          id
          companieRole
          permissions
          companie {
            id
            name
            typeCompanie
            isPersonal
          }
        }
      }
    }
  }
`

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $authDevice: AuthDeviceUpdateInput!
    $signupType: String!
    $companie: CompanieCreateInput
    $invitedByCompanieId: String!
    $privateMessageInviter: String!
  ) {
    createUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      authDevice: $authDevice
      signupType: $signupType
      companie: $companie
      invitedByCompanieId: $invitedByCompanieId
      privateMessageInviter: $privateMessageInviter
    ) {
      id
      lastName
      firstName
      email
      # userRoleCompanies {
      #   id
      #   companieRole
      #   permissions
      #   companie {
      #     id
      #     name
      #     typeCompanie
      #     isPersonal
      #   }
      # }
    }
  }
`

export const SIGNUP_ADMIN_SELLER_MUTATION = gql`
  mutation SignupAdminSeller(
    $email: String!
    $firstName: String!
    $lastName: String!
    $companieName: String!
    $invitedByCompanieId: String!
    $productName: String!
  ) {
    signupAdminSeller(
      email: $email
      firstName: $firstName

      lastName: $lastName
      productName: $productName
      invitedByCompanieId: $invitedByCompanieId
      companieName: $companieName
    ) {
      id
    }
  }
`

export const SIGNUP_INVITE_SELLER_MUTATION = gql`
  mutation SignupInviteSeller(
    $email: String!
    $firstName: String!
    $lastName: String!
    $companieName: String!
    $invitedByCompanieId: String!
    $productName: String!
  ) {
    signupInviteSeller(
      email: $email
      firstName: $firstName

      lastName: $lastName
      productName: $productName
      invitedByCompanieId: $invitedByCompanieId
      companieName: $companieName
    ) {
      id
    }
  }
`

export const REGISTER_NEWSLETTER_MUTATION = gql`
  mutation RegisterNewsletterMutation($email: String!, $timeZone: String!) {
    registerNewsletter(email: $email, timeZone: $timeZone) {
      id
    }
  }
`

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePasswordMutation($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      id
    }
  }
`
export const VALIDATE_EMAIL_TOKEN_MUTATION = gql`
  mutation ValidateEmailMutation($validateEmailToken: String!) {
    validateEmail(validateEmailToken: $validateEmailToken)
  }
`
export const VALIDATE_INVITATION_TOKEN_MUTATION = gql`
  mutation ValidateInvitationMutation($invitationToken: String!) {
    validateInvitation(invitationToken: $invitationToken) {
      id
      name
    }
  }
`
