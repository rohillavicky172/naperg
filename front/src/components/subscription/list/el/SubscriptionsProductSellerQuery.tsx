import React from 'react'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import SingleSubscriptionListOwnerProduct from '../../single/listSingle/SingleSubscriptionListOwnerProduct'
import Pagination from '../../../nav/Pagination'
import Paper from '@material-ui/core/Paper'
import { useQuery } from '@apollo/react-hooks'
import { SubscriptionNode } from '../../subscription.type'
import gql from 'graphql-tag'

export const SUBSCRIPTIONS_QUERY = gql`
  query SubscriptionsSellerQueryConnection(
    $orderBy: SubscriptionOrderByInput
    $where: SubscriptionWhereInput
    $skip: Int
    $first: Int
  ) {
    subscriptionsSellerConnection(orderBy: $orderBy, where: $where, first: $first, skip: $skip) {
      edges {
        node {
          id
          createdAt
          lastInvoiceDate
          # averagePrice
          # countAveragePrice
          # paymentFrequency
          companie {
            id
            name
            canManageSellerSubscriptionManagement
            # isPersonal
          }
          issuedCard {
            id
            name
            status
            last4
          }
          user {
            id
            email
            firstName
            lastName
          }
          status
          # dateCancellation
          # subscriptionInvoices (orderBy: createdAt_DESC, first: 1) {
          #   id
          #   invoice {
          #     id
          #     createdAt
          #   }
          # }
          product {
            id
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

// class SubscriptionsProductSellerQuery extends React.Component<Props, State> {
const SubscriptionsProductSellerQuery = (props: Props) => {
  const { loading, error, data } = useQuery(SUBSCRIPTIONS_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.subscriptionsSellerConnection) return <NotFound />

  const { edges } = data.subscriptionsSellerConnection

  if (!edges.length) {
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <div className="responsiveMargin2 tac textSize11">{`You will see all your customers' subscriptions here.`}</div>
        </Paper>
      </div>
    )
  }

  return (
    <>
      <div className="paperIn">
        {edges &&
          edges.map((subscriptionNode: SubscriptionNode) => (
            <div key={subscriptionNode.node.id} className="paperOut">
              <Paper className="paperIn bgHover">
                <SingleSubscriptionListOwnerProduct subscription={subscriptionNode.node} />
              </Paper>
            </div>
          ))}

        <Pagination page={props.page} first={props.variables.first} count={data.subscriptionsSellerConnection.aggregate.count} />
      </div>
    </>
  )
}

export default SubscriptionsProductSellerQuery
