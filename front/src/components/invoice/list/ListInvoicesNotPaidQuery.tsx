import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { flowRight as compose } from 'lodash'
import { INVOICES_QUERY } from '../GraphQL'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import { withContext } from '../../withContext'
import SingleInvoiceNotPaid from '../single/listSingle/SingleInvoiceNotPaid'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import WarningAction from '../../subscription/single/action/WarningAction'
import { Context } from '../../Context.type'
import { History } from '../../History.type'
type State = {
  loading: boolean
}

type Props = {
  invoicesQueryConnection: any
  hideUser: boolean
  page: boolean
  history: History
  context: Context
  userId: string
  companieId: string
  variables: any
}

class ListInvoicesNotPaidQuery extends React.Component<Props, State> {
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
    const { edges } = this.props.invoicesQueryConnection.invoicesConnection
    if (!edges.length) {
      return null
    }

    return (
      <div className="paperOut">
        <Paper className="">
          <WarningAction
            onCancel={() => {}}
            shwowCancelButton={false}
            iconText={'warning'}
            message="Your account is on hold. Please clear your outstanding balance to reactivate your account. Consider adding a new Payment Source."
            actionText="Go to Payment Source"
            shwowActionButton={true}
            onClick={() => {
              this.props.history.push('/paymentSource/' + this.props.companieId)
            }}
          />
          <div className="dividerSection">
            <Divider />
          </div>

          {edges.map((invoice) => (
            <div key={invoice.node.id}>
              <SingleInvoiceNotPaid userId={this.props.userId} invoice={invoice.node} />
            </div>
          ))}
        </Paper>
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
  }),
  withContext,
  withRouter
)(ListInvoicesNotPaidQuery)
