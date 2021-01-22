
import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
import Icon from '@material-ui/core/Icon'
import MenuListRight from '../header/MenuListRight'
import { Context } from '../../Context.type'
import { withContext } from '../../withContext'

type State = {}

type Props = {
  context: Context
}

class SideBarRight extends React.Component<Props, State> {
  render() {
    return (
      <Drawer
        anchor="right"
        open={this.props.context.isSideBarOpenRight}
        onClose={() => this.props.context.toggleDrawerRight(false)}
      >
        <div onClick={() => this.props.context.toggleDrawerRight(false)}>
          <MenuItem>
            <Icon>arrow_forward</Icon>
          </MenuItem>
          <MenuListRight onClose={() => {}} />
        </div>
      </Drawer>
    )
  }
}

export default withContext(SideBarRight)
