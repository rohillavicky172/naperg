import React from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import ContactForm from './ContactForm'
import DialogTitle from '@material-ui/core/DialogTitle'
import Icon from '@material-ui/core/Icon'
// import DialogActions from '@material-ui/core/DialogActions'

export default function ContactPopUp() {
  const [open, setOpen] = React.useState(false)
  const [scroll, setScroll] = React.useState('paper')
  const [mode, setMode] = React.useState('contactForm')

  const handleClickOpen = (scrollType) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <div className="tar">
        <Tooltip title={'Contact us'}>
          <IconButton color="primary" onClick={handleClickOpen('paper')}>
            <Icon className="textSize14">contact_mail</Icon>
          </IconButton>
        </Tooltip>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">Contact us</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <>
            {mode === 'success' && (
              <>
                <div style={{ height: '50px' }} />
                <div className="tac">
                  <p> {`Thanks! Your message was sent successfully!`}</p>
                  <div style={{ height: '50px' }} />
                  <Button variant="outlined" color="primary" onClick={handleClose}>{`Close`}</Button>
                </div>
                <div style={{ height: '50px' }} />
              </>
            )}
            {mode === 'contactForm' && (
              <ContactForm
                onSendContactMessage={() => {
                  setMode('success')
                }}
                onCancel={handleClose}
                showCancelButton={true}
                successMessage={``}
                showMessage={true}
                showPhoneNumber={false}
              />
            )}
          </>
        </DialogContent>
      </Dialog>
    </div>
  )
}
