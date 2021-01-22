import gql from 'graphql-tag'

export const CREATE_ADDRESSE_MUTATION = gql`
  mutation CreateAddresseMutation($data: AddresseCreateInput!) {
    createAddresse(data: $data) {
      id
    }
  }
`

export const UPDATE_ADDRESSE_MUTATION = gql`
  mutation UpdateAddresseMutation($data: AddresseUpdateInput!, $where: AddresseWhereUniqueInput!) {
    updateAddresse(data: $data, where: $where) {
      id
      name
      type
      address1
      address2
      city
      zip
      state
      country
    }
  }
`

export const ADDRESSES_QUERY = gql`
  query Addresses($where: AddresseWhereInput, $orderBy: AddresseOrderByInput, $skip: Int, $first: Int) {
    addresses(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      id
      name
      type
      address1
      address2
      city
      zip
      state
      country
    }
  }
`
export const DELETE_ADDRESSE_MUTATION = gql`
  mutation DeleteAddresse($where: AddresseWhereUniqueInput!) {
    deleteAddresse(where: $where) {
      id
    }
  }
`
