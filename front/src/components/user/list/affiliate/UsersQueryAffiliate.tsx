import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import NotFound from '../../../nav/error/NotFound'
import { USERS_QUERY } from '../../GraphQL'
import UserSingleAffiliate from './UserSingleAffiliate'
import Pagination from '../../../nav/Pagination'
import Grid from '@material-ui/core/Grid'

type Props = {
  page: number
  variables: any
}

const UsersQueryAffiliate = (props: Props) => {
  const { loading, error, data } = useQuery(USERS_QUERY, {
    variables: props.variables,
  })
  if (error) {
    return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  }

  if (loading) {
    return <Loading />
  }

  if (!data.usersConnection) {
    return <NotFound />
  }

  const { edges } = data.usersConnection
  return (
    <div className="">
      {edges && edges.map((user) => <UserSingleAffiliate key={user.node.id} user={user.node} />)}

      <Grid container>
        <Grid item xs={12} sm={9} className="marginAuto">
          <Pagination page={props.page} first={props.variables.first} count={data.usersConnection.aggregate.count} />
        </Grid>
      </Grid>
    </div>
  )
}

export default UsersQueryAffiliate
