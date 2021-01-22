import React from 'react'
import { Paper, Grid } from '@material-ui/core/'
import { Contract } from '../Contract.type'
import DeleteContract from '../DeleteContract'
import { Link } from 'react-router-dom'
import DateComponent from '../../nav/DateComponent'
import SingleContractDialog from './SingleContractDialog'
import IsValidated from '../../user/single/profile/sectionDetails/IsValidated'

type Props = {
  contract: Contract
}

const SingleContract = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={7} className="marginAuto">
            <div>
              <SingleContractDialog contract={props.contract} />
            </div>
            <Link className="link" to={`/admin/editContract/${props.contract.id}`}>
              <div>{props.contract.title1 ? props.contract.title1 : 'Contract'}</div>
            </Link>
          </Grid>

          <Grid item xs={12} sm={2} className="marginAuto">
            <Link className="link" to={`/company/${props.contract.companie.id}`}>
              {props.contract.companie.name}
            </Link>
          </Grid>

          <Grid item xs={12} sm={1} className="marginAuto">
            <IsValidated
              iconNotValidated={'clear'}
              icon={'done'}
              isValidated={props.contract.canBePrinted}
              textValidated={'canBePrinted'}
              textNotValidated={'can NOT BePrinted'}
            />
          </Grid>
          <Grid item xs={12} sm={1} className="marginAuto">
            <IsValidated
              iconNotValidated={'clear'}
              icon={'done'}
              isValidated={props.contract.canBeSignedVendor}
              textValidated={'canBeSignedVendor'}
              textNotValidated={'can NOT BeSignedVendor'}
            />
          </Grid>
          <Grid item xs={12} sm={1} className="marginAuto">
            <IsValidated
              iconNotValidated={'clear'}
              icon={'done'}
              isValidated={props.contract.isComplete}
              textValidated={'Complete'}
              textNotValidated={'Not Complete'}
            />
          </Grid>

          <Grid item xs={12} sm={1} className="marginAuto">
            <DeleteContract contract={props.contract} />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} className="marginAuto">
          {props.contract.isSigned && (
            <>
              Accepted by {props.contract.name}, {props.contract.title}, NachoNacho on{' '}
              <DateComponent formatString={'MMM dd, yyyy hh:mma (z)'} date={props.contract.dateSigned} />
            </>
          )}
        </Grid>
        <Grid item xs={12} sm={12} className="marginAuto">
          {props.contract.isSignedVendor && (
            <>
              Accepted by {props.contract.nameVendor}, {props.contract.titleVendor}, {props.contract.companie.name} on{' '}
              <DateComponent formatString={'MMM dd, yyyy hh:mma (z)'} date={props.contract.dateSignedVendor} />
            </>
          )}
        </Grid>
      </Paper>
    </div>
  )
}

export default SingleContract
