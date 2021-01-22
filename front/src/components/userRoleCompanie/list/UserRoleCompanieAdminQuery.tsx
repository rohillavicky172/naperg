import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Pagination from '../../nav/Pagination'
import Loading from '../../nav/error/Loading'
import SingleUserRoleCompanieAdmin from './SingleUserRoleCompanieAdmin'
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
          createdAt
          companieRole
          permissions
          isInvitationApproved
          sendEmailInvoiceSuccessful
          sendEmailMyInvoiceSuccessful
          sendSlackInvoiceSuccessful
          sendSlackMyInvoiceSuccessful
          isDeleted
          showSetupGuide
          showNoDataPageHome
          showNoDataPagePaymentSource
          showNoDataPageTeam
          showNoDataPageIssuedCard
          showNoDataPageSubscription
          showNoDataPageInvoice
          user {
            id
            firstName
            lastName
            isPhoneValidated
            isEmailValidated
            email
            nameFile
          }
          companie {
            id
            name
            typeCompanie
            isPersonal
            isTrustedPayment
            isVerified
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
  showPagination: boolean
}

const UserRoleCompanieAdminQuery = (props: Props) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.userRoleCompaniesConnection) return <NotFound />

  return (
    <>
      {data.userRoleCompaniesConnection.edges.map((userRoleCompanieNode) => (
        <SingleUserRoleCompanieAdmin key={userRoleCompanieNode.node.id} userRoleCompanie={userRoleCompanieNode.node} />
      ))}
      {props.showPagination && (
        <Pagination page={props.page} first={props.variables.first} count={data.userRoleCompaniesConnection.aggregate.count} />
      )}
    </>
  )
}

export default UserRoleCompanieAdminQuery
