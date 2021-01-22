import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'
import './Style.css'
import gql from 'graphql-tag'

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      id
      inviteMembersTooltip
      createIssuedCardsTooltip
      switchAccountsTooltip
      createIssuedCardTooltip
      actionIssuedCardTooltip
      spendingLimitIssuedCardTooltip
      expiryDateIssuedCardTooltip
      copyClipboardIssuedCardTooltip
    }
  }
`

type Props = {
  userId: string
  type: string
}

const CloseOnboardingNotice = (props: Props) => {
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)

  const updateCompanieF = async () => {
    try {
      await updateUser({
        variables: {
          where: {
            id: props.userId,
          },
          data: {
            inviteMembersTooltip: props.type === 'inviteMembersTooltip' ? false : undefined,
            createIssuedCardsTooltip: props.type === 'createIssuedCardsTooltip' ? false : undefined,
            switchAccountsTooltip: props.type === 'switchAccountsTooltip' ? false : undefined,
            createIssuedCardTooltip: props.type === 'createIssuedCardTooltip' ? false : undefined,
            actionIssuedCardTooltip: props.type === 'actionIssuedCardTooltip' ? false : undefined,
            spendingLimitIssuedCardTooltip: props.type === 'spendingLimitIssuedCardTooltip' ? false : undefined,
            expiryDateIssuedCardTooltip: props.type === 'expiryDateIssuedCardTooltip' ? false : undefined,
            copyClipboardIssuedCardTooltip: props.type === 'copyClipboardIssuedCardTooltip' ? false : undefined,
          },
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Fab classes={{ root: 'fabCrossBanner' }} onClick={() => updateCompanieF()}>
      <Icon className="textSize7">clear</Icon>
    </Fab>
  )
}

export default CloseOnboardingNotice
