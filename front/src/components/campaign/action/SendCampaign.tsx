import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import { Campaign } from '../Campaign.type'

export const MUTATION = gql`
  mutation SendCampaignMutation($where: CampaignWhereUniqueInput!) {
    sendCampaign(where: $where)
  }
`

type Props = {
  campaign: Campaign
}

const SendCampaign = (props: Props) => {
  const [message, setMessage] = React.useState('')
  const client = useApolloClient()
  const [sendCampaign] = useMutation(MUTATION)

  const sendCampaignF = async () => {
    setMessage('Sending..')
    let campaignCreated
    try {
      campaignCreated = await sendCampaign({
        variables: {
          where: {
            id: props.campaign.id,
          },
        },
      })
    } catch (e) {
      //
      console.log(e)
    }
    if (campaignCreated) {
      client.resetStore()
      setMessage('sent!')
    }
  }
  return (
    <>
      <Button color="primary" variant="outlined" onClick={() => sendCampaignF()}>
        {`SendCampaign`}
      </Button>
      <div className="secondary">{message}</div>
    </>
  )
}

export default SendCampaign
