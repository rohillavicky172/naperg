import React from 'react'
import Icon from '@material-ui/core/Icon'

import Grid from '@material-ui/core/Grid'
import '../Style.css'
import { Paper } from '@material-ui/core'
import UseWindowDimensions from '../UseWindowDimensions'

type Props = {
  shwowActionButton: boolean
  actionText: string
  message: string
  onClick: () => void
  done: boolean
}

const BannerGetStarted = (props: Props) => {
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <div className="">
      <div className="paperOut bgHover">
        <Paper
          className={props.done ? '' : ''}
          onClick={() => {
            if (!props.done) {
              props.onClick()
            }
          }}>
          <div className={isMobile ? 'paperIn' : ''}>
            <Grid container className={props.done ? '' : 'bgHover cursor'}>
              <Grid item xs={2} sm={1} className="marginAuto tac">
                {props.done ? <Icon color="primary">check_circle</Icon> : <Icon color="primary">radio_button_unchecked</Icon>}
              </Grid>
              <Grid item xs={8} sm={9} className="tal marginAuto">
                <p className="textSize9 fontWeight19" style={{ textDecoration: props.done ? 'line-through' : undefined }}>
                  {props.message}
                </p>
              </Grid>
              <Grid item xs={2} sm={2} className="marginAuto tac">
                {props.shwowActionButton && <Icon>arrow_forward_ios</Icon>}
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default BannerGetStarted
