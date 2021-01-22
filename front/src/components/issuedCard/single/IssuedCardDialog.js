import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Icon from '@material-ui/core/Icon'
import IssuedCardDesignFull from './design/IssuedCardDesignFull'
import Slide from '@material-ui/core/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function IssuedCardDialog(props) {
  const [open, setOpen] = React.useState(false)

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <>
      <Dialog
        fullScreen
        classes={{ paper: 'dialogPaper' }}
        PaperComponent={'div'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <Button variant="contained" onClick={handleClose} color="primary">
          Close
        </Button>
        <div className="rotateFull">
          <IssuedCardDesignFull issuedCard={props.issuedCard} />
        </div>
      </Dialog>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <Icon className="cursor" onClick={handleClickOpen}>
          fullscreen
        </Icon>
        Fullscreen
      </Button>
    </>
  )
}
