import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import { withContext } from '../../../withContext'
import { Invoice } from '../../Invoice.type'
import { Context } from '../../../Context.type'
import PayInvoiceButton from '../action/PayInvoiceButton'
import '../Style.css'
import ImageTemplate from '../../../nav/ImageTemplate'
// import MappingStatusInvoice from '../invoicePage/details/MappingStatusInvoice'
import utils from '../../../utils'
// import MappingTypeInvoice from '../invoicePage/details/MappingTypeInvoice'

type State = {}

type Props = {
  invoice: Invoice
  userId: string
  context: Context
}

class SingleInvoiceNotPaid extends React.Component<Props, State> {
  render() {
    return (
      <div className="paperOut">
        <Grid container>
          <Grid item xs={11} sm={11}>
            <Grid container>
              <Grid item xs={12} sm={3} className="marginAuto">
                {this.props.invoice.product && <ImageTemplate format="small" nameFile={this.props.invoice.product.nameFile} />}
              </Grid>

              <Grid item xs={12} sm={3} className="marginAuto">
                {this.props.invoice.product && <span>{this.props.invoice.product.name}</span>}
                {(this.props.invoice.type === 'TOP_UP' ||
                  this.props.invoice.type === 'AUTO_TOP_UP' ||
                  this.props.invoice.type === 'REFUND_CASH_OUT') && (
                  <span>{utils.mappingTypeInvoice(this.props.invoice.type)}</span>
                )}
              </Grid>

              <Grid item xs={12} sm={3} className="marginAuto">
                <Link className="link" to={'/invoice/' + this.props.invoice.id}>
                  {utils.smallIdFormat(this.props.invoice.smallId)}
                </Link>
              </Grid>
              <Grid item xs={12} sm={3} className="marginAuto">
                {this.props.invoice.status === 'ERROR_PAYMENT' && <PayInvoiceButton invoice={this.props.invoice} />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withContext(SingleInvoiceNotPaid)
