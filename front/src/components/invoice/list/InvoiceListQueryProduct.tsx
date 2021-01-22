import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { INVOICES_QUERY } from '../GraphQL'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import SingleInvoiceList from '../single/listSingle/SingleInvoiceList'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import { InvoiceNode } from '../Invoice.type'

type State = {
  loading: boolean
}

type Props = {
  invoicesQueryConnection: any
  // companie: Companie,
  // product: Product,
  linkSeeMore: string
  textSeeMore: string
  userId: string
  variables: any
}

class InvoiceListQueryProduct extends React.Component<Props, State> {
  state = {
    loading: false,
  }
  refetch = async () => {
    this.setState({ loading: true })
    await this.props.invoicesQueryConnection.refetch()
    this.setState({ loading: false })
  }
  render() {
    if (this.props.invoicesQueryConnection.error) {
      return (
        <Error
          message={
            this.props.invoicesQueryConnection.error.graphQLErrors.length &&
            this.props.invoicesQueryConnection.error.graphQLErrors[0].message
          }
        />
      )
    }
    if (this.props.invoicesQueryConnection.loading) {
      return <Loading />
    }
    // console.log(this.props.invoicesQueryConnection.invoicesConnection.aggregate.count)
    const { edges } = this.props.invoicesQueryConnection.invoicesConnection
    if (!edges.length) {
      return (
        <div className="paperOut">
          <Paper className="paperIn">
            <div className="responsiveMargin2 tac textSize11">
              {/* {`You will see all your transactions here, including any balance topups and any charges to your NachoCards.`} */}
              {`You will see all your transactions here including any charges to your NachoCards.`}
            </div>
          </Paper>
        </div>
      )
    }

    return (
      <div className="paperOut">
        {edges.map((invoice: InvoiceNode) => (
          <div key={invoice.node.id}>
            <SingleInvoiceList invoice={invoice.node} />
          </div>
        ))}

        {this.props.invoicesQueryConnection.invoicesConnection.aggregate.count > 3 && (
          <div className="tar">
            <Link className="link" to={this.props.linkSeeMore}>
              {this.props.textSeeMore}
            </Link>
          </div>
        )}
      </div>
    )
  }
}

export default compose(
  graphql(INVOICES_QUERY, {
    name: 'invoicesQueryConnection',
    options: (props: Props) => ({
      variables: props.variables,
    }),
  })
)(InvoiceListQueryProduct)
