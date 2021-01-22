import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'
import BannerGetStarted from './BannerGetStarted'
import gql from 'graphql-tag'

export const QUERY = gql`
  query AuthDevicesConnection($where: AuthDeviceWhereInput, $orderBy: AuthDeviceOrderByInput, $first: Int, $skip: Int) {
    authDevicesConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
        }
      }
    }
  }
`

type Props = {
  userId: String
}
const WizardBannerChromeExtension = (props: Props) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      where: {
        user: { id: props.userId },
        browserName: 'chrome-extension',
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.authDevicesConnection) return <NotFound />
  const done = data.authDevicesConnection.edges.length !== 0
  return (
    <BannerGetStarted
      done={done}
      actionText={'+ Chrome Extension'}
      message={'If you use Chrome, install NachoNacho Chrome extension and log in directly in the extension.'}
      shwowActionButton={!done}
      onClick={() => window.open('https://buyer.nachonacho.com/chrome-extension/')}
    />
  )
}

export default WizardBannerChromeExtension
