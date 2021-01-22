import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { PositionProduct } from './PositionProduct.type'

export const UPDATE_POSITION_PRODUCT_MUTATION = gql`
  mutation UpdatePositionProductMutation($data: PositionProductUpdateInput!, $where: PositionProductWhereUniqueInput!) {
    updatePositionProduct(data: $data, where: $where) {
      id
      orderByInt
      orderByHomeInt
      isFeatured
    }
  }
`

type Props = {
  positionProduct: PositionProduct
}

const EditPostitionProduct = (props: Props) => {
  const client = useApolloClient()
  const [updatePositionProduct] = useMutation(UPDATE_POSITION_PRODUCT_MUTATION)

  const [positionProduct, setPositionProduct] = React.useState(props.positionProduct)

  const updatePositionProductF = async () => {
    await updatePositionProduct({
      variables: {
        where: { id: positionProduct.id },
        data: {
          orderByInt: Number(positionProduct.orderByInt),
          orderByHomeInt: Number(positionProduct.orderByHomeInt),
          isFeatured: positionProduct.isFeatured,
        },
      },
    })
    client.resetStore()
  }

  return (
    <>
      <div>
        <FormControl>
          <InputLabel htmlFor="orderByInt">{`orderByInt`}</InputLabel>
          <Input
            id="orderByInt"
            onChange={(e) => setPositionProduct({ ...positionProduct, orderByInt: Number(e.target.value) })}
            type="number"
            value={positionProduct.orderByInt}
          />
        </FormControl>
      </div>

      <Button onClick={updatePositionProductF}>{`Update`}</Button>
    </>
  )
}

export default EditPostitionProduct
