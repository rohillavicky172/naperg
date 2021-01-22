import React from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import EmailForm from './EmailForm'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { USER_QUERY } from '../../../../GraphQL'
import NotFound from '../../../../../nav/error/NotFound'
import Loading from '../../../../../nav/error/Loading'
import Error from '../../../../../nav/error/Error'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Icon } from '@material-ui/core'
import UseWindowDimensions from '../../../../../UseWindowDimensions'

const queryString = require('query-string')

type Props = {
  userId: string
}

const SubscribeEmailSettings = (props: Props) => {
  const location = useLocation()
  const history = useHistory()
  // const [isEditMode, setIsEditMode] = React.useState(false)

  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: {
      where: {
        id: props.userId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.user) return <NotFound />

  const parsed = queryString.parse(location.search)
  const isEditModeProfile = parsed.isEditModeProfile === 'true' ? true : false
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <h3>{`Helpful Emails for ${data.user.firstName} ${data.user.lastName}`}</h3>
        <p>{`Emails that help you get the most out of your NachoNacho account.`}</p>
        {isEditModeProfile ? (
          <EmailForm
            user={data.user}
            onUpdate={() => {
              const parsed = queryString.parse(location.search)
              parsed.isEditModeProfile = false
              history.push('?' + queryString.stringify(parsed))
            }}
            onCancel={() => {
              const parsed = queryString.parse(location.search)
              parsed.isEditModeProfile = false
              history.push('?' + queryString.stringify(parsed))
            }}
          />
        ) : (
          <>
            <div className="tar">
              <Button
                color={'primary'}
                variant="outlined"
                size="small"
                onClick={() => {
                  const parsed = queryString.parse(location.search)
                  parsed.isEditModeProfile = true
                  history.push('?' + queryString.stringify(parsed))
                }}>
                {`Edit`}
              </Button>
            </div>
            <Grid container alignItems="flex-end">
              <Grid item xs={12} md={4} className="bold">
                {`Subscribe:`}
              </Grid>

              <Grid item xs={12} md={8}>
                {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                {data.user.unsubscribe ? 'No' : 'Yes'}
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </div>
  )
}

export default SubscribeEmailSettings
