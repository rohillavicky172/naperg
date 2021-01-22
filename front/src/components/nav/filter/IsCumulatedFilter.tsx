
import React from 'react'
// import { History } from '../../History.type'
// import { Location } from '../../Location.type'
// import { withRouter } from 'react-router'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
// import Grid from '@material-ui/core/Grid'
// // import Select from '@material-ui/core/Select'
// // import MenuItem from '@material-ui/core/MenuItem'
// import Error from '../../nav/error/Error'
// import Loading from '../../nav/error/Loading'
// import { graphql } from 'react-apollo'
// import { flowRight as compose } from 'lodash'
// import { CURRENCIES_QUERY } from './GraphQL'

// const queryString = require('query-string')

type State = {
  // currency: string
}

type Props = {
  isCumulated: boolean,
  onChange: (isCumulated: boolean) => void
  // history: History,
  // location: Location,
  // currenciesQuery: any
}

class IsCumulatedFilter extends React.Component<Props, State> {
  render() {
    return (
      <>
        <FormControlLabel
          control={<Switch checked={this.props.isCumulated} onChange={e => this.props.onChange(e.target.checked)} value={true} />}
          label="Cumulative"
        />
      </>
    )
  }
}

export default IsCumulatedFilter
