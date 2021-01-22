
import React from 'react'
import Icon from '@material-ui/core/Icon'
import Tooltip from '@material-ui/core/Tooltip'

type State = {}

type Props = {
  isValidated: boolean,
  textValidated: string,
  icon: string,
  iconNotValidated: string,
  textNotValidated: string
}

class IsValidated extends React.Component<Props, State> {
  render() {
    return (
      <>
        {this.props.isValidated ? (
          <Tooltip title={this.props.textValidated}>
            <Icon className="primary iconAlignTextBottom textSize11">{this.props.icon}</Icon>
          </Tooltip>
        ) : (
          <Tooltip title={this.props.textNotValidated}>
            <Icon className="secondary iconAlignTextBottom textSize11">{this.props.iconNotValidated}</Icon>
          </Tooltip>
        )}
      </>
    )
  }
}

export default IsValidated
