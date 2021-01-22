
import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { INVOICE_QUERY } from '../../GraphQL'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import { User } from '../../../user/User.type'
import { withContext } from '../../../withContext'
import UpdateInvoice from '../action/UpdateInvoice'

type State = {}

type Props = {
  invoiceId: string
  invoiceQuery: any
  me: User
}

class EditInvoiceQuery extends React.Component<Props, State> {
  render() {
    if (this.props.invoiceQuery.error) {
      return (
        <Error
          message={this.props.invoiceQuery.error.graphQLErrors.length && this.props.invoiceQuery.error.graphQLErrors[0].message}
        />
      )
    }
    if (this.props.invoiceQuery.loading) {
      return <Loading />
    }
    if (!this.props.invoiceQuery) {
      return <NotFound />
    }

    return (
      <>
        <UpdateInvoice invoice={this.props.invoiceQuery.invoice} />
      </>
    )
  }
}

export default compose(
  graphql(INVOICE_QUERY, {
    name: 'invoiceQuery',

    options: (props: Props) => ({
      variables: {
        where: {
          id: props.invoiceId
        }
      }
    })
  }),
  withContext
)(EditInvoiceQuery)
