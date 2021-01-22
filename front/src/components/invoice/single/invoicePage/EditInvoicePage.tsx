
import React from 'react'
import EditInvoiceQuery from './EditInvoiceQuery'

type State = {}

type Props = {
  match: {
    params: {
      invoiceId: string
    }
  }
}

class EditInvoicePage extends React.Component<Props, State> {
  render() {
    return <EditInvoiceQuery invoiceId={this.props.match.params.invoiceId} />
  }
}

export default EditInvoicePage
