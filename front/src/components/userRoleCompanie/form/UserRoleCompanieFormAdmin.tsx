import React from 'react'
import UpdateUserRoleCompanieAdmin from './UpdateUserRoleCompanieAdmin'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { UserRoleCompanie } from '../UserRoleCompanie.type'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

type Props = {
  userRoleCompanie: UserRoleCompanie
  onUpdated: () => void
  onCancel: () => void
}

const UserRoleCompanieFormAdmin = (props: Props) => {
  const [userRoleCompanie, setUserRoleCompanie] = React.useState(props.userRoleCompanie)

  return (
    <>
      <div>
        <FormControl className="">
          <InputLabel htmlFor="type">{`type`}</InputLabel>
          <Select
            id="type"
            value={userRoleCompanie.companieRole}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserRoleCompanie({
                ...userRoleCompanie,
                companieRole: e.target.value as UserRoleCompanie['companieRole'],
              })
            }>
            <MenuItem value={'OWNER'}>{`OWNER`}</MenuItem>
            <MenuItem value={'ADMIN'}>{`ADMIN`}</MenuItem>
            <MenuItem value={'ANALYST'}>{`ANALYST`}</MenuItem>
            <MenuItem value={'PURCHASER'}>{`PURCHASER`}</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControlLabel
          control={
            <Switch
              checked={userRoleCompanie.isInvitationApproved}
              onChange={(e) =>
                setUserRoleCompanie({
                  ...userRoleCompanie,
                  isInvitationApproved: e.target.checked,
                })
              }
              value={true}
            />
          }
          labelPlacement="start"
          label="isInvitationApproved"
        />
      </div>

      <div>
        <FormControlLabel
          control={
            <Switch
              checked={userRoleCompanie.isDeleted}
              onChange={(e) =>
                setUserRoleCompanie({
                  ...userRoleCompanie,
                  isDeleted: e.target.checked,
                })
              }
              value={true}
            />
          }
          labelPlacement="start"
          label="isDeleted"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={userRoleCompanie.sendEmailMyInvoiceSuccessful}
              onChange={(e) =>
                setUserRoleCompanie({
                  ...userRoleCompanie,
                  sendEmailMyInvoiceSuccessful: e.target.checked,
                })
              }
              value={true}
            />
          }
          labelPlacement="start"
          label="EMAIL: Successful My transactions"
        />
      </div>

      <div>
        <FormControlLabel
          control={
            <Switch
              checked={userRoleCompanie.sendEmailInvoiceSuccessful}
              onChange={(e) =>
                setUserRoleCompanie({
                  ...userRoleCompanie,
                  sendEmailInvoiceSuccessful: e.target.checked,
                })
              }
              value={true}
            />
          }
          labelPlacement="start"
          label="EMAIL: Successful transactions"
        />
      </div>

      <div>
        <FormControlLabel
          control={
            <Switch
              checked={userRoleCompanie.sendSlackInvoiceSuccessful}
              onChange={(e) =>
                setUserRoleCompanie({
                  ...userRoleCompanie,
                  sendSlackInvoiceSuccessful: e.target.checked,
                })
              }
              value={true}
            />
          }
          labelPlacement="start"
          label="sendSlackInvoiceSuccessful"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={userRoleCompanie.sendSlackMyInvoiceSuccessful}
              onChange={(e) =>
                setUserRoleCompanie({
                  ...userRoleCompanie,
                  sendSlackMyInvoiceSuccessful: e.target.checked,
                })
              }
              value={true}
            />
          }
          labelPlacement="start"
          label="sendSlackMyInvoiceSuccessful"
        />
      </div>

      <div>
        <FormControlLabel
          control={
            <Switch
              checked={userRoleCompanie.showSetupGuide}
              onChange={(e) =>
                setUserRoleCompanie({
                  ...userRoleCompanie,
                  showSetupGuide: e.target.checked,
                })
              }
              value={true}
            />
          }
          labelPlacement="start"
          label="showSetupGuide"
        />
      </div>

      <div>
        <FormControlLabel
          control={
            <Switch
              checked={userRoleCompanie.showNoDataPageHome}
              onChange={(e) =>
                setUserRoleCompanie({
                  ...userRoleCompanie,
                  showNoDataPageHome: e.target.checked,
                })
              }
              value={true}
            />
          }
          labelPlacement="start"
          label="showNoDataPageHome"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={userRoleCompanie.showNoDataPagePaymentSource}
              onChange={(e) =>
                setUserRoleCompanie({
                  ...userRoleCompanie,
                  showNoDataPagePaymentSource: e.target.checked,
                })
              }
              value={true}
            />
          }
          labelPlacement="start"
          label="showNoDataPagePaymentSource"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={userRoleCompanie.showNoDataPageTeam}
              onChange={(e) =>
                setUserRoleCompanie({
                  ...userRoleCompanie,
                  showNoDataPageTeam: e.target.checked,
                })
              }
              value={true}
            />
          }
          labelPlacement="start"
          label="showNoDataPageTeam"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={userRoleCompanie.showNoDataPageIssuedCard}
              onChange={(e) =>
                setUserRoleCompanie({
                  ...userRoleCompanie,
                  showNoDataPageIssuedCard: e.target.checked,
                })
              }
              value={true}
            />
          }
          labelPlacement="start"
          label="showNoDataPageIssuedCard"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={userRoleCompanie.showNoDataPageSubscription}
              onChange={(e) =>
                setUserRoleCompanie({
                  ...userRoleCompanie,
                  showNoDataPageSubscription: e.target.checked,
                })
              }
              value={true}
            />
          }
          labelPlacement="start"
          label="showNoDataPageSubscription"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={userRoleCompanie.showNoDataPageInvoice}
              onChange={(e) =>
                setUserRoleCompanie({
                  ...userRoleCompanie,
                  showNoDataPageInvoice: e.target.checked,
                })
              }
              value={true}
            />
          }
          labelPlacement="start"
          label="showNoDataPageInvoice"
        />
      </div>

      <div>
        <UpdateUserRoleCompanieAdmin onUpdated={props.onUpdated} onCancel={props.onCancel} userRoleCompanie={userRoleCompanie} />
      </div>
    </>
  )
}

export default UserRoleCompanieFormAdmin
