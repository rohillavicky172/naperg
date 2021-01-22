import React from 'react'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import { PLAID_BALANCE_HISTORICALS_QUERY } from '../GraphQL'
import SinglePlaidBalanceHistorical from '../single/SinglePlaidBalanceHistorical'
import Pagination from '../../nav/Pagination'

import { useQuery } from '@apollo/react-hooks'

type Props = {
  page: number
  variables: any
}

const PlaidBalanceHistoricalQuery = (props: Props) => {
  const { loading, error, data } = useQuery(PLAID_BALANCE_HISTORICALS_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.plaidBalanceHistoricalsConnection) return <NotFound />

  return (
    <>
      {data.plaidBalanceHistoricalsConnection.edges.map((plaidBalanceHistorical) => (
        <SinglePlaidBalanceHistorical key={plaidBalanceHistorical.node.id} plaidBalanceHistorical={plaidBalanceHistorical.node} />
      ))}
      <Pagination
        page={props.page}
        first={props.variables.first}
        count={data.plaidBalanceHistoricalsConnection.aggregate.count}
      />
    </>
  )
}

export default PlaidBalanceHistoricalQuery
