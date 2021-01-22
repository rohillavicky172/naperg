import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Icon from '@material-ui/core/Icon'

type State = {}
type Props = {
  title: string
}

class IsDeletedLogically extends React.Component<Props, State> {
  render() {
    return (
      <>
        <Tooltip title={this.props.title}>
          <Icon className="secondary iconAlignTextBottom">delete_forever</Icon>
        </Tooltip>
      </>
    )
  }
}

export default IsDeletedLogically
