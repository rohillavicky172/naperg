import React from 'react'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import { useQuery } from '@apollo/react-hooks'
import DashboardSeller from '../../nav/home/DashboardSeller'
import Loading from '../../nav/error/Loading'
import { COMPANIE_QUERY } from '../GraphQL'
import Paper from '@material-ui/core/Paper'
import StripeBalanceRetrieve from '../../stripeData/StripeBalanceRetrieve'
import { Companie } from '../Companie.type'

import DashboardBuyerContainer from '../../nav/noData/DashboardBuyerNoDataLogic'

type Props = {
  companieId: string
}

const DashboardCompanieQuery = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const { loading, error, data } = useQuery(COMPANIE_QUERY, {
    variables: {
      where: {
        id: props.companieId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />

  if (!data) return <NotFound />
  if (!data.companie) return <NotFound />

  const companie: Companie = data.companie

  return (
    <>
      {context.me.role === 'ADMIN' && <StripeBalanceRetrieve alwaysShow={false} />}

      {companie.typeCompanie === 'NN_ANALYST' && (
        <div className="paperOut">
          <Paper className="paperIn">
            <h2>NachoNacho ANALYST</h2>
          </Paper>
        </div>
      )}

      {companie.typeCompanie === 'BUYER' && <DashboardBuyerContainer companie={companie} />}
      {companie.typeCompanie === 'SELLER' && (
        <div className="paperOut">
          <Paper className="paperIn">
            {companie.ownedProducts.map((product) => (
              <DashboardSeller key={product.id} product={product} companie={companie} />
            ))}
          </Paper>
        </div>
      )}
      {companie.typeCompanie === 'AFFILIATE' && (
        <div className="paperOut">
          <Paper className="paperIn">
            <h2>Affiliate Account</h2>{' '}
          </Paper>
        </div>
      )}
    </>
  )
}

export default DashboardCompanieQuery
