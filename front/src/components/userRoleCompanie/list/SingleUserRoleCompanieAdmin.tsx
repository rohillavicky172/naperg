import React, { useState } from 'react'
import DateComponent from '../../nav/DateComponent'
import IsValidated from '../../user/single/profile/sectionDetails/IsValidated'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import utils from '../../utils'
import { UserRoleCompanie } from '../UserRoleCompanie.type'
import UserRoleCompanieFormAdmin from '../form/UserRoleCompanieFormAdmin'
import SpoofUser from '../../user/single/action/spoofUser/SpoofUser'
import DeleteUserRoleCompanieAdmin from '../DeleteUserRoleCompanieAdmin'
import SuspendIssuedCards from '../../issuedCard/action/SuspendIssuedCards'

type Props = {
  userRoleCompanie: UserRoleCompanie
}

const SingleUserRoleCompanieAdmin = (props: Props) => {
  const [edit, setEdit] = useState(false)
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={4} className="">
            <SpoofUser user={props.userRoleCompanie.user} />
            <Link className="link" to={'/user/' + props.userRoleCompanie.user.id}>
              {utils.getNameOrEmail(props.userRoleCompanie.user, 'both')}
            </Link>
            <IsValidated
              iconNotValidated={'clear'}
              icon={'done'}
              isValidated={props.userRoleCompanie.user.isEmailValidated}
              textValidated={'Email Validated'}
              textNotValidated={'Email not Validated'}
            />
            <IsValidated
              iconNotValidated={'clear'}
              icon={'done'}
              isValidated={props.userRoleCompanie.user.isPhoneValidated}
              textValidated={'Phone Validated'}
              textNotValidated={'Phone not Validated'}
            />
          </Grid>
          <Grid item xs={12} sm={4} className="">
            {props.userRoleCompanie.companie.typeCompanie} {props.userRoleCompanie.companieRole}
            <IsValidated
              icon={'done'}
              iconNotValidated={'clear'}
              isValidated={props.userRoleCompanie.isInvitationApproved}
              textValidated={'Invitation accepted'}
              textNotValidated={'Invitation not accepted'}
            />
            <IsValidated
              icon={'done'}
              iconNotValidated={'clear'}
              isValidated={props.userRoleCompanie.isDeleted}
              textValidated={'isDeleted'}
              textNotValidated={'is NOT Deleted'}
            />
          </Grid>

          <Grid item xs={12} sm={4} className="">
            <Link className="link" to={'/company/' + props.userRoleCompanie.companie.id}>
              {props.userRoleCompanie.companie.name}
            </Link>

            <IsValidated
              iconNotValidated={'clear'}
              icon={'done'}
              isValidated={props.userRoleCompanie.companie.isVerified}
              textValidated={'Companie Verified'}
              textNotValidated={'Companie not Verified'}
            />

            <IsValidated
              iconNotValidated={'clear'}
              icon={'done'}
              isValidated={props.userRoleCompanie.companie.isPersonal}
              textValidated={'isPersonal'}
              textNotValidated={'Not Personal'}
            />
          </Grid>

          <Grid item xs={12} sm={4} className="">
            Created: <DateComponent date={props.userRoleCompanie.createdAt} />
          </Grid>
          <Grid item xs={12} sm={4} className="">
            EMAIL:
            <IsValidated
              iconNotValidated={'clear'}
              icon={'done'}
              isValidated={props.userRoleCompanie.sendEmailMyInvoiceSuccessful}
              textValidated={'sendEmailMyInvoiceSuccessful'}
              textNotValidated={'NOT sendEmailMyInvoiceSuccessful'}
            />
            <IsValidated
              iconNotValidated={'clear'}
              icon={'done'}
              isValidated={props.userRoleCompanie.sendEmailInvoiceSuccessful}
              textValidated={'sendEmailInvoiceSuccessful'}
              textNotValidated={'NOT sendEmailInvoiceSuccessful'}
            />
          </Grid>

          <Grid item xs={12} sm={4} className="">
            SLACK:
            <IsValidated
              iconNotValidated={'clear'}
              icon={'done'}
              isValidated={props.userRoleCompanie.sendSlackInvoiceSuccessful}
              textValidated={'sendSlackInvoiceSuccessful'}
              textNotValidated={'NOT sendSlackInvoiceSuccessful'}
            />
            <IsValidated
              iconNotValidated={'clear'}
              icon={'done'}
              isValidated={props.userRoleCompanie.sendSlackMyInvoiceSuccessful}
              textValidated={'sendSlackMyInvoiceSuccessful'}
              textNotValidated={'NOT sendSlackMyInvoiceSuccessful'}
            />
          </Grid>
          <Grid item xs={12} sm={4} className="">
            showSetupGuide:{' '}
            <IsValidated
              iconNotValidated={'clear'}
              icon={'done'}
              isValidated={props.userRoleCompanie.showSetupGuide}
              textValidated={'showSetupGuide'}
              textNotValidated={'NOT showSetupGuide'}
            />
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <Link className="link" to={'/?companyContext=' + props.userRoleCompanie.companie.id}>
              <Button variant="outlined" color="primary">
                Select Company
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <DeleteUserRoleCompanieAdmin userRoleCompanie={props.userRoleCompanie} />
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <SuspendIssuedCards userRoleCompanieId={props.userRoleCompanie.id} />
          </Grid>

          <Grid item xs={12} sm={12} className="">
            <div className="paperOut">
              <Paper className="paperIn">
                {edit ? (
                  <UserRoleCompanieFormAdmin
                    onUpdated={() => setEdit(false)}
                    onCancel={() => setEdit(false)}
                    userRoleCompanie={props.userRoleCompanie}
                  />
                ) : (
                  <Button onClick={() => setEdit(true)}>Edit</Button>
                )}
              </Paper>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default SingleUserRoleCompanieAdmin
