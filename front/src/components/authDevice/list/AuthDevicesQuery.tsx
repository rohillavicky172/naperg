import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import SingleAuthDevice from '../single/SingleAuthDevice'
import { AuthDeviceNode } from '../AuthDevice.type'
import gql from 'graphql-tag'

export const QUERY = gql`
  query AuthDevicesConnection($where: AuthDeviceWhereInput, $orderBy: AuthDeviceOrderByInput, $first: Int, $skip: Int) {
    authDevicesConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          isVerified
          user {
            id
            firstName
            lastName
          }

          lastLogin

          ip
          language
          timeZone
          timeZoneOffset
          isDeleted
          country
          region
          eu
          city

          browserName
          browserEngine
          browserVersion1a
          browserVersion1b
          browserLanguage
          browserOnline
          browserPlatform
          javaEnabled
          dataCookiesEnabled
          sizeScreenW
          sizeScreenH
          sizeInW
          sizeInH
          sizeAvailW
          sizeAvailH
          scrColorDepth
          scrPixelDepth

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
        }
      }
      aggregate {
        count
      }
    }
  }
`

type Props = {
  variables: any
}

const AuthDevicesQuery = (props: Props) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.authDevicesConnection) return <NotFound />

  return (
    <div className="paperOut">
      {data.authDevicesConnection.edges.map((authDeviceNode: AuthDeviceNode) => (
        <SingleAuthDevice key={authDeviceNode.node.id} authDevice={authDeviceNode.node} />
      ))}
    </div>
  )
}

export default AuthDevicesQuery
