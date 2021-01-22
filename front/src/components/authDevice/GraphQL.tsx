import gql from 'graphql-tag'

export const DELETE_AUTH_DEVICE_MUTATION = gql`
  mutation DeleteAuthDevice($where: AuthDeviceWhereUniqueInput!) {
    deleteAuthDevice(where: $where) {
      id
    }
  }
`
export const UPDATE_AUTH_DEVICE_MUTATION = gql`
  mutation UpdateAuthDevice($data: AuthDeviceUpdateInput!, $where: AuthDeviceWhereUniqueInput!) {
    updateAuthDevice(data: $data, where: $where) {
      id
      isVerified
    }
  }
`
export const VERIFY_AUTH_DEVICE_MUTATION = gql`
  mutation VerifyAuthDevice($data: AuthDeviceUpdateInput!, $where: AuthDeviceWhereUniqueInput!) {
    verifyAuthDevice(data: $data, where: $where) {
      id
      deviceToken
      isVerified
    }
  }
`
export const REQUEST_VERIFY_AUTH_DEVICE_MUTATION = gql`
  mutation RequestVerifyAuthDevice($method: String!) {
    requestVerifyAuthDevice(method: $method) {
      id
    }
  }
`

// export const SEND_EMAIL_VALIDATE_AUTHDEVICE_MUTATION = gql`
//   mutation SendEmailValidateAuthDeviceMutation {
//     sendEmailValidateAuthDeviceMutation
//   }
// `
