import React from 'react'
import gql from 'graphql-tag'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import ButtonSecondValidation from '../../../nav/ButtonSecondValidation'
// import { AppContext } from '../../../AppContext'
// import { Context } from '../../../Context.type'
import { Paper, FormControl, InputLabel, Input } from '@material-ui/core/'

export const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscription($productId: String!, $issuedCardId: String!) {
    createSubscription(productId: $productId, issuedCardId: $issuedCardId) {
      id
    }
  }
`

const CreateSubscriptionPage = () => {
  const history = useHistory()

  const [createSubcription] = useMutation(CREATE_SUBSCRIPTION)
  // const { context }: { context: Context } = React.useContext(AppContext)

  const [productId, setProductId] = React.useState('')
  const [issuedCardId, setIssuedCardId] = React.useState('')
  const [message, setMessage] = React.useState('')

  const createSubscriptionF = async () => {
    let data
    try {
      data = await createSubcription({
        variables: {
          productId,
          issuedCardId,
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }

    if (data) {
      history.push('/invoice/' + data.createSubscription.id)
    }
  }

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`CreateSubscription`}</h3>
          <div>
            <FormControl className={''}>
              <InputLabel htmlFor="productId">{`productId`}</InputLabel>
              <Input
                id="productId"
                type="text"
                value={productId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductId(e.target.value)}
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={''}>
              <InputLabel htmlFor="issuedCardId">{`issuedCardId`}</InputLabel>
              <Input
                id="issuedCardId"
                type="text"
                value={issuedCardId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIssuedCardId(e.target.value)}
              />
            </FormControl>
          </div>
          <div>
            <ButtonSecondValidation
              buttonText={`Create`}
              color={'primary'}
              size={'medium'}
              variant={'outlined'}
              onClick={() => createSubscriptionF()}
            />
          </div>
          <div className="secondary">{message}</div>
        </Paper>
      </div>
    </>
  )
}

export default CreateSubscriptionPage
