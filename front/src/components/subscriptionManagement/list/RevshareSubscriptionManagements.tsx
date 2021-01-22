import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Loading from '../../nav/error/Loading'
import Error from '../../nav/error/Error'
import CreateSubscriptionManagement from '../CreateSubscriptionManagement'
import DeleteSubscriptionManagement from '../DeleteSubscriptionManagement'
import { SubscriptionManagementNode } from '../SubscriptionManagement.type'
import DateComponent from '../../nav/DateComponent'
import { Button, Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'

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
          statusSubscriptionManagement
          typeSubscriptionManagement
          dateStatus
          user {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`
type Props = {
  subscriptionId: string
}

const RevshareSubscriptionManagements = (props: Props) => {
  const { loading, error, data, refetch } = useQuery(QUERY, {
    variables: {
      where: {
        typeSubscriptionManagement: 'REVSHARE',
        subscription: {
          id: props.subscriptionId,
        },
      },
    },
  })
  if (loading) return <Loading />
  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />

  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <h3>REVSHARE</h3>
        {data.subscriptionManagementsConnection.edges.length > 0 ? (
          <>
            {' '}
            {data.subscriptionManagementsConnection.edges.map((subscriptionManagementNode: SubscriptionManagementNode) => (
              <div key={subscriptionManagementNode.node.id}>
                {subscriptionManagementNode.node.statusSubscriptionManagement === 'REJECTED' && (
                  <>
                    Marked as "Not new user" by {subscriptionManagementNode.node.user.firstName} on{' '}
                    <DateComponent date={subscriptionManagementNode.node.dateStatus} />{' '}
                  </>
                )}
                <DeleteSubscriptionManagement
                  onDelete={() => refetch()}
                  subscriptionManagement={subscriptionManagementNode.node}
                />

                <div className="paperOut">
                  <Paper className="paperIn">
                    <h3>ADMIN</h3>
                    <div>statusSubscriptionManagement: {subscriptionManagementNode.node.statusSubscriptionManagement}</div>
                    <div>typeSubscriptionManagement: {subscriptionManagementNode.node.typeSubscriptionManagement}</div>
                    <Link className="link" to={'/logs?subscriptionManagementId=' + subscriptionManagementNode.node.id}>
                      <Button>Logs</Button>
                    </Link>
                  </Paper>
                </div>
              </div>
            ))}
          </>
        ) : (
          <CreateSubscriptionManagement
            typeSubscriptionManagement={'REVSHARE'}
            onCreate={() => refetch()}
            subscriptionId={props.subscriptionId}
          />
        )}
      </Paper>
    </div>
  )
}

export default RevshareSubscriptionManagements
