import React from 'react'
import Chip from '@material-ui/core/Chip'
import Tooltip from '@material-ui/core/Tooltip'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Source } from '../Source.type'
import SetDefaultSource from './SetDefaultSource'

type State = {
  showUserAgent: boolean
}

type Props = {
  setMode: (mode: string) => void
  context: Context
  source: Source
}

class ActionSource extends React.Component<Props, State> {
  render() {
    return (
      <>
        {this.props.source.isDefaultSource && <Chip color="secondary" label={`Primary`} variant="outlined" />}
        {!this.props.source.isDefaultSource && (
          <>
            {this.props.context.userRoleCompanie.permissions.includes('canSetAsDefaultCard') && (
              <SetDefaultSource source={this.props.source} />
            )}
          </>
        )}
        <Tooltip title="Nickname">
          <IconButton size="small" onClick={() => this.props.setMode('nickname')}>
            <Icon>format_quote</Icon>
          </IconButton>
        </Tooltip>
        {!this.props.source.isDefaultSource && (
          <>
            {this.props.context.userRoleCompanie.permissions.includes('canDeleteCard') && (
              <>
                <Tooltip title="Delete">
                  <IconButton color="default" size="small" onClick={() => this.props.setMode('deleteSource')}>
                    <Icon>delete</Icon>
                  </IconButton>
                </Tooltip>
              </>
            )}
          </>
        )}
      </>
    )
  }
}

export default withContext(ActionSource)
