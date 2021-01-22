import React from 'react'
// import Grid from '@material-ui/core/Grid'
// import Icon from '@material-ui/core/Icon'
import { Companie } from '../../../companie/Companie.type'
import UseWindowDimensions from '../../../UseWindowDimensions'
// import { Link } from 'react-router-dom'
// import DateComponent from '../../../nav/DateComponent'
// import ApproveCompanieOwnerOfCompanieVerification from './ApproveCompanieOwnerOfCompanieVerification'

type Props = {
  companie: Companie
}

const OwnerOfCompanieVerificationStatusCompanieView = (props: Props) => {
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <div>
      <h3>ownerOfCompanieVerificationStatus</h3>
      {/* <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`ownerOfCompanieVerificationStatus:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          {props.companie.ownerOfCompanieVerificationStatus}
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`dateSubmissionOwnerOfCompanieVerification:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.companie.dateSubmissionOwnerOfCompanieVerification && (
            <DateComponent  date={props.companie.dateSubmissionOwnerOfCompanieVerification} />
          )}
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`ownerOfCompanieVerificationUser:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.companie.ownerOfCompanieVerificationUser && (
            <Link className="link" to={'/settings/' + props.companie.ownerOfCompanieVerificationUser.id}>
              {props.companie.ownerOfCompanieVerificationUser.firstName} {props.companie.ownerOfCompanieVerificationUser.lastName}
            </Link>
          )}
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`Files:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.companie.ownerOfCompanieVerificationUser && (
            <Link
              className="link"
              to={`/files?companieId=${props.companie.id}&userId=${props.companie.ownerOfCompanieVerificationUser.id}`}>
              Files
            </Link>
          )}
        </Grid>
      </Grid> */}

      {/* <ApproveCompanieOwnerOfCompanieVerification companieId={props.companie.id} /> */}
    </div>
  )
}

export default OwnerOfCompanieVerificationStatusCompanieView
