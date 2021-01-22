import React from 'react'
import PaymentSources from './PaymentSources'
import { Companie } from '../../companie/Companie.type'
import { Context } from '../../Context.type'
import { AppContext } from '../../AppContext'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import { SOURCES_QUERY } from '../../source/GraphQL'
import CompanieBalance from '../../balance/CompanieBalance'
import TrustedCompanie from '../../companie/single/TrustedCompanie'
import LimitTrustedCompanieCard from '../../companie/single/LimitTrustedCompanieCard'

type Props = {
  companie: Companie
}

const Sources = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
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

  let showActionsBalance = false
  let isMainSourceCard = false
  if (data.sourcesConnection.edges.length > 0) {
    showActionsBalance = true
    const defaultSourceNode = data.sourcesConnection.edges[0]
    if (defaultSourceNode.node.object === 'bank_account' && defaultSourceNode.node.status === 'new') {
      showActionsBalance = false
    }
    if (defaultSourceNode.node.object === 'card') {
      isMainSourceCard = true
    }
  }

  let canAddTopUp = context.userRoleCompanie.permissions.includes('canAddTopUp')

  return (
    <>
      {props.companie.isTrustedPayment && !isMainSourceCard && <TrustedCompanie companie={props.companie} />}
      {props.companie.isTrustedPayment && isMainSourceCard && <LimitTrustedCompanieCard companie={props.companie} />}
      {!props.companie.isTrustedPayment && (
        <CompanieBalance showActionsBalance={showActionsBalance} canAddTopUp={canAddTopUp} companieId={props.companie.id} />
      )}
      <PaymentSources companie={props.companie} />
    </>
  )
}

export default Sources
