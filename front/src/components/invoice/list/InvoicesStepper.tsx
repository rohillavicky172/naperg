
import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { INVOICES_QUERY } from '../GraphQL'

// import SingleListMobile from '../single/listSingle/SingleListMobile'
import { Context } from '../../Context.type'
type State = {}
// import SearchInvoices from './SearchInvoices'

type Props = {
  variables: any
  invoicesQueryConnection: any
  hideUser: boolean
  context: Context
  userId: string
  onInvoices: (invoices: any) => void
}

class InvoicesStepper extends React.Component<Props, State> {
  componentDidUpdate = (prevProps: Props) => {
    if (this.props.invoicesQueryConnection !== prevProps.invoicesQueryConnection) {
      if (this.props.invoicesQueryConnection.invoicesConnection) {
        this.props.onInvoices(this.props.invoicesQueryConnection.invoicesConnection.edges)
      }
    }
  }

  render() {
    // if (this.props.invoicesQueryConnection.error) {
    //   return (
    //     <Error
    //       message={
    //         this.props.invoicesQueryConnection.error.graphQLErrors.length &&
    //         this.props.invoicesQueryConnection.error.graphQLErrors[0].message
    //       }
    //     />
    //   )
    // }
    // if (this.props.invoicesQueryConnection.loading) {
    //   return <Loading />
    // }
    // const { edges } = this.props.invoicesQueryConnection.invoicesConnection
    // if (!edges.length) {
    //   return <div>{`No invoices yet`}</div>
    // }

    return null
  }
}

export default compose(
  graphql(INVOICES_QUERY, {
    name: 'invoicesQueryConnection', // name of the injected prop: this.props.feedQuery...

    options: (props: Props) => ({
      variables: props.variables
    })
  })
  // withContext
)(InvoicesStepper)
