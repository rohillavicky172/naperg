import React, { useContext, useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { AppContext } from '../../../AppContext'
import { useMutation } from '@apollo/react-hooks'
import { Context } from '../../../Context.type'
import { IssuedCard } from '../../IssuedCard.type'
import { CREATE_ISSUED_CARD } from '../../GraphQL'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'

type Props = {
  userId: String
  companieId: String
  productId: String
  type: String
  buttonText: String
  disabled: boolean
  issuedCard: IssuedCard

  onCreate: (issuedCard: IssuedCard) => void
}

const CreateIssuedCard = (props: Props) => {
  const client = useApolloClient()
  const { context }: { context: Context } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [createIssuedCard] = useMutation(CREATE_ISSUED_CARD)

  const createdIssuedCard = async () => {
    setLoading(true)
    let newIssuedCard
    try {
      newIssuedCard = await createIssuedCard({
        variables: {
          data: {
            testMode: context.testMode,
            limitPerTransaction: 3000,
            type: props.type,
            user: {
              connect: { id: props.userId },
            },
            companie: {
              connect: { id: props.companieId },
            },
            stripe_issuedCard_id: '',
            initProduct: props.productId
              ? {
                  connect: {
                    id: props.productId,
                  },
                }
              : undefined,

            name: props.issuedCard.name,
            issuedCardType: props.issuedCard.issuedCardType,
            description: '',
            issuedCardCode: '',

            authorizedAmount: Number(props.issuedCard.authorizedAmount),
            authorizedAmountUnit: props.issuedCard.authorizedAmountUnit,
          },
        },
      })
    } catch (e) {
      // console.log(e)
      setLoading(false)
      let message = `That didn't work. Make sure everything looks good and try again.`
      if (e.graphQLErrors.length) {
        message = e.graphQLErrors[0].message
      }

      if (message === 'Must be at least 13 years of age to use Stripe') {
        message = 'User must be at least 13 years of age. Pease edit your date of birth'
      }
      setMessage(message)
      // e.graphQLErrors.some(graphQLError => context.openSnackBar(true, graphQLError.message, 'message'))
    }
    if (newIssuedCard) {
      client.resetStore()
      setMessage('Succes')
      setLoading(false)
      // history.replace(`/issuedCard/${newIssuedCard.data.createIssuedCard.id}?isNewCard=true`)
      props.onCreate(newIssuedCard.data.createIssuedCard)
    }
  }

  return (
    <>
      <ButtonLoadingAfterClick
        id={'idButton'}
        icon={''}
        color={'primary'}
        variant={'contained'}
        size={'medium'}
        disabled={props.disabled}
        buttonText={props.buttonText}
        buttonLoadingText={`Setting up...`}
        onClick={() => createdIssuedCard()}
        loading={loading}
      />
      {message && (
        <>
          <div style={{ height: '10px' }} />
          <div className="secondary">{message}</div>
        </>
      )}
    </>
  )
}

export default CreateIssuedCard
