import React from 'react'
import { Input, InputLabel, FormControl, Grid, FormControlLabel, Checkbox } from '@material-ui/core'
import { Contract } from './Contract.type'

type Props = {
  contract: Contract
  onChangeData: (contract: Contract) => void
}

const ContractForm = (props: Props) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="title1">{`title1`}</InputLabel>
            <Input
              id="title1"
              onChange={(e: any) => props.onChangeData({ ...props.contract, title1: e.target.value })}
              type="text"
              value={props.contract.title1}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="title2">{`title2`}</InputLabel>
            <Input
              id="title2"
              onChange={(e: any) => props.onChangeData({ ...props.contract, title2: e.target.value })}
              type="text"
              value={props.contract.title2}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="textContract">{`textContract`}</InputLabel>
            <Input
              id="textContract"
              multiline
              rows="30"
              onChange={(e: any) => props.onChangeData({ ...props.contract, textContract: e.target.value })}
              type="text"
              value={props.contract.textContract}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4} className="">
          <div>
            <FormControl>
              <FormControlLabel
                label={`Is ready to sign`}
                control={
                  <Checkbox
                    checked={props.contract.isComplete}
                    onChange={(e) =>
                      props.onChangeData({
                        ...props.contract,
                        isComplete: e.target.checked,
                      })
                    }
                  />
                }
              />
            </FormControl>
          </div>
        </Grid>

        <Grid item xs={12} sm={4} className="">
          <div>
            <FormControl>
              <FormControlLabel
                label={`canBeSigned (NachoNacho)`}
                control={
                  <Checkbox
                    checked={props.contract.canBeSigned}
                    onChange={(e) =>
                      props.onChangeData({
                        ...props.contract,
                        canBeSigned: e.target.checked,
                      })
                    }
                  />
                }
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <FormControlLabel
                label={`canBeSignedVendor`}
                control={
                  <Checkbox
                    checked={props.contract.canBeSignedVendor}
                    onChange={(e) =>
                      props.onChangeData({
                        ...props.contract,
                        canBeSignedVendor: e.target.checked,
                      })
                    }
                  />
                }
              />
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12} sm={4} className="">
          <div>
            <FormControl>
              <FormControlLabel
                label={`isSigned (NachoNacho)`}
                control={
                  <Checkbox
                    checked={props.contract.isSigned}
                    onChange={(e) =>
                      props.onChangeData({
                        ...props.contract,
                        isSigned: e.target.checked,
                      })
                    }
                  />
                }
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <FormControlLabel
                label={`isSignedVendor`}
                control={
                  <Checkbox
                    checked={props.contract.isSignedVendor}
                    onChange={(e) =>
                      props.onChangeData({
                        ...props.contract,
                        isSignedVendor: e.target.checked,
                      })
                    }
                  />
                }
              />
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12} sm={4} className="">
          <div>
            <FormControl>
              <FormControlLabel
                label={`canBePrinted`}
                control={
                  <Checkbox
                    checked={props.contract.canBePrinted}
                    onChange={(e) =>
                      props.onChangeData({
                        ...props.contract,
                        canBePrinted: e.target.checked,
                      })
                    }
                  />
                }
              />
            </FormControl>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default ContractForm
