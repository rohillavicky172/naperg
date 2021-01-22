import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import { BALANCES_QUERY } from './GraphQL'
import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'
import { useParams } from 'react-router'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import utils from '../utils'
import { Link } from 'react-router-dom'
import ManageRewardIssueCard from '../issuedCard/ManageRewardIssueCard'
import CompanieName from '../companie/single/CompanieName'
import { ParamTypes } from '../ParamTypes.type'

type Props = {
  balancesQuery: any
  page: number
  variables: any
}

const RewardsPage = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  // const match = useRouteMatch()
  const params: ParamTypes = useParams<ParamTypes>()
  const companieId = params.companieId
  const { loading, error, data } = useQuery(BALANCES_QUERY, {
    variables: {
      where: {
        companie: {
          id: companieId,
        },
        testMode: context.testMode,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.balancesConnection) return <NotFound />

  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <h3>
          NachoRewards for <CompanieName companieId={companieId} />{' '}
          {context.me.role === 'ADMIN' && (
            <Link className="link" to={`/company/${companieId}?mode=admin`}>
              <Icon className="iconAlignTextBottom textSize11">link</Icon>
            </Link>
          )}
        </h3>

        {data.balancesConnection.edges.map((nodeBalance) => (
          <div key={nodeBalance.node.id}>
            <div className="paperOut">
              <Paper className="paperIn">
                <p>Cashback Available: {utils.priceFormated(nodeBalance.node.cashbackAvailable, nodeBalance.node.currency)}</p>
                <p>Cashback Pending: {utils.priceFormated(nodeBalance.node.cashbackPending, nodeBalance.node.currency)}</p>
              </Paper>
            </div>
            <div>
              <ManageRewardIssueCard companieId={companieId} balance={nodeBalance.node} />
            </div>

            <p>
              <Link className="link" to={`/invoicesCompany/${companieId}?hasCashback=TRUE`}>
                Details of Cashback earned
              </Link>
            </p>
            <p>
              <Link className="link" to={`/invoicesCompany/${companieId}?issuedCardType=REWARD`}>
                Details of Cashback redeemed
              </Link>
            </p>
          </div>
        ))}
      </Paper>
    </div>
  )
}
// }

export default RewardsPage
