import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { PLAIDDATAS_QUERY } from '../GraphQL'
import SingleAdminPlaidData from '../single/SingleAdminPlaidData'
import Pagination from '../../nav/Pagination'

type Props = {
  page: number
  variables: any
}

const PlaidDatasQueryAdmin = (props: Props) => {
  const { loading, error, data } = useQuery(PLAIDDATAS_QUERY, {
    variables: props.variables,
  })
  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.plaidDatasConnection) return <NotFound />

  return (
    <>
      {data.plaidDatasConnection.edges.map((plaidDataNode) => (
        <SingleAdminPlaidData key={plaidDataNode.node.id} plaidData={plaidDataNode.node} />
      ))}
      <Pagination page={props.page} first={props.variables.first} count={data.plaidDatasConnection.aggregate.count} />
    </>
  )
}

export default PlaidDatasQueryAdmin
