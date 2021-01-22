import React from 'react'
import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import { useHistory } from 'react-router-dom'
import NotFound from '../nav/error/NotFound'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import BannerGetStarted from './BannerGetStarted'

export const QUERY = gql`
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
        }
      }
    }
  }
`

type Props = {
  companieId: string
}

const WizardBannerTeam = (props: Props) => {
  const history = useHistory()
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      where: {
        // isInvitationApproved: true,
        companie: {
          deletedLogically: false,
          id: props.companieId,
        },
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.userRoleCompaniesConnection) return <NotFound />

  const done = data.userRoleCompaniesConnection.edges.length > 1
  return (
    <BannerGetStarted
      done={done}
      shwowActionButton={!done}
      actionText={'+ Member'}
      onClick={() => history.push(`/createIssuedCard/`)}
      message={'Invite your first team member. You can then allocate NachoCards to them too.'}
    />
  )
}

export default WizardBannerTeam
