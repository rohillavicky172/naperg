import React from 'react'
import Error from '../../../nav/error/Error'
import CreateInvitationSeller from '../../../invitation/CreateInvitationSeller'
import TitlePage from '../../../nav/layout/titlePage/TitlePage'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import gql from 'graphql-tag'
import UserSellerTeamRow from './UserSellerTeamRow'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router'
import { ParamTypes } from '../../../ParamTypes.type'
// import { AppContext } from '../../../AppContext'
// import { Context } from '../../../Context.type'

export const QUERY = gql`
  query UsersTeamConnection($orderBy: UserOrderByInput, $companieId: String, $skip: Int, $first: Int) {
    usersTeamConnection(orderBy: $orderBy, companieId: $companieId, first: $first, skip: $skip) {
      edges {
        node {
          id
          email
          nameFile
          firstName
          lastName
          resetPasswordExpires
          lastLogin
          userRoleCompanies {
            id
            companieRole
            lastDateInvitationSent
            isInvitationApproved
            permissions
            companie {
              id
              name
              stripe_cus_id
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

const CompanieSellerTeamPage = () => {
  const params: ParamTypes = useParams<ParamTypes>()
  const companieId = params.companieId

  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      orderBy: 'firstName_ASC',
      companieId,
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />

  if (loading) return <Loading />

  if (!data) return <NotFound />

  return (
    <>
      <div className="paperOut">
        <TitlePage userId={''} type="companie" companieId={companieId} objectName="Members" />
        <CreateInvitationSeller companieId={companieId} />
        {data.usersTeamConnection.edges.map((userNode) => (
          <UserSellerTeamRow key={userNode.node.id} user={userNode.node} companieId={companieId} />
        ))}
      </div>
    </>
  )
}

export default CompanieSellerTeamPage
