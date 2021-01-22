import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import SingleLog from '../single/SingleLog'
import Pagination from '../../nav/Pagination'
import Icon from '@material-ui/core/Icon'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
import gql from 'graphql-tag'

export const LOGS_QUERY = gql`
  query LogsConnection($where: LogWhereInput, $orderBy: LogOrderByInput, $first: Int, $skip: Int) {
    logsConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          date
          message
          json
          jsonError
          event
          product {
            id
          }
          plaidData {
            id
          }
          invoice {
            id
          }
          balance {
            id
          }
          campaign {
            id
          }
          sellerBalance {
            id
          }
          authDevice {
            id
          }
          source {
            id
          }
          charge {
            id
          }
          user {
            id
            firstName
            lastName
          }
          issuedCard {
            id
          }
          companie {
            id
          }
          cardholder {
            id
          }
          ruleMerchantData {
            id
          }
          subscriptionManagement {
            id
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

const LogsQuery = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const { loading, error, data, refetch } = useQuery(LOGS_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.logsConnection) return <NotFound />

  const refetchF = async () => {
    setIsLoading(true)
    await refetch()
    setIsLoading(false)
  }

  return (
    <div className="paperOut">
      <ButtonLoadingAfterClick
        id={'idButton'}
        icon={''}
        color={'primary'}
        disabled={false}
        variant={'outlined'}
        size={'medium'}
        buttonText={<Icon>refresh</Icon>}
        buttonLoadingText={`Loading...`}
        onClick={() => refetchF()}
        loading={isLoading}
      />

      {data.logsConnection.edges.map((logNode) => (
        <SingleLog key={logNode.node.id} log={logNode.node} />
      ))}
      <Pagination page={props.page} first={props.variables.first} count={data.logsConnection.aggregate.count} />
    </div>
  )
}

export default LogsQuery
