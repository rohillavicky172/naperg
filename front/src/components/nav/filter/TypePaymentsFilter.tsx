import React from 'react'
import { History } from '../../History.type'
import { Location } from '../../Location.type'
import { withRouter } from 'react-router'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
const queryString = require('query-string')

type State = {
  typePayments: any
}

type Props = {
  history: History
  location: Location
}

class TypePaymentsFilter extends React.Component<Props, State> {
  state = {
    typePayments:
      typeof queryString.parse(this.props.location.search).typePayments === 'string'
        ? [queryString.parse(this.props.location.search).typePayments]
        : typeof queryString.parse(this.props.location.search).typePayments === 'object'
        ? queryString.parse(this.props.location.search).typePayments
        : []
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.location.search !== prevProps.location.search) {
      this.setState({
        typePayments:
          typeof queryString.parse(this.props.location.search).typePayments === 'string'
            ? [queryString.parse(this.props.location.search).typePayments]
            : typeof queryString.parse(this.props.location.search).typePayments === 'object'
            ? queryString.parse(this.props.location.search).typePayments
            : []
      })
    }
  }

  render() {
    return (
      <>
        <FormControl className="inputWidth">
          <InputLabel htmlFor="typePayments">TypePayments</InputLabel>

          <Select
            id="typePayments"
            multiple
            renderValue={(selected: any) => selected.length + ' Selected'}
            value={this.state.typePayments ? this.state.typePayments : []}
            onChange={e => {
              const parsed = queryString.parse(this.props.location.search)
              parsed.typePayments = e.target.value
              delete parsed.page
              this.props.history.push('?' + queryString.stringify(parsed))
            }}>
            <MenuItem value={'BALANCE'}>
              <Checkbox checked={this.state.typePayments.indexOf('BALANCE') > -1} />
              BALANCE
            </MenuItem>
            <MenuItem value={'PAYMENT_SOURCE'}>
              <Checkbox checked={this.state.typePayments.indexOf('PAYMENT_SOURCE') > -1} />
              PAYMENT_SOURCE
            </MenuItem>
            <MenuItem value={'WIRE_TRANSFER'}>
              <Checkbox checked={this.state.typePayments.indexOf('WIRE_TRANSFER') > -1} />
              WIRE_TRANSFER
            </MenuItem>
            <MenuItem value={'PAYMENT_SOURCE_SMALL_EXPENSE'}>
              <Checkbox checked={this.state.typePayments.indexOf('PAYMENT_SOURCE_SMALL_EXPENSE') > -1} />
              PAYMENT_SOURCE_SMALL_EXPENSE
            </MenuItem>
            <MenuItem value={'REWARD'}>
              <Checkbox checked={this.state.typePayments.indexOf('REWARD') > -1} />
              REWARD
            </MenuItem>
          </Select>
        </FormControl>
      </>
    )
  }
}

export default withRouter(TypePaymentsFilter)
