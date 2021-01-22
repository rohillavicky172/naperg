import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'
import gql from 'graphql-tag'
import { useHistory } from 'react-router-dom'
import BannerGetStarted from './BannerGetStarted'

export const QUERY = gql`
  query UserQuery($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      birthday
      signupType
    }
  }
`

type Props = {
  userId: string
}

const WizardBannerDob = (props: Props) => {
  const history = useHistory()
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      where: {
        id: props.userId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.user) return <NotFound />
  const done = data.user.birthday
  return (
    <BannerGetStarted
      done={done}
      actionText="+ Date of Birth"
      message="Add your date of birth. NachoNacho has a regulatory requirement to conduct ongoing monitoring and due diligence of users on our platform."
      shwowActionButton={!done}
      onClick={() => history.push(`/settings/${props.userId}?isEditModeProfile=true`)}
    />
  )
}

export default WizardBannerDob
