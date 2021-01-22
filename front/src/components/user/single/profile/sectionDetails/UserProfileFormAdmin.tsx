import React from 'react'
import {
  Button,
  Grid,
  FormControlLabel,
  Switch,
  Input,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Paper,
} from '@material-ui/core'
import { User } from '../../../User.type'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import UpdateUserAdmin from '../../action/UpdateUserAdmin'
import UseWindowDimensions from '../../../../UseWindowDimensions'
import DateFnsUtils from '@date-io/date-fns'

type Props = {
  user: User
  onUpdate: () => void
  onCancel: () => void
}

const UserProfileFormAdmin = (props: Props) => {
  const [user, setUser] = React.useState(props.user)

  const [birthdayErrorMessage, setBirthdayErrorMessage] = React.useState('')
  const [firstNameValide, setFirstNameValide] = React.useState(true)
  const [lastNameValide, setLastNameValide] = React.useState(true)
  const [last4SocialValide, setLast4SocialValide] = React.useState(true)

  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <FormControl className="width100per">
            <InputLabel htmlFor="firstName">{`First name`}</InputLabel>
            <Input
              id="firstName"
              error={!firstNameValide}
              onChange={(e) => {
                setUser({
                  ...user,
                  firstName: e.target.value,
                })
                setFirstNameValide(e.target.value.length > 0 ? true : false)
              }}
              type="text"
              value={user.firstName}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl className="width100per">
            <InputLabel htmlFor="lastName">{`Last name`}</InputLabel>
            <Input
              id="lastName"
              error={!lastNameValide}
              onChange={(e) => {
                setUser({
                  ...user,
                  lastName: e.target.value,
                })
                setLastNameValide(e.target.value.length > 0 ? true : false)
              }}
              type="text"
              value={user.lastName}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl className="width100per">
            <InputLabel htmlFor="email">{`email`}</InputLabel>
            <Input
              id="email"
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              type="text"
              value={user.email}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl className="width100per">
            <InputLabel htmlFor="hubspotId">{`hubspotId`}</InputLabel>
            <Input
              id="hubspotId"
              onChange={(e) =>
                setUser({
                  ...user,
                  hubspotId: e.target.value,
                })
              }
              type="text"
              value={user.hubspotId}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl className="width100per">
            <InputLabel htmlFor="loginAttempts">{`loginAttempts`}</InputLabel>
            <Input
              id="loginAttempts"
              onChange={(e) =>
                setUser({
                  ...user,
                  loginAttempts: Number(e.target.value),
                })
              }
              type="number"
              value={user.loginAttempts}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              className="width100per"
              id={'birthday'}
              openTo="year"
              format="MM/dd/yyyy"
              label={isMobile ? 'DOB (mm/dd/yyyy)' : 'Date of birth (mm/dd/yyyy)'}
              onError={(birthdayErrorMessageNew: string) => {
                if (birthdayErrorMessage !== birthdayErrorMessageNew) {
                  setBirthdayErrorMessage(birthdayErrorMessageNew)
                }
              }}
              value={user.birthday}
              onChange={(birthday: Date) =>
                setUser({
                  ...user,
                  birthday,
                })
              }
            />
          </MuiPickersUtilsProvider>
          <p>{birthdayErrorMessage}</p>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button
            onClick={() =>
              setUser({
                ...user,
                birthday: null,
              })
            }>
            Set to Null
          </Button>
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl className="width100per">
            <InputLabel htmlFor="last4Social">{`Last 4 digits of social security no.`}</InputLabel>
            <Input
              id="last4Social"
              error={!last4SocialValide}
              onChange={(e) => {
                if (e.target.value.length < 10000) {
                  setUser({
                    ...user,
                    last4Social: e.target.value,
                  })

                  setLast4SocialValide(Number(e.target.value) > 999)
                }
              }}
              type="text"
              value={user.last4Social}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl className={'width100per'}>
            <InputLabel htmlFor="role">{`Role (admin)`}</InputLabel>
            <Select
              className="tal"
              onChange={(e: any) =>
                setUser({
                  ...user,
                  role: e.target.value,
                })
              }
              value={user.role}>
              <MenuItem value="CUSTOMER">{`CUSTOMER`}</MenuItem>
              <MenuItem value="SELLER">{`SELLER`}</MenuItem>
              <MenuItem value="INFLUENCER">{`INFLUENCER`}</MenuItem>
              <MenuItem value="ADMIN">{`ADMIN`}</MenuItem>
              {/* <MenuItem value="ANALYST">{`ANALYST`}</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl className={'width100per'}>
            <InputLabel htmlFor="signupType">{`signupType`}</InputLabel>
            <Select
              className="tal"
              onChange={(e: any) =>
                setUser({
                  ...user,
                  signupType: e.target.value,
                })
              }
              value={user.signupType}>
              <MenuItem value="MEMBER_INVITATION">{`MEMBER_INVITATION`}</MenuItem>
              <MenuItem value="FORM">{`FORM`}</MenuItem>
              <MenuItem value="ADMINFORM">{`ADMINFORM`}</MenuItem>
              <MenuItem value="ADMINFORMSELLER">{`ADMINFORMSELLER`}</MenuItem>
              <MenuItem value="USERFORM">{`USERFORM`}</MenuItem>
              <MenuItem value="AFFILIATEFORM">{`AFFILIATEFORM`}</MenuItem>
              <MenuItem value="USER_FORM_SELLER">{`USER_FORM_SELLER`}</MenuItem>
              <MenuItem value="SELLERFORM">{`SELLERFORM`}</MenuItem>
              <MenuItem value="FORM_SLACK">{`FORM_SLACK`}</MenuItem>
              <MenuItem value="FORM_LINK_INVITATION">{`SELLERFORM`}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl className="width100per">
            <InputLabel htmlFor="privateData">{`privateData`}</InputLabel>
            <Input
              id="privateData"
              value={user.privateData}
              onChange={(e: any) =>
                setUser({
                  ...user,
                  privateData: e.target.value,
                })
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControlLabel
            control={
              <Switch
                checked={user.isPhoneValidated}
                onChange={(e) =>
                  setUser({
                    ...user,
                    isPhoneValidated: e.target.checked,
                  })
                }
                value={true}
              />
            }
            label="isPhoneValidated"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControlLabel
            control={
              <Switch
                checked={user.isPhoneValidationRequired}
                onChange={(e) =>
                  setUser({
                    ...user,
                    isPhoneValidationRequired: e.target.checked,
                  })
                }
                value={true}
              />
            }
            label="isPhoneValidationRequired"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControlLabel
            control={
              <Switch
                checked={user.isPhoneValidationRequireOverride}
                onChange={(e) =>
                  setUser({
                    ...user,
                    isPhoneValidationRequireOverride: e.target.checked,
                  })
                }
                value={true}
              />
            }
            label="isPhoneValidationRequireOverride"
          />
        </Grid>
        <div>
          isPhoneValidationRequireOverride = true means that the flag `isPhoneValidationRequired` will change from false to true
          during the night.
        </div>
        <Grid item xs={12} sm={12}>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={user.isEmailValidated}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      isEmailValidated: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="isEmailValidated"
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={12}>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={user.enabled2FA}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      enabled2FA: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="enabled2FA (admin)"
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={12}>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={user.showInviteBuyer}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      showInviteBuyer: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="showInviteBuyer"
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={12}>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={user.showInviteSeller}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      showInviteSeller: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="showInviteSeller"
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={12}>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={user.welcomePersonalizedSent}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      welcomePersonalizedSent: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="welcomePersonalizedSent"
            />
          </div>
        </Grid>
      </Grid>

      <div className="paperOut">
        <Paper className="paperIn">
          <h3>Tooltip</h3>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={user.inviteMembersTooltip}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          inviteMembersTooltip: e.target.checked,
                        })
                      }
                      value={true}
                    />
                  }
                  label="inviteMembersTooltip"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={user.createIssuedCardsTooltip}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          createIssuedCardsTooltip: e.target.checked,
                        })
                      }
                      value={true}
                    />
                  }
                  label="createIssuedCardsTooltip"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={user.switchAccountsTooltip}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          switchAccountsTooltip: e.target.checked,
                        })
                      }
                      value={true}
                    />
                  }
                  label="switchAccountsTooltip"
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={user.createIssuedCardTooltip}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          createIssuedCardTooltip: e.target.checked,
                        })
                      }
                      value={true}
                    />
                  }
                  label="createIssuedCardTooltip"
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={user.actionIssuedCardTooltip}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          actionIssuedCardTooltip: e.target.checked,
                        })
                      }
                      value={true}
                    />
                  }
                  label="actionIssuedCardTooltip"
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={user.spendingLimitIssuedCardTooltip}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          spendingLimitIssuedCardTooltip: e.target.checked,
                        })
                      }
                      value={true}
                    />
                  }
                  label="spendingLimitIssuedCardTooltip"
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={user.expiryDateIssuedCardTooltip}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          expiryDateIssuedCardTooltip: e.target.checked,
                        })
                      }
                      value={true}
                    />
                  }
                  label="expiryDateIssuedCardTooltip"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={user.copyClipboardIssuedCardTooltip}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          copyClipboardIssuedCardTooltip: e.target.checked,
                        })
                      }
                      value={true}
                    />
                  }
                  label="copyClipboardIssuedCardTooltip"
                />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>User Verification</h3>
          <div>
            <FormControl className="width100per">
              <InputLabel htmlFor="verificationStatus">{`verificationStatus`}</InputLabel>
              <Select
                id="verificationStatus"
                value={user.verificationStatus}
                onChange={(e: any) =>
                  setUser({
                    ...user,
                    verificationStatus: e.target.value,
                  })
                }>
                <MenuItem value={'REQUIRED'}>{`REQUIRED`}</MenuItem>
                <MenuItem value={'SUBMITED'}>{`SUBMITED`}</MenuItem>
                <MenuItem value={'APPROVED'}>{`APPROVED`}</MenuItem>
                <MenuItem value={'NOT_REQUIRED'}>{`NOT_REQUIRED`}</MenuItem>
                <MenuItem value={'NOT_APPROVED'}>{`NOT_APPROVED`}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={user.verificationStatusOffSite}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      verificationStatusOffSite: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="verificationStatusOffSite"
            />
          </div>
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>Unsubscribe</h3>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={user.unsubscribe}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      unsubscribe: e.target.checked,
                    })
                  }
                  value={true}
                />
              }
              label="unsubscribe"
            />
          </div>

          <FormControl className={'width100per'}>
            <InputLabel htmlFor="typeUnsubscribe">{`typeUnsubscribe`}</InputLabel>
            <Select
              className="tal"
              onChange={(e: any) =>
                setUser({
                  ...user,
                  typeUnsubscribe: e.target.value,
                })
              }
              value={user.typeUnsubscribe}>
              <MenuItem value="NONE">{`NONE`}</MenuItem>
              <MenuItem value="BY_USER_CLICK_UNSUBSCRIBE_EMAIL">{`BY_USER_CLICK_UNSUBSCRIBE_EMAIL`}</MenuItem>
              <MenuItem value="BY_ADMIN">{`BY_ADMIN`}</MenuItem>
              <MenuItem value="BY_HUBSPOT">{`BY_HUBSPOT`}</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </div>

      <Grid item xs={12} sm={12}>
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={user.isSuspended}
                onChange={(e) =>
                  setUser({
                    ...user,
                    isSuspended: e.target.checked,
                  })
                }
                value={true}
              />
            }
            label="isSuspended"
          />
        </div>
      </Grid>

      <Grid item xs={12} sm={12}>
        <br />
      </Grid>
      <Grid item xs={12} sm={12}>
        <div className="">
          <Button onClick={() => props.onCancel()}>{'Cancel'}</Button>{' '}
          <UpdateUserAdmin disabled={false} user={user} updateTextButton={'Save'} changeEditMode={() => props.onUpdate()} />
        </div>
      </Grid>
    </>
  )
}

export default UserProfileFormAdmin
