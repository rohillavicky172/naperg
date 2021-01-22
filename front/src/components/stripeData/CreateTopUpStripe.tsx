import React from 'react'
import ButtonSecondValidation from '../nav/ButtonSecondValidation'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { CREATE_TOPUP_STRIPE_MUTATION } from './GraphQL'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Input from '@material-ui/core/Input'
import { Context } from '../Context.type'
import { AppContext } from '../AppContext'

interface Props {
  issuingAvailable: number
}
const CreateTopUpStripe = (props: Props) => {
  const client = useApolloClient()
  const { context }: { context: Context } = React.useContext(AppContext)
  // console.log(props.issuingAvailable)

  const [amount, setAmount] = React.useState(props.issuingAvailable > 80000 ? 0 : 30000)
  let messageResult = ''
  const [createTopUpStripe, data] = useMutation(CREATE_TOPUP_STRIPE_MUTATION)
  if (data.error) {
    messageResult = data.error.message
  }

  if (data.data) {
    messageResult = 'succes'
  }

  const createTopUpStripeF = async () => {
    let dataStripe
    try {
      dataStripe = await createTopUpStripe({
        variables: {
          amount,
          description: 'topup created by ' + context.me.firstName + ' ' + context.me.lastName,
        },
      })
    } catch (e) {
      console.log(e)
    }
    if (dataStripe) {
      client.resetStore()
    }
  }

  return (
    <>
      <div>
        <FormControl>
          <InputLabel htmlFor="name">{`Amount`}</InputLabel>
          <Input
            id="name"
            type="number"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value={amount.toString()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}
          />
        </FormControl>
      </div>
      <div style={{ height: '10px' }} />
      {amount > 0 && (
        <div>
          <ButtonSecondValidation
            color={'primary'}
            size={'small'}
            variant={'outlined'}
            buttonText={`Topup`}
            onClick={createTopUpStripeF}
          />
        </div>
      )}
      {messageResult && <div className="secondary">{messageResult}</div>}
    </>
  )
}

export default CreateTopUpStripe
