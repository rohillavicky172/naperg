import React from 'react'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import SingleUserRoleCompanieEmailNotification from './SingleUserRoleCompanieEmailNotification'
import SingleUserRoleCompanieSlackNotification from './SingleUserRoleCompanieSlackNotification'
import { useQuery } from '@apollo/react-hooks'
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
          showSetupGuide
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
  variables: any
}

const UserRoleCompanieQuery = (props: Props) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.userRoleCompaniesConnection) return <NotFound />

  return (
    <>
      {data.userRoleCompaniesConnection.edges.map((userRoleCompanieNode) => (
        <div key={userRoleCompanieNode.node.id}>
          <SingleUserRoleCompanieEmailNotification userRoleCompanie={userRoleCompanieNode.node} />
          <SingleUserRoleCompanieSlackNotification userRoleCompanie={userRoleCompanieNode.node} />
        </div>
      ))}
    </>
  )
}

export default UserRoleCompanieQuery
