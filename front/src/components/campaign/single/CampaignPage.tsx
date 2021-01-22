import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router'
import gql from 'graphql-tag'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { ParamTypes } from '../../ParamTypes.type'
import { Campaign } from '../Campaign.type'
import { Paper, Button, Icon } from '@material-ui/core'
import EditCampaign from './EditCampaign'
import SendCampaign from '../action/SendCampaign'
import SendTestCampaign from '../action/SendTestCampaign'
import RunCampaign from '../action/RunCampaign'
import StopCampaign from '../action/StopCampaign'
import { Link } from 'react-router-dom'
import DateComponent from '../../nav/DateComponent'
import utils from '../../utils'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

export const QUERY = gql`
  query campaignQuery($where: CampaignWhereUniqueInput!) {
    campaign(where: $where) {
      id
      outputJson
      campaignVariables
      lastSent
      createdAt
      description
      showUnsubscribe

      bcc
      frequency
      status
      emailTest
      companieNameTest

      isActive
      # singleSendPerUser
      # isSuspended
      # unsubscribe

      type
      from
      subject
      bodyEmail
      name

      user {
        id
        firstName
        lastName
      }
    }
  }
`

const CampaignPage = () => {
  const [edit, setEdit] = React.useState(false)
  const { campaignId }: ParamTypes = useParams<ParamTypes>()
  const [loadingRefetch, setLoadingRefetch] = React.useState(false)
  const { loading, error, data, refetch } = useQuery(QUERY, {
    variables: {
      where: {
        id: campaignId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.campaign) return <NotFound />
  const campaign: Campaign = data.campaign
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{campaign.name}</h3>

          {edit ? (
            <>
              <EditCampaign onUpdate={() => setEdit(false)} campaign={campaign} />
              <Button onClick={() => setEdit(false)}>Cancel</Button>
            </>
          ) : (
            <>
              <div className="tar">
                <Button color="primary" variant="outlined" onClick={() => setEdit(true)}>
                  Edit
                </Button>
              </div>
              <div>
                createdAt: <DateComponent date={campaign.createdAt} />{' '}
              </div>
              <div>
                CreatedBy:{' '}
                <Link className="link" to={`/user/${campaign.user.id}`}>
                  {campaign.user.firstName} {campaign.user.lastName}
                </Link>
              </div>
              <div>type: {campaign.type}</div>
              {/* <div>
                lastSent: <DateComponent  date={campaign.lastSent} />{' '}
              </div> */}
              <div>frequency: {campaign.frequency}</div>
              <div>isActive: {campaign.isActive ? 'TRUE' : 'FALSE'}</div>
              <div>showUnsubscribe: {campaign.showUnsubscribe ? 'TRUE' : 'FALSE'}</div>
              <div>status: {campaign.status}</div>
              <div>From: {campaign.from}</div>
              <div>bcc: {campaign.bcc}</div>
              {/* <div>singleSendPerUser: {campaign.singleSendPerUser ? 'True' : 'False'}</div>
              <div>isSuspended: {campaign.isSuspended ? 'True' : 'False'}</div>
              <div>unsubscribe: {campaign.unsubscribe ? 'True' : 'False'}</div> */}
              <div>description: {campaign.description}</div>
              <div className="paperOut">
                <Paper className="paperIn">
                  <b>{campaign.subject}</b>
                  <br />
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: campaign.bodyEmail }} />
                </Paper>
              </div>
              Filters:
              <br />
              <div className="bgGrey">
                <pre>{campaign.campaignVariables}</pre>
                {/* {utils.isJsonString(campaign.campaignVariables) ? (
                  <>
                    <pre>{JSON.stringify(JSON.parse(campaign.campaignVariables), null, 2)}</pre>
                    <Icon color="primary">done</Icon>
                  </>
                ) : (
                  <>
                    <pre>{campaign.campaignVariables}</pre>

                    <Icon className="secondary">report</Icon>
                  </>
                )} */}
              </div>
              <ButtonLoadingAfterClick
                id={'refreshButton'}
                icon={''}
                color={'primary'}
                disabled={false}
                variant={'outlined'}
                size={'medium'}
                buttonText={<Icon>refresh</Icon>}
                buttonLoadingText={`Loading...`}
                onClick={async () => {
                  setLoadingRefetch(true)
                  await refetch()
                  setLoadingRefetch(false)
                }}
                loading={loadingRefetch}
              />
            </>
          )}
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn">
          <h3>Campaign Test</h3>
          <SendTestCampaign campaign={campaign} />
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn">
          <RunCampaign campaign={campaign} />
          <StopCampaign campaign={campaign} />
          <SendCampaign campaign={campaign} />
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn">
          <h3>Result:</h3>

          <div>
            {utils.isJsonString(campaign.outputJson) ? (
              <>
                {JSON.parse(campaign.outputJson).users && JSON.parse(campaign.outputJson).users.length && (
                  <>
                    {!JSON.parse(campaign.outputJson).users[0].userId && <div className="secondary">Warning! No userId</div>}
                    {!JSON.parse(campaign.outputJson).users[0].email && <div className="secondary">Warning! No email</div>}
                    {/* {!JSON.parse(campaign.outputJson).users[0].id && <div className="secondary">Warning! No Id</div>} */}
                    {!JSON.parse(campaign.outputJson).users[0].firstName && (
                      <div className="secondary">Warning! No firstName</div>
                    )}
                    {!JSON.parse(campaign.outputJson).users[0].lastName && <div className="secondary">Warning! No lastName</div>}
                  </>
                )}

                <pre>{JSON.stringify(JSON.parse(campaign.outputJson), null, 2)}</pre>
              </>
            ) : (
              <pre>{campaign.outputJson}</pre>
            )}
          </div>
          {/* <UsersQueryCampaignView variables={{ ...JSON.parse(replaceDateVariables(campaign.campaignVariables)), first: 10 }} /> */}
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn">
          <Link to={`/admin/campaignHistorics?campaignId=${campaign.id}`}>
            <Button color={'primary'} variant="outlined">
              campaignHistorics
            </Button>
          </Link>{' '}
          <Link to={`/logs?campaignId=${campaign.id}`}>
            <Button color={'primary'} variant="outlined">
              logs
            </Button>
          </Link>
        </Paper>
      </div>
    </>
  )
}

export default CampaignPage
