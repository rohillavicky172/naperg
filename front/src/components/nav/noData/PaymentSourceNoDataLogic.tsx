import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { Paper } from '@material-ui/core'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import Loading from '../error/Loading'
import NotFound from '../error/NotFound'
import Error from '../error/Error'
import NoDataTemplate from './NoDataTemplate'
import PaymentSourcePageContainer from '../../card/list/PaymentSourcePageContainer'
import { QUERY_USER_ROLE_COMPANIE } from '../../userRoleCompanie/GraphQL'

const CompanieTeamNoDataLogic = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const userRoleCompanieId = context.userRoleCompanie.id

  const { loading, error, data } = useQuery(QUERY_USER_ROLE_COMPANIE, {
    variables: { where: { id: userRoleCompanieId } },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.userRoleCompanie) return <NotFound />
  if (!data.userRoleCompanie.showNoDataPagePaymentSource)
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <PaymentSourcePageContainer />
        </Paper>
      </div>
    )
  return (
    <div className="paperOut">
      <Paper className="paperIn bgGrey">
        {/* <CloseNoData userRoleCompanieId={userRoleCompanieId} type={`showNoDataPagePaymentSource`} /> */}
        {context.userRoleCompanie.companie.isTrustedPayment ? (
          <NoDataTemplate
            userRoleCompanieId={userRoleCompanieId}
            type={`showNoDataPagePaymentSource`}
            title={`Connect your Payment Source`}
            subTitle={``}
            cta={`Get Started`}
            linkCta={``}
            imgSrc={`/noData/noData-source-PAYG.png`}
            endText={``}
            bullets={[
              `Your Payment Source is used to fund all your purchases`,
              `Each time you use a NachoCard, we will draw the same amount from your Payment Source`,
              `Your weekly limit is set by NachoNacho based on your  company profile`,
              `Contact us if you’d like to increase your weekly limit`,
            ]}
          />
        ) : (
          <NoDataTemplate
            userRoleCompanieId={userRoleCompanieId}
            type={`showNoDataPagePaymentSource`}
            title={`Connect your Payment Source`}
            subTitle={`Your Payment Source is used to fund all your purchases`}
            cta={`Get Started`}
            linkCta={``}
            imgSrc={`/noData/noData-source-prepaid.png`}
            endText={``}
            bullets={[
              `Connect your Payment Source`,
              `Top Up funds into your NachoNacho Balance - your balance will be used to fund your NachoCard payments`,
              `Consider enabling Auto Topup to make sure you always have sufficient funds`,
            ]}
          />
        )}
      </Paper>
    </div>
  )
}

export default CompanieTeamNoDataLogic
