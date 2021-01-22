import React from 'react'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import NotFound from '../../../nav/error/NotFound'
import { USERS_QUERY_LIGHT } from '../../GraphQL'
import { UserNode } from '../../User.type'
import { useQuery } from '@apollo/react-hooks'
import UserSingleLight from './UserSingleLight'

type Props = {
  variables: any
}

const UsersQueryLight = (props: Props) => {
  const { loading, error, data } = useQuery(USERS_QUERY_LIGHT, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.usersConnection) return <NotFound />
  const { edges } = data.usersConnection
  return (
    <div className="">
      <h3>{`${data.usersConnection.aggregate.count} Users`}</h3>

      {edges && edges.map((user: UserNode) => <UserSingleLight key={user.node.id} user={user.node} />)}
    </div>
  )
}

export default UsersQueryLight
