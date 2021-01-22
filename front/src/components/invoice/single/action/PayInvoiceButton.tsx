import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { PAY_INVOICE_MUTATION } from '../../GraphQL'
import { Invoice } from '../../Invoice.type'
import utils from '../../../utils'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { Client } from '../../../Client.type'
import { History } from '../../../History.type'
import { withRouter } from 'react-router'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'
// import Paper from '@material-ui/core/Paper'
// import MappingStatusInvoice from '../invoicePage/details/MappingStatusInvoice'

type State = {
  loading: boolean
}

type Props = {
  invoice: Invoice
  context: Context
  history: History
  client: Client
  payInvoice: any
}

class PayInvoiceButton extends React.Component<Props, State> {
  state = {
    loading: false,
  }
  render() {
    return (
      <ButtonLoadingAfterClick
        id={'idButton'}
        disabled={false}
        icon={''}
        color={'secondary'}
        variant={'contained'}
        size={'medium'}
        buttonText={`Pay now: ${utils.priceFormated(-this.props.invoice.buyerFinalPrice, 'usd')}`}
        buttonLoadingText={`Setting up...`}
        onClick={() => {
          this.payInvoice()
        }}
        loading={this.state.loading}
      />
    )
  }

  payInvoice = async () => {
    this.setState({ loading: true })
    let newInvoice
    try {
      newInvoice = await this.props.payInvoice({
        variables: {
          data: {
            isInvoicePaid: true,
          },
          where: {
            id: this.props.invoice.id,
          },
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => this.props.context.openSnackBar(true, graphQLError.message, 'message'))
      this.props.history.replace('/paymentSource/' + this.props.invoice.companie.id)
      this.setState({ loading: false })
    }
    this.props.client.resetStore()
    if (newInvoice) {
      this.props.history.replace('/paymentSource/' + this.props.invoice.companie.id)
      this.setState({ loading: false })
    }
  }
}

export default compose(
  graphql(PAY_INVOICE_MUTATION, {
    name: 'payInvoice',
  }),
  withContext,
  withRouter,
  withApollo
)(PayInvoiceButton)
