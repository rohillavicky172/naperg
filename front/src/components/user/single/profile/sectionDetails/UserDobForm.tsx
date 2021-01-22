import React from 'react'
import { User } from '../../../User.type'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import UpdateUser from '../../action/UpdateUser'
import UseWindowDimensions from '../../../../UseWindowDimensions'

type Props = {
  user: User
}

const UserDobForm = (props: Props) => {
  const [user, setUser] = React.useState(props.user)
  const [birthdayErrorMessage, setBirthdayErrorMessage] = React.useState('')

  const isFormValide = () => {
    return !birthdayErrorMessage.length
  }

  const isMobile = UseWindowDimensions.isMobile()
  return (
    <div className="responsiveMargin2">
      <h2>Add your Date of Birth</h2>
      <p>
        Add your date of birth. NachoNacho has a regulatory requirement to conduct ongoing monitoring and due diligence of users
        on our platform.
      </p>
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            openTo="year"
            className="width100per"
            id={'birthday'}
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
      </div>

      <br />

      <div>
        <div className="">
          <UpdateUser disabled={!isFormValide()} user={user} updateTextButton={'Save'} onUpdate={() => {}} />
        </div>
      </div>
    </div>
  )
}

export default UserDobForm
