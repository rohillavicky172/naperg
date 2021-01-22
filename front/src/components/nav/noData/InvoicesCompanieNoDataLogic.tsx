import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Paper } from '@material-ui/core'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import Error from '../../nav/error/Error'
import NoDataTemplate from '../../nav/noData/NoDataTemplate'

import { QUERY_USER_ROLE_COMPANIE } from '../../userRoleCompanie/GraphQL'
import InvoicesCompaniePageContainer from '../../invoice/list/InvoicesCompaniePageContainer'

const InvoicesCompanieNoDataLogic = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const userRoleCompanieId = context.userRoleCompanie.id

  const { loading, error, data } = useQuery(QUERY_USER_ROLE_COMPANIE, {
    variables: { where: { id: userRoleCompanieId } },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.userRoleCompanie) return <NotFound />
  if (!data.userRoleCompanie.showNoDataPageInvoice)
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <InvoicesCompaniePageContainer />
        </Paper>
      </div>
    )
  return (
    <div className="paperOut">
      <Paper className="paperIn bgGrey">
        {/* <CloseNoData userRoleCompanieId={userRoleCompanieId} type={`showNoDataPageInvoice`} /> */}

        <NoDataTemplate
          userRoleCompanieId={userRoleCompanieId}
          type={`showNoDataPageInvoice`}
          title={`Separate invoice for each NachoCard payment`}
          subTitle={`See all details:`}
          cta={`Go to Transactions`}
          linkCta={``}
          imgSrc={`/noData/noData-transactions.png`}
          endText={``}
          bullets={[`Vendor’s name`, `Account holder in your company`, `Payment amount and date`, `Payment status`]}
        />
      </Paper>
    </div>
  )
}

export default InvoicesCompanieNoDataLogic
