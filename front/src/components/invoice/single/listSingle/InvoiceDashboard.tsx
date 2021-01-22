import React from 'react'
import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'
import { Invoice } from '../../Invoice.type'
// import { Link } from 'react-router-dom'
import ImageInvoice from './ImageInvoice'
import utils from '../../../utils'
import '../Style.css'
// import Icon from '@material-ui/core/Icon'
// import { withContext } from '../../../withContext'
// import { Context } from '../../../Context.type'
// import DateComponent from '../../../nav/DateComponent'
// import MappingStatusInvoice from '../invoicePage/details/MappingStatusInvoice'
// import MappingTypeInvoice from '../invoicePage/details/MappingTypeInvoice'

type State = {}

type Props = {
  invoice: Invoice
  userId: string
  // context: Context
}

class InvoiceDashboard extends React.Component<Props, State> {
  render() {
    return (
      <Grid container>
        <Grid item xs={4} sm={4} className="marginAuto">
          <ImageInvoice format="small" invoice={this.props.invoice} />
        </Grid>

        <Grid item xs={5} sm={5} className="marginAuto">
          {this.props.invoice.product && <span>{this.props.invoice.product.name}</span>}
          {(this.props.invoice.type === 'TOP_UP' ||
            this.props.invoice.type === 'AUTO_TOP_UP' ||
            this.props.invoice.type === 'REFUND_CASH_OUT') && <span>{utils.mappingTypeInvoice(this.props.invoice.type)}</span>}
        </Grid>

        <Grid item xs={3} sm={3} className="marginAuto">
          {utils.priceFormated(this.props.invoice.productCostLocal, this.props.invoice.currency)}
        </Grid>
      </Grid>
    )
  }
}

export default InvoiceDashboard
