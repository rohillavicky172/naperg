import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import SingleCustomLink from './SingleCustomLink'

import gql from 'graphql-tag'

export const QUERY = gql`
  query CustomLinksConnection($where: CustomLinkWhereInput, $orderBy: CustomLinkOrderByInput, $first: Int, $skip: Int) {
    customLinksConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          createdAt
          link
          anchor

          product {
            id
            name
          }

          user {
            id
            nameFile
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
  productId: string
}

const CustomLinksQuery = (props: Props) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      orderBy: { createdAt: 'desc' },
      where: {
        productId: props.productId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.customLinksConnection) return <NotFound />

  return (
    <div className="paperOut">
      {data.customLinksConnection.edges.map((customLinkNode) => (
        <SingleCustomLink key={customLinkNode.node.id} customLink={customLinkNode.node} />
      ))}
    </div>
  )
}

export default CustomLinksQuery
