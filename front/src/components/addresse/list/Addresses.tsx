import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { Product } from '../../product/Product.type'
import SingleAddresse from '../SingleAddresse'
import { ADDRESSES_QUERY } from '../GraphQL'
import Paper from '@material-ui/core/Paper'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import CreateAddresseButton from '../../addresse/form/CreateAddresseButton'

type State = {}
type Props = {
  context: Context
  product: Product
  title: string
  addresses: any
  isEditMode: boolean
  canDelete: boolean
  canCreateIfMoreThanOne: boolean
  userId: string
  type: string
  variables: any
}

class Addresses extends React.Component<Props, State> {
  render() {
    if (this.props.addresses.error) {
      return (
        <Error message={this.props.addresses.error.graphQLErrors.length && this.props.addresses.error.graphQLErrors[0].message} />
      )
    }
    if (this.props.addresses.loading) {
      return <Loading />
    }
    if (!this.props.addresses) {
      return <NotFound />
    }

    return (
      <>
        <div>
          {(this.props.addresses.addresses.length <= 0 || this.props.canCreateIfMoreThanOne) && (
            <CreateAddresseButton
              title={this.props.title}
              userId={this.props.userId}
              companieId={this.props.context.userRoleCompanie.companie.id}
              type={this.props.type}
            />
          )}
        </div>
        {this.props.addresses.addresses.map(addresse => (
          <div key={addresse.id}>
            <div className="paperOut">
              <Paper className="paperIn">
                <SingleAddresse
                  title={this.props.title}
                  type={this.props.type}
                  isEditMode={this.props.isEditMode}
                  addresse={addresse}
                  canDelete={this.props.canDelete}
                />
              </Paper>
            </div>
          </div>
        ))}
      </>
    )
  }
}

export default compose(
  graphql(ADDRESSES_QUERY, {
    name: 'addresses',
    options: (props: Props) => ({
      variables: props.variables
    })
  }),
  withContext,
  withRouter
)(Addresses)
