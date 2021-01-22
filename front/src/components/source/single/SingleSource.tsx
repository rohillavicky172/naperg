import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import VerifySource from './VerifySource'
import { Source } from '../Source.type'
import DeleteSourceLogically from './DeleteSourceLogically'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import UpdateNickname from './UpdateNickname'
import ActionSource from './ActionSource'
import PaymentMethodFormatSource from '../../card/single/PaymentMethodFormatSource'
import SingleSourceAdmin from './SingleSourceAdmin'
import AddPlaidRefreshLogin from '../../plaidData/plaid/AddPlaidRefreshLogin'

type Props = {
  source: Source
}

const SingleSource = (props: Props) => {
  const [mode, setMode] = React.useState('')
  const { context }: { context: Context } = React.useContext(AppContext)
  return (
    <>
      <Grid container>
        <Grid item xs={6} sm={8} className="">
          <PaymentMethodFormatSource showIcon={true} source={props.source} />
          {props.source.object === 'bank_account' && (
            <>
              {'; Status: '}
              {props.source.status === 'new' ? (
                <>
                  <span className="red">Pending verification</span>
                  <br />
                  <br />

                  <span className="textSize7 secondary">{`We made two small deposits in your bank account. After receiving these deposits, please verify your account.`}</span>
                </>
              ) : (
                'Verified'
              )}
              <br />
              {props.source.status === 'new' && (
                <>
                  <br />

                  <Button variant="outlined" color="secondary" onClick={() => setMode('verifyBank')}>
                    {`Verify account`}
                  </Button>
                </>
              )}
            </>
          )}
        </Grid>

        <Grid item xs={12} sm={4} className="tar">
          {mode === '' && <ActionSource setMode={(mode) => setMode(mode)} source={props.source} />}
        </Grid>
        <Grid item xs={12} sm={12} className="">
          {mode === 'verifyBank' && (
            <VerifySource onCancel={() => setMode('')} onVerified={() => setMode('')} sourceId={props.source.id} />
          )}
          {mode === 'nickname' && (
            <UpdateNickname onCancel={() => setMode('')} onUpdate={() => setMode('')} source={props.source} />
          )}

          {mode === 'deleteSource' && (
            <DeleteSourceLogically
              buttonText={`Yes, delete`}
              source={props.source}
              onCancel={() => setMode('')}
              onDelete={() => setMode('')}
            />
          )}
        </Grid>
        {props.source.plaidData && props.source.plaidData.resetLogin && (
          <Grid item xs={12} sm={12} className="">
            <div style={{ height: '10px' }} />
            <div className="secondary">
              We were not able to connect to your bank account. Please click the button below to reconnect.
            </div>
            <div style={{ height: '10px' }} />
            <AddPlaidRefreshLogin companieId={props.source.companie.id} plaidData={props.source.plaidData} />
          </Grid>
        )}
      </Grid>
      {context.me.role === 'ADMIN' && <SingleSourceAdmin source={props.source} />}
    </>
  )
}

export default SingleSource
