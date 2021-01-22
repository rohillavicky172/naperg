import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import { Campaign } from '../Campaign.type'

export const MUTATION = gql`
  mutation StopCampaignMutation($where: CampaignWhereUniqueInput!) {
    stopCampaign(where: $where)
  }
`

type Props = {
  campaign: Campaign
}

const StopCampaign = (props: Props) => {
  const [message, setMessage] = React.useState('')
  const client = useApolloClient()
  const [stopCampaign] = useMutation(MUTATION)

  const stopCampaignF = async () => {
    setMessage('Sending..')
    let campaignCreated
    try {
      campaignCreated = await stopCampaign({
        variables: {
          where: {
            id: props.campaign.id,
          },
        },
      })
    } catch (e) {
      console.log(e)
    }
    if (campaignCreated) {
      client.resetStore()
      setMessage('sent!')
    }
  }
  return (
    <>
      <Button color="primary" variant="outlined" onClick={() => stopCampaignF()}>
        {`StopCampaign`}
      </Button>
      <div className="secondary">{message}</div>
    </>
  )
}

export default StopCampaign
