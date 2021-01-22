import React from 'react'
import Icon from '@material-ui/core/Icon'

type State = {
  showDescriptionHelp: boolean
}

type Props = {
  text: string
}

class HelpNotice extends React.Component<Props, State> {
  state = {
    showDescriptionHelp: false,
  }

  render() {
    return (
      <>
        <Icon
          className="textSize8 cursor primary"
          onClick={() => this.setState({ showDescriptionHelp: !this.state.showDescriptionHelp })}>
          help
        </Icon>
        {this.state.showDescriptionHelp && <div className="secondary textSize6">{this.props.text}</div>}
      </>
    )
  }
}

export default HelpNotice
