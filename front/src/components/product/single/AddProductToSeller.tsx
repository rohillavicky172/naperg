import React from 'react'
import { InputLabel, FormControl, Input, Paper } from '@material-ui/core/'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
import { Companie } from '../../companie/Companie.type'

const MUTATION = gql`
  mutation AddProductToSeller($productName: String!, $companieId: String!) {
    addProductToSeller(productName: $productName, companieId: $companieId) {
      id
    }
  }
`

type Props = {
  companie: Companie
}

const AddProductToSeller = (props: Props) => {
  const client = useApolloClient()
  const [productName, setProductName] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [addProductToSeller] = useMutation(MUTATION)

  return (
    <>
      <div className="paperOut">
        <h3>Add Product to {props.companie.name}</h3>
        <Paper className="paperIn">
          <FormControl className="">
            <InputLabel htmlFor="productName">{`Product Name`}</InputLabel>
            <Input
              id="productName"
              type="text"
              value={productName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)}
            />
          </FormControl>
          <div style={{ height: '10px' }} />
          <ButtonLoadingAfterClick
            id={'idButton'}
            icon={''}
            color={'primary'}
            disabled={productName.length > 0 ? false : true}
            variant={'outlined'}
            size={'medium'}
            buttonText={'Create'}
            buttonLoadingText={`Loading...`}
            onClick={async () => {
              setLoading(true)
              try {
                await addProductToSeller({
                  variables: {
                    productName,
                    companieId: props.companie.id,
                  },
                })
              } catch (e) {
                setLoading(false)
                setMessage('Error')
              }
              setLoading(false)
              setMessage('Created!')
              setProductName('')
              await client.resetStore()
            }}
            loading={loading}
          />
          <p className="secondary">{message}</p>
        </Paper>
      </div>
    </>
  )
}

export default AddProductToSeller
