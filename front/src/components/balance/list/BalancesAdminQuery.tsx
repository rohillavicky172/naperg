import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { BALANCES_QUERY } from '../GraphQL'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import SingleAdminBalance from './SingleAdminBalance'
import Pagination from '../../nav/Pagination'
import Grid from '@material-ui/core/Grid'

type Props = {
  page: number
  variables: any
}

const BalancesAdminQuery = (props: Props) => {
  const { loading, error, data } = useQuery(BALANCES_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.balancesConnection) return <NotFound />

  return (
    <div>
      {data.balancesConnection.edges.map((nodeBalance) => (
        <SingleAdminBalance key={nodeBalance.node.id} balance={nodeBalance.node} />
      ))}
      <Grid container>
        <Grid item xs={12} sm={9} className="marginAuto">
          <Pagination page={props.page} first={props.variables.first} count={data.balancesConnection.aggregate.count} />
        </Grid>
      </Grid>
    </div>
  )
}

export default BalancesAdminQuery
