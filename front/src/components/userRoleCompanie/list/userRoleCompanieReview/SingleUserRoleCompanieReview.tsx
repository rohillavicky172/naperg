import React from 'react'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import { UserRoleCompanie } from '../../UserRoleCompanie.type'
import SetIsSelectedForReview from './SetIsSelectedForReview'
import IsValidated from '../../../user/single/profile/sectionDetails/IsValidated'

type Props = {
  userRoleCompanie: UserRoleCompanie
}

const SingleUserRoleCompanieAdmin = (props: Props) => {
  // const [edit, setEdit] = useState(false)
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={6} className="">
            <div style={{ height: '37px' }}>
              <IsValidated
                iconNotValidated={'clear'}
                icon={'done'}
                isValidated={props.userRoleCompanie.isSelectedForReview}
                textValidated={'Email Validated'}
                textNotValidated={'Email not Validated'}
              />{' '}
              {props.userRoleCompanie.companie.name}
            </div>
            {/* <div>isSelectedForReview: {props.userRoleCompanie.isSelectedForReview ? 'True' : 'False'}</div> */}
          </Grid>
          <Grid item xs={12} sm={6} className="">
            {!props.userRoleCompanie.isSelectedForReview && <SetIsSelectedForReview userRoleCompanie={props.userRoleCompanie} />}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default SingleUserRoleCompanieAdmin
