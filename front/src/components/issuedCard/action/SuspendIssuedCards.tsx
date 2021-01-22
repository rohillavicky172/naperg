import React from 'react'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
// import Button from '@material-ui/core/Button'

// import { IssuedCard } from '../IssuedCard.type'
// import { Product } from '../../product/Product.type'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

// import utils from '../../utils'
// import { User } from '../../user/User.type'
// import { Companie } from '../../companie/Companie.type'

export const MUTATION = gql`
  mutation SuspendIssuedCards($userRoleComoanieId: String!) {
    suspendIssuedCards(userRoleComoanieId: $userRoleComoanieId) {
      id
    }
  }
`

type Props = {
  userRoleCompanieId: string
}

const SuspendIssuedCards = (props: Props) => {
  const client = useApolloClient()
  const [suspendIssuedCards] = useMutation(MUTATION)

  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')
  // state = {
  //   loading: false,
  // }

  const SuspendIssuedCardsF = async () => {
    setLoading(true)
    let newIssuedCard

    try {
      // let dataIssueCard: any = {
      //   name: props.issuedCard.name,
      //   notification: props.issuedCard.notification,
      //   limitPerTransaction: Number(props.issuedCard.limitPerTransaction),
      //   dateValidFrom: props.issuedCard.dateValidFrom ? utils.removeTime(props.issuedCard.dateValidFrom) : null,
      //   dateValidTo: props.issuedCard.dateValidTo ? utils.removeTime(props.issuedCard.dateValidTo) : null,
      //   description: props.issuedCard.description,
      //   authorizedAmount: Number(props.issuedCard.authorizedAmount),
      //   authorizedAmountUnit: props.issuedCard.authorizedAmountUnit,
      //   isRequested: props.issuedCard.isRequested,
      //   type: props.issuedCard.type,
      //   issuedCardCode: props.issuedCard.issuedCardCode,
      // }

      newIssuedCard = await suspendIssuedCards({
        variables: {
          userRoleComoanieId: props.userRoleCompanieId,
        },
      })
    } catch (e) {
      setLoading(false)
    }
    if (newIssuedCard) {
      setLoading(false)
      // props.onUpdated(newIssuedCard.data.updateIssuedCard)
      client.resetStore()
      setMessage('Done')
    }
  }

  return (
    <>
      <ButtonLoadingAfterClick
        id={'idSuspendIssuedCards'}
        icon={''}
        color={'primary'}
        variant={'outlined'}
        size={'medium'}
        disabled={false}
        buttonText={'Suspend All NachoCards for this user in this company'}
        buttonLoadingText={`Setting up...`}
        onClick={() => SuspendIssuedCardsF()}
        loading={loading}
      />
      <div className="secondary">{message}</div>
    </>
  )
}

export default SuspendIssuedCards
