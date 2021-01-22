import React from 'react'
import { useHistory } from 'react-router-dom'
import { CREATE_INVOICE } from '../../GraphQL'
import { Invoice, invoiceClass } from '../../Invoice.type'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import InvoiceForm from './InvoiceForm'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { useMutation } from '@apollo/react-hooks'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'

type Props = {
  companieId: string
}

const CreateInvoice = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const history = useHistory()
  const [companieId, setCompanieId] = React.useState(props.companieId)
  const [invoice, setInvoice] = React.useState(invoiceClass)
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [createInvoice] = useMutation(CREATE_INVOICE)

  const createInvoiceF = async () => {
    setLoading(true)
    setMessage('')
    let invoiceData
    try {
      invoiceData = await createInvoice({
        variables: {
          data: {
            smallId: Number(invoice.smallId),
            type: invoice.type,
            dateInvoice: invoice.dateInvoice,
            statusIssuing: invoice.statusIssuing,
            testMode: context.testMode,
            currency: invoice.currency,
            customSourceLabel: invoice.customSourceLabel,
            customSourceLabelPrivate: invoice.customSourceLabelPrivate,
            description: invoice.description,
            typePayment: invoice.typePayment,
            status: invoice.status,
            authorization_stripe_id: invoice.authorization_stripe_id,
            snapshotValueBalance: Number(invoice.snapshotValueBalance),
            productCost: Number(invoice.productCost),
            cashback: Number(invoice.cashback),
            revshare: Number(invoice.revshare),
            productCostInitial: Number(invoice.productCostInitial),
            productCostLocal: Number(invoice.productCostLocal),
            productCostLocalInitial: Number(invoice.productCostLocalInitial),
            availableAmountToRefund: Number(invoice.availableAmountToRefund),
            buyerFinalPrice: Number(invoice.buyerFinalPrice),
            crossBorderFee: Number(invoice.crossBorderFee),
            buyerDiscount: Number(invoice.buyerDiscount),
            foreignExchangeFee: invoice.foreignExchangeFee ? Number(invoice.foreignExchangeFee) : undefined,
            incomingPaymentFee: invoice.incomingPaymentFee ? Number(invoice.incomingPaymentFee) : undefined,

            companie: {
              connect: {
                id: companieId,
              },
            },
          },
        },
      })
    } catch (e) {
      setLoading(false)

      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    setLoading(false)
    if (invoiceData) {
      history.push('/invoice/' + invoiceData.data.createInvoice.id)
    }
  }

  return (
    <>
      <div>
        <InvoiceForm invoice={invoice} onChangeInvoice={(invoice: Invoice) => setInvoice(invoice)} />
      </div>

      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="companieId">{`companieId`}</InputLabel>
          <Input id="companieId" type="text" onChange={(e) => setCompanieId(e.target.value)} value={companieId} />
        </FormControl>
      </div>

      <ButtonLoadingAfterClick
        id={'createInvoice'}
        disabled={false}
        icon={''}
        size={'medium'}
        color={'primary'}
        variant={'outlined'}
        buttonText={'Create'}
        buttonLoadingText={`Setting up...`}
        onClick={() => createInvoiceF()}
        loading={loading}
      />
      <div className="secondary">{message}</div>
    </>
  )
}

export default CreateInvoice
