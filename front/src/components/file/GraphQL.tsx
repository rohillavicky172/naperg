import gql from 'graphql-tag'

export const FILES_QUERY = gql`
  query Files($where: FileWhereInput!, $orderBy: FileOrderByInput, $skip: Int, $first: Int) {
    filesConnection(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      edges {
        node {
          id
          description
          nameFile
          shortNameFile
          createdAt
          type

          subscription {
            id
            product {
              id
              name
            }
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
export const DELETE_FILE_MUTATION = gql`
  mutation DeleteFile($where: FileWhereUniqueInput!) {
    deleteFile(where: $where) {
      id
    }
  }
`
