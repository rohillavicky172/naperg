import React from 'react'

import Button from '@material-ui/core/Button'
import { PromoCode } from '../PromoCode.type'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

export const UPDATE_PROMOTION_MUTATION = gql`
  mutation UpdatePromoCodeMutation($data: PromoCodeUpdateInput!, $where: PromoCodeWhereUniqueInput!) {
    updatePromoCode(data: $data, where: $where) {
      id
      createdAt
      isPromoCodeLive
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
  promoCode: PromoCode
  onUpdate: () => void
}

const UpdatePromoCode = (props: Props) => {
  const [updatePromoCode] = useMutation(UPDATE_PROMOTION_MUTATION)
  const [message, setMessage] = React.useState('')

  const updatePromoCodeF = async () => {
    let newPromoCode
    try {
      newPromoCode = await updatePromoCode({
        variables: {
          where: {
            id: props.promoCode.id,
          },
          data: {
            promoCode: props.promoCode.code,
          },
        },
      })
    } catch (e) {
      setMessage(e.graphQLErrors[0].message)
    }
    if (newPromoCode) {
      props.onUpdate()
    }
  }
  return (
    <>
      <Button color="primary" variant="outlined" onClick={() => updatePromoCodeF()}>
        {`Update`}
      </Button>
      <div className="secondary">{message}</div>
    </>
  )
}

export default UpdatePromoCode
