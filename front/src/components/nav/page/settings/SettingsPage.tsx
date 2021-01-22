
import React from 'react'
import { Match } from '../../../Match.type'
import Settings from './Settings'
import Paper from '@material-ui/core/Paper'
import TitleUserName from '../../../nav/layout/titlePage/TitleUserName'

type State = {}

type Props = {
  match: Match
}

class SettingsPage extends React.Component<Props, State> {
  render() {
    const userId = this.props.match.params.userId
    return (
      <div className="paperOut">
        <h3>
          <TitleUserName showCompanie={false} objectName="Profile" userId={userId} />
        </h3>
        <Paper className="paperIn">
          <Settings userId={userId} />
        </Paper>
      </div>
    )
  }
}

export default SettingsPage
