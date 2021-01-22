import React from 'react'
import Icon from '@material-ui/core/Icon'
import { History } from '../../History.type'
import { Location } from '../../Location.type'
import { withRouter } from 'react-router'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'

import InputAdornment from '@material-ui/core/InputAdornment'

const queryString = require('query-string')

type State = {
  privateData: string
}

type Props = {
  history: History
  location: Location
}

class PrivateDataFilter extends React.Component<Props, State> {
  state = {
    privateData: queryString.parse(this.props.location.search).privateData
      ? queryString.parse(this.props.location.search).privateData
      : ''
  }

  componentDidUpdate(prevProps: Props) {
    // this.redirectWithParams()
    if (this.props.location.search !== prevProps.location.search) {
      this.setState({
        privateData: queryString.parse(this.props.location.search).privateData
          ? queryString.parse(this.props.location.search).privateData
          : ''
      })
    }
  }

  render() {
    // const privateData = queryString.parse(this.props.location.search).privateData
    //   ? queryString.parse(this.props.location.search).privateData
    //   : ''

    return (
      <>
        <Grid item xs={12} md={3} className="">
          <FormControl className="inputWidth">
            <InputLabel htmlFor="privateData">{`PrivateData`}</InputLabel>
            <Input
              startAdornment={
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  {this.state.privateData && (
                    <Icon
                      className="cursor"
                      onClick={() => {
                        const parsed = queryString.parse(this.props.location.search)
                        delete parsed.privateData
                        delete parsed.page
                        this.props.history.push('?' + queryString.stringify(parsed))
                      }}>
                      clear
                    </Icon>
                  )}
                </InputAdornment>
              }
              id="privateData"
              onChange={e =>
                this.setState({
                  privateData: e.target.value
                })
              }
              type="text"
              onKeyPress={data => {
                const parsed = queryString.parse(this.props.location.search)
                if (data.charCode === 13) {
                  parsed.privateData = this.state.privateData
                  delete parsed.page
                  this.props.history.push('?' + queryString.stringify(parsed))
                }
              }}
              value={this.state.privateData}
            />
          </FormControl>
        </Grid>
      </>
    )
  }
}

export default withRouter(PrivateDataFilter)
