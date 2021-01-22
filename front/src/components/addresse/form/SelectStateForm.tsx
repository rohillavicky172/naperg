import React from 'react'
import { FormControl, Select, Input, InputLabel } from '@material-ui/core/'
import { bankStatesCA, bankStatesUS } from '../BankAddress'

type Props = {
  className: string
  country: string
  state: string
  error: boolean
  onUpdate: (state: string) => void
}

const SelectStateForm = (props: Props) => {
  if (props.country === 'US') {
    return (
      <FormControl className={props.className + ' tal'}>
        <InputLabel htmlFor="state">{`State/Province`}</InputLabel>
        <Select error={props.error} native id="state" value={props.state} onChange={(e: any) => props.onUpdate(e.target.value)}>
          <option value=""></option>
          {bankStatesUS.map((state) => (
            <option key={state.code} value={state.code}>
              {state.label}
            </option>
          ))}
        </Select>
      </FormControl>
    )
  }

  if (props.country === 'CA') {
    return (
      <>
        <FormControl className={props.className + ' tal'}>
          <InputLabel htmlFor="state">{`State/Province`}</InputLabel>
          <Select native id="state" value={props.state} onChange={(e: any) => props.onUpdate(e.target.value)}>
            <option value=""></option>
            {bankStatesCA.map((state) => (
              <option key={state.code} value={state.code}>
                {state.label}
              </option>
            ))}
          </Select>
        </FormControl>
      </>
    )
  }

  return (
    <>
      <FormControl className={props.className}>
        <InputLabel htmlFor="state">{`State`}</InputLabel>
        <Input
          id="state"
          type="text"
          value={props.state}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onUpdate(e.target.value)}
        />
      </FormControl>
    </>
  )
}

export default SelectStateForm
