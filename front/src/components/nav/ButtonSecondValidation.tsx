import React from 'react'
import Button from '@material-ui/core/Button'

type Props = {
  size: 'small' | 'medium' | 'large' | undefined
  color: 'inherit' | 'primary' | 'secondary' | 'default' | undefined
  variant: 'text' | 'outlined' | 'contained' | undefined
  buttonText: string
  id?: string
  disabled?: boolean

  onClick: () => void
}

const ButtonSecondValidation = (props: Props) => {
  const [isAskingValidation, setIsAskingValidation] = React.useState(false)
  const onClickApporve = () => {
    setIsAskingValidation(false)
    props.onClick()
  }

  return (
    <>
      {isAskingValidation ? (
        <>
          <Button
            disabled={props.disabled}
            id={props.id + '_sure'}
            size={props.size}
            color={props.color}
            variant={props.variant}
            onClick={onClickApporve}>
            <span>{`Sure?`}</span>
          </Button>
          <Button
            disabled={props.disabled}
            id={props.id + '_nope'}
            size={props.size}
            color={props.color}
            variant={props.variant}
            onClick={() => setIsAskingValidation(false)}>
            <span>{`nope!`}</span>
          </Button>
        </>
      ) : (
        <Button
          disabled={props.disabled}
          id={props.id}
          size={props.size}
          color={props.color}
          variant={props.variant}
          onClick={() => setIsAskingValidation(true)}>
          {props.buttonText}
        </Button>
      )}
    </>
  )
}

export default ButtonSecondValidation
