import React from 'react'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
import Button from '@material-ui/core/Button'
import { IssuedCard } from '../IssuedCard.type'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

export const MUTATION = gql`
  mutation UpdateCardholder($cardholderString: String!, $where: IssuedCardWhereUniqueInput!) {
    updateCardholder(cardholderString: $cardholderString, where: $where) {
      id
      stripe_issuedCard_id
      issuedCardStripe {
        id
        cardholder {
          id
          phone_number
          email
          name
          billing {
            address {
              city
              country
              line1
              line2
              postal_code
              state
            }
          }
        }
      }
    }
  }
`

type Props = {
  onCancel: () => void
  issuedCard: IssuedCard

  onUpdate: () => void
}

const UpdateCardHolder = (props: Props) => {
  const client = useApolloClient()
  const [updateCardholder] = useMutation(MUTATION)
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')

  const updateCardholderF = async () => {
    let newIssuedCardData: any
    setLoading(true)
    try {
      newIssuedCardData = await updateCardholder({
        variables: {
          cardholderString: JSON.stringify(props.issuedCard.issuedCardStripe.cardholder),
          where: {
            id: props.issuedCard.id,
          },
        },
      })
    } catch (e) {
      setLoading(false)
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }

    if (newIssuedCardData) {
      setLoading(false)
      props.onUpdate()
      client.resetStore()
    }
  }

  return (
    <>
      <ButtonLoadingAfterClick
        id={'updateCardHolderButton'}
        icon={''}
        color={'primary'}
        variant={'outlined'}
        size={'medium'}
        disabled={false}
        buttonText={'save'}
        buttonLoadingText={`Setting up...`}
        onClick={updateCardholderF}
        loading={loading}
      />{' '}
      <Button onClick={props.onCancel}>{`Cancel`}</Button>
      <div className="secondary">{message}</div>
    </>
  )
}

export default UpdateCardHolder
