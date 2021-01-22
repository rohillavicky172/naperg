import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'
import gql from 'graphql-tag'
import { issuedCardClass } from '../issuedCard/IssuedCard.type'
import { Balance } from '../balance/Balance.type'
import CreateIssuedCard from '../issuedCard/single/createIssuedCard/CreateIssuedCard'
import Paper from '@material-ui/core/Paper'
import IssueCardRewardQuery from './IssueCardRewardQuery'

type Props = {
  companieId: string
  balance: Balance
}

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

const ManageRewardIssueCard = (props: Props) => {
  const { context }: { context: Context } = useContext(AppContext)
  const { loading, error, data } = useQuery(ISSUED_CARDS_QUERY, {
    variables: {
      where: {
        status: 'active',
        companie: {
          id: props.companieId,
        },
        user: {
          id: context.me.id,
        },
        issuedCardType: 'REWARD',
        testMode: context.testMode,
      },
      first: 1,
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.issuedCardsConnection) return <NotFound />

  return (
    <>
      {data.issuedCardsConnection.edges.map((nodeIssuedCard) => (
        <div key={nodeIssuedCard.node.id}>
          <IssueCardRewardQuery issuedCardId={nodeIssuedCard.node.id} />
        </div>
      ))}

      {(data.issuedCardsConnection.edges.length === 0 || props.balance.cashbackAvailable === 0) && (
        <div className="paperOut">
          <Paper className="paperIn">
            {data.issuedCardsConnection.edges.length === 0 && (
              <CreateIssuedCard
                disabled={props.balance.cashbackAvailable === 0}
                productId={''}
                buttonText={'Create My RewardsCard'}
                type="virtual"
                issuedCard={{ ...issuedCardClass, testMode: context.testMode, name: 'RewardsCard', issuedCardType: 'REWARD' }}
                userId={context.me.id}
                companieId={props.companieId}
                onCreate={() => {}}
              />
            )}
            {props.balance.cashbackAvailable === 0 && (
              <p>You will be able to create a RewardsCard after you have Cashback available.</p>
            )}
          </Paper>
        </div>
      )}
    </>
  )
}
// }

export default ManageRewardIssueCard
