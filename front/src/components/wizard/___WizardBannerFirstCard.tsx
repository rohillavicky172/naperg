import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'
import gql from 'graphql-tag'
import BannerGetStarted from './BannerGetStarted'
import { useHistory } from 'react-router-dom'

export const ISSUED_CARDS_QUERY = gql`
  query IssuedCards($where: IssuedCardWhereInput, $orderBy: IssuedCardOrderByInput, $skip: Int, $first: Int) {
    issuedCardsConnection(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      edges {
        node {
          id
        }
      }
    }
  }
`

type Props = {
  companieId: string
  userId: string
}

const WizardBannerFirstCard = (props: Props) => {
  const history = useHistory()
  const { loading, error, data } = useQuery(ISSUED_CARDS_QUERY, {
    variables: {
      where: {
        companie: {
          id: props.companieId,
        },
      },
      first: 1,
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.issuedCardsConnection) return <NotFound />
  const done = data.issuedCardsConnection.edges.length !== 0
  return (
    <BannerGetStarted
      done={done}
      shwowActionButton={!done}
      actionText={'+ NachoCard'}
      onClick={() => history.push(`/createIssuedCard/${props.userId}`)}
      message={'Create your first NachoCard!'}
    />
  )
}

export default WizardBannerFirstCard
