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
                checked={userRoleCompanie.sendEmailMyInvoiceSuccessful}
                onChange={(e) =>
                  setUserRoleCompanie({
                    ...userRoleCompanie,
                    sendEmailMyInvoiceSuccessful: e.target.checked,
                    sendEmailInvoiceSuccessful: e.target.checked === false ? false : userRoleCompanie.sendEmailInvoiceSuccessful,
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
                  checked={userRoleCompanie.sendEmailInvoiceSuccessful}
                  disabled={userRoleCompanie.sendEmailMyInvoiceSuccessful === false}
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
