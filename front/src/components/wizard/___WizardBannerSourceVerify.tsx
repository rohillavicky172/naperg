import React from 'react'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import { useQuery } from '@apollo/react-hooks'
import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'
import Paper from '@material-ui/core/Paper'
import BannerGetStarted from './BannerGetStarted'
import { SOURCES_QUERY } from '../source/GraphQL'
import { Companie } from '../companie/Companie.type'

type Props = {
  companie: Companie
}
const WizardBannerSourceVerify = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  // const companieId = context.userRoleCompanie.companie.id
  const { loading, error, data } = useQuery(SOURCES_QUERY, {
    variables: {
      where: {
        companie: { id: props.companie.id },
        testMode: context.testMode,
        isDeleted: false,
        isDefaultSource: true,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.sourcesConnection) return <NotFound />

  if (data.sourcesConnection.edges.length > 0) {
    const defaultSources = data.sourcesConnection.edges.filter((sourceNode) => sourceNode.node.isDefaultSource === true)
    if (defaultSources.length > 0) {
      const defaultSourceNode = defaultSources[0]
      if (defaultSourceNode.node.object === 'bank_account' && defaultSourceNode.node.status === 'new') {
        return (
          <div className="paperOut">
            <Paper className="">
              <BannerGetStarted
                done={false}
                actionText={'Verify bank account'}
                message={'Your primary source is not yet verified. Please verify your bank account to activate your account.'}
                shwowActionButton={true}
                onClick={() => {}}
              />
            </Paper>
          </div>
        )
      }
    }
  }
  return null

  // if (data.sourcesConnection.edges.length > 0 && props.companie.isTrustedPayment === true) return null

  // return <WizardBannerCompanie />
}

export default WizardBannerSourceVerify
