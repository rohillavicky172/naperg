import React from 'react'

import Button from '@material-ui/core/Button'
import { Promotion } from '../Promotion.type'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

export const UPDATE_PROMOTION_MUTATION = gql`
  mutation UpdatePromotionMutation($data: PromotionUpdateInput!, $where: PromotionWhereUniqueInput!) {
    updatePromotion(data: $data, where: $where) {
      id
      createdAt
      isPromotionLive
      startAt
      endAt
      window
      howToRedeem
      # showHowToRedeem
      typeRedeem
      text1
      text2
      text3
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
  onUpdate: () => void
}

const UpdatePromotion = (props: Props) => {
  const [updatePromotion] = useMutation(UPDATE_PROMOTION_MUTATION)
  const [message, setMessage] = React.useState('')

  const updatePromotionF = async () => {
    let newPromotion
    try {
      newPromotion = await updatePromotion({
        variables: {
          where: {
            id: props.promotion.id,
          },
          data: {
            discount: Number(props.promotion.discount),
            window: Number(props.promotion.window),
            startAt: props.promotion.startAt,
            endAt: props.promotion.endAt,
            type: props.promotion.type,
            text1: props.promotion.text1,
            text2: props.promotion.text2,
            text3: props.promotion.text3,
            howToRedeem: props.promotion.howToRedeem,
            // showHowToRedeem: props.promotion.showHowToRedeem,
            typeRedeem: props.promotion.typeRedeem,
          },
        },
      })
    } catch (e) {
      setMessage(e.graphQLErrors[0].message)
    }
    if (newPromotion) {
      props.onUpdate()
    }
  }
  return (
    <>
      <Button color="primary" variant="outlined" onClick={() => updatePromotionF()}>
        {`Update`}
      </Button>
      <div className="secondary">{message}</div>
    </>
  )
}

export default UpdatePromotion
