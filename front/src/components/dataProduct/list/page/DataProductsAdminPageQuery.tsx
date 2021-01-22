/* eslint-disable react/destructuring-assignment */

import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import SingleDataProductAdmin from '../../SingleDataProductAdmin'
import { DATAPRODUCTS_QUERY } from '../../GraphQL'
import Grid from '@material-ui/core/Grid'
import Pagination from '../../../nav/Pagination'
// import { DataProduct } from '../DataProduct.type'
// import AddDataProductContainer from './AddDataProductContainer'
// import CreateDataProduct from '../form/CreateDataProduct'

type State = {}
type Props = {
  // dataProduct: DataProduct,
  dataProducts: any
  page: number
  variables: any
}

class DataProductsAdminPageQuery extends React.Component<Props, State> {
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
        {this.props.dataProducts.dataProductsConnection.edges.map((dataProductNode) => (
          <div key={dataProductNode.node.id}>
            <SingleDataProductAdmin dataProduct={dataProductNode.node} />
          </div>
        ))}
        <Grid container>
          <Grid item xs={12} sm={9} className="marginAuto">
            <Pagination
              page={this.props.page}
              first={this.props.variables.first}
              count={this.props.dataProducts.dataProductsConnection.aggregate.count}
            />
          </Grid>
        </Grid>
      </>
    )
  }
}

export default compose(
  graphql(DATAPRODUCTS_QUERY, {
    name: 'dataProducts',
    options: (props: Props) => ({
      variables: props.variables,
    }),
  }),
  withRouter
)(DataProductsAdminPageQuery)
