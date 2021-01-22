import React from 'react'
import { Input, InputLabel, FormControl, Select, MenuItem } from '@material-ui/core/'
import { PromoCode } from '../PromoCode.type'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { DatePicker } from '@material-ui/pickers'
import startOfDay from 'date-fns/startOfDay'

type Props = {
  onChange: (promoCode: PromoCode) => void
  promoCode: PromoCode
}

const PromoCodeForm = (props: Props) => {
  return (
    <>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="code">{`Promo Code`}</InputLabel>
          <Input
            id="code"
            type="text"
            value={props.promoCode.code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              props.onChange({
                ...props.promoCode,
                code: e.target.value,
              })
            }
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="description">{`description`}</InputLabel>
          <Input
            id="description"
            type="text"
            value={props.promoCode.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              props.onChange({
                ...props.promoCode,
                description: e.target.value,
              })
            }
          />
        </FormControl>
      </div>

      {/* <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            autoOk
            className=""
            format="MMMM dd, yyyy"
            id={'startAt'}
            label={'startAt'}
            value={props.promoCode.startAt}
            onChange={(startAt: Date) =>
              props.onChange({
                ...props.promoCode,
                startAt: startOfDay(startAt),
              })
            }
          />
        </MuiPickersUtilsProvider>
      </div> */}
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            autoOk
            className=""
            format="MMMM dd, yyyy"
            id={'RedeemBy'}
            label={'Redeem by'}
            value={props.promoCode.endAt}
            onChange={(endAt: Date) =>
              props.onChange({
                ...props.promoCode,
                endAt: startOfDay(endAt),
              })
            }
          />
        </MuiPickersUtilsProvider>
      </div>

      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="type">{`type`}</InputLabel>
          <Select
            id="type"
            value={props.promoCode.type}
            onChange={(e: any) =>
              props.onChange({
                ...props.promoCode,
                type: e.target.value,
              })
            }>
            <MenuItem value={'FREE_APP'}>{`FREE_APP`}</MenuItem>
            <MenuItem value={'FREE_6_MONTHS'}>{`FREE_6_MONTHS`}</MenuItem>
            <MenuItem value={'FREE_1_YEAR'}>{`FREE_1_YEAR (not live)`}</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  )
}

export default PromoCodeForm
