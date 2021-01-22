import React, { useEffect, useState } from 'react'
import { Button, Dialog, Grid, IconButton, Icon } from '@material-ui/core'
// import { useLocation } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'
import './Style.css'
const queryString = require('query-string')

const InstallPWA = () => {
  const location = useLocation()
  const history = useHistory()
  const parsed = queryString.parse(location.search)

  const [supportsPWA, setSupportsPWA] = useState(false)
  const [message, setMessage] = useState('')

  const [promptInstall, setPromptInstall]: [any, any] = useState(null)
  const closeDialog = () => {
    const parsed = queryString.parse(location.search)
    delete parsed.mode

    history.push('?' + queryString.stringify(parsed))
  }

  const isApple = ['iPhone', 'iPad', 'iPod'].includes(navigator.platform)

  useEffect(() => {
    const handler = (e) => {
      // console.log(e)
      console.log('e')
      console.log(e)
      e.preventDefault()
      // console.log('we are being triggered :D')
      setSupportsPWA(true)
      setPromptInstall(e)
    }
    console.log('beforeinstallprompt')

    // if (isApple) {
    //   // Do nothing
    //   console.log('Iphone')
    //   return
    // }
    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('transitionend', handler)
  }, [])

  const installPwa = (evt) => {
    evt.preventDefault()
    if (!promptInstall) {
      setMessage('Your device is not compatible.')
      return
    }
    promptInstall.prompt()
    closeDialog()
  }
  // if (!supportsPWA) {
  //   return <div>{message}</div>
  // }
  return (
    <>
      <Dialog open={parsed.mode === 'installApp'}>
        <div className="paperOut">
          <div className="paperOut">
            <Grid container className="">
              <Grid item xs={6} className="">
                <h2>Install NachoNacho</h2>
              </Grid>
              <Grid item xs={6} className="tar">
                <IconButton onClick={() => closeDialog()}>
                  <Icon>close</Icon>
                </IconButton>
              </Grid>
              <Grid item xs={12} className="">
                <>
                  {isApple ? (
                    <>
                      <p>Install this application on your home screen for quick and easy access when you're on the go</p>
                      Just tap <img alt="sharedAppleIcon" className="sharedAppleIcon" src="/icon/share-apple-icon.png" /> then
                      'Add to Home Screen'
                    </>
                  ) : (
                    <>
                      {supportsPWA ? (
                        <>
                          <Button
                            color="primary"
                            variant="outlined"
                            id="setup_button"
                            aria-label="Install app"
                            title="Install app"
                            onClick={installPwa}>
                            Install
                          </Button>
                          {message && <p>{message}</p>}
                        </>
                      ) : (
                        <>NachoNacho Inc</>
                      )}
                    </>
                  )}
                </>
              </Grid>
            </Grid>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default InstallPWA
