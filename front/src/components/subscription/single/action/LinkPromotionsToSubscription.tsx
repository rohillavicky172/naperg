import React from 'react'
import gql from 'graphql-tag'
import Button from '@material-ui/core/Button'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { Subscription } from '../../Subscription.type'

export const MUTATION = gql`
  mutation LinkPromotionsToSubscription($subscriptionId: String!) {
    linkPromotionsToSubscription(subscriptionId: $subscriptionId) {
      id
      status
    }
  }
`

type Props = {
  subscription: Subscription
}

const LinkPromotionsToSubscription = (props: Props) => {
  const client = useApolloClient()
  const [updateSubscription] = useMutation(MUTATION)

  const updateSubscriptionF = async () => {
    await updateSubscription({
      variables: {
        subscriptionId: props.subscription.id,
      },
    })
    await client.resetStore()
  }

  return (
    <>
      <Button color={'primary'} variant={'outlined'} onClick={() => updateSubscriptionF()}>
        LinkPromotionsToSubscription
      </Button>
    </>
  )
}

export default LinkPromotionsToSubscription
