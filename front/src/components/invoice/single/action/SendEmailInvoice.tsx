
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { SEND_EMAIL_INVOICE } from '../../GraphQL'
import ButtonSecondValidation from '../../../nav/ButtonSecondValidation'
import { Invoice } from '../../Invoice.type'
import { withContext } from '../../../withContext'
import { Client } from '../../../Client.type'
import { Context } from '../../../Context.type'
type State = {}

type Props = {
  invoice: Invoice,
  context: Context,
  client: Client,
  invoiceId: string,
  sendEmailInvoice: any
  // sendEmailInvoice: any
}

class SendEmailInvoice extends React.Component<Props, State> {
  render() {
    return (
      <ButtonSecondValidation
        buttonText={`Send Email (admin)`}
        color={'default'}
        size={'medium'}
        variant={'outlined'}
        onClick={() => {
          this.sendEmailInvoice()
        }}
      />
    )
  }

  sendEmailInvoice = async () => {
    try {
      await this.props.sendEmailInvoice({
        variables: {
          where: {
            id: this.props.invoiceId
          }
        }
      })
    } catch (e) {
      e.graphQLErrors.some(graphQLError => this.props.context.openSnackBar(true, graphQLError.message, 'error'))
    }
    this.props.client.resetStore()
  }
}

export default compose(
  graphql(SEND_EMAIL_INVOICE, {
    name: 'sendEmailInvoice'
  }),
  withApollo,
  withContext
)(SendEmailInvoice)
