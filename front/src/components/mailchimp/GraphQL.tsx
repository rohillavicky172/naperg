import gql from 'graphql-tag'

export const REFRESH_SENGRID_MUTATION = gql`


  mutation RefreshSendgrid($where: UserWhereInput!, $orderBy: UserOrderByInput, $skip: Int, $first: Int, $isPersonal: Boolean!) {

    refreshSendgrid(where: $where, orderBy: $orderBy, skip: $skip, first: $first, isPersonal: $isPersonal)
  }
`

