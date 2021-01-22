import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import SingleDataProduct from '../SingleDataProduct'
import { DATAPRODUCTS_QUERY } from '../GraphQL'
import CreateDataProductManagement from '../form/CreateDataProductManagement'

type State = {}
type Props = {
  variables: any
  userId: string
  productId: string
  companieId: string
  subscriptionId: string
  dataProducts: any
}

class DataProductsQuery extends React.Component<Props, State> {
  onCreate = () => {
    this.props.dataProducts.refetch()
  }

  render() {
    if (this.props.dataProducts.error) {
      return (
        <Error
          message={this.props.dataProducts.error.graphQLErrors.length && this.props.dataProducts.error.graphQLErrors[0].message}
        />
      )
    }
    if (this.props.dataProducts.loading) {
      return <Loading />
    }
    if (!this.props.dataProducts) {
      return <NotFound />
    }

    return (
      <>
        {this.props.dataProducts.dataProductsConnection.edges.length ? (
          <>
            {this.props.dataProducts.dataProductsConnection.edges.map(dataProductNode => (
              <div key={dataProductNode.node.id}>
                <SingleDataProduct dataProduct={dataProductNode.node} />
              </div>
            ))}
          </>
        ) : (
          <CreateDataProductManagement
            onCreate={this.onCreate}
            userId={this.props.userId}
            companieId={this.props.companieId}
            subscriptionId={this.props.subscriptionId}
            productId={this.props.productId}
          />
        )}
      </>
    )
  }
}

export default compose(
  graphql(DATAPRODUCTS_QUERY, {
    name: 'dataProducts',
    options: (props: Props) => ({
      variables: props.variables
    })
  }),
  withRouter
)(DataProductsQuery)
