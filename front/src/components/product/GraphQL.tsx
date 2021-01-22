import gql from 'graphql-tag'

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProductMutation($data: ProductUpdateInput!, $where: ProductWhereUniqueInput!) {
    updateProduct(data: $data, where: $where) {
      id
      subscribed
      name
      subName
      textButton
      urlName
      discount
      visibility
      # loginLink
      policyLink
      privateData
      sellerLink

      # communicationWithSellerType
      typeProduct
      productFrequency
      creationType
      nameFile
      nameFileBanner
      productDescription
      shortDescription
    }
  }
`

export const MERGE_PRODUCT_MUTATION = gql`
  mutation MergeProduct($fromProductId: String!, $toProductId: String!) {
    mergeProduct(fromProductId: $fromProductId, toProductId: $toProductId) {
      id
    }
  }
`

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProductMutation($data: ProductCreateInput!) {
    createProduct(data: $data) {
      id
      urlName
    }
  }
`

export const PRODUCT_QUERY = gql`
  query ProductQuery($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      id
      subscribed
      name
      urlName
      discount
      typeProduct
      productFrequency
      creationType
      ruleMerchantDatas {
        id
      }

      # ownerCompanie {
      #   id
      #   name
      # }
      # loginLink
      policyLink
      privateData
      sellerLink
      # sellerApiName
      # communicationWithSellerType

      promotions {
        id
        discount
        startAt
        text1
        text2
        text3
        endAt
      }

      nameFile
      nameFileBanner
      productDescription
      shortDescription
      # owners {
      #   id
      #   email
      #   firstName
      #   lastName
      # }
      visibility

      # subscriptions(
      #   where: { testMode: $testMode, companie: { id: $companieId }, user: { id: $userId } }
      #   orderBy: createdAt_DESC
      # ) {
      #   id
      #   status
      #   createdAt
      #   testMode
      #   product {
      #     id
      #     name
      #   }
      #   user {
      #     id
      #   }
      # }
      positionProducts {
        id
        categorieProduct {
          id
          urlName
          name
          visibility
        }
      }
    }
  }
`

export const PRODUCT_SIMPLE_QUERY = gql`
  query ProductQuery($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      id
      subscribed
      name
      urlName
      discount
      # loginLink
      policyLink
      privateData
      sellerLink
      # sellerApiName
      communicationWithSellerType

      nameFile
      nameFileBanner
      productDescription
      shortDescription
    }
  }
`

export const PRODUCTS_QUERY = gql`
  query ProductsQueryConnection($orderBy: ProductOrderByInput, $where: ProductWhereInput, $skip: Int, $first: Int) {
    productsConnection(orderBy: $orderBy, where: $where, first: $first, skip: $skip) {
      edges {
        node {
          id
          urlName
          discount
          privateData

          name
          nameFile
          promotions {
            id
            discount
            startAt
            endAt
          }
        }
      }
      aggregate {
        count
      }
    }
  }
`

export const DELETE_SELLER_MUTATION = gql`
  mutation deleteProduct($where: ProductWhereUniqueInput!) {
    deleteProduct(where: $where) {
      id
    }
  }
`
