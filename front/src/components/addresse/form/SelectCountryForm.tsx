import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { bankCountries } from '../BankAddress'
import { BankAddress } from '../BankAddress.type'

type State = {
  bankCountries: BankAddress[]
}
type Props = {
  className: string
  country: string
  onUpdate: (country: string) => void
}

class SelectCountryForm extends React.Component<Props, State> {
  state = {
    bankCountries,
  }

  render() {
    return (
      <>
        <FormControl className={this.props.className}>
          <InputLabel htmlFor="country">{`Country`}</InputLabel>
          <Select id="country" value={this.props.country} onChange={(e: any) => this.props.onUpdate(e.target.value)}>
            {this.state.bankCountries.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                {country.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    )
  }
}

export default SelectCountryForm
