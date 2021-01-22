import React from 'react'
import { Product } from '../../../product/Product.type'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { UPDATE_PRODUCT_MUTATION } from '../../../product/GraphQL'
import { Client } from '../../../Client.type'
import { Button } from '@material-ui/core/'

type State = {
  errorMessage: string
}

type Props = {
  product: Product
  client: Client
  updateProduct: any
}

class UnlinkProductToCompanie extends React.Component<Props, State> {
  state = {
    errorMessage: '',
  }
  onClick = async () => {
    try {
      await this.props.updateProduct({
        variables: {
          where: {
            id: this.props.product.id,
          },
          data: {
            ownerCompanie: {
              disconnect: true,
            },
          },
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => this.setState({ errorMessage: graphQLError.message }))
      throw e
    }
    this.props.client.resetStore()
  }
  render() {
    return <Button onClick={this.onClick}>X</Button>
  }
}

export default compose(
  graphql(UPDATE_PRODUCT_MUTATION, {
    name: 'updateProduct',
  }),

  withApollo
)(UnlinkProductToCompanie)
