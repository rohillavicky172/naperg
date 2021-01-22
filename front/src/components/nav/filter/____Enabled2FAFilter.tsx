
import React from 'react'
import { History } from '../../History.type'
import { Location } from '../../Location.type'
import { withRouter } from 'react-router'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const queryString = require('query-string')

type State = {}

type Props = {
  history: History,
  showIsVerified: boolean,
  location: Location
}

class Enabled2FAFilter extends React.Component<Props, State> {
  render() {
    const enabled2FA = queryString.parse(this.props.location.search).enabled2FA

    return (
      <>
        <FormControl className="inputWidth">
          <InputLabel htmlFor="enabled2FA">enabled2FA</InputLabel>
          <Select
            id="enabled2FA"
            value={enabled2FA}
            onChange={e => {
              const parsed = queryString.parse(this.props.location.search)
              delete parsed.page
              parsed.enabled2FA = e.target.value
              this.props.history.push('?' + queryString.stringify(parsed))
            }}>
            <MenuItem value={'ALL'}>{`All`}</MenuItem>
            <MenuItem value={'TRUE'}>{`True`}</MenuItem>
            <MenuItem value={'FALSE'}>{`False`}</MenuItem>
          </Select>
        </FormControl>
      </>
    )
  }
}

export default withRouter(Enabled2FAFilter)
