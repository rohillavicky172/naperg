import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { UserRoleCompanie } from '../UserRoleCompanie.type'
import UserRoleCompanieFormSlack from '../form/UserRoleCompanieFormSlack'
import UseWindowDimensions from '../../UseWindowDimensions'

type Props = {
  userRoleCompanie: UserRoleCompanie
}

const SingleUserRoleCompanieSlackNotification = (props: Props) => {
  // const isEditMode = false
  const [isEditMode, setIsEditMode] = React.useState(false)
  // render() {
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <h3>
          Slack notifications for {props.userRoleCompanie.user.firstName} {props.userRoleCompanie.user.lastName} (
          {props.userRoleCompanie.companie.name})
        </h3>
        {/* <p>{`Emails related to your transactions in NachoNacho.`}</p> */}

        <Grid container>
          {!isEditMode && (
            <Grid item xs={12} sm={12} className="tar">
              <Button variant={'outlined'} color={'primary'} onClick={() => setIsEditMode(true)}>
                Edit
              </Button>
            </Grid>
          )}
          {isEditMode ? (
            <Grid item xs={12} sm={12} className="">
              <UserRoleCompanieFormSlack
                onUpdated={() => setIsEditMode(false)}
                onCancel={() => setIsEditMode(false)}
                userRoleCompanie={props.userRoleCompanie}
              />
            </Grid>
          ) : (
            <>
              {(props.userRoleCompanie.companieRole === 'ADMIN' ||
                props.userRoleCompanie.companieRole === 'OWNER' ||
                props.userRoleCompanie.companieRole === 'PURCHASER') && (
                <Grid container alignItems="flex-end">
                  <Grid item xs={12} md={4} className="bold">
                    {`All my transactions:`}
                  </Grid>

                  <Grid item xs={12} md={8}>
                    {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                    {props.userRoleCompanie.sendSlackMyInvoiceSuccessful ? 'Yes' : 'No'}
                  </Grid>
                </Grid>
              )}
              {props.userRoleCompanie.companie.isPersonal === false &&
                (props.userRoleCompanie.companieRole === 'ADMIN' ||
                  props.userRoleCompanie.companieRole === 'OWNER' ||
                  props.userRoleCompanie.companieRole === 'ANALYST') && (
                  <Grid container alignItems="flex-end">
                    <Grid item xs={12} md={4} className="bold">
                      {`All transactions of ${props.userRoleCompanie.companie.name}:`}
                    </Grid>

                    <Grid item xs={12} md={8}>
                      {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                      {props.userRoleCompanie.sendSlackInvoiceSuccessful ? 'Yes' : 'No'}
                    </Grid>
                  </Grid>
                )}
              <Grid container alignItems="flex-end">
                <Grid item xs={12} md={4} className="bold">
                  {`All transactions with error:`}
                </Grid>

                <Grid item xs={12} md={8}>
                  {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                  {`Yes`}
                </Grid>
              </Grid>
              <br />
              You can manage notifications for individual NachoCards on the respective NachoCard pages.
            </>
          )}
        </Grid>
      </Paper>
    </div>
  )
}

export default SingleUserRoleCompanieSlackNotification
