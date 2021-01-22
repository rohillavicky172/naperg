
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { DELETE_INVOICE } from '../../GraphQL'
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
  deleteInvoice: any
  // deleteInvoice: any
}

class DeleteInvoice extends React.Component<Props, State> {
  render() {
    return (
      <ButtonSecondValidation
        buttonText={`Delete (admin)`}
        color={'default'}
        size={'medium'}
        variant={'outlined'}
        onClick={() => {
          this.deleteInvoice()
        }}
      />
    )
  }

  deleteInvoice = async () => {
    try {
      await this.props.deleteInvoice({
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
  graphql(DELETE_INVOICE, {
    name: 'deleteInvoice'
  }),
  withApollo,
  withContext
)(DeleteInvoice)
