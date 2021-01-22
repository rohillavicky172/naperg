import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { useQuery } from '@apollo/react-hooks'
import { User } from '../../user/User.type'

type Props = {
  onClose: () => void
}

export const USER_QUERY = gql`
  query User($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      firstName
      lastName
      showInviteBuyer
      showInviteSeller
    }
  }
`

export interface IQuery {
  loading: any
  error?: any
  data?: {
    user: User
  }
}

const MenuListRight = (props: Props) => {
  // const isMobile = UseWindowDimensions.isMobile()
  const { context }: { context: Context } = React.useContext(AppContext)
  const history = useHistory()
  const { loading, error, data }: IQuery = useQuery(USER_QUERY, {
    variables: {
      where: {
        id: context.me.id,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data) return <NotFound />
  if (!data.user) return <NotFound />

  const onClose = () => {
    props.onClose()
  }

  return (
    <>
      <Link to={'/settings/' + context.me.id}>
        <MenuItem id={'settingUserLink'} onClick={() => onClose()}>
          <>Profile</>
        </MenuItem>
      </Link>
      {data.user.showInviteBuyer && (
        <>
          {context.userRoleCompanie.companie.typeCompanie === 'BUYER' && (
            <Link to={'/inviteUser'}>
              <MenuItem onClick={() => onClose()}>{`Invite Buyer`}</MenuItem>
            </Link>
          )}
        </>
      )}
      {/* {isMobile && (
        <a href="https://nachonacho.com/contact">
          <MenuItem onClick={() => onClose()}>{`Contact`}</MenuItem>
        </a>
      )} */}
      {data.user.showInviteSeller && (
        <>
          {context.userRoleCompanie.companie.typeCompanie === 'BUYER' && (
            <Link to={'/inviteSeller'}>
              <MenuItem onClick={() => onClose()}>{`Invite Seller`}</MenuItem>
            </Link>
          )}
        </>
      )}

      {context.userRoleCompanie.companie.typeCompanie === 'BUYER' && (
        <a href={'https://support.nachonacho.com/'}>
          <MenuItem onClick={() => onClose()}>{`Support`}</MenuItem>
        </a>
      )}

      <a href="https://nachonacho.com/contact">
        <MenuItem onClick={() => onClose()}>{`Contact`}</MenuItem>
      </a>

      <MenuItem
        onClick={() => {
          context.logout()
          history.push('/?mode=LOGOUT')
        }}>
        {`Log out`}{' '}
      </MenuItem>
    </>
  )
}

export default MenuListRight
