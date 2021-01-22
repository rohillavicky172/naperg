import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import NotFound from '../../../nav/error/NotFound'

import ReviewRequesAdminSingle from './ReviewRequesAdminSingle'
import Pagination from '../../../nav/Pagination'
import Icon from '@material-ui/core/Icon'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'

import gql from 'graphql-tag'
import { ReviewRequestNode } from '../../ReviewRequest.type'

export const QUERY = gql`
  query ReviewRequestsAdminConnection(
    $where: ReviewRequestWhereInput!
    $orderBy: ReviewRequestOrderByInput
    $skip: Int
    $first: Int
  ) {
    reviewRequestsAdminConnection(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      edges {
        node {
          id
          createdAt
          firstName
          lastName
          email
          privateMessageInviter
          createdAt
          product {
            id
            name
          }
          companieRequester {
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

const ReviewRequetsQueryAdmin = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const { loading, error, data, refetch } = useQuery(QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.reviewRequestsAdminConnection) return <NotFound />

  const refetchF = async () => {
    setIsLoading(true)
    await refetch()
    setIsLoading(false)
  }

  return (
    <div className="paperOut">
      <ButtonLoadingAfterClick
        id={'idButton'}
        icon={''}
        color={'primary'}
        disabled={false}
        variant={'outlined'}
        size={'medium'}
        buttonText={<Icon>refresh</Icon>}
        buttonLoadingText={`Loading...`}
        onClick={() => refetchF()}
        loading={isLoading}
      />

      {data.reviewRequestsAdminConnection.edges.map((reviewRequestNode: ReviewRequestNode) => (
        <ReviewRequesAdminSingle key={reviewRequestNode.node.id} reviewRequest={reviewRequestNode.node} />
      ))}
      <Pagination page={props.page} first={props.variables.first} count={data.reviewRequestsAdminConnection.aggregate.count} />
    </div>
  )
}

export default ReviewRequetsQueryAdmin
