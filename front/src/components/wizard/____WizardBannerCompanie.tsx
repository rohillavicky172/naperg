import React from 'react'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import { useQuery } from '@apollo/react-hooks'
import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'
import WarningAction from '../subscription/single/action/WarningAction'
import Paper from '@material-ui/core/Paper'
// import WizardBannerBalances from './BannerBalances'
// import WizardBannerBalancesPersonal from './BannerBalancesPersonal'
import { COMPANIE_QUERY } from '../companie/GraphQL'

const WizardBannerCompanie = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const companieId = context.userRoleCompanie.companie.id
  const { loading, error, data } = useQuery(COMPANIE_QUERY, {
    variables: {
      where: {
        id: companieId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.companie) return <NotFound />

  if (data.companie.onboardProcessDone && !data.companie.isVerified) {
    return (
      <div className="paperOut">
        <Paper className="">
          <WarningAction
            iconText={'warning'}
            onCancel={() => {}}
            actionText={'Add Payment Source'}
            message={`We are processing your Pay-As-You-Go Account application. We'll in touch soon!`}
            shwowActionButton={false}
            onClick={() => {}}
            shwowCancelButton={false}
          />
        </Paper>
      </div>
    )
  }

  if (data.companie.isPersonal) {
    // return <WizardBannerBalancesPersonal />
  } else {
    // return <WizardBannerBalances />
  }
}

export default WizardBannerCompanie
