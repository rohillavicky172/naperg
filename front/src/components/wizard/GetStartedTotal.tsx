import React from 'react'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import { useQuery } from '@apollo/react-hooks'
import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'
import { GET_STARTED_BANNER } from './GraphQL'

const GetStartedTotal = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const companieId = context.userRoleCompanie.companie.id
  const userId = context.me.id
  const { loading, error, data } = useQuery(GET_STARTED_BANNER, {
    variables: {
      companieId,
      userId,
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.getStartedBanners) return <NotFound />

  const countCompleted = data.getStartedBanners.filter((getStartedBanner) => getStartedBanner.done === true).length
  return (
    <>
      Get Started ({countCompleted}/{data.getStartedBanners.length})
    </>
  )
}

export default GetStartedTotal
