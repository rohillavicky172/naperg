import React from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import UserProfileAdmin from './UserProfileAdmin'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import UserProfileFormAdmin from './UserProfileFormAdmin'
import NotFound from '../../../../nav/error/NotFound'
import Loading from '../../../../nav/error/Loading'
import Error from '../../../../nav/error/Error'
import DeleteUser from '../../action/DeleteUser'
import { User } from '../../../User.type'
import UserVerificationAdminView from '../../userVerification/UserVerificationAdminView'

export const QUERY = gql`
  query UserQuery($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      email
      createdAt
      loginAttempts
      isTwoFactorTotpVerified
      lastLogin
      enabled2FA
      hubspotId
      updatedAtHubspot
      verificationStatus
      verificationDateSubmission
      unsubscribe
      enabled2FAPhone
      enabled2FAEmail
      enabled2FATotp
      isPhoneValidationRequireOverride
      verificationStatusOffSite
      showInviteBuyer
      showInviteSeller
      inviteMembersTooltip
      createIssuedCardsTooltip
      switchAccountsTooltip
      createIssuedCardTooltip
      dateTotpVerified
      actionIssuedCardTooltip
      spendingLimitIssuedCardTooltip
      expiryDateIssuedCardTooltip
      copyClipboardIssuedCardTooltip
      typeUnsubscribe
      emailChangeRequested
      isEmailValidated
      role
      privateData
      stripe_cus_id
      last4Social
      isSuspended
      stripe_cus_test_id
      isPhoneChangeRequestedPending
      isPhoneValidationRequired
      welcomePersonalizedSent
      phone
      phoneCode
      phoneChangeRequested
      phoneCodeChangeRequested
      isPhoneValidated
      sendGridId
      firstName
      lastName
      nameFile
      timeZone
      gender
      newsletter
      linkedInLink
      twitterLink
      facebookLink
      instagramLink
      name
      signupType
      birthday
      language
    }
  }
`

type Props = {
  userId: string
}

const UserProfileDetailsAdmin = (props: Props) => {
  const [isEditMode, setIsEditMode] = React.useState(false)

  const { loading, error, data } = useQuery(QUERY, {
    variables: { where: { id: props.userId } },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.user) return <NotFound />

  const user: User = data.user
  return (
    <>
      <div className="paperOut">
        <h3>{`Profile Admin`}</h3>

        <Paper className="paperIn">
          {isEditMode ? (
            <UserProfileFormAdmin user={user} onUpdate={() => setIsEditMode(false)} onCancel={() => setIsEditMode(false)} />
          ) : (
            <>
              <div className="tar">
                <Button color={'primary'} variant="outlined" size="small" onClick={() => setIsEditMode(true)}>
                  {`Edit`}
                </Button>
              </div>

              <UserProfileAdmin user={user} />
            </>
          )}
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn">
          <UserVerificationAdminView user={user} />
        </Paper>
      </div>
      <div>
        <Link to={`/logs?userId=${user.id}`}>
          <Button color="primary" variant="outlined">
            Logs
          </Button>
        </Link>
      </div>
      <div>
        <Link to={`/files?userId=${user.id}`}>
          <Button color="primary" variant="outlined">
            Files
          </Button>
        </Link>
      </div>
      <div>
        <Link to={`/cardholders?userId=${user.id}`}>
          <Button color="primary" variant="outlined">
            Cardholders
          </Button>
        </Link>
      </div>
      <div>
        <Link to={`/adminInvoices?userId=${user.id}`}>
          <Button color="primary" variant="outlined">
            Invoices
          </Button>
        </Link>
      </div>
      <div>
        <Link to={`/adminIssuedCards?userId=${user.id}`}>
          <Button color="primary" variant="outlined">
            NachoCards
          </Button>
        </Link>
      </div>
      <div>
        <Link to={`/trackingLinks/?userId=${user.id}`}>
          <Button variant="outlined" color={'primary'}>
            trackingLinks (deprecated)
          </Button>
        </Link>
      </div>
      <div>
        <Link to={`/admin/analytics?userId=${user.id}`}>
          <Button variant="outlined" color={'primary'}>
            analytics
          </Button>
        </Link>
      </div>
      <div>
        <Link to={`/authDevices?userId=${user.id}`}>
          <Button color="primary" variant="outlined">
            Devices
          </Button>
        </Link>
      </div>
      <div>
        <DeleteUser userId={user.id} />
      </div>{' '}
      <div>
        <Link to={'/users/?inviterId=' + user.id}>
          <Button variant="outlined" color="primary">
            Invitees
          </Button>
        </Link>
      </div>
    </>
  )
}

export default UserProfileDetailsAdmin
