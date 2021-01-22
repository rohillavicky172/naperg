import React from 'react'
// import { withContext } from '../../../withContext'
// import { Context } from '../../../Context.type'
import { Match } from '../../../Match.type'
import UserPhoneQuery from './UserPhoneQuery'
import Paper from '@material-ui/core/Paper'

type State = {}

type Props = {
  match: Match
  // context: Context
}

class ChangePhonePage extends React.Component<Props, State> {
  render() {
    const userId = this.props.match.params.userId
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <UserPhoneQuery userId={userId} />
        </Paper>
      </div>
    )
  }
}

export default ChangePhonePage
