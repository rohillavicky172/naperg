import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { INVOICES_SUM_PER_MONTH_PER_COMPANIES_QUERY } from '../GraphQL'
import { Link } from 'react-router-dom'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { User } from '../../user/User.type'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import Grid from '@material-ui/core/Grid'
import utils from '../../utils'

type State = {}

type Props = {
  variables: any
  context: Context
  invoicesSumPerMonthQuery: any
  me: User
}

class InvoicesSumPerMonthPerCompanies extends React.Component<Props, State> {
  render() {
    if (this.props.invoicesSumPerMonthQuery.error) {
      return (
        <Error
          message={
            this.props.invoicesSumPerMonthQuery.error.graphQLErrors.length &&
            this.props.invoicesSumPerMonthQuery.error.graphQLErrors[0].message
          }
        />
      )
    }
    if (this.props.invoicesSumPerMonthQuery.loading) {
      return <Loading />
    }
    if (!this.props.invoicesSumPerMonthQuery) {
      return <NotFound />
    }

    const total = this.props.invoicesSumPerMonthQuery.invoicesSumPerMonthPerCompanies.reduce(
      (acc, graphInvoicePerCompanie) => acc + graphInvoicePerCompanie.amount,
      0
    )

    return (
      <>
        <Grid container>
          <Grid item xs={12} sm={1}></Grid>
          <Grid item xs={12} sm={3}>
            <span className="fontWeight19">Total</span>
          </Grid>
          <Grid item xs={12} sm={4}></Grid>
          <Grid item xs={12} sm={4}>
            <span className="fontWeight19">{utils.priceFormated(total, 'usd')}</span>
          </Grid>
        </Grid>
        <div style={{ height: '12px' }} />
        {this.props.invoicesSumPerMonthQuery.invoicesSumPerMonthPerCompanies
          // .sort((a, b) => a.amount - b.amount)
          .map((graphInvoicePerCompanie, i) => (
            <Grid key={graphInvoicePerCompanie.id} container>
              <Grid item xs={12} sm={1}>
                {i + 1}.
              </Grid>
              <Grid item xs={12} sm={3}>
                {graphInvoicePerCompanie.id}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Link className="link" to={'/company/' + graphInvoicePerCompanie.id}>
                  {graphInvoicePerCompanie.name} ({graphInvoicePerCompanie.dimension2})
                </Link>
              </Grid>
              <Grid item xs={12} sm={4}>
                {utils.priceFormated(graphInvoicePerCompanie.amount, 'usd')}
              </Grid>
            </Grid>
          ))}
      </>
    )
  }
}

export default compose(
  graphql(INVOICES_SUM_PER_MONTH_PER_COMPANIES_QUERY, {
    name: 'invoicesSumPerMonthQuery',
    options: (props: Props) => ({
      variables: props.variables,
      fetchPolicy: 'network-only',
    }),
  }),
  withContext
)(InvoicesSumPerMonthPerCompanies)
