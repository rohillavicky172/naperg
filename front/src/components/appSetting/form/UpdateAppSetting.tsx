import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import Button from '@material-ui/core/Button'
import { AppSetting } from '../AppSetting.type'
import { Product } from '../../product/Product.type'
import { UPDATE_APP_SETTING_MUTATION } from '../GraphQL'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'

type State = {
  appSetting: AppSetting
}
type Props = {
  context: Context
  updateAppSetting: any
  product: Product
  appSetting: AppSetting
  typeField: string
}

class UpdateAppSetting extends React.Component<Props, State> {
  render() {
    return (
      <Button
        color="primary"
        variant="outlined"
        onClick={() => {
          this.updateAppSetting()
        }}>
        {`Update`}
      </Button>
    )
  }

  updateAppSetting = async () => {
    let newAppSetting
    try {
      newAppSetting = await this.props.updateAppSetting({
        variables: {
          where: {
            id: this.props.appSetting.id,
          },
          data: {
            name: this.props.appSetting.name,
            value: this.props.appSetting.value,
            valueBoolean: this.props.appSetting.valueBoolean,
          },
        },
      })
    } catch (e) {
      this.props.context.openSnackBar(true, e.graphQLErrors[0].message, 'error')
    }
    if (newAppSetting) {
      this.props.context.openSnackBar(true, 'Saved!', 'message')
    }
  }
}

export default compose(
  graphql(UPDATE_APP_SETTING_MUTATION, {
    name: 'updateAppSetting',
  }),
  withContext
)(UpdateAppSetting)
