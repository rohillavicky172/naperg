import React from 'react'
import Grid from '@material-ui/core/Grid'
// import { User } from '../../../User.type'
import { Product } from '../../../product/Product.type'
import AutocompleteSearchProducts from '../../../product/list/autocomplete/AutocompleteSearchProducts'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { UPDATE_PRODUCT_MUTATION } from '../../../product/GraphQL'
import { Client } from '../../../Client.type'

type State = {
  errorMessage: string
}

type Props = {
  // user: User
  companieId: string
  client: Client
  updateProduct: any
}

class LinkProductsToCompanie extends React.Component<Props, State> {
  state = {
    errorMessage: ''
  }
  onClick = async (product: Product) => {
    try {
      await this.props.updateProduct({
        variables: {
          where: {
            id: product.id
          },
          data: {
            ownerCompanie: {
              connect: {
                id: this.props.companieId
              }
            }
          }
        }
      })
      this.setState({ errorMessage: '' })
    } catch (e) {
      e.graphQLErrors.some(graphQLError => this.setState({ errorMessage: graphQLError.message }))
      throw e
    }
    this.props.client.resetStore()
  }
  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={12}>
          LinkProductsToCompany
          <AutocompleteSearchProducts onClick={this.onClick} onChange={() => {}} />
          <p className="secondary">{this.state.errorMessage}</p>
        </Grid>
      </Grid>
    )
  }
}

export default compose(
  graphql(UPDATE_PRODUCT_MUTATION, {
    name: 'updateProduct'
  }),

  withApollo
)(LinkProductsToCompanie)
