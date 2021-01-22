import gql from 'graphql-tag'

export const TOTP_GENERATE_SECRET_MUTATION = gql`
  mutation TotpGenerateSecret {
    totpGenerateSecret
  }
`
export const TOTP_FIRST_VERIFY_MUTATION = gql`
  mutation TotpFirstVerify($token: String!) {
    totpFirstVerify(token: $token) {
      id
      isTwoFactorTotpVerified
    }
  }
`
export const TOTP_LOGIN_VERIFY_MUTATION = gql`
  mutation TotpLoginVerify($token: String!) {
    totpLoginVerify(token: $token) {
      id
      deviceToken
      isVerified
    }
  }
`
