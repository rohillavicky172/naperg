import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import PhoneCodeForm from './PhoneCodeForm'

type Props = {
  context: Context
  phone: string
  phoneCode: string
  onCancel: () => void
  onKeyPress: () => void
  onChangePhone: (phone: string) => void
  onChangePhoneCode: (phoneCode: string) => void
}

const PhoneForm = (props: Props) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <PhoneCodeForm phoneCode={props.phoneCode} onChange={(phoneCode) => props.onChangePhoneCode(phoneCode)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className="width100per">
            <InputLabel htmlFor="phone">{`Phone number`}</InputLabel>
            <Input
              id="phone"
              className="width100per"
              onKeyPress={(data) => {
                if (data.charCode === 13) {
                  props.onKeyPress()
                }
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (Number.isInteger(Number(e.target.value))) {
                  props.onChangePhone(e.target.value)
                }
              }}
              type="text"
              value={props.phone}
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default withContext(PhoneForm)
