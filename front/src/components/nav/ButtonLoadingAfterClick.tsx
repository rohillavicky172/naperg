import React from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import CircularProgress from '@material-ui/core/CircularProgress'
// import Tooltip from '@material-ui/core/Tooltip'

type Props = {
  id: string
  size: 'small' | 'medium' | 'large' | undefined
  color: 'inherit' | 'primary' | 'secondary' | 'default' | undefined
  variant: 'text' | 'outlined' | 'contained' | undefined
  icon: string
  buttonText: any
  onClick: () => void
  buttonLoadingText: string
  loading: boolean
  disabled: boolean
}
const ButtonLoadingAfterClick = (props: Props) => {
  return (
    <>
      {props.loading ? (
        <>
          {props.icon ? (
            <>
              {props.buttonLoadingText} <CircularProgress size={20} /> <div style={{ width: '10px' }} />
            </>
          ) : (
            <Button
              id={props.id}
              size={props.size}
              disabled={true}
              color={props.color}
              variant={props.variant}
              onClick={() => {}}>
              <CircularProgress size={20} /> <div style={{ width: '10px' }} /> {props.buttonLoadingText}
            </Button>
          )}
        </>
      ) : (
        <>
          {props.icon ? (
            // <Tooltip title="Download (max 1000 rows)">
            <IconButton onClick={props.onClick} color="primary" size="small">
              <Icon>{props.icon}</Icon>
            </IconButton>
          ) : (
            // </Tooltip>
            <Button
              id={props.id}
              size={props.size}
              disabled={props.disabled}
              color={props.color}
              variant={props.variant}
              onClick={props.onClick}>
              {props.buttonText}
            </Button>
          )}
        </>
      )}
    </>
  )
}

export default ButtonLoadingAfterClick
