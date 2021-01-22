import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'

export const MUTATION = gql`
  mutation DeletePromoCode($where: PromoCodeWhereUniqueInput!) {
    deletePromoCode(where: $where) {
      id
    }
  }
`

type Props = {
  promoCodeId: string
}

const DeletePromoCode = (props: Props) => {
  const client = useApolloClient()
  const [deletePromoCode] = useMutation(MUTATION)

  const deletePromoCodeF = async () => {
    try {
      await deletePromoCode({
        variables: {
          where: {
            id: props.promoCodeId,
          },
        },
      })
    } catch (e) {
      //
    }
    client.resetStore()
  }

  return (
    <Button variant="outlined" onClick={() => deletePromoCodeF()}>
      Delete
    </Button>
  )
}

export default DeletePromoCode
