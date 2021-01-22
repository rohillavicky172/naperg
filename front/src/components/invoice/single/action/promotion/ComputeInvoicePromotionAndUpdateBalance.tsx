import React from 'react'
import gql from 'graphql-tag'

import ButtonSecondValidation from '../../../../nav/ButtonSecondValidation'

import { useMutation, useApolloClient } from '@apollo/react-hooks'

export const MUTATION = gql`
  mutation ComputeInvoicePromotionAndUpdateBalance($where: InvoiceWhereUniqueInput!) {
    computeInvoicePromotionAndUpdateBalance(where: $where) {
      id
    }
  }
`
type Props = {
  invoiceId: string
}

const ComputeInvoicePromotionAndUpdateBalance = (props: Props) => {
  const client = useApolloClient()
  const [computeInvoicePromotionAndUpdateBalance] = useMutation(MUTATION)
  const computeInvoicePromotionAndUpdateBalanceF = async () => {
    try {
      await computeInvoicePromotionAndUpdateBalance({
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
      buttonText={`ComputeInvoicePromotionAndUpdateBalance`}
      color={'default'}
      size={'medium'}
      variant={'outlined'}
      onClick={() => computeInvoicePromotionAndUpdateBalanceF()}
    />
  )
}

export default ComputeInvoicePromotionAndUpdateBalance
