import React from 'react'
import { Input, Select, InputLabel, FormControl, FormControlLabel, MenuItem, Grid, Icon, Checkbox } from '@material-ui/core'
import { SubscriptionManagement } from './SubscriptionManagement.type'
// import AutocompleteProducts from '../product/list/autocomplete/AutocompleteProducts'
// import { Product } from '../product/Product.type'
// import ImageTemplate from '../nav/ImageTemplate'
// import { Link } from 'react-router-dom'

type Props = {
  subscriptionManagement: SubscriptionManagement
  onChangeData: (subscriptionManagement: SubscriptionManagement) => void
}

const SubscriptionManagementFormForm = (props: Props) => {
  // const [simulation, setSimulation] = React.useState('21AMAZONxs')
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={2} className="">
          {/* <FormControl className="width100per">
            <InputLabel htmlFor="network_idRule">{`network_idRule`}</InputLabel>
            <Select
              id={'network_idRule' + props.subscriptionManagement.id}
              value={props.subscriptionManagement.network_idRule}
              onChange={(e: any) => props.onChangeData({ ...props.subscriptionManagement, network_idRule: e.target.value })}>
              <MenuItem value={'NONE'}>{`NONE`}</MenuItem>

              <MenuItem value={'INCLUDES'}>{`INCLUDES`}</MenuItem>
              <MenuItem value={'EQUAL'}>{`EQUAL`}</MenuItem>
            </Select>
          </FormControl> */}
        </Grid>
      </Grid>
    </>
  )
}

export default SubscriptionManagementFormForm
