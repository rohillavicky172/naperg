import React from 'react'
import { MerchantData } from '../MerchantData.type'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
import { FormControl, InputLabel, Input, Button, Grid } from '@material-ui/core'
import gql from 'graphql-tag'

const MUTATION = gql`
  mutation SpreadProductIdFromMerchantData($productId: String!, $merchantDataId: String!) {
    spreadProductIdFromMerchantData(productId: $productId, merchantDataId: $merchantDataId) {
      id
    }
  }
`

type Props = {
  merchantData: MerchantData
}

const SpreadProductIdFromMerchantData = (props: Props) => {
  const [message, setMessage] = React.useState('')
  const [productId, setProductId] = React.useState(props.merchantData.product.id)
  const [loading, setLoading] = React.useState(false)
  const [spreadProductIdFromMerchantData] = useMutation(MUTATION)

  const spreadProductIdFromMerchantDataF = async () => {
    setLoading(true)

    let newMerchantData
    try {
      newMerchantData = await spreadProductIdFromMerchantData({
        variables: {
          merchantDataId: props.merchantData.id,
          productId,
        },
      })
    } catch (e) {
      setLoading(false)
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    setLoading(false)
    if (newMerchantData) {
      setMessage('Saved!')
    }
  }
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6} className="">
          <div>
            <FormControl>
              <InputLabel htmlFor="productId">{`productId`}</InputLabel>
              <Input id="productId" type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
            </FormControl>
          </div>
          <ButtonLoadingAfterClick
            id={'spreadProductIdFromMerchantDataF'}
            icon={''}
            color={'primary'}
            disabled={false}
            variant={'outlined'}
            size={'medium'}
            buttonText={'spreadProductIdFromMerchantDataF'}
            buttonLoadingText={`Loading...`}
            onClick={() => spreadProductIdFromMerchantDataF()}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} className="">
          <p>
            It will change the product for this merchantData, all invoices associated with this merchantData and all subscriptions
            linked with the invoices
          </p>
          <Link to={`/logs?event=spreadProductIdFromMerchantData`}>
            <Button variant="outlined">Logs</Button>
          </Link>
        </Grid>
      </Grid>

      <div className="secondary">{message}</div>
    </>
  )
}

export default SpreadProductIdFromMerchantData
