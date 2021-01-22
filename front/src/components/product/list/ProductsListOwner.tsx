import React from 'react'

import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import { useQuery } from '@apollo/react-hooks'
import ProductCardContainer from '../single/card/ProductCardContainer'
import Loading from '../../nav/error/Loading'
import { Grid, Button } from '@material-ui/core/'
import { PRODUCTS_QUERY } from '../GraphQL'
import UnlinkProductToCompanie from '../single/action/UnlinkProductToCompanie'
import { NodeProduct } from '../Product.type'
import { Link } from 'react-router-dom'
import IsSellerBalanceExists from '../../sellerBalance/IsSellerBalanceExists'

type Props = {
  variables: any
  companieId: string
}

const ProductsListOwner = (props: Props) => {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.productsConnection) return <NotFound />

  const { edges } = data.productsConnection

  return (
    <div className="paperIn">
      <div className="paperOut">
        <div className="tac">
          <Grid container spacing={10}>
            {edges &&
              edges.map((product: NodeProduct) => (
                <Grid xs={12} sm={6} md={4} key={product.node.id} item>
                  <ProductCardContainer elemClicked={() => {}} product={product.node} />
                  <UnlinkProductToCompanie product={product.node} />

                  <IsSellerBalanceExists productId={product.node.id} companieId={props.companieId} />
                  <Link to={`/seller/dashboard/${props.companieId}/${product.node.id}`}>
                    <Button variant="outlined" color="primary">
                      Seller Invoices (Dashboard)
                    </Button>
                  </Link>
                  <Link to={`/seller/invoicesProduct/${product.node.id}`}>
                    <Button variant="outlined" color="primary">
                      seller Transactions Product
                    </Button>
                  </Link>
                  <Link to={`/seller/subscriptionsProduct/${product.node.id}`}>
                    <Button variant="outlined" color="primary">
                      seller subscriptions Product
                    </Button>
                  </Link>
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default ProductsListOwner
