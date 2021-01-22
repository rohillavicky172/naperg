import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'

import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import Grid from '@material-ui/core/Grid'
import { PRODUCTS_QUERY } from '../GraphQL'
import Pagination from '../../nav/Pagination'
import { NodeProduct } from '../Product.type'

import ProductCardContainerWithBadge from '../single/card/ProductCardContainerWithBadge'
import { FormControlLabel, Switch } from '@material-ui/core'

type Props = {
  page: number
  variables: any
}

const ProductsAdminQuery = (props: Props) => {
  const [showPrivateData, setShowPrivateData] = React.useState(true)
  const { loading, error, data } = useQuery(PRODUCTS_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.productsConnection) return <NotFound />
  if (!data.productsConnection.edges.length) {
    return (
      <div>
        <div style={{ minHeight: '50px' }} />
        <h3>{`Unfortunately we couldn't find any products matching your search criteria! We're constantly adding new products.`}</h3>

        <div style={{ minHeight: '300px' }} />
      </div>
    )
  }
  return (
    <>
      <div className="paperIn">
        <FormControlLabel
          control={<Switch checked={showPrivateData} onChange={(e) => setShowPrivateData(e.target.checked)} value={true} />}
          label="showPrivateData"
        />
      </div>

      <div className="paperIn">
        <div className="paperIn">
          <div className="paperOut">
            <div className="tac">
              <Grid container spacing={10}>
                {data.productsConnection.edges.map((nodeProduct: NodeProduct) => (
                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} key={nodeProduct.node.id} item>
                    <ProductCardContainerWithBadge link={'/admin/product/' + nodeProduct.node.id} product={nodeProduct.node} />
                    {showPrivateData && nodeProduct.node.privateData}
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
          <Pagination page={props.page} first={props.variables.first} count={data.productsConnection.aggregate.count} />
        </div>
      </div>
    </>
  )
}

export default ProductsAdminQuery
