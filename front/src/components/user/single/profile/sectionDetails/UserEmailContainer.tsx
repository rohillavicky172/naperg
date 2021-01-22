
import React from 'react'
import Paper from '@material-ui/core/Paper'
import UserEmailQuery from './UserEmailQuery'

type State = {}

type Props = {
  userId: string
}

class UserEmailContainer extends React.Component<Props, State> {
  render() {
    return (
      <div className="paperOut">
        <h3>{`Email`}</h3>
        <Paper className="paperIn">
          <UserEmailQuery userId={this.props.userId} />
        </Paper>
      </div>
    )
  }
}

export default UserEmailContainer
