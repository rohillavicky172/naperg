
import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { INVOICES_SUM_QUERY } from '../GraphQL'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
// import { User } from '../../user/User.type'
import { withContext } from '../../withContext'
import utils from '../../utils'
// import Paper from '@material-ui/core/Paper'
// import DateComponent from '../../nav/DateComponent'

type State = {}

type Props = {
  variables: any
  invoicesSumQuery: any

  text: string
}

class InvoicesSum extends React.Component<Props, State> {
  render() {
    if (this.props.invoicesSumQuery.error) {
      return (
        <Error
          message={
            this.props.invoicesSumQuery.error.graphQLErrors.length && this.props.invoicesSumQuery.error.graphQLErrors[0].message
          }
        />
      )
    }
    if (this.props.invoicesSumQuery.loading) {
      return <Loading />
    }
    if (!this.props.invoicesSumQuery) {
      return <NotFound />
    }
    // console.log(this.props.invoicesSumQuery.invoicesSum.sumBuyerFinalPrice)
    // console.log(this.props.variables.where)
    return (
      <>
        {this.props.text} {utils.priceFormated(-this.props.invoicesSumQuery.invoicesSum.sumBuyerFinalPrice, 'usd')}
      </>
    )
  }
}

export default compose(
  graphql(INVOICES_SUM_QUERY, {
    name: 'invoicesSumQuery',
    options: (props: Props) => ({
      variables: props.variables
    })
  }),
  withContext
)(InvoicesSum)
