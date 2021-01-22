import gql from 'graphql-tag'

export const CREATE_MERCHANT_DATA_MUTATION = gql`
  mutation CreateMerchantDataMutation($data: MerchantDataCreateInput!) {
    createMerchantData(data: $data) {
      id
      category
      city
      country
      name
      network_id
      postal_code
      state
    }
  }
`

export const UPDATE_MERCHANT_DATA_MUTATION = gql`
  mutation UpdateMerchantDataMutation($data: MerchantDataUpdateInput!, $where: MerchantDataWhereUniqueInput!) {
    updateMerchantData(data: $data, where: $where) {
      id
      category
      city
      country
      name
      network_id
      postal_code
      state
    }
  }
`

export const MERCHANT_DATAS_QUERY = gql`
  query MerchantDatas($where: MerchantDataWhereInput!) {
    merchantDatas(where: $where) {
      id
      createdAt
      category
      type
      city
      country
      name
      network_id
      postal_code
      product {
        id
        name
      }
      state
      invoices {
        id
        smallId
      }
    }
  }
`
export const DELETE_MERCHANT_DATA_MUTATION = gql`
  mutation DeleteMerchantData($where: MerchantDataWhereUniqueInput!) {
    deleteMerchantData(where: $where) {
      id
    }
  }
`
