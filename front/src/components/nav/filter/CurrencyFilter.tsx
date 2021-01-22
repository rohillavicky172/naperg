
import React from 'react'
import { History } from '../../History.type'
import { Location } from '../../Location.type'
import { withRouter } from 'react-router'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { CURRENCIES_QUERY } from './GraphQL'

const queryString = require('query-string')

type State = {
  currencies: any
}

type Props = {
  variables: any
  // showCurrency: boolean,
  history: History
  location: Location
  currenciesQuery: any
}

class CurrencyFilter extends React.Component<Props, State> {
  state = {
    currencies:
      typeof queryString.parse(this.props.location.search).currencies === 'string'
        ? [queryString.parse(this.props.location.search).currencies]
        : typeof queryString.parse(this.props.location.search).currencies === 'object'
        ? queryString.parse(this.props.location.search).currencies
        : []
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.location.search !== prevProps.location.search) {
      this.setState({
        currencies:
          typeof queryString.parse(this.props.location.search).currencies === 'string'
            ? [queryString.parse(this.props.location.search).currencies]
            : typeof queryString.parse(this.props.location.search).currencies === 'object'
            ? queryString.parse(this.props.location.search).currencies
            : []
      })
    }
  }

  // state = {
  //   currency: queryString.parse(this.props.location.search).currency
  // }

  // componentDidUpdate(prevProps: Props) {
  //   if (this.props.location.search !== prevProps.location.search) {
  //     this.redirectWithParams()
  //     //   this.setState({
  //     //     currency: queryString.parse(this.props.location.search).currency
  //     //   })
  //   }
  // }

  // componentDidMount = () => {
  //   this.redirectWithParams()
  // }

  // redirectWithParams = () => {
  //   // let parsed = queryString.parse(this.props.location.search)
  //   // if (this.props.showCurrency && !parsed.currency) {
  //   //   parsed.currency = 'ALL'
  //   //   this.props.history.replace(this.props.location.pathname + '?' + queryString.stringify(parsed))
  //   // }
  // }

  render() {
    // const currency = queryString.parse(this.props.location.search).currency

    if (this.props.currenciesQuery.error) {
      return (
        <Error
          message={
            this.props.currenciesQuery.error.graphQLErrors.length && this.props.currenciesQuery.error.graphQLErrors[0].message
          }
        />
      )
    }
    if (this.props.currenciesQuery.loading) {
      return <Loading />
    }
    // console.log(this.props.currenciesQuery.currencies)
    return (
      <>
        {/* <FormControl className="inputWidth">
          <InputLabel htmlFor="currency">Currency</InputLabel>
          <Select
            id="currency"
            value={currency}
            onChange={e => {
              const parsed = queryString.parse(this.props.location.search)
              parsed.currency = e.target.value
              delete parsed.page
              this.props.history.push('?' + queryString.stringify(parsed))
            }}>
            {this.props.currenciesQuery.currencies.map(currencyObj => (
              <MenuItem key={currencyObj.currency} value={currencyObj.currency}>
                {currencyObj.currency.toUpperCase()}
              </MenuItem>
            ))}

            <MenuItem value={'ALL'}>{`All`}</MenuItem>
          </Select>
        </FormControl> */}

        <FormControl className="inputWidth">
          <InputLabel htmlFor="currencies">Currencies</InputLabel>

          <Select
            id="currencies"
            multiple
            renderValue={(selected: any) => selected.length + ' Selected'}
            value={this.state.currencies ? this.state.currencies : []}
            onChange={e => {
              const parsed = queryString.parse(this.props.location.search)
              parsed.currencies = e.target.value
              delete parsed.page
              this.props.history.push('?' + queryString.stringify(parsed))
            }}>
            {this.props.currenciesQuery.currencies.map(currencyObj => (
              <MenuItem key={currencyObj.currency} value={currencyObj.currency}>
                <Checkbox checked={this.state.currencies.indexOf(currencyObj.currency) > -1} />
                {currencyObj.currency.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    )
  }
}

export default compose(
  graphql(CURRENCIES_QUERY, {
    name: 'currenciesQuery',
    options: (props: Props) => ({
      variables: props.variables
    })
  }),
  withRouter
)(CurrencyFilter)
