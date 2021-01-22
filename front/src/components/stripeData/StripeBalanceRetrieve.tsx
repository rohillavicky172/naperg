import React from 'react'
import { STRIPE_BALANCE_RETRIEVE_QUERY } from './GraphQL'
import Error from '../nav/error/Error'
import NotFound from '../nav/error/NotFound'
import Loading from '../nav/error/Loading'
import Paper from '@material-ui/core/Paper'
import utils from '../utils'
import CreateTopUpStripe from './CreateTopUpStripe'
import { useQuery } from '@apollo/react-hooks'
import LogsQueryLight from '../log/list/LogsQueryLight'

type Props = {
  alwaysShow: boolean
}
const StripeBalanceRetrieve = (props: Props) => {
  const { loading, error, data } = useQuery(STRIPE_BALANCE_RETRIEVE_QUERY, {
    variables: undefined,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.stripeBalanceRetrieve) return <NotFound />

  const stripeBalanceRetrieve = JSON.parse(data.stripeBalanceRetrieve)
  if (!stripeBalanceRetrieve.issuing) return <>No Data</>
  if (!props.alwaysShow) {
    if (stripeBalanceRetrieve.issuing.available.length === 1) {
      if (stripeBalanceRetrieve.issuing.available[0].amount / 100 > 80000) {
        return null
      }
    }
  }

  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <h3>ADMIN: Stripe Issuing Balance</h3>

        {stripeBalanceRetrieve.issuing.pending.map((singleData, i) => (
          <div key={'IssuingPending' + i}>
            Pending available: {utils.priceFormated(singleData.amount / 100, singleData.currency)}
          </div>
        ))}
        {stripeBalanceRetrieve.issuing.available.map((singleData, i) => (
          <div key={'IssuingAvailable' + i}>
            Issuing available: {utils.priceFormated(singleData.amount / 100, singleData.currency)}
            <br />
            <br />
            <CreateTopUpStripe issuingAvailable={singleData.amount / 100} />
          </div>
        ))}

        <LogsQueryLight
          title={''}
          variables={{
            orderBy: 'date_DESC',
            first: 1,
            where: {
              event: 'createTopUpStripe',
            },
          }}
        />
      </Paper>
    </div>
  )
}

export default StripeBalanceRetrieve
