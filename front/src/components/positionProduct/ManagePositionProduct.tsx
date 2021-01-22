import React from 'react'
import PositionProducts from './list/PositionProducts'
import { CREATE_POSITION_PRODUCT_MUTATION } from './GraphQL'
import { Product } from '../product/Product.type'
import CategorieProductAutocomplete from '../categorieProduct/autocomplete/CategorieProductAutocomplete'
import { CategorieProduct } from '../categorieProduct/CategorieProduct.type'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

type Props = {
  product: Product
}

const ManagePositionProduct = (props: Props) => {
  const client = useApolloClient()
  const [createPositionProduct] = useMutation(CREATE_POSITION_PRODUCT_MUTATION)
  const createPositionProductF = async (categorieProduct: CategorieProduct) => {
    try {
      await createPositionProduct({
        variables: {
          data: {
            orderByInt: 100,
            orderByHomeInt: 100,
            isFeatured: false,
            categorieProduct: {
              connect: {
                id: categorieProduct.id,
              },
            },
            product: {
              connect: {
                id: props.product.id,
              },
            },
          },
        },
      })
    } catch (e) {
      console.log(e)
      // e.graphQLErrors.some((graphQLError) => this.props.context.openSnackBar(true, graphQLError.message, 'error'))
      throw e
    }
    client.resetStore()
  }
  return (
    <>
      <h2>Categories for {props.product.name}</h2>
      <div>
        <CategorieProductAutocomplete onClick={createPositionProductF} />
      </div>
      <PositionProducts
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

export default ManagePositionProduct
