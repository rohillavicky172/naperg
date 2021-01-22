import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { SellerBalance } from './SellerBalance.type'
import ButtonSecondValidation from '../nav/ButtonSecondValidation'

const MUTATION = gql`
  mutation DeleteSellerBalance($where: SellerBalanceWhereUniqueInput!) {
    deleteSellerBalance(where: $where) {
      id
    }
  }
`

type Props = {
  sellerBalance: SellerBalance
}
const DeleteSellerBalance = (props: Props) => {
  const [deleteSellerBalance] = useMutation(MUTATION)
  const client = useApolloClient()
  const deleteSellerBalanceF = async () => {
    await deleteSellerBalance({ variables: { where: { id: props.sellerBalance.id } } })
    client.resetStore()
  }
  return (
    <ButtonSecondValidation
      id={'deleteSellerBalance'}
      color={'primary'}
      variant={'outlined'}
      size={'medium'}
      buttonText={`Delete`}
      onClick={deleteSellerBalanceF}
    />
  )
}

export default DeleteSellerBalance
