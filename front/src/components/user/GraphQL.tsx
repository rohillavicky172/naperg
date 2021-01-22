import gql from 'graphql-tag'

export const USERS_QUERY = gql`
  query UsersQueryConnection($orderBy: UserOrderByInput, $where: UserWhereInput, $skip: Int, $first: Int) {
    usersConnection(orderBy: $orderBy, where: $where, first: $first, skip: $skip) {
      edges {
        node {
          id
          role
          email
          signupType
          createdAt
          nameFile
          isPhoneValidated
          showInviteBuyer
          showInviteSeller
          isPhoneValidationRequired
          isEmailValidated
          resetPasswordRequest
          newsletter
          firstName

          lastName
          lastLogin
          invitedBy {
            id
            lastName
            firstName
          }
          invitedByCompanie {
            id
            name
          }
          userRoleCompanies {
            id
            companieRole
            isInvitationApproved

            companie {
              id
              name
              isTrustedPayment
              typeCompanie
              stripe_cus_id
              stripe_cus_test_id
              deletedLogically
              isVerified
              # userStripe {
              #   id

              #   sources {
              #     data {
              #       id
              #     }
              #   }
              # }
              subscriptions {
                id
              }
              sources {
                id
              }
              userRoleCompanies {
                id
              }
              invoices {
                id
              }
              issuedCards {
                id
              }
            }
          }
        }
      }
      aggregate {
        count
      }
    }
  }
`
export const USERS_QUERY_EXPORT = gql`
  query UsersQueryConnection($orderBy: UserOrderByInput, $where: UserWhereInput, $skip: Int, $first: Int) {
    usersConnection(orderBy: $orderBy, where: $where, first: $first, skip: $skip) {
      edges {
        node {
          id
          role
          email
          signupType
          createdAt
          nameFile
          newsletter
          firstName
          lastName
          lastLogin
          invitedBy {
            id
            lastName
            firstName
          }
          userRoleCompanies {
            id
            # companieRole
            # isInvitationApproved
            # permissions
            companie {
              id
              name
              # stripe_cus_id
              # stripe_cus_test_id
              # userStripe {
              #   id
              #   sources {
              #     data {
              #       id
              #     }
              #   }
              # }
              # subscriptions {
              #   id
              # }
              # userRoleCompanies {
              #   id
              # }
              # invoices {
              #   id
              # }
              # issuedCards {
              #   id
              # }
            }
          }
        }
      }
    }
  }
`
export const USERS_QUERY_LIGHT = gql`
  query UsersQueryConnection($orderBy: UserOrderByInput, $where: UserWhereInput, $skip: Int, $first: Int) {
    usersConnection(orderBy: $orderBy, where: $where, first: $first, skip: $skip) {
      edges {
        node {
          id

          email

          createdAt
          nameFile

          firstName
          lastName
          lastLogin
        }
      }
      aggregate {
        count
      }
    }
  }
`

// export const USERS_QUERY_ADD_ISSUED_CARD = gql`
//   query UsersQueryConnection($orderBy: UserOrderByInput, $where: UserWhereInput, $skip: Int, $first: Int, $companieId: ID) {
//     usersConnection(orderBy: $orderBy, where: $where, first: $first, skip: $skip) {
//       edges {
//         node {
//           id
//           email
//           nameFile
//           firstName
//           lastName
//           resetPasswordExpires
//           lastLogin
//           userRoleCompanies(where: { companie: { id: $companieId } }) {
//             id
//             companieRole
//             lastDateInvitationSent
//             isInvitationApproved
//             permissions
//             companie {
//               id
//               name
//               stripe_cus_id
//             }
//           }
//         }
//       }
//       aggregate {
//         count
//       }
//     }
//   }
// `

export const RESEND_INVITATION_IN_APP_RESET_PASSWORD_MUTATION = gql`
  mutation ResendInvitationInAppResetPassword($where: UserWhereUniqueInput!) {
    resendInvitationInAppResetPassword(where: $where) {
      id
    }
  }
`
// export const UPDATE_EXPIRES_DATE_PASSWORD = gql`
//   mutation UpdateExpiresDatePassword($userId: ID!) {
//     updateExpiresDatePassword(userId: $userId) {
//       id
//     }
//   }
// `

// export const USER_ADDRESS_QUERY = gql`
//   query UserQuery($where: UserWhereUniqueInput!) {
//     user(where: $where) {
//       id
//       firstName
//       lastName
//       address1
//       address2
//       city
//       zip
//       state
//       country
//     }
//   }
// `

// export const UPDATE_USER_ADDRESS_MUTATION = gql`
//   mutation UpdateUserMutation($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
//     updateUser(data: $data, where: $where) {
//       id
//       firstName
//       lastName
//       address1
//       address2
//       city
//       zip
//       state
//       birthday
//       country
//     }
//   }
// `

export const USER_QUERY = gql`
  query UserQuery($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      email
      createdAt
      isTwoFactorTotpVerified
      lastLogin
      enabled2FA
      unsubscribe

      enabled2FAPhone
      enabled2FAEmail
      enabled2FATotp

      showInviteBuyer
      showInviteSeller
      inviteMembersTooltip
      createIssuedCardsTooltip
      switchAccountsTooltip

      createIssuedCardTooltip
      dateTotpVerified
      actionIssuedCardTooltip
      spendingLimitIssuedCardTooltip
      expiryDateIssuedCardTooltip
      copyClipboardIssuedCardTooltip

      emailChangeRequested
      isEmailValidated
      role
      privateData
      stripe_cus_id
      last4Social
      isSuspended
      stripe_cus_test_id
      isPhoneChangeRequestedPending
      isPhoneValidationRequired
      phone
      phoneCode
      phoneChangeRequested
      phoneCodeChangeRequested
      isPhoneValidated
      isPhoneValidationRequired
      sendGridId
      firstName
      lastName
      nameFile
      timeZone
      gender
      newsletter

      linkedInLink
      twitterLink
      facebookLink
      instagramLink

      # getEmailTransactionSuccess
      # address1
      # address2
      # city
      # zip
      # state
      name
      signupType
      # country
      birthday
      language
      userRoleCompanies {
        id
      }
      # products {
      #   id
      #   urlName
      #   # sellerApiName
      #   nameFile
      #   name
      # }
    }
  }
`

export const USER_EXISTS_BY_EMAIL_QUERY = gql`
  query UserExistsByEmailQuery($email: String!) {
    userExistsByEmailQuery(email: $email) {
      id
      email
    }
  }
`

export const UPDATE_USER_EMAIL_MUTATION = gql`
  mutation UpdateUserEmailMutation($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUserEmail(data: $data, where: $where) {
      id
      email
      emailChangeRequested
    }
  }
`

// export const USER_PRICING_QUERY = gql`
//   query GetUserPricing($userId: String!, $forecastSubscriptionToRemove: String, $forecastVariationToAdd: String) {
//     getUserPricing(
//       userId: $userId
//       forecastSubscriptionToRemove: $forecastSubscriptionToRemove
//       forecastVariationToAdd: $forecastVariationToAdd
//     ) {
//       myDiscount
//       sumSubscriptions
//       monthlyCost
//     }
//   }
// `
