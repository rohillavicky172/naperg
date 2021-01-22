import React from 'react'
// import { graphql, withApollo } from 'react-apollo'
// import { flowRight as compose } from 'lodash'
import { UPDATE_SUBSCRIPTION_MUTATION } from '../../GraphQL'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/react-hooks'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { Subscription } from '../../Subscription.type'
// import { Client } from '../../../Client.type'

type Props = {
  subscription: Subscription
}

const AddPromotionToSubscription = (props: Props) => {
  const [promotionId, setPromotionId] = React.useState('')

  const [updateSubscription] = useMutation(UPDATE_SUBSCRIPTION_MUTATION)

  const updateSubscriptionF = async () => {
    await updateSubscription({
      variables: {
        data: {
          promotions: {
            connect: {
              id: promotionId,
            },
          },
        },
        where: {
          id: props.subscription.id,
        },
      },
    })
  }

  return (
    <>
      <div>
        <FormControl className="">
          <InputLabel htmlFor="promotionId">{`promotionId`}</InputLabel>
          <Input id="promotionId" onChange={(e) => setPromotionId(e.target.value)} type="text" value={promotionId} />
        </FormControl>
      </div>
      <Button color={'primary'} variant={'outlined'} onClick={() => updateSubscriptionF()}>
        Add Promotion
      </Button>
    </>
  )
}

export default AddPromotionToSubscription
