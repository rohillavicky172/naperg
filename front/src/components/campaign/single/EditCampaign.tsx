import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
// import { useHistory } from 'react-router-dom'
import { Campaign } from '../Campaign.type'
import CampaignForm from './CampaignForm'
// import { Product } from '../../product/Product.type'

export const MUTATION = gql`
  mutation UpdateCampaignMutation($data: CampaignCreateInput!, $where: CampaignWhereUniqueInput!) {
    updateCampaign(data: $data, where: $where) {
      id
    }
  }
`

type Props = {
  campaign: Campaign
  // product: Product
  onUpdate: () => void
  // cleanFields: () => void
}

const EditCampaign = (props: Props) => {
  // const history = useHistory()
  const [campaign, setCampaign] = React.useState(props.campaign)
  const [message, setMessage] = React.useState('')
  const client = useApolloClient()
  const [updateCampaign] = useMutation(MUTATION)

  const updateCampaignF = async () => {
    let campaignUpdated
    try {
      campaignUpdated = await updateCampaign({
        variables: {
          data: {
            bodyEmail: campaign.bodyEmail,
            campaignVariables: campaign.campaignVariables,
            showUnsubscribe: campaign.showUnsubscribe,
            from: campaign.from,
            subject: campaign.subject,

            frequency: campaign.frequency,
            bcc: campaign.bcc,

            type: campaign.type,
            description: campaign.description,

            name: campaign.name,
          },
          where: {
            id: campaign.id,
          },
        },
      })
    } catch (e) {
      console.log(e)
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
      // setMessage(e.graphQLErrors[0].message)
    }
    if (campaignUpdated) {
      client.resetStore()
      props.onUpdate()
    }
    // history.push('/admin/campaigns')
  }
  return (
    <>
      <CampaignForm campaign={campaign} setCampaign={(campaign: Campaign) => setCampaign(campaign)} />
      <Button color="primary" variant="outlined" onClick={() => updateCampaignF()}>
        {`Save`}
      </Button>
      <div className="secondary">{message}</div>
    </>
  )
}

export default EditCampaign
