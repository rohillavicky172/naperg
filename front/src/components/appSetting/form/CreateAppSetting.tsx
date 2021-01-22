import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { AppSetting } from '../AppSetting.type'
import { Product } from '../../product/Product.type'
import { CREATE_APP_SETTING_MUTATION } from '../GraphQL'
import { Client } from '../../Client.type'

type State = {}
type Props = {
  client: Client
  appSetting: AppSetting
  createAppSetting: any
  product: Product
  onCreate: () => void
  typeField: string
}

class CreateAppSetting extends React.Component<Props, State> {
  render() {
    return (
      <Button
        color="primary"
        variant="outlined"
        onClick={() => {
          this.createAppSetting()
          this.props.onCreate()
          this.props.client.resetStore()
        }}>
        {`Save`}
      </Button>
    )
  }

  createAppSetting = async () => {
    await this.props.createAppSetting({
      variables: {
        data: {
          name: this.props.appSetting.name,
          value: this.props.appSetting.value,
          valueBoolean: this.props.appSetting.valueBoolean,
        },
      },
    })
  }
}

export default compose(
  graphql(CREATE_APP_SETTING_MUTATION, {
    name: 'createAppSetting',
  }),
  withRouter,
  withApollo
)(CreateAppSetting)
