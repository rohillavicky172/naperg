import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'

export const DELETE_PROMOTION_MUTATION = gql`
  mutation DeletePromotion($where: PromotionWhereUniqueInput!) {
    deletePromotion(where: $where) {
      id
    }
  }
`

type Props = {
  promotionId: string
}

const DeletePromotion = (props: Props) => {
  const client = useApolloClient()
  const [deletePromotion] = useMutation(DELETE_PROMOTION_MUTATION)

  const deletePromotionF = async () => {
    try {
      await deletePromotion({
        variables: {
          where: {
            id: props.promotionId,
          },
        },
      })
    } catch (e) {
      //
    }
    client.resetStore()
  }

  return <Button onClick={() => deletePromotionF()}>X</Button>
}

export default DeletePromotion
