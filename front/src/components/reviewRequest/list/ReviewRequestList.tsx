import gql from 'graphql-tag'

import React from 'react'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { useQuery } from '@apollo/react-hooks'
import { ReviewRequestNode } from '../ReviewRequest.type'
import ReviewRequesSingle from './ReviewRequesSingle'

export const FILES_QUERY = gql`
  query ReviewRequestsConnection($where: ReviewRequestWhereInput!, $orderBy: ReviewRequestOrderByInput, $skip: Int, $first: Int) {
    reviewRequestsConnection(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      edges {
        node {
          id
          createdAt
          firstName
          lastName
          email
          companieName
          privateMessageInviter
          createdAt
          userRequester {
            id
            firstName
            lastName
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
  companieId: string
  productId: string
}

const ReviewRequestList = (props: Props) => {
  const { loading, error, data } = useQuery(FILES_QUERY, {
    variables: {
      where: {
        productId: props.productId,
        companieRequesterId: props.companieId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.reviewRequestsConnection) return <NotFound />

  return (
    <>
      {data.reviewRequestsConnection.edges.map((reviewRequestNode: ReviewRequestNode) => (
        <div key={reviewRequestNode.node.id}>
          <ReviewRequesSingle reviewRequest={reviewRequestNode.node} />
        </div>
      ))}
    </>
  )
}

export default ReviewRequestList
