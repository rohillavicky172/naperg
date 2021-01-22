import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button } from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'
import { Switch } from '@material-ui/core'
import gql from 'graphql-tag'
import { IssuedCard } from '../issuedCard/IssuedCard.type'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'

export const CREATE_NOTIFICATION_USER_ISSUEDCARD = gql`
  mutation CreateNotificationUserIssuedCard($data: NotificationUserIssuedCardCreateInput!) {
    createNotificationUserIssuedCard(data: $data) {
      id
    }
  }
`
export const DELETE_NOTIFICATION_USER_ISSUEDCARD = gql`
  mutation DeleteNotificationUserIssuedCard($where: NotificationUserIssuedCardWhereUniqueInput!) {
    deleteNotificationUserIssuedCard(where: $where) {
      id
    }
  }
`

type Props = {
  onCancel: () => void
  onValidate: () => void
  issuedCard: IssuedCard
  notificationUserIssuedCards: any
}

const NotificationUserIssuedCardAction = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const [createNotificationUserIssuedCard] = useMutation(CREATE_NOTIFICATION_USER_ISSUEDCARD)
  const [deleteNotificationUserIssuedCard] = useMutation(DELETE_NOTIFICATION_USER_ISSUEDCARD)

  const [notifications, setNotifications] = React.useState(props.notificationUserIssuedCards.length ? false : true)

  const validate = async () => {
    if (notifications && props.notificationUserIssuedCards.length) {
      await deleteNotificationUserIssuedCard({
        variables: {
          where: {
            id: props.notificationUserIssuedCards[0].id,
          },
        },
      })
    }
    if (!notifications && !props.notificationUserIssuedCards.length) {
      await createNotificationUserIssuedCard({
        variables: {
          data: {
            emailNotifications: false,
            companie: {
              connect: {
                id: props.issuedCard.companie.id,
              },
            },
            user: {
              connect: {
                id: context.me.id,
              },
            },
            issuedCard: {
              connect: {
                id: props.issuedCard.id,
              },
            },
          },
        },
      })
    }
    props.onValidate()
  }

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={notifications}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotifications(e.target.checked)}
            value={true}
          />
        }
        label="Emails and Slack"
      />
      <div>
        <Button color="primary" variant="outlined" onClick={() => validate()}>
          Save
        </Button>{' '}
        <Button onClick={() => props.onCancel()}>Cancel</Button>
      </div>
    </>
  )
}

export default NotificationUserIssuedCardAction
