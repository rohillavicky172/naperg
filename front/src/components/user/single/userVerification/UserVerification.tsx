import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { User } from '../../User.type'
import SubmitUserVerification from './SubmitUserVerification'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import ManageFile from '../../../file/ManageFile'
import UseWindowDimensions from '../../../UseWindowDimensions'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
// import { useHistory } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import IconButton from '@material-ui/core/IconButton'
// import Icon from '@material-ui/core/Icon'

type Props = {
  user: User
}

const UserVerification = (props: Props) => {
  // const history = useHistory()
  const [birthdayErrorMessage, setBirthdayErrorMessage] = React.useState('')

  const isMobile = UseWindowDimensions.isMobile()
  const { context }: { context: Context } = React.useContext(AppContext)
  const [user, setUser] = React.useState(props.user)
  const [firstNameValide, setFirstNameValide] = React.useState(true)
  const [lastNameValide, setLastNameValide] = React.useState(true)
  const [fileValide, setFileValide] = React.useState(false)
  const isFormValide = () => {
    return user.firstName.length && firstNameValide && user.lastName.length && lastNameValide && fileValide && user.birthday
  }

  return (
    <>
      <div className="tac">
        <p className="tal">
          We need to confirm the following information about you before you can proceed. This is a regulatory requirement for
          NachoNacho. Your name needs to be your full legal name.
        </p>
        {/* <div style={{ height: '10px' }} /> */}

        {/* <p>Full legal name</p> */}
        <>
          <Grid container>
            <Grid item xs={12} sm={8}>
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
            <Grid item xs={12} sm={8}>
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

            <Grid item xs={12} sm={8}>
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
            <div style={{ height: '20px' }} />
            <p className="tal">
              Please upload a govt. issued photo-ID (passport, drivers license, etc.) that shows your date of birth. If your ID
              has two sides, upload images of both sides. (PDF, JPG or PNG)
            </p>
            <Grid item xs={12} sm={12}>
              <div className="paperOut">
                <Paper className="paperIn">
                  <ManageFile
                    userId={user.id}
                    showDownload={false}
                    onCreate={() => setFileValide(true)}
                    typeFile={'IDENTITY_DOCUMENT'}
                  />
                </Paper>
              </div>
            </Grid>

            <Grid item xs={12} sm={12}>
              <div className="">
                <SubmitUserVerification disabled={!isFormValide()} user={user} updateTextButton={'Submit'} />
              </div>
            </Grid>
            {context.me.role === 'ADMIN' && (
              <Grid item xs={12} sm={12}>
                <div className="">
                  <SubmitUserVerification disabled={false} user={user} updateTextButton={'Submit (Admin)'} />
                </div>
              </Grid>
            )}
          </Grid>
        </>
      </div>
    </>
  )
}

export default UserVerification
