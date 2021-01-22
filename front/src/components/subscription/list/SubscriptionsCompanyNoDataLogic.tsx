import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import SubscriptionsCompanyContainer from './SubscriptionsCompanyContainer'
import { Paper } from '@material-ui/core'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import { QUERY_USER_ROLE_COMPANIE } from '../../userRoleCompanie/GraphQL'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import NoDataTemplate from '../../nav/noData/NoDataTemplate'

const SubscriptionsCompanyNoDataLogic = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const userRoleCompanieId = context.userRoleCompanie.id

  const { loading, error, data } = useQuery(QUERY_USER_ROLE_COMPANIE, {
    variables: { where: { id: userRoleCompanieId } },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.userRoleCompanie) return <NotFound />
  if (!data.userRoleCompanie.showNoDataPageSubscription)
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <SubscriptionsCompanyContainer />
        </Paper>
      </div>
    )
  return (
    <div className="paperOut">
      <Paper className="paperIn bgGrey">
        {/* <CloseNoData userRoleCompanieId={userRoleCompanieId} type={`showNoDataPageSubscription`} /> */}

        <NoDataTemplate
          userRoleCompanieId={userRoleCompanieId}
          type={`showNoDataPageSubscription`}
          title={`All your subscriptions in one place`}
          subTitle={``}
          endText={``}
          cta={`Go to Subscriptions`}
          linkCta={``}
          imgSrc={`/noData/noData-subscriptions.png`}
          bullets={[
            `View each subscription and its status`,
            `Identify subscriptions you no longer need`,
            `Avoid duplicate subscriptions`,
            `See each subscription’s account holder and associated NachoCard`,
          ]}
        />
      </Paper>
    </div>
  )
}

export default SubscriptionsCompanyNoDataLogic
