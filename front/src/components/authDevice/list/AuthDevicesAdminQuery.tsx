import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import { withRouter } from 'react-router-dom'
import { withContext } from '../../withContext'

import SingleAuthDevice from '../single/SingleAuthDevice'
import Pagination from '../../nav/Pagination'
import Icon from '@material-ui/core/Icon'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
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
          createdAt
          lastLogin
          deviceToken
          userAgent
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

type State = {
  loading: boolean
}

type Props = {
  page: number
  first: number
  client: any
  history: any
  authDevicesQuery: any
  variables: any
}

class AuthDevicesQuery extends React.Component<Props, State> {
  state = {
    loading: false,
  }
  refetch = async () => {
    this.setState({ loading: true })
    await this.props.authDevicesQuery.refetch()
    this.setState({ loading: false })
  }

  render() {
    if (this.props.authDevicesQuery.error) {
      return (
        <Error
          message={
            this.props.authDevicesQuery.error.graphQLErrors.length && this.props.authDevicesQuery.error.graphQLErrors[0].message
          }
        />
      )
    }
    if (this.props.authDevicesQuery.loading) {
      return <Loading />
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
          onClick={() => {
            this.refetch()
          }}
          loading={this.state.loading}
        />

        {this.props.authDevicesQuery.authDevicesConnection.edges.map((authDeviceNode) => (
          <SingleAuthDevice key={authDeviceNode.node.id} authDevice={authDeviceNode.node} />
        ))}
        <Pagination
          page={this.props.page}
          first={this.props.variables.first}
          count={this.props.authDevicesQuery.authDevicesConnection.aggregate.count}
        />
      </div>
    )
  }
}

export default compose(
  graphql(QUERY, {
    name: 'authDevicesQuery', // name of the injected prop: this.props.feedQuery...
    options: (props: Props) => ({
      variables: props.variables,
    }),
  }),
  withRouter,
  withApollo,
  withContext
)(AuthDevicesQuery)
