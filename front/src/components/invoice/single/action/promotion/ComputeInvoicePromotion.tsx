import React from 'react'
import gql from 'graphql-tag'

import ButtonSecondValidation from '../../../../nav/ButtonSecondValidation'

import { useMutation, useApolloClient } from '@apollo/react-hooks'

export const MUTATION = gql`
  mutation ComputeInvoicePromotion($where: InvoiceWhereUniqueInput!) {
    computeInvoicePromotion(where: $where) {
      id
    }
  }
`
type Props = {
  invoiceId: string
}

const ComputeInvoicePromotion = (props: Props) => {
  const client = useApolloClient()
  const [computeInvoicePromotion] = useMutation(MUTATION)
  const computeInvoicePromotionF = async () => {
    try {
      await computeInvoicePromotion({
        variables: {
          where: {
            id: props.invoiceId,
          },
        },
      })
    } catch (e) {
      console.log(e)
    }
    client.resetStore()
  }
  return (
    <ButtonSecondValidation
      buttonText={`ComputeInvoicePromotion`}
      color={'default'}
      size={'medium'}
      variant={'outlined'}
      onClick={() => computeInvoicePromotionF()}
    />
  )
}

export default ComputeInvoicePromotion
