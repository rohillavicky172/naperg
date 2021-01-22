import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../nav/error/Error'
import NotFound from '../nav/error/NotFound'
import Loading from '../nav/error/Loading'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { IssuedCard } from '../issuedCard/IssuedCard.type'
import { NotificationUserIssuedCard } from './NotificationUserIssuedCard.type'
import DateComponent from '../nav/DateComponent'

export const NOTIFICATIONS_USER_ISSUEDCARD_QUERY = gql`
  query NotificationUserIssuedCards($where: NotificationUserIssuedCardWhereInput!) {
    notificationUserIssuedCards(where: $where) {
      id
      createdAt
      user {
        id
        firstName
        lastName
      }
    }
  }
`

type Props = {
  issuedCard: IssuedCard
}

const AdminNotificationUserIssuedCards = (props: Props) => {
  const { loading, error, data } = useQuery(NOTIFICATIONS_USER_ISSUEDCARD_QUERY, {
    variables: {
      where: {
        companie: { id: props.issuedCard.companie.id },
        issuedCard: { id: props.issuedCard.id },
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.notificationUserIssuedCards) return <NotFound />

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={12}>
          {data.notificationUserIssuedCards.map((notificationUserIssuedCard: NotificationUserIssuedCard) => (
            <div key={notificationUserIssuedCard.id}>
              <Link className="link" to={'/user/' + notificationUserIssuedCard.user.id}>
                {notificationUserIssuedCard.user.firstName} {notificationUserIssuedCard.user.lastName}
              </Link>
              {`: OFF`} on <DateComponent date={notificationUserIssuedCard.createdAt} />
            </div>
          ))}
        </Grid>
      </Grid>
    </>
  )
}

export default AdminNotificationUserIssuedCards
