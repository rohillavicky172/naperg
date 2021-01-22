import React from 'react'
import UserRoleCompanieUpdate from './UserRoleCompanieUpdate'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { UserRoleCompanie } from '../UserRoleCompanie.type'

type Props = {
  userRoleCompanie: UserRoleCompanie
  onUpdated: () => void
  onCancel: () => void
}

const UserRoleCompanieFormEmail = (props: Props) => {
  const [userRoleCompanie, setUserRoleCompanie] = React.useState(props.userRoleCompanie)

  return (
    <>
      {(userRoleCompanie.companieRole === 'ADMIN' ||
        userRoleCompanie.companieRole === 'OWNER' ||
        userRoleCompanie.companieRole === 'PURCHASER') && (
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={userRoleCompanie.sendSlackMyInvoiceSuccessful}
                onChange={(e) =>
                  setUserRoleCompanie({
                    ...userRoleCompanie,
                    sendSlackMyInvoiceSuccessful: e.target.checked,
                    sendSlackInvoiceSuccessful: e.target.checked === false ? false : userRoleCompanie.sendSlackInvoiceSuccessful,
                  })
                }
                value={true}
              />
            }
            labelPlacement="start"
            label="All my transactions"
          />
        </div>
      )}

      {userRoleCompanie.companie.isPersonal === false &&
        (userRoleCompanie.companieRole === 'ADMIN' ||
          userRoleCompanie.companieRole === 'OWNER' ||
          userRoleCompanie.companieRole === 'ANALYST') && (
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={userRoleCompanie.sendSlackInvoiceSuccessful}
                  disabled={userRoleCompanie.sendSlackMyInvoiceSuccessful === false}
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
              label={`All transactions of ${userRoleCompanie.companie.name}`}
            />
          </div>
        )}
      <div>
        <FormControlLabel
          labelPlacement="start"
          control={<Switch checked={true} disabled={true} value={true} />}
          label="All transactions with error"
        />
      </div>

      <div>
        <UserRoleCompanieUpdate onUpdated={props.onUpdated} onCancel={props.onCancel} userRoleCompanie={userRoleCompanie} />
      </div>
    </>
  )
}

export default UserRoleCompanieFormEmail
