import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Icon from '@material-ui/core/Icon'
import './Style.css'

type State = {
  messageSnackBar: string
  openSnackBar: boolean
  showCloseIcon: boolean
  time: number
}

type Props = {}

class SnackBarCustom extends React.Component<Props, State> {
  state = {
    messageSnackBar: '',
    openSnackBar: false,
    showCloseIcon: true,
    time: 0
  }

  _openSnackBar(messageSnackBar: string, time: number, showCloseIcon: boolean) {
    this.setState({
      messageSnackBar,
      time,
      openSnackBar: true,
      showCloseIcon
    })
  }

  handleClose = (event: any) => {
    this.setState({ openSnackBar: false })
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={this.state.openSnackBar}
        autoHideDuration={this.state.time}
        classes={{ root: 'mySnackBar' }}
        onClose={this.handleClose}
        message={<span>{this.state.messageSnackBar}</span>}
        action={
          <>
            {this.state.showCloseIcon && (
              <Icon className="cursor" onClick={event => this.handleClose(event)}>
                clear
              </Icon>
            )}
          </>
        }
      />
    )
  }
}

export default SnackBarCustom
