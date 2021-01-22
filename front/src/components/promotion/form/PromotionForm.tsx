import React from 'react'
import { Button, Select, Input, InputLabel, FormControl, InputAdornment, MenuItem } from '@material-ui/core/'
import { Promotion } from '../Promotion.type'
import { Product } from '../../product/Product.type'
import CreatePromotion from './CreatePromotion'
import { DatePicker } from '@material-ui/pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import UpdatePromotion from './UpdatePromotion'
import EditFieldHotToRedeem from '../../product/single/edit/wysiwyg/EditFieldHotToRedeem'

type Props = {
  onCancel: () => void
  onUpdate: () => void
  product: Product
  promotion: Promotion
}

// class PromotionForm extends React.Component<Props, State> {
const PromotionForm = (props: Props) => {
  const [promotion, setPromotion] = React.useState(props.promotion)
  const cleanFields = () => {}
  return (
    <>
      <div>
        <FormControl className="">
          <InputLabel htmlFor="type">{`type`}</InputLabel>
          <Select
            id="type"
            value={promotion.type}
            onChange={(e: any) =>
              setPromotion({
                ...promotion,
                type: e.target.value,
              })
            }>
            <MenuItem value={'CASHBACK'}>{`CASHBACK`}</MenuItem>
            <MenuItem value={'REVSHARE'}>{`REVSHARE`}</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            autoOk
            className=""
            format="MMMM dd, yyyy"
            id={'startAt'}
            label={'startAt'}
            value={promotion.startAt}
            onChange={(startAt: Date) =>
              setPromotion({
                ...promotion,
                startAt: startAt,
              })
            }
          />
        </MuiPickersUtilsProvider>
      </div>
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            autoOk
            className=""
            format="MMMM dd, yyyy"
            id={'startendAtAt'}
            label={'endAt'}
            value={promotion.endAt}
            onChange={(endAt: Date) =>
              setPromotion({
                ...promotion,
                endAt: endAt,
              })
            }
          />
        </MuiPickersUtilsProvider>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="discount">{`discount`}</InputLabel>
          <Input
            id="discount"
            type="number"
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            value={promotion.discount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPromotion({
                ...promotion,
                discount: e.target.value,
              })
            }
          />
        </FormControl>
      </div>

      <div>
        <FormControl>
          <InputLabel htmlFor="window">{`window (nb Days)`}</InputLabel>
          <Input
            id="window"
            type="text"
            value={promotion.window}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPromotion({
                ...promotion,
                window: e.target.value,
              })
            }
          />
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="text1">{`text1`}</InputLabel>
          <Input
            id="text1"
            type="text"
            value={promotion.text1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPromotion({
                ...promotion,
                text1: e.target.value,
              })
            }
          />
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="text2">{`text2`}</InputLabel>
          <Input
            id="text2"
            type="text"
            value={promotion.text2}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPromotion({
                ...promotion,
                text2: e.target.value,
              })
            }
          />
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="text3">{`text3`}</InputLabel>
          <Input
            id="text3"
            type="text"
            value={promotion.text3}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPromotion({
                ...promotion,
                text3: e.target.value,
              })
            }
          />
        </FormControl>
      </div>

      {/* <div>
        <FormControlLabel
          control={
            <Switch
              checked={promotion.showHowToRedeem}
              onChange={(e) =>
                setPromotion({
                  ...promotion,
                  showHowToRedeem: e.target.checked,
                })
              }
              value={true}
            />
          }
          label="showHowToRedeem"
        />
      </div> */}

      <div>
        <FormControl className="">
          <InputLabel htmlFor="typeRedeem">{`typeRedeem`}</InputLabel>
          <Select
            id="typeRedeem"
            value={promotion.typeRedeem}
            onChange={(e: any) =>
              setPromotion({
                ...promotion,
                typeRedeem: e.target.value,
              })
            }>
            <MenuItem value={'NONE'}>{`NONE`}</MenuItem>
            <MenuItem value={'LINK_NOT_REQUIRED'}>{`LINK_NOT_REQUIRED`}</MenuItem>
            <MenuItem value={'LINK_REQUIRED'}>{`LINK_REQUIRED`}</MenuItem>
            <MenuItem value={'CUSTOM_FIELD'}>{`CUSTOM_FIELD`}</MenuItem>
          </Select>
        </FormControl>
      </div>

      {promotion.typeRedeem === 'CUSTOM_FIELD' && (
        <div>
          <h3>{`howToRedeem`}</h3>
          <EditFieldHotToRedeem
            text={promotion.howToRedeem}
            onChange={(text) =>
              setPromotion({
                ...promotion,
                howToRedeem: text,
              })
            }
          />
        </div>
      )}

      <div>
        {promotion.id ? (
          <UpdatePromotion onUpdate={props.onUpdate} promotion={promotion} />
        ) : (
          <CreatePromotion
            onUpdate={props.onUpdate}
            cleanFields={() => cleanFields()}
            promotion={promotion}
            product={props.product}
          />
        )}{' '}
        <Button onClick={props.onCancel}>{`Cancel`}</Button>
      </div>
    </>
  )
}

export default PromotionForm
