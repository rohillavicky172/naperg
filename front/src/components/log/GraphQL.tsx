import gql from 'graphql-tag'

export const CREATE_LOG_MUTATION = gql`
  mutation CreateLog($data: LogCreateInput!) {
    createLog(data: $data) {
      id
    }
  }
`
