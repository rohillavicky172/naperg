import React from 'react'
import Error from '../../../nav/error/Error'
import gql from 'graphql-tag'
import { useParams } from 'react-router'
import { ParamTypes } from '../../../ParamTypes.type'
import CreateInvitation from '../../../invitation/CreateInvitation'
import TitlePage from '../../../nav/layout/titlePage/TitlePage'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import UserTeamRow from './UserTeamRow'
import { useQuery } from '@apollo/react-hooks'

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

const CompanieTeamContainer = () => {
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

        <CreateInvitation companieId={companieId} />

        {data.usersTeamConnection.edges.map((userNode) => (
          <UserTeamRow key={userNode.node.id} user={userNode.node} companieId={companieId} />
        ))}
      </div>
    </>
  )
}

export default CompanieTeamContainer
