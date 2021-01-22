import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../nav/error/Error'
import NotFound from '../nav/error/NotFound'
import Loading from '../nav/error/Loading'
import { BALANCE_QUERY } from './GraphQL'
import SingleBalance from './SingleBalance'

type Props = {
  balanceId: string
}

const SingleBalanceQuery = (props: Props) => {
  const { loading, error, data } = useQuery(BALANCE_QUERY, {
    variables: {
      where: {
        id: props.balanceId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.balance) return <NotFound />

  return (
    <>
      <SingleBalance balance={data.balance} showActionsBalance={false} canAddTopUp={false} />
    </>
  )
}

export default SingleBalanceQuery
