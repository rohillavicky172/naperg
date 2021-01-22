import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { User } from '../../../User.type'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import UpdateUser from '../../action/UpdateUser'
import UseWindowDimensions from '../../../../UseWindowDimensions'

type Props = {
  showCancelButton: boolean
  updateTextButton: string
  cancelTextButton: string
  user: User
  onUpdate: () => void
  onCancel: () => void
}

const UserProfileForm = (props: Props) => {
  const [user, setUser] = React.useState(props.user)
  const [birthdayErrorMessage, setBirthdayErrorMessage] = React.useState('')
  const [firstNameValide, setFirstNameValide] = React.useState(true)
  const [lastNameValide, setLastNameValide] = React.useState(true)
  const [last4SocialValide, setLast4SocialValide] = React.useState(true)

  const isFormValide = () => {
    return (
      !birthdayErrorMessage.length &&
      user.firstName.length &&
      firstNameValide &&
      user.lastName.length &&
      lastNameValide &&
      last4SocialValide
    )
  }

  const isMobile = UseWindowDimensions.isMobile()
  return (
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
      </Grid>

      <Grid item xs={12} sm={12}>
        <FormControl className="width100per">
          <InputLabel htmlFor="last4Social">{`Social security no.`}</InputLabel>
          <Input
            id="last4Social"
            error={!last4SocialValide}
            onChange={(e) => {
              if (e.target.value.length < 10000) {
                setUser({
                  ...user,
                  last4Social: e.target.value,
                })
                setLast4SocialValide(e.target.value.toString().length === 4 || e.target.value === '')
              }
            }}
            type="text"
            value={user.last4Social}
          />
          <FormHelperText id="my-helper-text">{`Last 4 digits of social security no:`}</FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={12}>
        <br />
      </Grid>
      <Grid item xs={12} sm={12}>
        <div className="">
          {props.showCancelButton && <Button onClick={() => props.onCancel()}>{props.cancelTextButton}</Button>}{' '}
          <UpdateUser
            disabled={!isFormValide()}
            user={user}
            updateTextButton={props.updateTextButton}
            onUpdate={() => props.onUpdate()}
          />
        </div>
      </Grid>
    </Grid>
  )
}

export default UserProfileForm
