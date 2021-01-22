import React from 'react'

import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import PaymentMethodFormatSource from '../card/single/PaymentMethodFormatSource'

import Error from '../nav/error/Error'
import { useQuery } from '@apollo/react-hooks'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'
import { SOURCES_QUERY } from '../source/GraphQL'
import { SourceNode } from '../source/Source.type'

// type State = {}

type Props = {
  companieId: string
}

const CardsDashboard = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const { loading, error, data } = useQuery(SOURCES_QUERY, {
    variables: {
      where: {
        companie: { id: props.companieId },
        testMode: context.testMode,
        isDeleted: false,
        isDefaultSource: true,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.sourcesConnection) return <NotFound />

  return (
    <div>
      {data.sourcesConnection.edges.map((source: SourceNode) => (
        <div key={source.node.id}>
          <PaymentMethodFormatSource showIcon={true} source={source.node} />
        </div>
      ))}
    </div>
  )
}

export default CardsDashboard
