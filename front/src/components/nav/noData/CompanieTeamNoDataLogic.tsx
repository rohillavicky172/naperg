import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Context } from '../../Context.type'
import { Paper } from '@material-ui/core'
import { AppContext } from '../../AppContext'
import Loading from '../error/Loading'
import NotFound from '../error/NotFound'
import Error from '../error/Error'
import NoDataTemplate from './NoDataTemplate'
import { QUERY_USER_ROLE_COMPANIE } from '../../userRoleCompanie/GraphQL'
import CompanieTeamContainer from '../../user/list/team/CompanieTeamContainer'

const CompanieTeamNoDataLogic = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const userRoleCompanieId = context.userRoleCompanie.id

  const { loading, error, data } = useQuery(QUERY_USER_ROLE_COMPANIE, {
    variables: { where: { id: userRoleCompanieId } },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.userRoleCompanie) return <NotFound />
  if (!data.userRoleCompanie.showNoDataPageTeam)
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <CompanieTeamContainer />
        </Paper>
      </div>
    )
  return (
    <div className="paperOut">
      <Paper className="paperIn bgGrey">
        {/* <CloseNoData userRoleCompanieId={userRoleCompanieId} type={`showNoDataPageTeam`} /> */}

        <NoDataTemplate
          userRoleCompanieId={userRoleCompanieId}
          type={`showNoDataPageTeam`}
          title={`Set up your team`}
          subTitle={`Invite your team members and allocate NachoCards to them. There are 3 possible roles:`}
          imgSrc={`/noData/noData-members.png`}
          cta={`Get Started`}
          linkCta={`/team/${context.userRoleCompanie.companie.id}`}
          bullets={[
            `Admin: Can do everything, including creating NachoCards and inviting Members`,
            `Purchaser: Can only use NachoCards allocated to them, with limits set by Admins`,
            `Analyst: Read-only access - they can't be allocated NachoCards`,
          ]}
          endText={`You can remove a Member at anytime - all their NachoCards are cancelled when you do so.`}
        />
      </Paper>
    </div>
  )
}

export default CompanieTeamNoDataLogic
