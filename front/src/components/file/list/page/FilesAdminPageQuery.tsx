import gql from 'graphql-tag'

import React from 'react'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import SingleFileAdmin from './SingleFileAdmin'
// import { FILES_QUERY } from '../../GraphQL'
import Grid from '@material-ui/core/Grid'
import Pagination from '../../../nav/Pagination'
import { useQuery } from '@apollo/react-hooks'

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
          isDeleted
          type
          typeFile

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
          invoice {
            id
            smallId
          }
          createdBy {
            id
            firstName
            lastName
          }
          contract {
            id
            title1
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

type Props = {
  page: number
  variables: any
}

const FilesAdminPageQuery = (props: Props) => {
  const { loading, error, data } = useQuery(FILES_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.filesConnection) return <NotFound />

  return (
    <>
      {data.filesConnection.edges.map((fileNode) => (
        <div key={fileNode.node.id}>
          <SingleFileAdmin file={fileNode.node} />
        </div>
      ))}
      <Grid container>
        <Grid item xs={12} sm={9} className="marginAuto">
          <Pagination page={props.page} first={props.variables.first} count={data.filesConnection.aggregate.count} />
        </Grid>
      </Grid>
    </>
  )
}

export default FilesAdminPageQuery
