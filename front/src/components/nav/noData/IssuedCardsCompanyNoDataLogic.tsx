import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import IssuedCardsCompanieContainer from '../../issuedCard/list/issuedCardsCompanie/IssuedCardsCompanieContainer'
import { Paper } from '@material-ui/core'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import { QUERY_USER_ROLE_COMPANIE } from '../../userRoleCompanie/GraphQL'
import Error from '../error/Error'
import Loading from '../error/Loading'
import NotFound from '../error/NotFound'
import NoDataTemplate from './NoDataTemplate'

const IssuedCardsCompanyNoDataLogic = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const userRoleCompanieId = context.userRoleCompanie.id

  const { loading, error, data } = useQuery(QUERY_USER_ROLE_COMPANIE, {
    variables: { where: { id: userRoleCompanieId } },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.userRoleCompanie) return <NotFound />
  if (!data.userRoleCompanie.showNoDataPageIssuedCard)
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <IssuedCardsCompanieContainer />
        </Paper>
      </div>
    )
  return (
    <div className="paperOut">
      <Paper className="paperIn bgGrey">
        {/* <CloseNoData userRoleCompanieId={userRoleCompanieId} type={`showNoDataPageIssuedCard`} /> */}

        <NoDataTemplate
          userRoleCompanieId={userRoleCompanieId}
          type={`showNoDataPageIssuedCard`}
          title={`Create and manage NachoCards`}
          subTitle={``}
          cta={`Get Started`}
          linkCta={`/issuedCardsCompany/${context.userRoleCompanie.companie.id}`}
          imgSrc={`/noData/noData-nachocards.png`}
          endText={``}
          bullets={[
            `Create NachoCards for each vendor, and allocate them to yourself or any team member`,
            `Set spending and date limits on each NachoCard`,
            `Suspend or cancel a NachoCard at any time`,
          ]}
        />
      </Paper>
    </div>
  )
}

export default IssuedCardsCompanyNoDataLogic
