import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import { Campaign } from '../Campaign.type'

export const MUTATION = gql`
  mutation RunCampaignMutation($where: CampaignWhereUniqueInput!) {
    runCampaign(where: $where)
  }
`

type Props = {
  campaign: Campaign
}

const RunCampaign = (props: Props) => {
  const [message, setMessage] = React.useState('')
  const client = useApolloClient()
  const [runCampaign] = useMutation(MUTATION)

  const runCampaignF = async () => {
    setMessage('Sending..')
    let campaignCreated
    try {
      campaignCreated = await runCampaign({
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
      <Button color="primary" variant="outlined" onClick={() => runCampaignF()}>
        {`RunCampaign`}
      </Button>
      <div className="secondary">{message}</div>
    </>
  )
}

export default RunCampaign
