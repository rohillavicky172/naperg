import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Paper from '@material-ui/core/Paper'
import Loading from '../nav/error/Loading'
import DeleteSlack from './DeleteSlack'
import Error from '../nav/error/Error'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import SendSlackDirect from './SendSlackDirect'
import SlackAuthButton from './SlackAuthButton'
import { Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { SlackNode } from './Slack.type'
// import SendSlackToChannel from './SendSlackToChannel'

const SLACKS_CONNECTION_QUERY = gql`
  query SlacksConnection($where: SlackWhereInput, $orderBy: SlackOrderByInput) {
    slacksConnection(where: $where, orderBy: $orderBy) {
      edges {
        node {
          id
          team_id
          team_name
          incoming_webhook_channel
          incoming_webhook_channel_id
        }
      }
    }
  }
`

const Slacks = () => {
  const { context }: { context: Context } = useContext(AppContext)
  const { loading, error, data } = useQuery(SLACKS_CONNECTION_QUERY, {
    variables: {
      where: {
        user: { id: context.me.id },
        companie: { id: context.userRoleCompanie.companie.id },
      },
    },
  })
  if (loading) return <Loading />
  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />

  if (data.slacksConnection.edges.length === 0) {
    return <SlackAuthButton />
  }
  return (
    <>
      {data.slacksConnection.edges.map((slackNode: SlackNode) => (
        <div key={slackNode.node.id}>
          <div className="paperOut">
            <Paper className="paperIn">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={1} className="marginAuto">
                  <img alt="imageSlack" src="/logo/slack/Slack_Mark_Web.png" width="20px" />{' '}
                </Grid>
                <Grid item xs={12} sm={2} className="marginAuto">
                  Workspace: {slackNode.node.team_name}
                </Grid>
                <Grid item xs={12} sm={8} className="tac marginAuto">
                  <SendSlackDirect slackId={slackNode.node.id} />{' '}
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={'https://nachonacho.slack.com/apps/ATJNHKFJN-nachonacho?settings=1'}>
                    <Button variant="outlined" color={'primary'}>
                      Slack Settings
                    </Button>
                  </a>{' '}
                  <Link to={`/settings/${context.me.id}?mode=notifications`}>
                    <Button variant="outlined" color={'primary'}>
                      Edit notifications
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={12} sm={1} className="tar">
                  <DeleteSlack slackId={slackNode.node.id} />
                </Grid>
              </Grid>

              {/* <SendSlackToChannel slackId={slackNode.node.id} /> */}
            </Paper>
          </div>
        </div>
      ))}
    </>
  )
}

export default Slacks
