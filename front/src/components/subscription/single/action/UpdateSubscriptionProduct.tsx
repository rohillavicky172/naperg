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

const UpdateSubscriptionProduct = (props: Props) => {
  const [productId, setProductId] = React.useState(props.subscription.product ? props.subscription.product.id : '')

  const [updateSubscription] = useMutation(UPDATE_SUBSCRIPTION_MUTATION)

  const updateSubscriptionF = async () => {
    await updateSubscription({
      variables: {
        data: {
          product: {
            connect: {
              id: productId,
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
      <h4>Update Subscription</h4>
      <div>
        <FormControl className="">
          <InputLabel htmlFor="productId">{`productId`}</InputLabel>
          <Input id="productId" onChange={(e) => setProductId(e.target.value)} type="text" value={productId} />
        </FormControl>
      </div>
      <Button color={'primary'} variant={'outlined'} onClick={() => updateSubscriptionF()}>
        Update
      </Button>
    </>
  )
}

export default UpdateSubscriptionProduct
