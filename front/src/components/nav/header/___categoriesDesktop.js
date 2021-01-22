import React from 'react'
import { withRouter } from 'react-router'
// import Button from '@material-ui/core/Button'
// import ImageTemplate from '../ImageTemplate'
// import MenuListRight from './MenuListRight'
// import Menu from '@material-ui/core/Menu'
import { withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'

// type State = {
//   anchorEl: any
// }

// type Props = {
//   nameFile: string
// }

class MenuAvatar extends React.Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    // const { anchorEl } = this.state
    return (
      <div>
        {/* <Button aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true" onClick={this.handleClick}>
          <ImageTemplate format={'avatar'} nameFile={this.props.nameFile} />
        </Button>
        <Menu className="menuAvatarList" id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          <MenuListRight onClose={this.handleClose} />
        </Menu> */}
      </div>
    )
  }
}

export default compose(
  withRouter,
  withApollo
)(MenuAvatar)
