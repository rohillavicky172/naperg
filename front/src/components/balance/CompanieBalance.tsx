import React from 'react'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import { useQuery } from '@apollo/react-hooks'
import Error from '../nav/error/Error'
import NotFound from '../nav/error/NotFound'
import Loading from '../nav/error/Loading'
import { BALANCES_QUERY } from './GraphQL'
import Paper from '@material-ui/core/Paper'
import SingleBalance from './SingleBalance'

type Props = {
  showActionsBalance: boolean

  canAddTopUp: boolean
  companieId: string
}

const CompanieBalance = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const { loading, error, data } = useQuery(BALANCES_QUERY, {
    variables: {
      where: {
        companie: {
          id: props.companieId,
        },
        testMode: context.testMode,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.balancesConnection) return <NotFound />

  return (
    <>
      {!data.balancesConnection.edges.length && (
        <div className="paperOut">
          <Paper className="paperIn">
            <h3>{`Balance`}</h3>
            <p>Your account is not ready yet. Please contact us.</p>
          </Paper>
        </div>
      )}

      {data.balancesConnection.edges.map((balanceNode) => (
        <div key={balanceNode.node.id} className="">
          <SingleBalance
            showActionsBalance={props.showActionsBalance}
            balance={balanceNode.node}
            canAddTopUp={props.canAddTopUp}
          />
        </div>
      ))}
    </>
  )
}

export default CompanieBalance
