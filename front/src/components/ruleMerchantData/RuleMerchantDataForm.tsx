import React from 'react'
import { Input, Select, InputLabel, FormControl, FormControlLabel, MenuItem, Grid, Icon, Checkbox } from '@material-ui/core'
import { RuleMerchantData } from './RuleMerchantData.type'
import AutocompleteProducts from '../product/list/autocomplete/AutocompleteProducts'
import { Product } from '../product/Product.type'
import ImageTemplate from '../nav/ImageTemplate'
// import { Link } from 'react-router-dom'

type Props = {
  ruleMerchantData: RuleMerchantData
  onChangeData: (ruleMerchantData: RuleMerchantData) => void
}

const RuleMerchantDataForm = (props: Props) => {
  // const [simulation, setSimulation] = React.useState('21AMAZONxs')
  return (
    <>
      {!props.ruleMerchantData.id && (
        <div>
          <AutocompleteProducts
            onElemSelected={(product: Product) => props.onChangeData({ ...props.ruleMerchantData, product })}
          />
        </div>
      )}

      <br />

      <FormControl className="width100per">
        <FormControlLabel
          label={`isActive`}
          control={
            <Checkbox
              checked={props.ruleMerchantData.isActive}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                props.onChangeData({ ...props.ruleMerchantData, isActive: event.target.checked })
              }
            />
          }
        />
      </FormControl>

      {props.ruleMerchantData.product.id && (
        <Grid container>
          <Grid item xs={12} sm={4}>
            <ImageTemplate format="small" nameFile={props.ruleMerchantData.product.nameFile} />
          </Grid>
          <Grid item xs={12} sm={4}>
            {props.ruleMerchantData.product.name}
          </Grid>
        </Grid>
      )}

      <Grid container>
        <Grid item xs={12} sm={2} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="nameRule">{`nameRule`}</InputLabel>
            <Select
              id={'nameRule' + props.ruleMerchantData.id}
              value={props.ruleMerchantData.nameRule}
              onChange={(e: any) => props.onChangeData({ ...props.ruleMerchantData, nameRule: e.target.value })}>
              <MenuItem value={'NONE'}>{`NONE`}</MenuItem>
              <MenuItem value={'SUBSTRING'}>{`SUBSTRING`}</MenuItem>
              <MenuItem value={'INCLUDES'}>{`INCLUDES`}</MenuItem>
              <MenuItem value={'EQUAL'}>{`EQUAL`}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {props.ruleMerchantData.nameRule !== 'NONE' && (
          <Grid item xs={12} sm={4} className="">
            <FormControl className="width100per">
              <InputLabel htmlFor="nameValue">{`nameValue`}</InputLabel>
              <Input
                id={'nameValue' + props.ruleMerchantData.id}
                type="text"
                value={props.ruleMerchantData.nameValue}
                onChange={(e: any) => props.onChangeData({ ...props.ruleMerchantData, nameValue: e.target.value })}
              />
            </FormControl>
          </Grid>
        )}
        {props.ruleMerchantData.nameRule === 'SUBSTRING' && (
          <>
            <Grid item xs={12} sm={1} className="">
              <FormControl className="width100per">
                <InputLabel htmlFor="nameSubstringInit">{`start`}</InputLabel>
                <Input
                  id={'nameSubstringInit' + props.ruleMerchantData.id}
                  type="text"
                  value={props.ruleMerchantData.nameSubstringInit}
                  onChange={(e: any) => props.onChangeData({ ...props.ruleMerchantData, nameSubstringInit: e.target.value })}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={1} className="">
              <FormControl className="width100per">
                <InputLabel htmlFor="nameSubstringEnd">{`end`}</InputLabel>
                <Input
                  id={'nameSubstringEnd' + props.ruleMerchantData.id}
                  type="text"
                  value={props.ruleMerchantData.nameSubstringEnd}
                  onChange={(e: any) => props.onChangeData({ ...props.ruleMerchantData, nameSubstringEnd: e.target.value })}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4} className="">
              <FormControl className="width100per">
                <InputLabel htmlFor="nameSimulation">{`simulation`}</InputLabel>
                <Input
                  id={'nameSimulation' + props.ruleMerchantData.id}
                  type="text"
                  value={props.ruleMerchantData.nameSimulation}
                  onChange={(e: any) => props.onChangeData({ ...props.ruleMerchantData, nameSimulation: e.target.value })}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} className="tar">
              {props.ruleMerchantData.nameSimulation &&
                Number(props.ruleMerchantData.nameSubstringInit) < Number(props.ruleMerchantData.nameSubstringEnd) && (
                  <>
                    <span className="">
                      {props.ruleMerchantData.nameSimulation.substring(0, Number(props.ruleMerchantData.nameSubstringInit))}
                    </span>
                    <span className="secondary bold">
                      {props.ruleMerchantData.nameSimulation.substring(
                        Number(props.ruleMerchantData.nameSubstringInit),
                        Number(props.ruleMerchantData.nameSubstringEnd)
                      )}
                    </span>
                    <span className="">
                      {props.ruleMerchantData.nameSimulation.substring(
                        Number(props.ruleMerchantData.nameSubstringEnd),
                        Number(props.ruleMerchantData.nameSimulation.length)
                      )}
                    </span>
                    {props.ruleMerchantData.nameSimulation.substring(
                      Number(props.ruleMerchantData.nameSubstringInit),
                      Number(props.ruleMerchantData.nameSubstringEnd)
                    ) === props.ruleMerchantData.nameValue ? (
                      <Icon className="primary">done</Icon>
                    ) : (
                      <Icon className="secondary">report</Icon>
                    )}
                  </>
                )}
            </Grid>
          </>
        )}
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={2} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="categoryRule">{`categoryRule`}</InputLabel>
            <Select
              id={'categoryRule' + props.ruleMerchantData.id}
              value={props.ruleMerchantData.categoryRule}
              onChange={(e: any) => props.onChangeData({ ...props.ruleMerchantData, categoryRule: e.target.value })}>
              <MenuItem value={'NONE'}>{`NONE`}</MenuItem>

              <MenuItem value={'INCLUDES'}>{`INCLUDES`}</MenuItem>
              <MenuItem value={'EQUAL'}>{`EQUAL`}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {props.ruleMerchantData.categoryRule !== 'NONE' && (
          <Grid item xs={12} sm={4} className="">
            <FormControl className="width100per">
              <InputLabel htmlFor="categoryValue">{`categoryValue`}</InputLabel>
              <Input
                id={'categoryValue' + props.ruleMerchantData.id}
                type="text"
                value={props.ruleMerchantData.categoryValue}
                onChange={(e: any) => props.onChangeData({ ...props.ruleMerchantData, categoryValue: e.target.value })}
              />
            </FormControl>
          </Grid>
        )}
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={2} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="network_idRule">{`network_idRule`}</InputLabel>
            <Select
              id={'network_idRule' + props.ruleMerchantData.id}
              value={props.ruleMerchantData.network_idRule}
              onChange={(e: any) => props.onChangeData({ ...props.ruleMerchantData, network_idRule: e.target.value })}>
              <MenuItem value={'NONE'}>{`NONE`}</MenuItem>

              <MenuItem value={'INCLUDES'}>{`INCLUDES`}</MenuItem>
              <MenuItem value={'EQUAL'}>{`EQUAL`}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {props.ruleMerchantData.network_idRule !== 'NONE' && (
          <Grid item xs={12} sm={4} className="">
            <FormControl className="width100per">
              <InputLabel htmlFor="network_idValue">{`network_idValue`}</InputLabel>
              <Input
                id={'network_idValue' + props.ruleMerchantData.id}
                type="text"
                value={props.ruleMerchantData.network_idValue}
                onChange={(e: any) => props.onChangeData({ ...props.ruleMerchantData, network_idValue: e.target.value })}
              />
            </FormControl>
          </Grid>
        )}
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={2} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="countryRule">{`countryRule`}</InputLabel>
            <Select
              id={'countryRule' + props.ruleMerchantData.id}
              value={props.ruleMerchantData.countryRule}
              onChange={(e: any) => props.onChangeData({ ...props.ruleMerchantData, countryRule: e.target.value })}>
              <MenuItem value={'NONE'}>{`NONE`}</MenuItem>

              <MenuItem value={'INCLUDES'}>{`INCLUDES`}</MenuItem>
              <MenuItem value={'EQUAL'}>{`EQUAL`}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {props.ruleMerchantData.countryRule !== 'NONE' && (
          <Grid item xs={12} sm={4} className="">
            <FormControl className="width100per">
              <InputLabel htmlFor="countryValue">{`countryValue`}</InputLabel>
              <Input
                id={'countryValue' + props.ruleMerchantData.id}
                type="text"
                value={props.ruleMerchantData.countryValue}
                onChange={(e: any) => props.onChangeData({ ...props.ruleMerchantData, countryValue: e.target.value })}
              />
            </FormControl>
          </Grid>
        )}
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={2} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="cityRule">{`cityRule`}</InputLabel>
            <Select
              id={'cityRule' + props.ruleMerchantData.id}
              value={props.ruleMerchantData.cityRule}
              onChange={(e: any) => props.onChangeData({ ...props.ruleMerchantData, cityRule: e.target.value })}>
              <MenuItem value={'NONE'}>{`NONE`}</MenuItem>

              <MenuItem value={'INCLUDES'}>{`INCLUDES`}</MenuItem>
              <MenuItem value={'EQUAL'}>{`EQUAL`}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {props.ruleMerchantData.cityRule !== 'NONE' && (
          <Grid item xs={12} sm={4} className="">
            <FormControl className="width100per">
              <InputLabel htmlFor="cityValue">{`cityValue`}</InputLabel>
              <Input
                id={'cityValue' + props.ruleMerchantData.id}
                type="text"
                value={props.ruleMerchantData.cityValue}
                onChange={(e: any) => props.onChangeData({ ...props.ruleMerchantData, cityValue: e.target.value })}
              />
            </FormControl>
          </Grid>
        )}
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={2} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="stateRule">{`stateRule`}</InputLabel>
            <Select
              id={'stateRule' + props.ruleMerchantData.id}
              value={props.ruleMerchantData.stateRule}
              onChange={(e: any) => props.onChangeData({ ...props.ruleMerchantData, stateRule: e.target.value })}>
              <MenuItem value={'NONE'}>{`NONE`}</MenuItem>

              <MenuItem value={'INCLUDES'}>{`INCLUDES`}</MenuItem>
              <MenuItem value={'EQUAL'}>{`EQUAL`}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {props.ruleMerchantData.stateRule !== 'NONE' && (
          <Grid item xs={12} sm={4} className="">
            <FormControl className="width100per">
              <InputLabel htmlFor="stateValue">{`stateValue`}</InputLabel>
              <Input
                id={'stateValue' + props.ruleMerchantData.id}
                type="text"
                value={props.ruleMerchantData.stateValue}
                onChange={(e: any) => props.onChangeData({ ...props.ruleMerchantData, stateValue: e.target.value })}
              />
            </FormControl>
          </Grid>
        )}
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={2} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="postal_codeRule">{`postal_codeRule`}</InputLabel>
            <Select
              id={'postal_codeRule' + props.ruleMerchantData.id}
              value={props.ruleMerchantData.postal_codeRule}
              onChange={(e: any) => props.onChangeData({ ...props.ruleMerchantData, postal_codeRule: e.target.value })}>
              <MenuItem value={'NONE'}>{`NONE`}</MenuItem>

              <MenuItem value={'INCLUDES'}>{`INCLUDES`}</MenuItem>
              <MenuItem value={'EQUAL'}>{`EQUAL`}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {props.ruleMerchantData.postal_codeRule !== 'NONE' && (
          <Grid item xs={12} sm={4} className="">
            <FormControl className="width100per">
              <InputLabel htmlFor="postal_codeValue">{`postal_codeValue`}</InputLabel>
              <Input
                id={'postal_codeValue' + props.ruleMerchantData.id}
                type="text"
                value={props.ruleMerchantData.postal_codeValue}
                onChange={(e: any) => props.onChangeData({ ...props.ruleMerchantData, postal_codeValue: e.target.value })}
              />
            </FormControl>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default RuleMerchantDataForm
