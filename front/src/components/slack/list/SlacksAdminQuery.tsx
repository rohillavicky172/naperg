import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import SingleAdminSlack from './SingleAdminSlack'
import Pagination from '../../nav/Pagination'
// import Icon from '@material-ui/core/Icon'
// import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
import gql from 'graphql-tag'

export const QUERY = gql`
  query SlacksConnection($where: SlackWhereInput, $orderBy: SlackOrderByInput, $first: Int, $skip: Int) {
    slacksConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          createdAt
          team_name
          authed_user_id
          user {
            id
            firstName
            lastName
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

const SlacksAdminQuery = (props: Props) => {
  // const [isLoading, setIsLoading] = React.useState(false)

  const { loading, error, data } = useQuery(QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.slacksConnection) return <NotFound />

  return (
    <div className="paperOut">
      {data.slacksConnection.edges.map((slackNode) => (
        <SingleAdminSlack key={slackNode.node.id} slack={slackNode.node} />
      ))}
      <Pagination page={props.page} first={props.variables.first} count={data.slacksConnection.aggregate.count} />
    </div>
  )
}

export default SlacksAdminQuery
