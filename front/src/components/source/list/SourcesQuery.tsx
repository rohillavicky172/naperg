import React from 'react'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import SingleSource from '../single/SingleSource'
import Paper from '@material-ui/core/Paper'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const SOURCES_QUERY = gql`
  query SourcesConnection($where: SourceWhereInput, $orderBy: SourceOrderByInput, $first: Int, $skip: Int) {
    sourcesConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          createdAt
          deletedAt
          isDefaultSource
          isDeleted
          last4
          status
          currency
          country
          routing_number
          customer
          externalId
          nickname

          brand
          bank_name
          object
          funding

          exp_month
          exp_year

          cvc_check
          dynamic_last4
          name
          plaidData {
            id
            verificationStatus
            resetLogin
          }
          companie {
            id
            name
          }

          account_holder_name
          account_holder_name
        }
      }
    }
  }
`
type Props = {
  variables: any
}

const SourcesQuery = (props: Props) => {
  const { loading, error, data } = useQuery(SOURCES_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.sourcesConnection) return <NotFound />

  return (
    <>
      {data.sourcesConnection.edges.map((sourceNode) => (
        <div key={sourceNode.node.id} className="paperOut">
          <Paper className="paperIn">
            <SingleSource source={sourceNode.node} />
          </Paper>
        </div>
      ))}
    </>
  )
}

export default SourcesQuery
