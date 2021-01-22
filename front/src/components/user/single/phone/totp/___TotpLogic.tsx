import React from 'react'
// import { AppContext } from '../../../../AppContext'
// import { Context } from '../../../../Context.type'
// import Button from '@material-ui/core/Button'
import GenerateSecret from './GenerateSecret'
// import { User } from '../../../../user/User.type'
// import DateComponent from '../../../../nav/DateComponent'
// import RemoveTotp from './RemoveTotp'
// import { useHistory } from 'react-router-dom'

type Props = {
  userId: string
}

const TotpLogic = (props: Props) => {
  // const history = useHistory()
  return (
    <>
      <>
        {/* {props.user.isTwoFactorTotpVerified ? (
          <>
            <div>
              <h3>Authenticator App</h3>
              Set up on <DateComponent  date={props.user.dateTotpVerified} />
            </div>
            <div style={{ height: '10px' }} />
            <div>
              <Button onClick={() => history.push(`/settings/${props.user.id}?mode=security`)}>Cancel</Button>{' '}
              <RemoveTotp user={props.user} onUpdate={() => {}} />
            </div>
          </>
        ) : ( */}
        <GenerateSecret userId={props.userId} />
        {/* )} */}
      </>
    </>
  )
}

export default TotpLogic
