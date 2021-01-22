import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../nav/error/Error'
import NotFound from '../nav/error/NotFound'
import Loading from '../nav/error/Loading'
import { Grid } from '@material-ui/core'
import { Icon } from '@material-ui/core'
import { Button } from '@material-ui/core'
import gql from 'graphql-tag'
import { IssuedCard } from '../issuedCard/IssuedCard.type'
import UseWindowDimensions from '../UseWindowDimensions'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import NotificationUserIssuedCardAction from './NotificationUserIssuedCardAction'

export const NOTIFICATIONS_USER_ISSUEDCARD_QUERY = gql`
  query NotificationUserIssuedCards($where: NotificationUserIssuedCardWhereInput!) {
    notificationUserIssuedCards(where: $where) {
      id
    }
  }
`

type Props = {
  issuedCard: IssuedCard
}

const NotificationUserIssuedCards = (props: Props) => {
  const isMobile = UseWindowDimensions.isMobile()
  const { context }: { context: Context } = React.useContext(AppContext)
  const [editMode, setIsEditMode] = React.useState(false)
  const { loading, error, data, refetch } = useQuery(NOTIFICATIONS_USER_ISSUEDCARD_QUERY, {
    variables: {
      where: {
        companie: {
          id: props.issuedCard.companie.id,
        },
        user: {
          id: context.me.id,
        },
        issuedCard: {
          id: props.issuedCard.id,
        },
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.notificationUserIssuedCards) return <NotFound />

  return (
    <>
      {editMode ? (
        <Grid container>
          <Grid item xs={12} md={6} className="">
            <h3>{`Notifications`}</h3>

            <div>
              <NotificationUserIssuedCardAction
                issuedCard={props.issuedCard}
                onCancel={() => setIsEditMode(false)}
                onValidate={() => {
                  refetch()
                  setIsEditMode(false)
                }}
                notificationUserIssuedCards={data.notificationUserIssuedCards}
              />
            </div>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid container>
            <Grid item xs={12} md={6} className="">
              <h3>{`Notifications`}</h3>
            </Grid>
            <Grid item xs={12} md={6} className="tar">
              <Button variant="outlined" color={'primary'} onClick={() => setIsEditMode(true)}>{`Edit`}</Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={3} className="">
              {`Emails and Slack:`}
            </Grid>
            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {data.notificationUserIssuedCards.length ? 'Off' : 'On'}
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default NotificationUserIssuedCards
