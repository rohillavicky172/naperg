import React from 'react'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import { useQuery } from '@apollo/react-hooks'
import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'
import { COMPANIE_QUERY } from '../companie/GraphQL'
// import WizardBannerSource from './WizardBannerSource'

const WizardBannerCompanieInit = () => {
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
  // return <WizardBannerSource companieId={data.companie.id} />
}

export default WizardBannerCompanieInit
