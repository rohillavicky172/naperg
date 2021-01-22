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

const UpdateParent = (props: Props) => {
  const history = useHistory()

  const [updateInvoice] = useMutation(UPDATE_INVOICE)
  const { context }: { context: Context } = React.useContext(AppContext)

  const [invoiceParentId, setInvoiceParentId] = React.useState(props.invoice.invoiceParent ? props.invoice.invoiceParent.id : '')

  const updateInvoiceF = async () => {
    let dataInvoice
    try {
      dataInvoice = await updateInvoice({
        variables: {
          data: {
            invoiceParent: {
              connect: {
                id: invoiceParentId,
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
          <h3>{`Edit Invoice Parent Id`}</h3>
          <div>
            <FormControl className={''}>
              <InputLabel htmlFor="invoiceParentId">{`invoiceParentId`}</InputLabel>
              <Input
                id="invoiceParentId"
                type="text"
                value={invoiceParentId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInvoiceParentId(e.target.value)}
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

export default UpdateParent
