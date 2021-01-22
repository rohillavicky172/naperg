import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { USER_QUERY } from '../../../user/GraphQL'
import Paper from '@material-ui/core/Paper'
import Loading from '../../../nav/error/Loading'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import AddressesQueryCreateIssuedCard from './AddressesQueryCreateIssuedCard'
import UserDobForm from '../../../user/single/profile/sectionDetails/UserDobForm'
import { User } from '../../../user/User.type'
import TitlePage from '../../../nav/layout/titlePage/TitlePage'
import UserNameForm from '../../../user/single/profile/UserNameForm'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
// import TitlePage from '../../../nav/layout/titlePage/TitlePage'

type Props = {
  userId: string
  companieId: string
}

const UserQueryCreateIssuedCard = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: {
      where: {
        id: props.userId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.user) return <NotFound />
  const user: User = data.user

  if (!user.firstName || !user.lastName) {
    return (
      <>
        <div className="paperOut">
          <Paper className="paperIn">
            <TitlePage companieId={''} type="user" objectName="NachoCard setup" userId={props.userId} />
            {`Please add Cardholder's Name.`}
            <UserNameForm user={user} />
          </Paper>
        </div>
      </>
    )
  }

  if (!user.birthday && context.me.id === user.id) {
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <UserDobForm user={user} />
        </Paper>
      </div>
    )
  }

  return (
    <AddressesQueryCreateIssuedCard
      user={user}
      companieId={props.companieId}
      variables={{ where: { companie: { id: props.companieId }, type: 'BILLING' }, first: 1 }}
    />
  )
}

export default UserQueryCreateIssuedCard
