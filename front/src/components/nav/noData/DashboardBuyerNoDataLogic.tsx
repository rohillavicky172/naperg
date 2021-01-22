import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import NotFound from '../error/NotFound'
import Loading from '../error/Loading'
import Error from '../error/Error'
import { Paper } from '@material-ui/core'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import { QUERY_USER_ROLE_COMPANIE } from '../../userRoleCompanie/GraphQL'
import DashboardBuyer from '../home/DashboardBuyer'
import { Companie } from '../../companie/Companie.type'
import NoDataTemplate from './NoDataTemplate'

export const UPDATE_USER_ROLE_COMPANIE_MUTATION = gql`
  mutation UpdateUserRoleCompanie($data: UserRoleCompanieUpdateInput!, $where: UserRoleCompanieWhereUniqueInput!) {
    updateUserRoleCompanie(data: $data, where: $where) {
      id
      showNoDataPageHome
    }
  }
`

type Props = {
  companie: Companie
}
const NoDataLogic = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const userRoleCompanieId = context.userRoleCompanie.id

  const { loading, error, data } = useQuery(QUERY_USER_ROLE_COMPANIE, {
    variables: { where: { id: userRoleCompanieId } },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.userRoleCompanie) return <NotFound />
  if (!data.userRoleCompanie.showNoDataPageHome)
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <DashboardBuyer companie={props.companie} />
        </Paper>
      </div>
    )
  return (
    <div className="paperOut">
      <Paper className="paperIn bgGrey">
        {/* <CloseNoData userRoleCompanieId={userRoleCompanieId} type={`showNoDataPageHome`} /> */}

        <NoDataTemplate
          userRoleCompanieId={userRoleCompanieId}
          type={`showNoDataPageHome`}
          title={`Home page - your account summary`}
          subTitle={``}
          cta={`Get Started`}
          linkCta={`/getStarted`}
          imgSrc={`/noData/noData-home.png`}
          endText={``}
          bullets={[
            `Total monthly spend across all vendors, all employees, and all NachoCards`,
            `Recent transactions and subscriptions`,
            `Other metadata of your account`,
          ]}
        />
      </Paper>
    </div>
  )
}

export default NoDataLogic
