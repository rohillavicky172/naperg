import gql from 'graphql-tag'

export const CREATE_POSITION_PRODUCT_MUTATION = gql`
  mutation CreatePositionProduct($data: PositionProductCreateInput!) {
    createPositionProduct(data: $data) {
      id
    }
  }
`
export const DELETE_POSITION_PRODUCT_MUTATION = gql`
  mutation DeletePositionProduct($where: PositionProductWhereUniqueInput!) {
    deletePositionProduct(where: $where) {
      id
    }
  }
`

export const POSITION_PRODUCTS_QUERY = gql`
  query PositionProductsConnection(
    $where: PositionProductWhereInput
    $orderBy: PositionProductOrderByInput
    $first: Int
    $skip: Int
  ) {
    positionProductsConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          categorieProduct {
            id
            urlName
            nameFileIcon
            name
          }
        }
      }
    }
  }
`
