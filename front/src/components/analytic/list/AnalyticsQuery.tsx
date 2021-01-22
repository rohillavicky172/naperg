import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import SingleAnalytic from './SingleAnalytic'
import Pagination from '../../nav/Pagination'
import Icon from '@material-ui/core/Icon'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

import gql from 'graphql-tag'

export const QUERY = gql`
  query AnalyticsConnection($where: AnalyticWhereInput, $orderBy: AnalyticOrderByInput, $first: Int, $skip: Int) {
    analyticsConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          createdAt
          userId
          companieId
          productId
          type
          url
          origin
          urlTo

          friendlyBrowserName
          friendlyBrowserVersion
          friendlyBrowserMajor
          friendlyEngineName
          friendlyEngineVersion
          friendlyOsName
          friendlyOsVersion
          friendlyDeviceVendor
          friendlyDeviceModel
          friendlyDeviceType
          friendlyCpuArchitecture
          isBot
          nameBot
          userAgent

          ip
          country
          region
          timezone
          city
        }
      }
      aggregate {
        count
      }
    }
  }
`

type Props = {
  page: number
  variables: any
}

const AnalyticsQuery = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const { loading, error, data, refetch } = useQuery(QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.analyticsConnection) return <NotFound />

  const refetchF = async () => {
    setIsLoading(true)
    await refetch()
    setIsLoading(false)
  }

  return (
    <div className="paperOut">
      <ButtonLoadingAfterClick
        id={'idButton'}
        icon={''}
        color={'primary'}
        disabled={false}
        variant={'outlined'}
        size={'medium'}
        buttonText={<Icon>refresh</Icon>}
        buttonLoadingText={`Loading...`}
        onClick={() => refetchF()}
        loading={isLoading}
      />

      {data.analyticsConnection.edges.map((analyticNode) => (
        <SingleAnalytic key={analyticNode.node.id} analytic={analyticNode.node} />
      ))}
      <Pagination page={props.page} first={props.variables.first} count={data.analyticsConnection.aggregate.count} />
    </div>
  )
}

export default AnalyticsQuery
