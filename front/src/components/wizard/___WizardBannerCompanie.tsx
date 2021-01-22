import React from 'react'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import { useQuery } from '@apollo/react-hooks'
import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'
import Paper from '@material-ui/core/Paper'
import { COMPANIE_QUERY } from '../companie/GraphQL'
import BannerGetStarted from './BannerGetStarted'

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

  const done = data.companie.onboardProcessDone
  // if (data.companie.onboardProcessDone && !data.companie.isVerified) {
  return (
    <div className="paperOut">
      <Paper className="">
        <BannerGetStarted
          done={done}
          actionText={'Add Payment Source'}
          message={`We are processing your Pay-As-You-Go Account application. We'll in touch soon!`}
          shwowActionButton={!done}
          onClick={() => {}}
        />
      </Paper>
    </div>
  )

  // if (data.companie.isPersonal) {
  //   return <WizardBannerBalancesPersonal />
  // } else {
  //   return <WizardBannerBalances />
  // }
}

export default WizardBannerCompanie
