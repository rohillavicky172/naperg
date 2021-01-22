
import React from 'react'
// import Drawer from '@material-ui/core/Drawer'
import Icon from '@material-ui/core/Icon'
import Paper from '@material-ui/core/Paper'
// import { Context } from '../../Context.type'
// import { withContext } from '../../withContext'
// import { Link } from 'react-router-dom'

type State = {}

type Props = {}

class AccountNotVerified extends React.Component<Props, State> {
  render() {
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <div className="tac">
            <div className="responsiveMargin2 margin5">
              <Icon className="textSize15" color="secondary">
                warning
              </Icon>
              <h3 className="secondary">{`Account not verified yet..`}</h3>
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}

export default AccountNotVerified
