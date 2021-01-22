import React from 'react'
import { AppContext } from '../../../AppContext'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_INVOICE } from '../../GraphQL'
import ButtonSecondValidation from '../../../nav/ButtonSecondValidation'
import { Invoice } from '../../Invoice.type'
import { Context } from '../../../Context.type'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'

type Props = {
  invoice: Invoice
}

const AddstripeChargeId = (props: Props) => {
  const history = useHistory()

  const [updateInvoice] = useMutation(UPDATE_INVOICE)
  const { context }: { context: Context } = React.useContext(AppContext)

  const [stripeChargeId, setStripeChargeId] = React.useState('')

  const updateInvoiceF = async () => {
    let dataInvoice
    try {
      dataInvoice = await updateInvoice({
        variables: {
          data: {
            charges: {
              create: {
                stripeChargeId,
              },
            },
          },
          where: {
            id: props.invoice.id,
          },
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => context.openSnackBar(true, graphQLError.message, 'error'))
    }
    // console.log(dataInvoice)
    if (dataInvoice) {
      history.push('/invoice/' + dataInvoice.data.updateInvoice.id)
    }
  }

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`AddstripeChargeId`}</h3>
          <p>Create a new object `Charge` with stripeChargeId and Link it to this transaction.</p>
          <div>
            <FormControl className={''}>
              <InputLabel htmlFor="StripeChargeId">{`StripeChargeId`}</InputLabel>
              <Input
                id="StripeChargeId"
                placeholder={'py_ ...'}
                type="text"
                value={stripeChargeId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStripeChargeId(e.target.value)}
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
        </Paper>
      </div>
    </>
  )
}

export default AddstripeChargeId
