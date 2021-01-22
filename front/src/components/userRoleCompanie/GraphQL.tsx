import gql from 'graphql-tag'

export const QUERY_USER_ROLE_COMPANIE = gql`
  query UserRoleCompanie($where: UserRoleCompanieWhereUniqueInput!) {
    userRoleCompanie(where: $where) {
      id
      showSetupGuide
      showNoDataPageHome
      showNoDataPagePaymentSource
      showNoDataPageTeam
      showNoDataPageIssuedCard
      showNoDataPageSubscription
      showNoDataPageInvoice
    }
  }
`

export const UPDATE_USER_ROLE_COMPANIE_MUTATION = gql`
  mutation UpdateUserRoleCompanie($data: UserRoleCompanieUpdateInput!, $where: UserRoleCompanieWhereUniqueInput!) {
    updateUserRoleCompanie(data: $data, where: $where) {
      id
      companieRole
      showSetupGuide

      showNoDataPageHome

      showNoDataPagePaymentSource
      showNoDataPageTeam
      showNoDataPageIssuedCard
      showNoDataPageSubscription
      showNoDataPageInvoice

      sendEmailMyInvoiceSuccessful
      sendEmailInvoiceSuccessful

      sendSlackInvoiceSuccessful
      sendSlackMyInvoiceSuccessful
      permissions
    }
  }
`

export const UPDATE_COMPANIE_ROLE_MUTATION = gql`
  mutation UpdateCompanieRole($data: UserRoleCompanieUpdateInput!, $where: UserRoleCompanieWhereUniqueInput!) {
    updateCompanieRole(data: $data, where: $where) {
      id
      companieRole
      sendEmailInvoiceSuccessful
      sendEmailMyInvoiceSuccessful
      showSetupGuide
      showNoDataPageHome
      showNoDataPagePaymentSource
      showNoDataPageIssuedCard
      showNoDataPageSubscription
      showNoDataPageInvoice
    }
  }
`

export const USER_ROLE_COMPANIES_QUERY = gql`
  query UserRoleCompanies($where: UserRoleCompanieWhereInput!) {
    userRoleCompanies(where: $where) {
      id
      companieRole
      permissions
      companie {
        id
        name
        isPersonal
        typeCompanie
        isTrustedPayment
        isVerified
      }
    }
  }
`
