import React from 'react'
import { Button } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { SellerBalance } from './SellerBalance.type'

const MUTATION = gql`
  mutation UpdateSellerBalance($data: SellerBalanceUpdateInput!, $where: SellerBalanceWhereUniqueInput!) {
    updateSellerBalance(data: $data, where: $where) {
      id
      revshareSellerTotal
      revshareSellerTotalPaid
      revshareSellerTotalPaidPending
    }
  }
`

type Props = {
  sellerBalance: SellerBalance
}
const UpdateSellerBalance = (props: Props) => {
  const [createContract] = useMutation(MUTATION)

  const createContractF = async () => {
    await createContract({
      variables: {
        data: {},
        // keyTerms: contract.keyTerms,
        where: {
          id: props.sellerBalance.id,
        },
      },
    })
  }
  return (
    <>
      <Button onClick={() => createContractF()}>Refresh</Button>
    </>
  )
}

export default UpdateSellerBalance
