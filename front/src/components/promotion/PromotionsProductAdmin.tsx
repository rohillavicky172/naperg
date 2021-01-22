import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import Promotions from './Promotions'
import { Button } from '@material-ui/core'

import { Product } from '../product/Product.type'

type Props = {
  product: Product
}

const PromotionsProductAdmin = (props: Props) => {
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <Link to={'/admin/computeInvoicesPromotion?productId=' + props.product.id}>
            <Button color="primary" variant="outlined">{`Compute all promotions in invoices for this product`}</Button>
          </Link>
        </Paper>
      </div>

      <Promotions
        product={props.product}
        variables={{
          where: {
            product: {
              id: { equals: props.product.id },
            },
          },
        }}
      />
    </>
  )
}

export default PromotionsProductAdmin
