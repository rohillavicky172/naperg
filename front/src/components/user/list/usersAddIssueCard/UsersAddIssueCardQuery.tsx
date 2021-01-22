import React from 'react'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useLocation, useHistory } from 'react-router-dom'
import UserAddIssueCard from './UserAddIssueCard'
import NotFound from '../../../nav/error/NotFound'
const queryString = require('query-string')

export const QUERY = gql`
  query UsersTeamConnection($orderBy: UserOrderByInput, $companieId: String, $skip: Int, $first: Int) {
    usersTeamConnection(orderBy: $orderBy, companieId: $companieId, first: $first, skip: $skip) {
      edges {
        node {
          id
          email
          nameFile
          firstName
          lastName
          resetPasswordExpires
          lastLogin
          userRoleCompanies {
            id
            companieRole
            # lastDateInvitationSent
            # isInvitationApproved
            permissions
            # companie {
            #   id
            #   name
            #   stripe_cus_id
            # }
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
  variables: any
}

const UsersAddIssueCardQuery = (props: Props) => {
  const history = useHistory()
  const location = useLocation()

  const { loading, error, data } = useQuery(QUERY, {
    variables: props.variables,
  })
  React.useEffect(() => {
    if (data?.usersTeamConnection?.edges) {
      if (data.usersTeamConnection.edges.length === 1) {
        const parsed = queryString.parse(location.search)
        history.replace('/createIssuedCard/' + data.usersTeamConnection.edges[0].node.id + '?' + queryString.stringify(parsed))
      }
    }
  }, [data, history, location])
  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.usersTeamConnection) return <NotFound />

  // componentDidMount = () => {
  //   this.redirectIfUniqueUser()
  // }
  // componentDidUpdate = (prevProps: Props) => {
  //   if (this.props.usersQuery !== prevProps.usersQuery) {
  //     this.redirectIfUniqueUser()
  //   }
  // }

  const { edges } = data.usersTeamConnection
  return <div>{edges && edges.map((userNode) => <UserAddIssueCard key={userNode.node.id} user={userNode.node} />)}</div>
}

export default UsersAddIssueCardQuery
