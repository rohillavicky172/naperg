import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { User } from '../../../User.type'
import { AppContext } from '../../../../AppContext'
import { Context } from '../../../../Context.type'
import UpdateUser from '../../action/UpdateUser'

type Props = {
  user: User
}

const UserProfileNameForm = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const [user, setUser] = React.useState(props.user)
  const [firstNameValide, setFirstNameValide] = React.useState(true)
  const [lastNameValide, setLastNameValide] = React.useState(true)
  const isFormValide = () => {
    return user.firstName.length && firstNameValide && user.lastName.length && lastNameValide
  }

  return (
    <div className="responsiveMargin2">
      <div className="paperOut">
        <Paper className="paperIn">
          <>
            <Grid container>
              <Grid item xs={12} className="tar">
                <IconButton onClick={() => context.logout()}>
                  <Icon>clear</Icon>
                </IconButton>
              </Grid>
            </Grid>

            <div className="tac margin6">
              <Link to={'/'}>
                <img alt="logo" className="logoNachoNacho" src="/logo/NachoNachoLogo.png" />
              </Link>
            </div>
            <div className="tac responsiveMargin2">
              <div className="">
                <h3>Your legal name (for credit card issuance)</h3>
              </div>

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
                    <br />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <div className="">
                      <UpdateUser disabled={!isFormValide()} user={user} updateTextButton={'Save'} onUpdate={() => {}} />
                    </div>
                  </Grid>
                </Grid>
              </>
            </div>
          </>
        </Paper>
      </div>
    </div>
  )
}

export default UserProfileNameForm
