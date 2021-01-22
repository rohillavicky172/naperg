import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'
import { SOURCES_QUERY } from '../source/GraphQL'
import BannerGetStarted from './BannerGetStarted'

type Props = {
  companieId: String
}
const WizardBannerSource = (props: Props) => {
  const history = useHistory()
  const { loading, error, data } = useQuery(SOURCES_QUERY, {
    variables: {
      where: {
        companie: { id: props.companieId },

        isDeleted: false,
        isDefaultSource: true,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.sourcesConnection) return <NotFound />
  const done = data.sourcesConnection.edges.length !== 0
  return (
    <BannerGetStarted
      done={done}
      actionText={'+ Payment Source'}
      message={'Add a Payment Source. Your Payment Source will be used to fund all your transactions.'}
      shwowActionButton={!done}
      onClick={() => history.push('/paymentSource/' + props.companieId)}
    />
  )
}

export default WizardBannerSource
