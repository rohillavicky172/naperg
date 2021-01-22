import React from 'react'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import '../Style.css'
import UseWindowDimensions from '../../../UseWindowDimensions'

type Props = {
  shwowActionButton: boolean
  shwowCancelButton: boolean
  actionText: string
  actionText2?: string
  message2?: string
  message: string
  iconText: string
  onClick: () => void
  onClick2?: () => void
  onCancel: () => void
}

const WarningAction = (props: Props) => {
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <div className="tac">
      <div className="">
        <Grid container>
          <Grid item xs={1} sm={1} className=""></Grid>
          <Grid item xs={11} sm={7} className="tal marginAuto">
            <p className="secondary textSize10 fontWeight19">
              <Icon className={'textSize12 iconAlignTextBottom'} color="secondary">
                {props.iconText}
              </Icon>{' '}
              {props.message}
            </p>
          </Grid>
          <Grid item xs={1} sm={1} className=""></Grid>
          <Grid item xs={11} sm={3} className="marginAuto tal">
            {props.shwowActionButton && (
              <Button color="secondary" variant="contained" onClick={props.onClick}>
                {props.actionText}
              </Button>
            )}
          </Grid>
        </Grid>
        {props.message2 && (
          <Grid container>
            <Grid item xs={1} sm={1} className=""></Grid>
            <Grid item xs={11} sm={7} className="tal marginAuto">
              <p className="secondary textSize10 fontWeight19">{props.message2}</p>
            </Grid>
            <Grid item xs={1} sm={1} className=""></Grid>
            <Grid item xs={11} sm={3} className="marginAuto tal">
              {props.shwowActionButton && (
                <Button color="secondary" variant="contained" onClick={props.onClick2}>
                  {props.actionText2}
                </Button>
              )}{' '}
            </Grid>
          </Grid>
        )}
        {isMobile && <div style={{ height: '10px' }} />}
      </div>

      {props.shwowCancelButton && <Button onClick={props.onCancel}>{`Cancel`}</Button>}
    </div>
  )
}

export default WarningAction
