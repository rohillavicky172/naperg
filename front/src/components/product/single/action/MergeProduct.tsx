import React from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { Product } from '../../Product.type'
import { MERGE_PRODUCT_MUTATION } from '../../GraphQL'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import ProductIdFilter from '../../../nav/filter/chip/ProductIdFilter'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'
const queryString = require('query-string')

type Props = {
  product: Product
}

const MergeProduct = (props: Props) => {
  const client = useApolloClient()
  const location = useLocation()
  const history = useHistory()
  const [mergeProduct] = useMutation(MERGE_PRODUCT_MUTATION)
  const [message, setMessage] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const mergeProductF = async (productId: string) => {
    setLoading(true)
    let product
    try {
      product = await mergeProduct({
        variables: {
          toProductId: props.product.id,
          fromProductId: productId,
        },
      })
    } catch (e) {
      setMessage(e.graphQLErrors[0].message)
      setLoading(false)
    }
    setLoading(false)
    if (product) {
      client.resetStore()
      setMessage('Succes!')
      onSaved()
    }
  }
  const onSaved = () => {
    let parsed = queryString.parse(location.search)
    delete parsed.productId

    history.push('?' + queryString.stringify(parsed))
  }

  const parsed = queryString.parse(location.search)
  const productId = parsed.productId ? parsed.productId : ''
  return (
    <>
      <Grid container>
        <Grid item xs={6} sm={6} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="productId">{`old productId`}</InputLabel>
            <Input
              id="name"
              onChange={(e) => {
                let parsed = queryString.parse(location.search)
                parsed.productId = e.target.value

                history.push('?' + queryString.stringify(parsed))
              }}
              type="text"
              value={productId}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} className="">
          <ButtonLoadingAfterClick
            id={'idButton'}
            icon={''}
            disabled={false}
            color={'secondary'}
            variant={'outlined'}
            size={'medium'}
            buttonText={`Merge`}
            buttonLoadingText={`Loading...`}
            onClick={() => mergeProductF(productId)}
            loading={loading}
          />{' '}
          <Link to={`/logs?productId=${props.product.id}&type=mergeProduct`}>
            <Button variant="outlined" color="primary">
              Logs merge
            </Button>
          </Link>
        </Grid>
        {productId && <ProductIdFilter />}
      </Grid>
      <div>
        {message && (
          <div>
            <span className="secondary">{message}</span>
          </div>
        )}
      </div>
    </>
  )
}

export default MergeProduct
