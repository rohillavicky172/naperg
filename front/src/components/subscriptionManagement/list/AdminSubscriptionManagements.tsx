import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Paper from '@material-ui/core/Paper'
import Loading from '../../nav/error/Loading'
import Error from '../../nav/error/Error'
import { useLocation } from 'react-router-dom'
import SingleSubscriptionManagement from './SingleSubscriptionManagement'
import queryString from 'query-string'
import Pagination from '../../nav/Pagination'
import Filters from '../../nav/filter/Filters'

const QUERY = gql`
  query SubscriptionManagementsConnection(
    $where: SubscriptionManagementWhereInput
    $orderBy: SubscriptionManagementOrderByInput
    $skip: Int
    $first: Int
  ) {
    subscriptionManagementsConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id

          createdAt
          user {
            id
            firstName
            lastName
          }
          subscription {
            id
          }
          dateStatus
          statusSubscriptionManagement
          typeSubscriptionManagement
        }
      }
      aggregate {
        count
      }
    }
  }
`

const AdminSubscriptionManagements = () => {
  const location = useLocation()
  const first = 10
  const parsed = queryString.parse(location.search)
  // const search = parsed.search ? parsed.search : undefined

  let subscriptionManagementId = parsed.subscriptionManagementId ? parsed.subscriptionManagementId : undefined
  let userId = parsed.userId ? parsed.userId : undefined
  let page: number = parsed.page ? Number(parsed.page) : 1
  const orderBy = 'createdAt_DESC'
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      where: {
        id: subscriptionManagementId,
        user: userId && {
          id: userId,
        },
      },
      first,
      orderBy,
      skip: (page - 1) * first,
    },
  })
  if (loading) return <Loading />
  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />

  return (
    <>
      <Filters showUserId={true} />
      {/* <CreateSubscriptionManagement /> */}
      {data.subscriptionManagementsConnection.edges.map((subscriptionManagementNode) => (
        <div key={subscriptionManagementNode.node.id}>
          <div className="paperOut">
            <Paper className="paperIn">
              <SingleSubscriptionManagement subscriptionManagement={subscriptionManagementNode.node} />
            </Paper>
          </div>
        </div>
      ))}
      <div>
        <Pagination page={page} first={first} count={data.subscriptionManagementsConnection.aggregate.count} />
      </div>
    </>
  )
}

export default AdminSubscriptionManagements
