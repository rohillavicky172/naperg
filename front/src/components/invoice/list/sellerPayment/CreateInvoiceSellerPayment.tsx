import React from 'react'
import { Button, FormControl, InputLabel, Input } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
// import { SellerBalance } from './SellerBalance.type'

const MUTATION = gql`
  mutation CreateInvoiceSellerPayment($period: String!, $companieId: String!, $productId: String!) {
    createInvoiceSellerPayment(period: $period, companieId: $companieId, productId: $productId) {
      id
    }
  }
`

type Props = {
  companieId: string
  productId: string
}
const CreateInvoiceSellerPayment = (props: Props) => {
  const [createInvoiceSellerPayment] = useMutation(MUTATION)
  // const client = useApolloClient()
  const [period, setPeriod] = React.useState('')
  const [message, setMessage] = React.useState('')
  const createInvoiceSellerPaymentF = async () => {
    setMessage('')
    try {
      await createInvoiceSellerPayment({
        variables: {
          period,
          companieId: props.companieId,
          productId: props.productId,
        },
      })
      setMessage('Ok!')
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => setMessage('Error: ' + graphQLError.message))
    }
    // client.resetStore()
  }
  return (
    <>
      <div>
        <h4>CreateInvoiceSellerPayment</h4>
        <FormControl>
          <InputLabel htmlFor="period">{`period`}</InputLabel>
          <Input
            id="period"
            type="text"
            placeholder={'YYYYMM'}
            value={period}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPeriod(e.target.value)}
          />
        </FormControl>
      </div>
      <Button onClick={() => createInvoiceSellerPaymentF()}>Create</Button>
      <p className="secondary">{message}</p>
    </>
  )
}

export default CreateInvoiceSellerPayment
