import React from 'react'
import { INVOICES_SUM_PER_MONTH_QUERY } from '../../GraphQL'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import { useQuery } from '@apollo/react-hooks'
import utils from '../../../utils'
import Grid from '@material-ui/core/Grid'

type Props = {
  variables: any
  title: string
}

const InvoicesTable = (props: Props) => {
  const { loading, error, data } = useQuery(INVOICES_SUM_PER_MONTH_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.invoicesSumPerMonth) return <NotFound />

  let dataToSum = [...data.invoicesSumPerMonth]

  const total = -dataToSum.reduce((acc, singleInvoicesSum) => singleInvoicesSum.amount + acc, 0)
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6} className="marginAuto">
          <h3>Period</h3>
        </Grid>
        <Grid item xs={12} sm={6} className="marginAuto">
          <h3>Amount</h3>
        </Grid>
      </Grid>
      {data.invoicesSumPerMonth.map((invoiceSumPerMonth) => (
        <Grid key={invoiceSumPerMonth.yearDateInvoice + '_' + invoiceSumPerMonth.monthDateInvoice} container>
          <Grid item xs={12} sm={6} className="marginAuto">
            {utils.dateFormated(new Date(invoiceSumPerMonth.yearDateInvoice, invoiceSumPerMonth.monthDateInvoice, 0), 'MMM-yyyy')}
          </Grid>
          <Grid item xs={12} sm={6} className="marginAuto">
            {utils.priceFormated(-invoiceSumPerMonth.amount, 'usd')}
          </Grid>
        </Grid>
      ))}

      <Grid container>
        <Grid item xs={12} sm={6} className="marginAuto">
          <h3>Total</h3>
        </Grid>
        <Grid item xs={12} sm={6} className="marginAuto">
          <h3> {utils.priceFormated(total, 'usd')}</h3>
        </Grid>
      </Grid>
    </>
  )
}

export default InvoicesTable
