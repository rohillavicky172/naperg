import React from 'react'
import { Dialog, DialogContent, Button, DialogTitle, Grid, Icon, IconButton, DialogActions } from '@material-ui/core'
import { Contract } from '../Contract.type'
import SignContractVendor from '../action/SignContractVendor'
import SignContract from '../action/SignContract'
import FilesQuery from '../../file/list/FilesQuery'

type Props = {
  contract: Contract
}

const SingleContractDialog = (props: Props) => {
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
          <div style={{ whiteSpace: 'pre-line' }}>{props.contract.textContract}</div>

          <FilesQuery
            canDelete={false}
            showDownload={true}
            variables={{
              where: {
                companie: { id: props.contract.companie.id },
                contract: { id: props.contract.id },
              },
            }}
          />
          <SignContractVendor onUpdate={() => {}} contract={props.contract} />
          <br />
          <div id="sign" />
          <SignContract onUpdate={() => {}} contract={props.contract} />
        </DialogContent>

        <DialogActions>
          {!props.contract.isSignedVendor && props.contract.canBeSignedVendor && (
            <a href="#sign">
              <Button color="primary" className="no-print">
                Go to signature section
              </Button>
            </a>
          )}
          {props.contract.canBePrinted && (
            <Button onClick={() => window.print()} color="primary" className="no-print">
              Print
            </Button>
          )}
          <Button onClick={() => setShow(false)} color="primary" className="no-print">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <h4 className="cursor" onClick={() => setShow(!show)}>
        {props.contract.title2} <Icon className="iconAlignTextBottom textSize11">launch</Icon>
      </h4>
    </>
  )
}

export default SingleContractDialog
