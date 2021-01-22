import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import { Campaign, campaignClass } from '../Campaign.type'
import CampaignForm from './CampaignForm'
import { Paper } from '@material-ui/core'
// import { Product } from '../../product/Product.type'

export const MUTATION = gql`
  mutation CreateCampaignMutation($data: CampaignCreateInput!) {
    createCampaign(data: $data) {
      id
    }
  }
`

const CreateCampaign = () => {
  const history = useHistory()
  const [campaign, setCampaign] = React.useState(campaignClass)
  const client = useApolloClient()
  const [createCampaign] = useMutation(MUTATION)

  const createCampaignF = async () => {
    let campaignCreated
    try {
      campaignCreated = await createCampaign({
        variables: {
          data: {
            bodyEmail: campaign.bodyEmail,
            campaignVariables: campaign.campaignVariables,
            from: campaign.from,
            subject: campaign.subject,
            showUnsubscribe: campaign.showUnsubscribe,
            type: campaign.type,
            description: campaign.description,
            status: campaign.status,

            frequency: campaign.frequency,
            bcc: campaign.bcc,
            // singleSendPerUser: campaign.singleSendPerUser,
            // isSuspended: campaign.isSuspended,
            // unsubscribe: campaign.unsubscribe,

            name: campaign.name,
          },
        },
      })
    } catch (e) {
      //
      console.log(e)
    }
    if (campaignCreated) {
      client.resetStore()
      // props.onUpdate()
      history.push('/admin/campaign/' + campaignCreated.data.createCampaign.id)
    }
  }
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>CreateCampaign</h3>
          <CampaignForm campaign={campaign} setCampaign={(campaign: Campaign) => setCampaign(campaign)} />
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              createCampaignF()
              // props.cleanFields()
            }}>
            {`Save`}
          </Button>
        </Paper>
      </div>
    </>
  )
}

export default CreateCampaign
