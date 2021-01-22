import gql from 'graphql-tag'

export const UPDATE_PHONE_MUTATION = gql`
  mutation UpdatePhone($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updatePhone(data: $data, where: $where) {
      id
      phoneChangeRequested
      phoneCodeChangeRequested
      isPhoneValidated
      isPhoneChangeRequestedPending
      phone
      phoneCode
    }
  }
`
export const VERIFY_PHONE_MUTATION = gql`
  mutation VerifyPhone($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    verifyPhone(data: $data, where: $where) {
      id
      phoneChangeRequested
      phoneCodeChangeRequested
      isPhoneValidated
      isPhoneChangeRequestedPending
      phone
      phoneCode
    }
  }
`
