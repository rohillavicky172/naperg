import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import NotFound from '../../../nav/error/NotFound'
import UserSingleList from './UserSingleList'
import Pagination from '../../../nav/Pagination'
import Grid from '@material-ui/core/Grid'
import { UserNode } from '../../User.type'

import gql from 'graphql-tag'

export const QUERY = gql`
  query UsersQueryConnection($orderBy: UserOrderByInput, $where: UserWhereInput, $skip: Int, $first: Int) {
    usersConnection(orderBy: $orderBy, where: $where, first: $first, skip: $skip) {
      edges {
        node {
          id
          role
          email
          signupType
          createdAt
          nameFile
          verificationStatus
          isPhoneValidated
          showInviteBuyer
          showInviteSeller
          isPhoneValidationRequired
          isEmailValidated
          resetPasswordRequest
          newsletter
          firstName

          lastName
          lastLogin
          invitedBy {
            id
            lastName
            firstName
          }
          invitedByCompanie {
            id
            name
          }
          userRoleCompanies {
            id
            companieRole
            isInvitationApproved

            companie {
              id
              name
              isTrustedPayment
              typeCompanie
              stripe_cus_id
              stripe_cus_test_id
              deletedLogically
              isVerified

              subscriptions {
                id
              }
              sources {
                id
              }
              userRoleCompanies {
                id
              }
              invoices {
                id
              }
              issuedCards {
                id
              }
            }
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

const UsersQuery = (props: Props) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: props.variables,
  })
  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.usersConnection) return <NotFound />

  const { edges } = data.usersConnection
  return (
    <div className="">
      <h3>{`${data.usersConnection.aggregate.count} Users`}</h3>

      {edges && edges.map((user: UserNode) => <UserSingleList key={user.node.id} user={user.node} />)}

      <Grid container>
        <Grid item xs={12} sm={9} className="marginAuto">
          <Pagination page={props.page} first={props.variables.first} count={data.usersConnection.aggregate.count} />
        </Grid>
      </Grid>
    </div>
  )
}

export default UsersQuery
