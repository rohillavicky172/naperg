import React from 'react'
import { User } from '../../User.type'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      id
      lastName
      firstName
      unsubscribe

      isPhoneChangeRequestedPending
      isPhoneValidationRequired
      privateData
      email
      verificationStatusOffSite

      isTwoFactorTotpVerified

      nameFile
      isSuspended
      last4Social

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
  onUpdate: () => void
}

const UpdateUser = (props: Props) => {
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
            // signupType: props.user.signupType,

            // email: props.user.email,
            // role: props.user.role,
            nameFile: props.user.nameFile,
            gender: props.user.gender,
            // isEmailValidated: props.user.isEmailValidated,
            enabled2FA: props.user.enabled2FA,
            // welcomePersonalizedSent: props.user.welcomePersonalizedSent,
            enabled2FATotp: props.user.enabled2FATotp,
            enabled2FAPhone: props.user.enabled2FAPhone,
            enabled2FAEmail: props.user.enabled2FAEmail,

            inviteMembersTooltip: props.user.inviteMembersTooltip,
            verificationStatusOffSite: props.user.verificationStatusOffSite,
            createIssuedCardsTooltip: props.user.createIssuedCardsTooltip,
            switchAccountsTooltip: props.user.switchAccountsTooltip,
            createIssuedCardTooltip: props.user.createIssuedCardTooltip,
            actionIssuedCardTooltip: props.user.actionIssuedCardTooltip,
            spendingLimitIssuedCardTooltip: props.user.spendingLimitIssuedCardTooltip,
            expiryDateIssuedCardTooltip: props.user.expiryDateIssuedCardTooltip,
            copyClipboardIssuedCardTooltip: props.user.copyClipboardIssuedCardTooltip,

            // showInviteBuyer: props.user.showInviteBuyer,
            // showInviteSeller: props.user.showInviteSeller,

            // isPhoneValidated: props.user.isPhoneValidated,
            isPhoneValidationRequired: props.user.isPhoneValidationRequired,

            linkedInLink: props.user.linkedInLink,
            twitterLink: props.user.twitterLink,
            facebookLink: props.user.facebookLink,
            instagramLink: props.user.instagramLink,

            // isSuspended: props.user.isSuspended,

            last4Social: props.user.last4Social,
            // privateData: props.user.privateData,

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
      props.onUpdate()
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

export default UpdateUser
