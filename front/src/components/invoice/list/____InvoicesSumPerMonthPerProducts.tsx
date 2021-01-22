import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { INVOICES_SUM_PER_MONTH_PER_PRODUCTS_QUERY } from '../GraphQL'
import { Link } from 'react-router-dom'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { User } from '../../user/User.type'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import Grid from '@material-ui/core/Grid'
import utils from '../../utils'
// import { Link } from 'react-router-dom'
// import DateComponent from '../../nav/DateComponent'
// import Table from '@material-ui/core/Table'
// import TableBody from '@material-ui/core/TableBody'
// import TableCell from '@material-ui/core/TableCell'
// import TableHead from '@material-ui/core/TableHead'
// import TableRow from '@material-ui/core/TableRow'

// import { ResponsiveLine } from '@nivo/line'

type State = {}

type Props = {
  variables: any
  context: Context
  invoicesSumPerMonthPerProductsQuery: any
  me: User
}

class InvoicesSumPerMonthPerProducts extends React.Component<Props, State> {
  render() {
    if (this.props.invoicesSumPerMonthPerProductsQuery.error) {
      return (
        <Error
          message={
            this.props.invoicesSumPerMonthPerProductsQuery.error.graphQLErrors.length &&
            this.props.invoicesSumPerMonthPerProductsQuery.error.graphQLErrors[0].message
          }
        />
      )
    }
    if (this.props.invoicesSumPerMonthPerProductsQuery.loading) {
      return <Loading />
    }
    if (!this.props.invoicesSumPerMonthPerProductsQuery) {
      return <NotFound />
    }

    const total = this.props.invoicesSumPerMonthPerProductsQuery.invoicesSumPerMonthPerProducts.reduce(
      (acc, graphInvoicePerProduct) => acc + graphInvoicePerProduct.amount,
      0
    )

    return (
      <>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            Name
          </Grid>
          <Grid item xs={2}>
            countInvoices
          </Grid>
          <Grid item xs={2}>
            countSubscriptions
          </Grid>
          <Grid item xs={2}>
            countCompanies
          </Grid>
          <Grid item xs={2}>
            <span className="fontWeight19">{utils.priceFormated(total, 'usd')}</span>
          </Grid>
        </Grid>
        <div style={{ height: '12px' }} />
        {this.props.invoicesSumPerMonthPerProductsQuery.invoicesSumPerMonthPerProducts.map((graphInvoicePerProduct, i) => (
          <Grid key={graphInvoicePerProduct.id} container>
            <Grid item xs={1}>
              {i + 1}.
            </Grid>
            <Grid item xs={3}>
              <Link className="link" to={'/product/' + graphInvoicePerProduct.id + '/product'}>
                {graphInvoicePerProduct.name}
              </Link>
            </Grid>
            <Grid item xs={2}>
              {graphInvoicePerProduct.countInvoices}
            </Grid>
            <Grid item xs={2}>
              {graphInvoicePerProduct.countSubscriptions}
            </Grid>
            <Grid item xs={2}>
              {graphInvoicePerProduct.countCompanies}
            </Grid>
            <Grid item xs={2}>
              {utils.priceFormated(graphInvoicePerProduct.amount, 'usd')}
            </Grid>
          </Grid>
        ))}
      </>
    )
  }
}

export default compose(
  graphql(INVOICES_SUM_PER_MONTH_PER_PRODUCTS_QUERY, {
    name: 'invoicesSumPerMonthPerProductsQuery',
    options: (props: Props) => ({
      variables: props.variables,
    }),
  }),
  withContext
)(InvoicesSumPerMonthPerProducts)
