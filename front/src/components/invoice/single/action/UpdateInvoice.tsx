import React from 'react'
import { AppContext } from '../../../AppContext'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_INVOICE } from '../../GraphQL'
import ButtonSecondValidation from '../../../nav/ButtonSecondValidation'
import { Invoice } from '../../Invoice.type'
import { Context } from '../../../Context.type'
import InvoiceForm from './InvoiceForm'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

type Props = {
  invoice: Invoice
}

const UpdateInvoice = (props: Props) => {
  const history = useHistory()

  const [updateInvoice] = useMutation(UPDATE_INVOICE)
  const { context }: { context: Context } = React.useContext(AppContext)

  const [invoice, setInvoice] = React.useState(props.invoice)

  const updateInvoiceF = async () => {
    let dataInvoice
    try {
      dataInvoice = await updateInvoice({
        variables: {
          data: {
            status: invoice.status,
            statusIssuing: invoice.statusIssuing,
            snapshotValueBalance: Number(invoice.snapshotValueBalance),
            smallId: Number(invoice.smallId),
            type: invoice.type,
            dateInvoice: invoice.dateInvoice,
            testMode: context.testMode,
            currency: invoice.currency,
            description: invoice.description,
            period: invoice.period,
            typePayment: invoice.typePayment,
            customSourceLabel: invoice.customSourceLabel,
            customSourceLabelPrivate: invoice.customSourceLabelPrivate,

            authorization_stripe_id: invoice.authorization_stripe_id,

            productCost: Number(invoice.productCost),
            cashback: Number(invoice.cashback),
            revshare: Number(invoice.revshare),
            productCostInitial: Number(invoice.productCostInitial),
            productCostLocal: Number(invoice.productCostLocal),
            productCostLocalInitial: Number(invoice.productCostLocalInitial),
            availableAmountToRefund: Number(invoice.availableAmountToRefund),
            buyerFinalPrice: Number(invoice.buyerFinalPrice),
            crossBorderFee: Number(invoice.crossBorderFee),

            foreignExchangeFee: invoice.foreignExchangeFee ? Number(invoice.foreignExchangeFee) : undefined,
            incomingPaymentFee: invoice.incomingPaymentFee ? Number(invoice.incomingPaymentFee) : undefined,

            buyerDiscount: Number(invoice.buyerDiscount),
          },
          where: {
            id: invoice.id,
          },
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => context.openSnackBar(true, graphQLError.message, 'error'))
    }
    if (dataInvoice) {
      history.push('/invoice/' + dataInvoice.data.updateInvoice.id)
    }
  }

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Edit Transaction`}</h3>
          <div>
            <InvoiceForm invoice={invoice} onChangeInvoice={(invoice: Invoice) => setInvoice(invoice)} />
          </div>
          <div style={{ height: '20px' }} />
          <ButtonSecondValidation
            buttonText={`Update`}
            color={'primary'}
            size={'medium'}
            variant={'outlined'}
            onClick={() => updateInvoiceF()}
          />
          <Link to={'/invoice/' + invoice.id}>
            <Button color="default" size={'medium'}>
              {`Cancel`}
            </Button>
          </Link>
        </Paper>
      </div>
    </>
  )
}

export default UpdateInvoice
