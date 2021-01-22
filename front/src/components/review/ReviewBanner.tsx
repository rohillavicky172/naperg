import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'
import gql from 'graphql-tag'
import { Button, Icon } from '@material-ui/core'

import SingleReview from './list/SingleReview'
import { Product } from '../product/Product.type'

export const QUERY = gql`
  query ReviewsConnection($where: ReviewWhereInput, $orderBy: ReviewOrderByInput, $first: Int, $skip: Int) {
    reviewsConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          createdAt
          content
          userTypeReview
          rating

          userRoleCompanie {
            id
            companie {
              id
              name
            }
          }
          product {
            id
            urlName
          }

          user {
            id
            nameFile
            firstName
            shortLastName
          }
        }
      }
    }
  }
`

type Props = {
  product: Product
  userId: string
}

const ReviewBanner = (props: Props) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      where: {
        productId: props.product.urlName,
        userId: props.userId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.reviewsConnection) return <NotFound />
  if (data.reviewsConnection.edges.length === 0) {
    return (
      <a rel="noopener noreferrer" target="_blank" href={`https://nachonacho.com/productReview/${props.product.urlName}`}>
        <Button variant="outlined" color="primary">
          <Icon style={{ color: '#FFB400' }}>grade</Icon>
          <span className="white">_</span>
          Write a review
        </Button>
      </a>
    )
  }
  return (
    <>
      {data.reviewsConnection.edges.map((reviewNode) => (
        <SingleReview key={reviewNode.node.id} review={reviewNode.node} product={props.product} />
      ))}
    </>
  )
}

export default ReviewBanner
