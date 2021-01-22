import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import Error from '../../../nav/error/Error'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import UserVerification from './UserVerification'
import { User } from '../../User.type'
import DateComponent from '../../../nav/DateComponent'

export const QUERY = gql`
  query UserQuery($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      firstName
      lastName
      birthday
      verificationStatus
      verificationDateSubmission
    }
  }
`

const UserVerificationQuery = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const { loading, error, data } = useQuery(QUERY, {
    variables: { where: { id: context.me.id } },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.user) return <NotFound />
  const user: User = data.user

  if (user.verificationStatus === 'REQUIRED') {
    return <UserVerification user={user} />
  }

  if (user.verificationStatus === 'SUBMITED') {
    return (
      <>
        {user.firstName}, we received your verification information on{' '}
        {user.verificationDateSubmission && <DateComponent date={user.verificationDateSubmission} />}. Thank you for submitting
        it. We will review it and get back to you asap.
      </>
    )
  }

  if (user.verificationStatus === 'APPROVED') {
    return (
      <>
        {user.firstName}, we approved your verification information on{' '}
        {user.verificationDateSubmission && <DateComponent date={user.verificationDateSubmission} />}. Please Contact us.
      </>
    )
  }
  if (user.verificationStatus === 'NOT_APPROVED') {
    return (
      <>
        <p>
          {user.firstName}, Your Identity Verification submission was not approved. There can be numerous reasons why we could not
          verify your identity.
        </p>
        <p>Please contact us if you would like to appeal our decision.</p>
      </>
    )
  }

  return null
}

export default UserVerificationQuery
