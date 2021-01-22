import React from 'react'
import Paper from '@material-ui/core/Paper'
import LinkProductsToCompanie from './LinkProductsToCompanie'
import ProductsListOwner from '../../../product/list/ProductsListOwner'

type Props = {
  companieId: string
}

const ProductOwner = (props: Props) => {
  return (
    <>
      <div className="paperOut">
        <h3>Admin</h3>
        <Paper className="paperIn">
          <LinkProductsToCompanie companieId={props.companieId} />
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn">
          <ProductsListOwner
            companieId={props.companieId}
            variables={{
              first: 100,
              where: {
                ownerCompanie: {
                  id: props.companieId,
                },
              },
            }}
          />
        </Paper>
      </div>
    </>
  )
}

export default ProductOwner
