import React from 'react'
import gql from 'graphql-tag'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import { useQuery } from '@apollo/react-hooks'
import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'
import { useHistory } from 'react-router-dom'
import BannerGetStarted from './BannerGetStarted'

export const BALANCES_QUERY = gql`
  query Balances($where: BalanceWhereInput!, $first: Int) {
    balancesConnection(where: $where, first: $first) {
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

type Props = {
  companieId: string
}
const WizardBannerBalancesTopup = (props: Props) => {
  const history = useHistory()
  const { context }: { context: Context } = React.useContext(AppContext)

  const { loading, error, data } = useQuery(BALANCES_QUERY, {
    variables: {
      where: {
        companie: { id: props.companieId },
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
  const done = balance.valueBalance !== 0
  return (
    <>
      <BannerGetStarted
        done={done}
        actionText={'Top Up Balance'}
        message={'Upload funds into your NachoNacho Balance. This Balance will be used to fund your NachoCard purchases.'}
        onClick={() => history.push('/paymentSource/' + props.companieId)}
        shwowActionButton={!done}
      />
    </>
  )
}

export default WizardBannerBalancesTopup
