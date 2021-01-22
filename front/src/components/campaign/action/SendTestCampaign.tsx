import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import { Campaign } from '../Campaign.type'
import { FormControl, InputLabel, Input } from '@material-ui/core'

export const MUTATION = gql`
  mutation SendTestCampaignMutation($data: CampaignCreateInput!, $where: CampaignWhereUniqueInput!) {
    sendTestCampaign(data: $data, where: $where) {
      id
      companieNameTest
      emailTest
    }
  }
`

type Props = {
  campaign: Campaign
}

const SendTestCampaign = (props: Props) => {
  const [message, setMessage] = React.useState('')
  const [campaign, setCampaign] = React.useState(props.campaign)

  const client = useApolloClient()
  const [sendCampaign] = useMutation(MUTATION)

  const sendCampaignF = async () => {
    setMessage('Sending..')
    let campaignCreated
    try {
      campaignCreated = await sendCampaign({
        variables: {
          data: {
            emailTest: campaign.emailTest,
            companieNameTest: campaign.companieNameTest,
          },
          where: {
            id: props.campaign.id,
          },
        },
      })
    } catch (e) {
      setMessage('Error')
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
      <div>
        <FormControl>
          <InputLabel htmlFor="email">{`email`}</InputLabel>
          <Input
            id="email"
            type="text"
            value={campaign.emailTest}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCampaign({ ...campaign, emailTest: e.target.value })}
          />
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="companieName">{`companieName`}</InputLabel>
          <Input
            id="companieName"
            type="text"
            value={campaign.companieNameTest}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCampaign({ ...campaign, companieNameTest: e.target.value })}
          />
        </FormControl>
      </div>

      <Button color="primary" variant="outlined" onClick={() => sendCampaignF()}>
        {`SendTestCampaign`}
      </Button>
      <div className="secondary">{message}</div>
    </>
  )
}

export default SendTestCampaign
