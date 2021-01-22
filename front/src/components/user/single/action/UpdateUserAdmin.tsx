import React from 'react'
import gql from 'graphql-tag'
import { User } from '../../User.type'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'
import { useMutation } from '@apollo/react-hooks'

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      id
      lastName
      firstName
      unsubscribe
      typeUnsubscribe
      verificationStatusOffSite
      hubspotId
      isPhoneValidationRequireOverride
      verificationStatus
      welcomePersonalizedSent
      isPhoneChangeRequestedPending
      isPhoneValidationRequired
      privateData
      email
      loginAttempts
      # emailChangeRequested
      signupType
      isTwoFactorTotpVerified
      role
      nameFile
      isSuspended
      last4Social
      gender
      showInviteBuyer
      showInviteSeller

      # newsletter
      # getEmailTransactionSuccess
      enabled2FA
      enabled2FAPhone
      enabled2FAEmail
      enabled2FATotp
      inviteMembersTooltip
      createIssuedCardsTooltip
      switchAccountsTooltip
      createIssuedCardTooltip
      actionIssuedCardTooltip
      spendingLimitIssuedCardTooltip
      expiryDateIssuedCardTooltip
      copyClipboardIssuedCardTooltip
      sendGridId
      isPhoneValidated
      isPhoneValidationRequired
      linkedInLink
      twitterLink
      facebookLink
      instagramLink
      # address1
      # address2
      # city
      # zip
      # state
      # country
      birthday
      language
    }
  }
`

type Props = {
  updateTextButton: string
  disabled: boolean
  user: User
  changeEditMode: () => void
}

const UpdateUserAdmin = (props: Props) => {
  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)

  const updateUserF = async () => {
    setLoading(true)
    let updatedUser
    try {
      updatedUser = await updateUser({
        variables: {
          where: { id: props.user.id },
          data: {
            firstName: props.user.firstName,
            unsubscribe: props.user.unsubscribe,
            lastName: props.user.lastName,
            signupType: props.user.signupType,
            verificationStatus: props.user.verificationStatus,
            typeUnsubscribe: props.user.typeUnsubscribe,
            isPhoneValidationRequireOverride: props.user.isPhoneValidationRequireOverride,

            email: props.user.email,
            role: props.user.role,
            loginAttempts: props.user.loginAttempts,
            nameFile: props.user.nameFile,
            gender: props.user.gender,
            isEmailValidated: props.user.isEmailValidated,
            enabled2FA: props.user.enabled2FA,
            welcomePersonalizedSent: props.user.welcomePersonalizedSent,
            enabled2FATotp: props.user.enabled2FATotp,
            verificationStatusOffSite: props.user.verificationStatusOffSite,
            enabled2FAPhone: props.user.enabled2FAPhone,
            enabled2FAEmail: props.user.enabled2FAEmail,
            hubspotId: Number(props.user.hubspotId),

            inviteMembersTooltip: props.user.inviteMembersTooltip,
            createIssuedCardsTooltip: props.user.createIssuedCardsTooltip,
            switchAccountsTooltip: props.user.switchAccountsTooltip,
            createIssuedCardTooltip: props.user.createIssuedCardTooltip,
            actionIssuedCardTooltip: props.user.actionIssuedCardTooltip,
            spendingLimitIssuedCardTooltip: props.user.spendingLimitIssuedCardTooltip,
            expiryDateIssuedCardTooltip: props.user.expiryDateIssuedCardTooltip,
            copyClipboardIssuedCardTooltip: props.user.copyClipboardIssuedCardTooltip,

            showInviteBuyer: props.user.showInviteBuyer,
            showInviteSeller: props.user.showInviteSeller,

            isPhoneValidated: props.user.isPhoneValidated,
            isPhoneValidationRequired: props.user.isPhoneValidationRequired,

            linkedInLink: props.user.linkedInLink,
            twitterLink: props.user.twitterLink,
            facebookLink: props.user.facebookLink,
            instagramLink: props.user.instagramLink,

            isSuspended: props.user.isSuspended,

            last4Social: props.user.last4Social,
            privateData: props.user.privateData,

            birthday: props.user.birthday,
            language: props.user.language,
          },
        },
      })
    } catch (e) {
      setLoading(false)

      if (e.graphQLErrors.length) {
        setErrorMessage('Error: ' + e.graphQLErrors[0].message)
      }
    }
    setLoading(false)
    if (updatedUser) {
      props.changeEditMode()
    }
  }

  return (
    <>
      <ButtonLoadingAfterClick
        id={'updateUser'}
        icon={''}
        color={'primary'}
        disabled={props.disabled}
        variant="outlined"
        size={'medium'}
        buttonText={props.updateTextButton}
        buttonLoadingText={`Loading...`}
        onClick={() => updateUserF()}
        loading={loading}
      />{' '}
      <span className={'secondary'}>{errorMessage}</span>{' '}
    </>
  )
}

export default UpdateUserAdmin
