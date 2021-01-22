import React from 'react'
import { graphql } from 'react-apollo'
import Paper from '@material-ui/core/Paper'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Error from '../nav/error/Error'
import NotFound from '../nav/error/NotFound'
import Loading from '../nav/error/Loading'
import AddAppSettingContainer from './AddAppSettingContainer'
import { Product } from '../product/Product.type'
import SingleAppSetting from './SingleAppSetting'
import { APP_SETTINGS_QUERY } from './GraphQL'

type State = {}
type Props = {
  variables: any
  product: Product
  appSettings: any
}

class AppSettings extends React.Component<Props, State> {
  render() {
    if (this.props.appSettings.error) {
      return (
        <Error
          message={this.props.appSettings.error.graphQLErrors.length && this.props.appSettings.error.graphQLErrors[0].message}
        />
      )
    }
    if (this.props.appSettings.loading) {
      return <Loading />
    }
    if (!this.props.appSettings) {
      return <NotFound />
    }

    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`AppSettings`}</h3>
          {this.props.appSettings.appSettingsConnection.edges.map(appSettingNode => (
            <div key={appSettingNode.node.id}>
              <SingleAppSetting product={this.props.product} appSetting={appSettingNode.node} />
            </div>
          ))}
          <br />
          <AddAppSettingContainer product={this.props.product} />
        </Paper>
      </div>
    )
  }
}

export default compose(
  graphql(APP_SETTINGS_QUERY, {
    name: 'appSettings',
    options: (props: Props) => ({
      variables: {
        where: {}
      }
    })
  }),
  withRouter
)(AppSettings)
