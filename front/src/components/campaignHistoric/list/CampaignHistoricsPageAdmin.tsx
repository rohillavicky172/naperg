import React from 'react'
import Paper from '@material-ui/core/Paper'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import TitlePage from '../../nav/layout/titlePage/TitlePage'
import CampaignHistoricsQuery from './CampaignHistoricsQuery'
import Filters from '../../nav/filter/Filters'
import { Button } from '@material-ui/core'
const queryString = require('query-string')

const CampaignHistoricsPageAdmin = () => {
  const location = useLocation()
  const first = 20

  const parsed = queryString.parse(location.search)
  const page = parsed.page ? parsed.page : 1
  const campaignId = parsed.campaignId ? parsed.campaignId : undefined
  const userId = parsed.userId
  const unsubscribe = parsed.unsubscribe === 'TRUE' ? true : parsed.unsubscribe === 'FALSE' ? false : undefined

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`CampaignHistorics (admin)`}</h3>

          <Link to={'/admin/createCampaignHistoric'}>
            <Button color={'primary'} variant="outlined">
              + CampaignHistoric
            </Button>
          </Link>
          <Filters showCampaignId showUserId showUnsubscribe />

          <CampaignHistoricsQuery
            page={page}
            variables={{
              first: first,
              skip: (page - 1) * first,
              orderBy: { createdAt: 'desc' },
              where: {
                user: userId && {
                  id: userId,
                },
                actionUnsubscribe: unsubscribe,
                campaign: campaignId && {
                  id: { equals: campaignId },
                },
              },
            }}
          />
        </Paper>
      </div>
    </>
  )
}

export default CampaignHistoricsPageAdmin
