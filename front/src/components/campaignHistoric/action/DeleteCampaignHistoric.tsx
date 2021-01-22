import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import ButtonSecondValidation from '../../nav/ButtonSecondValidation'

export const DELETE_BALANCE = gql`
  mutation DeleteCampaignHistoric($where: CampaignHistoricWhereUniqueInput!) {
    deleteCampaignHistoric(where: $where) {
      id
    }
  }
`

type Props = {
  campaignHistoricId: string
}

const DeleteCampaignHistoric = (props: Props) => {
  const [message, setMessage] = React.useState('')
  const client = useApolloClient()
  const [deleteCampaignHistoric] = useMutation(DELETE_BALANCE)

  const deleteCampaignHistoricF = async () => {
    let campaignHistoric
    try {
      campaignHistoric = await deleteCampaignHistoric({
        variables: {
          where: {
            id: props.campaignHistoricId,
          },
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
      throw e
    }
    if (campaignHistoric) {
      client.resetStore()
    }
  }

  return (
    <>
      <ButtonSecondValidation
        id={'deleteCampaignHistoric'}
        color={'primary'}
        variant={'outlined'}
        size={'medium'}
        buttonText={`Delete`}
        onClick={deleteCampaignHistoricF}
      />
      <div className="secondary">{message}</div>
    </>
  )
}

export default DeleteCampaignHistoric
