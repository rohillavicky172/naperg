import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Product } from '../product/Product.type'
// import { APP_SETTINGS_QUERY } from './GraphQL'
import { DELETE_APP_SETTING_MUTATION } from './GraphQL'

type State = {}
type Props = {
  product: Product
  appSettingId: string
  deleteAppSetting: any
}

class DeleteAppSetting extends React.Component<Props, State> {
  render() {
    return <Button onClick={() => this.deleteAppSetting()}>X</Button>
  }

  deleteAppSetting = async () => {
    await this.props.deleteAppSetting({
      variables: {
        where: {
          id: this.props.appSettingId
        }
      }
    })
  }
}

export default compose(
  graphql(DELETE_APP_SETTING_MUTATION, {
    name: 'deleteAppSetting'
  }),
  withRouter
)(DeleteAppSetting)
