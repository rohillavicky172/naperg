import React from 'react'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'

const GetStartedHeader = () => {
  const { context }: { context: Context } = React.useContext(AppContext)

  return (
    <>
      <h3>{context.me.firstName}, welcome to NachoNacho!</h3>
      <div className="">
        {(context.userRoleCompanie.companieRole === 'PURCHASER' || context.userRoleCompanie.companieRole === 'ANALYST') && (
          <p>
            NachoNacho is an awesome way for your company or group to consolidate all subscriptions in one account. This provides
            full visibility and control over subscription charges.
          </p>
        )}
        {(context.userRoleCompanie.companieRole === 'ADMIN' || context.userRoleCompanie.companieRole === 'OWNER') && (
          <p>
            You'll now be able to consolidate all your subscriptions in one account. This gives you full visibility and control
            over your subscription charges. The whole setup takes just a few minutes.
          </p>
        )}
        <p>
          A NachoCard is a virtual VISA card created by you online in your NachoNacho account, and is funded by your payment
          method. It has the same format as a traditional credit card - a 16 digit number, expiry date and CVC code.
        </p>
        <p>Following are the simple steps for you to get started.</p>
      </div>
    </>
  )
}

export default GetStartedHeader
