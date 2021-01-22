
import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { INVOICES_QUERY } from '../GraphQL'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import { withContext } from '../../withContext'
import InvoiceDashboard from '../single/listSingle/InvoiceDashboard'
import { Link } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { Context } from '../../Context.type'
import { Companie } from '../../companie/Companie.type'
import { User } from '../../user/User.type'

type State = {
  loading: boolean
}

type Props = {
  invoicesQueryConnection: any
  context: Context
  userId: string
  user: User
  companie: Companie
  variables: any
  title: string
}

class InvoicesDashboardAdminQuery extends React.Component<Props, State> {
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
    const { edges } = this.props.invoicesQueryConnection.invoicesConnection
    return (
      <>
        <CardContent className="cardContentClass">
          <h3>{this.props.title}</h3>
          {edges.map(invoice => (
            <div key={invoice.node.id} className="paperOut">
              <InvoiceDashboard userId={this.props.userId} invoice={invoice.node} />
              <Divider />
            </div>
          ))}
        </CardContent>
        <CardActions>
          {this.props.context.me.role === 'ADMIN' && !this.props.variables.where.companie && !this.props.variables.where.user && (
            <div>
              {this.props.invoicesQueryConnection.invoicesConnection.aggregate.count > 3 && (
                <Link className="link" to={'/adminInvoices/1'}>
                  {`See all transactions in app (admin)`}
                </Link>
              )}
            </div>
          )}
        </CardActions>
      </>
    )
  }
}

export default compose(
  graphql(INVOICES_QUERY, {
    name: 'invoicesQueryConnection',
    options: (props: Props) => ({
      variables: props.variables
    })
  }),
  withContext
)(InvoicesDashboardAdminQuery)
