import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Divider from '@material-ui/core/Divider'
import { Companie } from '../Companie.type'
import UpdateCompanieAdmin from './UpdateCompanieAdmin'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputAdornment from '@material-ui/core/InputAdornment'
import Select from '@material-ui/core/Select'
import Switch from '@material-ui/core/Switch'
import Grid from '@material-ui/core/Grid'
import DateComponent from '../../nav/DateComponent'

type Props = {
  showCancelButton: boolean
  redirectAfter: boolean

  onCancel: () => void
  onUpdate: () => void
  companie: Companie
}

const CompanieFormAdmin = (props: Props) => {
  const [companie, setCompanie] = React.useState(props.companie)
  const [companieNameValidate, setCompanieNameValidate] = React.useState(true)

  return (
    <>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="name">{`Company/Group name`}</InputLabel>
          <Input
            id="name"
            error={!companieNameValidate}
            type="text"
            value={companie.name}
            onChange={(e) => {
              setCompanie({
                ...companie,
                name: e.target.value,
              })
              setCompanieNameValidate(e.target.value.length ? true : false)
            }}
          />
          {!companieNameValidate && <FormHelperText error>{`Company name cannot be empty`}</FormHelperText>}
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="typeCreation">{`typeCreation`}</InputLabel>
          <Select
            id="typeCreation"
            value={companie.typeCreation}
            onChange={(e: any) =>
              setCompanie({
                ...companie,
                typeCreation: e.target.value,
              })
            }>
            <MenuItem value={'SIGNUP'}>{`SIGNUP`}</MenuItem>
            <MenuItem value={'USER_CREATION'}>{`USER_CREATION`}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="tierRecuringPlatformFees">{`tierRecuringPlatformFees`}</InputLabel>
          <Select
            id="tierRecuringPlatformFees"
            value={companie.tierRecuringPlatformFees}
            onChange={(e: any) =>
              setCompanie({
                ...companie,
                tierRecuringPlatformFees: e.target.value,
              })
            }>
            <MenuItem value={'FREE'}>{`FREE`}</MenuItem>
            <MenuItem value={'TRIAL_1_MONTH'}>{`TRIAL_1_MONTH`}</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="maxTransactionValue">{`maxTransaction per week`}</InputLabel>
          <Input
            id="maxTransactionValue"
            classes={{ input: 'inputNumber' }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            type="number"
            value={companie.maxTransactionValue}
            onChange={(e: any) =>
              setCompanie({
                ...companie,
                maxTransactionValue: Number(e.target.value),
              })
            }
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="limitPerTransactionForCardSource">{`limitPerTransactionForCardSource`}</InputLabel>
          <Input
            id="limitPerTransactionForCardSource"
            classes={{ input: 'inputNumber' }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            type="number"
            value={companie.limitPerTransactionForCardSource}
            onChange={(e: any) =>
              setCompanie({
                ...companie,
                limitPerTransactionForCardSource: Number(e.target.value),
              })
            }
          />
        </FormControl>
      </div>

      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="incomingPaymentFeeTopUp">{`incomingPaymentFeeTopUp`}</InputLabel>
          <Input
            id="incomingPaymentFeeTopUp"
            classes={{ input: 'inputNumber' }}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            type="number"
            value={companie.incomingPaymentFeeTopUp}
            onChange={(e: any) =>
              setCompanie({
                ...companie,
                incomingPaymentFeeTopUp: e.target.value,
              })
            }
          />
        </FormControl>
      </div>

      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="incomingPaymentFeeACHPercentage">{`incomingPaymentFeeACHPercentage`}</InputLabel>
          <Input
            id="incomingPaymentFeeACHPercentage"
            classes={{ input: 'inputNumber' }}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            type="number"
            value={companie.incomingPaymentFeeACHPercentage}
            onChange={(e: any) =>
              setCompanie({
                ...companie,
                incomingPaymentFeeACHPercentage: e.target.value,
              })
            }
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="incomingPaymentFeeCardPercentage">{`incomingPaymentFeeCardPercentage`}</InputLabel>
          <Input
            id="incomingPaymentFeeCardPercentage"
            classes={{ input: 'inputNumber' }}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            type="number"
            value={companie.incomingPaymentFeeCardPercentage}
            onChange={(e: any) =>
              setCompanie({
                ...companie,
                incomingPaymentFeeCardPercentage: e.target.value,
              })
            }
          />
        </FormControl>
      </div>

      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="typeCompanie">{`typeCompanie`}</InputLabel>
          <Select
            id="typeCompanie"
            value={companie.typeCompanie}
            onChange={(e: any) =>
              setCompanie({
                ...companie,
                typeCompanie: e.target.value,
              })
            }>
            <MenuItem value={'BUYER'}>{`BUYER`}</MenuItem>
            <MenuItem value={'SELLER'}>{`SELLER`}</MenuItem>
            <MenuItem value={'AFFILIATE'}>{`AFFILIATE`}</MenuItem>
            <MenuItem value={'NN_ANALYST'}>{`NN_ANALYST`}</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="privateData">{`privateData`}</InputLabel>
          <Input
            id="privateData"
            multiline
            rowsMax="10"
            value={companie.privateData}
            onChange={(e: any) =>
              setCompanie({
                ...companie,
                privateData: e.target.value,
              })
            }
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="privateData">{`website`}</InputLabel>
          <Input
            id="website"
            multiline
            rowsMax="10"
            value={companie.website}
            onChange={(e: any) =>
              setCompanie({
                ...companie,
                website: e.target.value,
              })
            }
          />
        </FormControl>
      </div>

      <div>
        <br /> <br />
        <Divider />
        <br />
        createdAt: <DateComponent date={companie.createdAt} />
        <br />
        <br />
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="dayCreatedAt">{`dayCreatedAt`}</InputLabel>
          <Input
            id="dayCreatedAt"
            classes={{ input: 'inputNumber' }}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            type="number"
            value={companie.dayCreatedAt}
            onChange={(e: any) =>
              setCompanie({
                ...companie,
                dayCreatedAt: e.target.value,
              })
            }
          />
        </FormControl>
      </div>

      <div>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Divider />
            <h4>Payment Sources</h4>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={companie.hideDebitCredit}
                  onChange={(e) =>
                    setCompanie({
                      ...companie,
                      hideDebitCredit: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label={'hideDebitCredit'}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={companie.hideAddBank}
                  onChange={(e) =>
                    setCompanie({
                      ...companie,
                      hideAddBank: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="hideAddBank"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={companie.addStripeBank}
                  onChange={(e) =>
                    setCompanie({
                      ...companie,
                      addStripeBank: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="addStripeBank"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={companie.addPaypal}
                  onChange={(e) =>
                    setCompanie({
                      ...companie,
                      addPaypal: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="addPaypal"
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Divider />
            <h4>Options</h4>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={companie.canCreatePhysicalIssuedCard}
                  onChange={(e) =>
                    setCompanie({
                      ...companie,
                      canCreatePhysicalIssuedCard: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label={'canCreatePhysicalIssuedCard'}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={companie.isPersonal}
                  onChange={(e) =>
                    setCompanie({
                      ...companie,
                      isPersonal: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="isPersonal"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={companie.deletedLogically}
                  onChange={(e) =>
                    setCompanie({
                      ...companie,
                      deletedLogically: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="deletedLogically"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={companie.hideCashOut}
                  onChange={(e) =>
                    setCompanie({
                      ...companie,
                      hideCashOut: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="hideCashOut"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={companie.disableForeignExchangeFee}
                  onChange={(e) =>
                    setCompanie({
                      ...companie,
                      disableForeignExchangeFee: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="disableForeignExchangeFee"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={companie.disableCrossBorderFee}
                  onChange={(e) =>
                    setCompanie({
                      ...companie,
                      disableCrossBorderFee: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="disableCrossBorderFee"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={companie.isOnboardingMembersDone}
                  onChange={(e) =>
                    setCompanie({
                      ...companie,
                      isOnboardingMembersDone: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="isOnboardingMembersDone"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={companie.isOnboardingIssuedCardsDone}
                  onChange={(e) =>
                    setCompanie({
                      ...companie,
                      isOnboardingIssuedCardsDone: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="isOnboardingIssuedCardsDone"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={companie.isOnboardingIssuedCardDone}
                  onChange={(e) =>
                    setCompanie({
                      ...companie,
                      isOnboardingIssuedCardDone: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="isOnboardingIssuedCardDone"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={companie.isOnboardingBalanceDone}
                  onChange={(e) =>
                    setCompanie({
                      ...companie,
                      isOnboardingBalanceDone: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="isOnboardingBalanceDone"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={companie.isOnboardingBillingAddressDone}
                  onChange={(e) =>
                    setCompanie({
                      ...companie,
                      isOnboardingBillingAddressDone: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="isOnboardingBillingAddressDone"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={companie.canManageSellerSubscriptionManagement}
                  onChange={(e) =>
                    setCompanie({
                      ...companie,
                      canManageSellerSubscriptionManagement: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="canManageSellerSubscriptionManagement"
            />
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={12}>
              <Divider />
              <h4>Deprecated</h4>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={companie.isVerified}
                    onChange={(e) =>
                      setCompanie({
                        ...companie,
                        isVerified: e.target.checked,
                      })
                    }
                    value={true}
                  />
                }
                label="isVerified"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={companie.onboardProcessDone}
                    onChange={(e) =>
                      setCompanie({
                        ...companie,
                        onboardProcessDone: e.target.checked,
                      })
                    }
                    value={true}
                  />
                }
                label="onboardProcessDone"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <Divider />
              <h4>PAYG</h4>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div>
                <FormControl className="width100per">
                  <InputLabel htmlFor="statusApplication">{`statusApplication`}</InputLabel>
                  <Select
                    id="statusApplication"
                    value={companie.statusApplication}
                    onChange={(e: any) =>
                      setCompanie({
                        ...companie,
                        statusApplication: e.target.value,
                      })
                    }>
                    <MenuItem value={'SUBMITED'}>{`SUBMITED`}</MenuItem>
                    <MenuItem value={'APPROVED'}>{`APPROVED`}</MenuItem>
                    <MenuItem value={'NOT_APPROVED'}>{`NOT_APPROVED`}</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={companie.isTrustedPayment}
                    onChange={(e) =>
                      setCompanie({
                        ...companie,
                        // isTrusted: e.target.checked ? true : companie.isTrusted,
                        isTrustedPayment: e.target.checked,
                      })
                    }
                    value={true}
                  />
                }
                label={'isTrustedPayment'}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={12}>
            <Divider />
          </Grid>
        </Grid>
      </div>

      <div style={{ height: '20px' }} />

      <div>
        {companie.id && (
          <UpdateCompanieAdmin
            disabled={false}
            showCancelButton={props.showCancelButton}
            textButton={'Update'}
            textCancelButton={'Cancel'}
            onUpdate={() => props.onUpdate()}
            onCancel={() => props.onCancel()}
            companie={companie}
          />
        )}
      </div>
    </>
  )
}

export default CompanieFormAdmin
