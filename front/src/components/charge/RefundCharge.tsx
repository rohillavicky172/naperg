import React from 'react'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Charge } from './Charge.type'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'

const REFUND_CHARGE_MUTATION = gql`
  mutation RefundChargeInStripe($chargeId: String!, $amount: Float!, $description: String!) {
    refundChargeInStripe(chargeId: $chargeId, amount: $amount, description: $description) {
      id
    }
  }
`
type Props = { charge: Charge }

const RefundCharge = (props: Props) => {
  let messageResult = ''
  const [show, setShow] = React.useState(false)
  const [amount, setAmount] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [refundCharge, data] = useMutation(REFUND_CHARGE_MUTATION)
  if (data.error) {
    messageResult = data.error.message
  }

  if (data.data) {
    messageResult = 'succes'
  }
  return (
    <>
      {!show ? (
        <Button color="primary" variant="outlined" onClick={() => setShow(true)}>
          Refund
        </Button>
      ) : (
        <>
          <div>
            <FormControl className="width100per">
              <InputLabel htmlFor="amount">{`Amount`}</InputLabel>
              <Input
                id="amount"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                type="number"
                value={amount}
              />
            </FormControl>
          </div>
          <div>
            <FormControl className="width100per">
              <InputLabel htmlFor="description">{`description`}</InputLabel>
              <Input
                id="account_number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                type="text"
                value={description}
              />
            </FormControl>
          </div>

          <div>
            <Button
              color="primary"
              variant="outlined"
              onClick={() =>
                refundCharge({
                  variables: {
                    chargeId: props.charge.id,
                    amount: Number(amount),
                    description,
                  },
                })
              }>
              Refund
            </Button>{' '}
            <Button onClick={() => setShow(false)}>Cancel</Button>
            <div className="secondary">{messageResult}</div>
          </div>
        </>
      )}
    </>
  )
}

export default RefundCharge
