
import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { Product } from '../../product/Product.type'
import SingleAddresseView from '../SingleAddresseView'
import { ADDRESSES_QUERY } from '../GraphQL'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'

type State = {}
type Props = {
  variables: any
  context: Context
  product: Product
  title: string
  addressesQuery: any
  isEditMode: boolean
  canDelete: boolean
  canCreateIfMoreThanOne: boolean
  userId: string
  type: string
}

class AddressesQuery extends React.Component<Props, State> {
  render() {
    if (this.props.addressesQuery.error) {
      return (
        <Error
          message={
            this.props.addressesQuery.error.graphQLErrors.length && this.props.addressesQuery.error.graphQLErrors[0].message
          }
        />
      )
    }
    if (this.props.addressesQuery.loading) {
      return <Loading />
    }
    if (!this.props.addressesQuery) {
      return <NotFound />
    }

    return (
      <>
        {this.props.addressesQuery.addresses.map(addresse => (
          <div key={addresse.id}>
            <SingleAddresseView
              title={this.props.title}
              type={this.props.type}
              isEditMode={this.props.isEditMode}
              addresse={addresse}
              canDelete={this.props.canDelete}
            />
          </div>
        ))}
      </>
    )
  }
}

export default compose(
  graphql(ADDRESSES_QUERY, {
    name: 'addressesQuery',
    options: (props: Props) => ({
      variables: props.variables
    })
  }),
  withContext,
  withRouter
)(AddressesQuery)
