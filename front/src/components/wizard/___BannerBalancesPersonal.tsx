import React from 'react'
import gql from 'graphql-tag'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import { useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'
import WarningAction from '../subscription/single/action/WarningAction'
import Paper from '@material-ui/core/Paper'

// import { SOURCES_QUERY } from '../GraphQL'

export const BALANCES_QUERY = gql`
  query Balances($where: BalanceWhereInput!, $first: Int) {
    balancesConnection(
      where: $where

      first: $first
    ) {
      edges {
        node {
          id
          valueBalance
          pendingBalance
        }
      }
    }
  }
`

const BannerBalancesPersonal = () => {
  const history = useHistory()
  const { context }: { context: Context } = React.useContext(AppContext)
  const companieId = context.userRoleCompanie.companie.id

  const { loading, error, data } = useQuery(BALANCES_QUERY, {
    variables: {
      where: {
        companie: { id: companieId },
        testMode: context.testMode,
      },
      first: 1,
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.balancesConnection) return <NotFound />

  if (data.balancesConnection.edges.length === 0) {
    return <div>Balance issue. Please contact us!</div>
  }
  const balance = data.balancesConnection.edges[0].node

  if (balance.valueBalance === 0 && balance.pendingBalance !== 0) {
    return (
      <>
        <div className="paperOut">
          <Paper className="">
            <WarningAction
              iconText={'warning'}
              onCancel={() => {}}
              actionText="Check Balance"
              message="You topup is currently pending. Your NachoCards will work after your pending Balance becomes available."
              shwowActionButton={true}
              onClick={() => history.push('/paymentSource/' + companieId)}
              shwowCancelButton={false}
            />
          </Paper>
        </div>
      </>
    )
  }

  if (balance.valueBalance === 0) {
    return (
      <>
        <div className="paperOut">
          <Paper className="">
            <WarningAction
              iconText={'warning'}
              onCancel={() => {}}
              actionText={'Top Up your Balance'}
              message={'You need to have funds in your Balance to be able to use your NachoCards.'}
              shwowActionButton={true}
              onClick={() => history.push('/paymentSource/' + companieId)}
              onClick2={() => history.push(`/company/${companieId}?mode=accountType`)}
              shwowCancelButton={false}
            />
          </Paper>
        </div>
      </>
    )
  }

  return null
}

export default BannerBalancesPersonal
