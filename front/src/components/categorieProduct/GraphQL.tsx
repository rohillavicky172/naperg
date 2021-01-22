import gql from 'graphql-tag'

export const CATEGORIES_PRODUCTS_QUERY = gql`
  query CategorieProductsConnection(
    $where: CategorieProductWhereInput
    $orderBy: CategorieProductOrderByInput!
    $skip: Int
    $first: Int
  ) {
    categorieProductsConnection(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      edges {
        node {
          id
          name
          description
          nameFile
          nameFileIcon
          nameFileMobile
          orderByInt
          urlName
          visibility
          positionProducts(orderBy: orderByInt_ASC) {
            id
            product {
              id
              urlName
              name
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

export const CATEGORIES_SINGLE_PRODUCTS_QUERY = gql`
  query categorieSingleProducts($urlName: String!) {
    categorieSingleProducts(urlName: $urlName) {
      id
      name
      description
      nameFile
      nameFileIcon
      nameFileMobile
      orderByInt
      urlName
      visibility
      positionProducts(orderBy: orderByInt_ASC) {
        id
        orderByInt
        orderByHomeInt
        isFeatured
        product {
          id
          urlName
          shortDescription
          # communicationWithSellerType
          # discount
          promotions {
            id
            discount
            startAt
            endAt
          }
          name
          nameFile
          # subscribed
          # positionProducts {
          #   id
          #   categorieProduct {
          #     id
          #     urlName
          #     visibility
          #     name
          #   }
          # }
          # subscriptions {
          #   id
          #   testMode
          #   status
          #   createdAt

          #   product {
          #     id
          #     name
          #   }

          #   user {
          #     id
          #   }
          # }
        }
      }
    }
  }
`

export const UPDATE_CATEGORY_SELLER_MUTATION = gql`
  mutation UpdateCategorieProductMutation($data: CategorieProductUpdateInput!, $where: CategorieProductWhereUniqueInput!) {
    updateCategorieProduct(data: $data, where: $where) {
      id
      name
      description
      nameFile
      nameFileIcon
      nameFileMobile
      orderByInt
      urlName
      visibility
    }
  }
`

export const CREATE_CATEGORY_SELLER_MUTATION = gql`
  mutation CreateCategorieProductMutation($data: CategorieProductCreateInput!) {
    createCategorieProduct(data: $data) {
      id
      name
      nameFileIcon
      nameFile
      urlName
    }
  }
`

export const DELETE_MUTATION_CATEGORIE_PRODUCT = gql`
  mutation deleteCategorieProduct($where: CategorieProductWhereUniqueInput!) {
    deleteCategorieProduct(where: $where) {
      id
    }
  }
`
