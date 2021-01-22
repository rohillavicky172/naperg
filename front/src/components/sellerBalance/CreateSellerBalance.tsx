import React from 'react'
import { Button } from '@material-ui/core'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const MUTATION = gql`
  mutation CreateSellerBalance($data: SellerBalanceCreateInput!) {
    createSellerBalance(data: $data) {
      id
      revshareSellerTotal
      revshareSellerTotalPaid
    }
  }
`

type Props = {
  productId: string
  companieId: string
}
const CreateSellerBalance = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const [createSellerBalance] = useMutation(MUTATION)
  const client = useApolloClient()
  const createSellerBalanceF = async () => {
    const newContrat = await createSellerBalance({
      variables: {
        data: {
          testMode: context.testMode,
          product: {
            connect: {
              id: props.productId,
            },
          },
          // keyTerms: contract.keyTerms,
          companie: {
            connect: {
              id: props.companieId,
            },
          },
        },
      },
    })
    if (newContrat) {
      client.resetStore()
    }
  }
  return (
    <Button variant="outlined" color="secondary" onClick={() => createSellerBalanceF()}>
      Create Seller Balance
    </Button>
  )
}

export default CreateSellerBalance
