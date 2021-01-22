import React from 'react'
import { useHistory } from 'react-router-dom'
import Chip from '@material-ui/core/Chip'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

const CampaignIdFilter = () => {
  const history = useHistory()
  const location = useLocation()
  const campaignId = queryString.parse(location.search).campaignId
  const onDelete = () => {
    let parsed = queryString.parse(location.search)
    delete parsed.campaignId
    delete parsed.page

    history.push('?' + queryString.stringify(parsed))
  }

  return (
    <>
      <div className="margin2">
        <Chip label={'campaignId: ' + campaignId} onDelete={onDelete} variant="outlined" />
      </div>
    </>
  )
}

export default CampaignIdFilter
