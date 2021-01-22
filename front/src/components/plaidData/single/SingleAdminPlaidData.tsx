import React from 'react'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import { PlaidData } from '../PlaidData.type'
import SinglePlaidDataAdminAction from './SinglePlaidDataAdminAction'
import AddPlaidValidateMicroDeposits from '../plaid/AddPlaidValidateMicroDeposits'
// import { Context } from '../../Context.type'
// import { AppContext } from '../../AppContext'

type Props = {
  plaidData: PlaidData
}

const SingleAdminPlaidData = (props: Props) => {
  // const { context }: { context: Context } = React.useContext(AppContext)

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          {props.plaidData.publicTokenVerifyMicroD &&
            !props.plaidData.stripeSourceId &&
            props.plaidData.verificationStatus === 'pending_manual_verification' && (
              <>
                <Icon className="iconAlignText">account_balance</Icon>
                {`${props.plaidData.name} account in ${props.plaidData.mask}`}
                <div className="secondary">
                  {`Pending verification`}
                  <p>{`We made two small deposits in your bank account. After receiving these deposits, please verify your account.`}</p>
                </div>
                <AddPlaidValidateMicroDeposits
                  companieId={props.plaidData.companie.id}
                  token={props.plaidData.publicTokenFresh}
                />
              </>
            )}
          {props.plaidData.verificationStatus === 'pending_automatic_verification' && (
            <>
              <Icon className="iconAlignText">account_balance</Icon>
              {`${props.plaidData.name} account in ${props.plaidData.mask}`}
              <div className="secondary">
                {`Pending verification`}
                <p>{`Your bank account will be automatically verified within 1-2 business days.`}</p>
              </div>
            </>
          )}

          <SinglePlaidDataAdminAction plaidData={props.plaidData} />
        </Paper>
      </div>
    </>
  )
}

export default SingleAdminPlaidData
