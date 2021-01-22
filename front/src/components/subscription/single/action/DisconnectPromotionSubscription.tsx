import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'

export const MUTATION = gql`
  mutation DisconnectPromotionSubscription($subscriptionId: String!, $promotionId: String!) {
    disconnectPromotionSubscription(subscriptionId: $subscriptionId, promotionId: $promotionId) {
      id
    }
  }
`

type Props = {
  onUpdate: () => void
  promotionId: String
  subscriptionId: String
}

const DisconnectPromotionSubscription = (props: Props) => {
  const [message, setMessage] = React.useState('')
  const [disconnectPromotionSubscription] = useMutation(MUTATION)

  const updateSubscriptionF = async () => {
    try {
      await disconnectPromotionSubscription({
        variables: {
          promotionId: props.promotionId,
          subscriptionId: props.subscriptionId,
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    props.onUpdate()
  }

  return (
    <>
      <Button color={'primary'} variant={'outlined'} onClick={() => updateSubscriptionF()}>
        disconnectPromotionSubscription
      </Button>
      <p className="secondary">{message}</p>
    </>
  )
}

export default DisconnectPromotionSubscription
