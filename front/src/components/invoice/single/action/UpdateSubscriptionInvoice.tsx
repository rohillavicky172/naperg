import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { UPDATE_INVOICE } from '../../GraphQL'
import ButtonSecondValidation from '../../../nav/ButtonSecondValidation'
import { Invoice } from '../../Invoice.type'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'

type Props = {
  invoice: Invoice
}

const UpdateSubscriptionInvoice = (props: Props) => {
  const client = useApolloClient()

  const [updateInvoice] = useMutation(UPDATE_INVOICE)

  const [message, setMessage] = React.useState('')
  const [subscriptionId, setSubscriptionId] = React.useState(
    props.invoice.subscription && props.invoice.subscription.id ? props.invoice.subscription.id : ''
  )

  const updateInvoiceF = async () => {
    let dataInvoice
    try {
      dataInvoice = await updateInvoice({
        variables: {
          data: {
            subscription: {
              connect: {
                id: subscriptionId,
              },
            },
          },
          where: {
            id: props.invoice.id,
          },
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    if (dataInvoice) {
      await client.resetStore()
    }
  }

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Edit subscriptionId`}</h3>
          <div>
            <FormControl className={''}>
              <InputLabel htmlFor="subscriptionId">{`subscriptionId`}</InputLabel>
              <Input
                id="subscriptionId"
                type="text"
                value={subscriptionId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubscriptionId(e.target.value)}
              />
            </FormControl>

            <ButtonSecondValidation
              buttonText={`Update`}
              color={'primary'}
              size={'medium'}
              variant={'outlined'}
              onClick={() => updateInvoiceF()}
            />
          </div>
          <div className="secondary">{message}</div>
        </Paper>
      </div>
    </>
  )
}

export default UpdateSubscriptionInvoice
