import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import SingleUserRoleCompanieReview from './SingleUserRoleCompanieReview'
import gql from 'graphql-tag'

const QUERY = gql`
  query UserRoleCompaniesConnection(
    $where: UserRoleCompanieWhereInput
    $orderBy: UserRoleCompanieOrderByInput
    $skip: Int
    $first: Int
  ) {
    userRoleCompaniesConnection(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      edges {
        node {
          id
          isSelectedForReview
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
  variables: any
}

const UserRoleCompanieReviewQuery = (props: Props) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.userRoleCompaniesConnection) return <NotFound />

  return (
    <>
      <h3>Reviews</h3>
      <h4>Choose the company on whose behalf you will write your product review.</h4>
      {data.userRoleCompaniesConnection.edges.map((userRoleCompanieNode) => (
        <SingleUserRoleCompanieReview key={userRoleCompanieNode.node.id} userRoleCompanie={userRoleCompanieNode.node} />
      ))}
    </>
  )
}

export default UserRoleCompanieReviewQuery
