import React from 'react'
import { Paper, Dialog, DialogContent, Button, DialogTitle, Grid, Icon, IconButton, DialogActions } from '@material-ui/core'
import { Contract } from '../Contract.type'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import { Link } from 'react-router-dom'
import SignContractVendor from '../action/SignContractVendor'
import SignContract from '../action/SignContract'
import DeleteContract from '../DeleteContract'
import DateComponent from '../../nav/DateComponent'
import SingleContractDialog from './SingleContractDialog'

type Props = {
  contract: Contract
}

const SingleContract = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  // console.log(props)
  const [show, setShow] = React.useState(false)

  return (
    <>
      <Dialog open={show} maxWidth={'md'} fullWidth={true} onClose={() => setShow(false)}>
        <DialogTitle disableTypography>
          <Grid container>
            <Grid item xs={8} className="tal">
              <h3> {props.contract.title1}</h3>
            </Grid>
            <Grid item xs={4} className="tar">
              <IconButton onClick={() => setShow(false)}>
                <Icon>close</Icon>
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          {props.contract.textContract}

          <SignContractVendor onUpdate={() => {}} contract={props.contract} />
          <SignContract onUpdate={() => {}} contract={props.contract} />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setShow(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <div className="paperOut">
        <Paper className="paperIn">
          <SingleContractDialog contract={props.contract} />

          {props.contract.isSignedVendor && (
            <div>
              Accepted by {props.contract.nameVendor}, {props.contract.titleVendor}, {props.contract.companie.name} on{' '}
              <DateComponent formatString={'MMM dd, yyyy hh:mma (z)'} date={props.contract.dateSignedVendor} />
            </div>
          )}
          {props.contract.isSigned && (
            <div>
              Accepted by {props.contract.name}, {props.contract.title}, NachoNacho on{' '}
              <DateComponent formatString={'MMM dd, yyyy hh:mma (z)'} date={props.contract.dateSigned} />
            </div>
          )}

          {/* {show && <ViewField text={props.contract.keyTerms} />} */}
          {/* <ApproveContract contract={props.contract} /> */}

          {context.me.role === 'ADMIN' && (
            <div className="paperOut">
              <Paper className="paperIn">
                <Link className="link" to={`/admin/editContract/${props.contract.id}`}>
                  Edit Contract
                </Link>
                <DeleteContract contract={props.contract} />
              </Paper>
            </div>
          )}
        </Paper>
      </div>
    </>
  )
}

export default SingleContract
