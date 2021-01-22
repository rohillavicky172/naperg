import gql from 'graphql-tag'

export const CREATE_DATAPRODUCT_MUTATION = gql`
  mutation CreateDataProductMutation($data: DataProductCreateInput!) {
    createDataProduct(data: $data) {
      id
      website
      productName
      note
      category
    }
  }
`

export const UPDATE_DATAPRODUCT_MUTATION = gql`
  mutation UpdateDataProductMutation($data: DataProductUpdateInput!, $where: DataProductWhereUniqueInput!) {
    updateDataProduct(data: $data, where: $where) {
      id
      website
      productName
      note
      category
    }
  }
`

export const DATAPRODUCTS_QUERY = gql`
  query DataProducts($where: DataProductWhereInput!, $orderBy: DataProductOrderByInput, $skip: Int, $first: Int) {
    dataProductsConnection(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      edges {
        node {
          id
          createdAt
          website
          productName
          note
          category
          product {
            id
            name
          }
          user {
            id
            firstName
            lastName
          }
          companie {
            id
            name
          }
        }
      }
      aggregate {
        count
      }
    }
  }
`
export const DELETE_DATAPRODUCT_MUTATION = gql`
  mutation DeleteDataProduct($where: DataProductWhereUniqueInput!) {
    deleteDataProduct(where: $where) {
      id
    }
  }
`
