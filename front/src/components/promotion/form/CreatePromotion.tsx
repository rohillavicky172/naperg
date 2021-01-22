import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import { Promotion } from '../Promotion.type'
import { Product } from '../../product/Product.type'

export const CREATE_PROMOTION_MUTATION = gql`
  mutation CreatePromotionMutation($data: PromotionCreateInput!) {
    createPromotion(data: $data) {
      id
      createdAt
      startAt
      endAt
      text1
      text2
      text3
      window
      discount
      type
      createdBy {
        id
        firstName
        lastName
      }
      product {
        id
        name
      }
    }
  }
`

type Props = {
  promotion: Promotion
  product: Product
  onUpdate: () => void
  cleanFields: () => void
}

const CreatePromotion = (props: Props) => {
  const client = useApolloClient()
  const [createPromotion] = useMutation(CREATE_PROMOTION_MUTATION)

  const createPromotionF = async () => {
    try {
      await createPromotion({
        variables: {
          data: {
            discount: Number(props.promotion.discount),
            window: Number(props.promotion.window),
            startAt: props.promotion.startAt,
            endAt: props.promotion.endAt,
            type: props.promotion.type,
            text1: props.promotion.text1,
            text2: props.promotion.text2,
            text3: props.promotion.text3,
            // showHowToRedeem: props.promotion.showHowToRedeem,
            typeRedeem: props.promotion.typeRedeem,
            howToRedeem: props.promotion.howToRedeem,

            product: {
              connect: {
                id: props.product.id,
              },
            },
          },
        },
      })
    } catch (e) {
      //
    }
    client.resetStore()
    props.onUpdate()
  }
  return (
    <Button
      color="primary"
      variant="outlined"
      onClick={() => {
        createPromotionF()
        props.cleanFields()
      }}>
      {`Save`}
    </Button>
  )
}

export default CreatePromotion
