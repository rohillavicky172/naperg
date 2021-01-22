import React from 'react'
import gql from 'graphql-tag'
import { Icon, IconButton } from '@material-ui/core/'
import { useApolloClient } from '@apollo/react-hooks'
import Tooltip from '@material-ui/core/Tooltip'
import { SPOOFED_USER_ID, USER_ROLE_COMPANIE, USER_ROLE_COMPANIE_ADMIN_WHILE_SPOOFING } from '../../../../../config/config'
import { User } from '../../../../user/User.type'
import { Context } from '../../../../Context.type'
import { AppContext } from '../../../../AppContext'
import { useHistory } from 'react-router-dom'

export const USER_QUERY_SPOOFING = gql`
  query UserQuerySpoofing($where: UserWhereUniqueInput!) {
    userSpoofing(where: $where) {
      id
      email
      firstName
      lastName
      role
      isSuspended
      userRoleCompanies {
        id
        companieRole
        isInvitationApproved
        permissions
        companie {
          id
          isVerified
          typeCompanie
          name
        }
      }
    }
  }
`

type Props = {
  user: User
}

const SpoofUser = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const history = useHistory()
  const client = useApolloClient()
  const spoofUserF = async () => {
    const variables = {
      where: {
        id: props.user.id,
      },
    }
    const dataQuery = await client.query({
      query: USER_QUERY_SPOOFING,
      variables: variables,
    })

    if (!dataQuery.data) {
      return
    }
    if (!dataQuery.data.userSpoofing) {
      return
    }

    let userRoleCompanie = JSON.parse(localStorage.getItem(USER_ROLE_COMPANIE) || '{}')
    localStorage.setItem(USER_ROLE_COMPANIE_ADMIN_WHILE_SPOOFING, JSON.stringify(userRoleCompanie))

    if (dataQuery.data.userSpoofing.userRoleCompanies.length) {
      localStorage.setItem(USER_ROLE_COMPANIE, JSON.stringify(dataQuery.data.userSpoofing.userRoleCompanies[0]))
      localStorage.setItem(SPOOFED_USER_ID, dataQuery.data.userSpoofing.id)
    }
    client.resetStore()

    history.push('/user/myAccount')
  }

  if (context.me.role !== 'ADMIN') {
    return null
  }

  return (
    <Tooltip title={`Admin: Login as ${props.user.firstName}`}>
      <IconButton onClick={() => spoofUserF()} size="small">
        <Icon className="textSize9">open_in_new</Icon>
      </IconButton>
    </Tooltip>
  )
}

export default SpoofUser
