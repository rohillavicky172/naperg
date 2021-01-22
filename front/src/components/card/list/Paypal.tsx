import React from 'react'
import Button from '@material-ui/core/Button'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'

const Paypal = () => {
  const [show, setShow] = React.useState(false)

  return (
    <>
      <Dialog open={show} maxWidth={'md'} fullWidth={true} onClose={() => setShow(false)}>
        <DialogTitle disableTypography>
          <h2>Paypal</h2>
        </DialogTitle>
        <DialogContent>
          <>
            <p>
              Send funds to <span className="primary">paypal@nachonacho.com</span>.
            </p>
            <p>
              {`Any fees charged by PayPal will be payable by you. Your NachoNacho Balance will
            be updated based on the net payment received by NachoNacho from PayPal. It may take up to 24 hours to update your
            NachoNacho Balance.`}
            </p>
          </>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="outlined" onClick={() => setShow(false)}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Button color="primary" variant="outlined" onClick={() => setShow(!show)}>
        + PayPal
        <div style={{ width: '10px' }} /> <img alt="paypal" src="/icon/paypal-logo.png" width="18px" />
      </Button>
    </>
  )
}

export default Paypal
