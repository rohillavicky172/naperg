import React from 'react'
import { Icon } from '@material-ui/core'

const GetStartedTitle = () => {
  return (
    <>
      <h3 className="marginAuto">
        <Icon color="secondary" className="iconAlignTextBottom">
          add_to_queue
        </Icon>{' '}
        Get Started
      </h3>
    </>
  )
}

export default GetStartedTitle
