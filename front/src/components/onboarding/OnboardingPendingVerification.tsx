import { LinearProgress } from '@material-ui/core'
import React from 'react'

const OnboardingPendingVerification = () => {
  return (
    <div className="tal">
      <LinearProgress variant="determinate" value={100} />
      <h2>{`Thank you for completing your application!`}</h2>
      {`We will verify your account information and notify you as soon as your account is approved.`}
    </div>
  )
}

export default OnboardingPendingVerification
