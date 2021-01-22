import React from 'react'
import UseWindowDimensions from '../../UseWindowDimensions'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'

const WireFunds = () => {
  const isMobile = UseWindowDimensions.isMobile()
  const [show, setShow] = React.useState(false)

  return (
    <>
      <Dialog open={show} maxWidth={'md'} fullWidth={true} onClose={() => setShow(false)}>
        <DialogTitle disableTypography>
          <h2>Wire funds</h2>
        </DialogTitle>
        <DialogContent>
          <>
            <p>
              Incoming wires are charged a $15 wire processing fee. The wire processing fee is waived for amounts of $5,000 and
              above.
            </p>
            <div style={{ height: '15px' }} />
            <h4>International (non-US) wiring instructions:</h4>
            <Grid container>
              <Grid item xs={12} md={3} className="">
                {`Bank name:`}
              </Grid>
              <Grid item xs={12} md={9}>
                {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                {`JPMorgan Chase Bank`}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={3} className="">
                {`Bank Branch address:`}
              </Grid>
              <Grid item xs={12} md={9}>
                {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                {`383 Madison Avenue, New York, NY 10017, USA`}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={3} className="">
                {`Account holder:`}
              </Grid>
              <Grid item xs={12} md={9}>
                {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                {`NachoNacho Inc.`}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={3} className="">
                {`Account number:`}
              </Grid>
              <Grid item xs={12} md={9}>
                {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                {`350236029`}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={3} className="">
                {`SWIFT Code:`}
              </Grid>
              <Grid item xs={12} md={9}>
                {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                {`CHASUS33`}
              </Grid>
            </Grid>
            <div style={{ height: '15px' }} />
            <h4>Domestic (US) wiring instructions:</h4>
            <Grid container>
              <Grid item xs={12} md={3} className="">
                {`Bank name:`}
              </Grid>
              <Grid item xs={12} md={9}>
                {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                {`JPMorgan Chase Bank`}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={3} className="">
                {`Bank Branch address:`}
              </Grid>
              <Grid item xs={12} md={9}>
                {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                {`383 Madison Avenue, New York, NY 10017, USA`}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={3} className="">
                {`Account holder:`}
              </Grid>
              <Grid item xs={12} md={9}>
                {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                {`NachoNacho Inc.`}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={3} className="">
                {`Account number:`}
              </Grid>
              <Grid item xs={12} md={9}>
                {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                {`350236029`}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={3} className="">
                {`Routing number:`}
              </Grid>
              <Grid item xs={12} md={9}>
                {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                {`021000021`}
              </Grid>
            </Grid>{' '}
          </>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="outlined" onClick={() => setShow(false)}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Button color="primary" variant="outlined" onClick={() => setShow(!show)}>
        + Wire funds <div style={{ width: '10px' }} /> <Icon>swap_horizontal_circle</Icon>
      </Button>
    </>
  )
}

export default WireFunds
