import React from 'react'
import { Button, Icon, Grid, Paper } from '@material-ui/core/'
import DeletePlaidData from './DeletePlaidData'
import ResetLoginPlaid from './ResetLoginPlaid'
import { Link } from 'react-router-dom'
import { PlaidData } from '../PlaidData.type'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import PlaidSetVerificationStatus from './PlaidSetVerificationStatus'
import DateComponent from '../../nav/DateComponent'
import GetPlaidBalance from './GetPlaidBalance'
import GetPlaidTransactions from './GetPlaidTransactions'
import GetPlaidIdentity from './GetPlaidIdentity'
import GetPlaidAuth from './GetPlaidAuth'
import LinkPlaidStripe from './LinkPlaidStripe'
import AddPlaidRefreshLogin from '../plaid/AddPlaidRefreshLogin'
import PlaidBalanceHistoricalQueryLight from '../../plaidBalanceHistorical/list/PlaidBalanceHistoricalQueryLight'
import utils from '../../utils'

type Props = {
  plaidData: PlaidData
}

const SinglePlaidDataAdminAction = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const [metaDataPlaid, setMetaDataPlaid] = React.useState(false)
  const [metaDataPlaidTransactions, setMetaDataPlaidTransactions] = React.useState(false)
  const [metaDataPlaidIdentity, setMetaDataPlaidIdentity] = React.useState(false)
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6} className="">
          <Link className="link" to={'/company/' + props.plaidData.companie.id}>
            {props.plaidData.companie.name}
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} className="">
          {props.plaidData.companie.userRoleCompanies.map((userRoleCompanie) => (
            <Link key={userRoleCompanie.id} className="link" to={'/user/' + userRoleCompanie.user.id}>
              <span key={userRoleCompanie.id}>{userRoleCompanie.user.name}</span>
            </Link>
          ))}
        </Grid>
        <Grid item xs={12} sm={6} className="">
          <DateComponent date={props.plaidData.createdAt} />
        </Grid>
        <Grid item xs={12} sm={6} className="">
          id: {props.plaidData.id}
        </Grid>

        <Grid item xs={12} sm={6} className="">
          accountIdPlaid: {props.plaidData.accountIdPlaid}
        </Grid>
        <Grid item xs={12} sm={6} className="">
          error: {props.plaidData.error}
        </Grid>
        <Grid item xs={12} sm={6} className="">
          stripeSourceId: {props.plaidData.stripeSourceId}
        </Grid>
        <Grid item xs={12} sm={6} className="">
          publicTokenPlaid: {props.plaidData.publicTokenPlaid}
        </Grid>
        <Grid item xs={12} sm={6} className="">
          publicTokenVerifyMicroD: {props.plaidData.publicTokenVerifyMicroD}
        </Grid>
        <Grid item xs={12} sm={6} className="">
          accessToken: {props.plaidData.accessToken}
        </Grid>
        <Grid item xs={12} sm={6} className="">
          publicTokenFresh: {props.plaidData.publicTokenFresh}
        </Grid>
        <Grid item xs={12} sm={6} className="">
          institution: {props.plaidData.institution}
        </Grid>
        <Grid item xs={12} sm={6} className="">
          verificationStatus: {utils.getPlaidVerificationStatus(props.plaidData.verificationStatus)}
        </Grid>
        <Grid item xs={12} sm={6} className="">
          name: {props.plaidData.name}
        </Grid>
        <Grid item xs={12} sm={6} className="">
          mask: {props.plaidData.mask}
        </Grid>
        <Grid item xs={12} sm={6} className="">
          type: {props.plaidData.type}
        </Grid>
        <Grid item xs={12} sm={6} className="">
          subtype: {props.plaidData.subtype}
        </Grid>
        <Grid item xs={12} sm={6} className="">
          bankAccountToken: {props.plaidData.bankAccountToken}
        </Grid>
        <Grid item xs={12} sm={6} className="">
          {props.plaidData.verificationStatus === 'pending_automatic_verification' && !props.plaidData.stripeSourceId && (
            <PlaidSetVerificationStatus plaidDataId={props.plaidData.id} />
          )}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6} className="">
          <div className="paperOut">
            <Paper className="paperIn">
              <Button variant="outlined" color={'primary'} onClick={() => setMetaDataPlaid(!metaDataPlaid)}>
                {`See meta data`}
              </Button>

              {metaDataPlaid && <pre>{JSON.stringify(JSON.parse(props.plaidData.metaDataPlaid), null, 4)}</pre>}
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className="">
          <div className="paperOut">
            <Paper className="paperIn">
              <div>resetLogin: {props.plaidData.resetLogin ? 'True' : 'False'}</div>
              <div>
                This action will simulate in Plaid that the user change his password. Checking the balance after should throw an
                error: `ITEM_LOGIN_REQUIRED`. Then flag resetLogin will be `true`. User will see a button to connect his banck
                account.
              </div>
              {props.plaidData.resetLogin ? (
                <AddPlaidRefreshLogin companieId={props.plaidData.companie.id} plaidData={props.plaidData} />
              ) : (
                <ResetLoginPlaid plaidData={props.plaidData} />
              )}
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className="">
          <div className="paperOut">
            <Paper className="paperIn">
              <GetPlaidIdentity plaidData={props.plaidData} />

              <Button variant="outlined" color={'primary'} onClick={() => setMetaDataPlaidIdentity(!metaDataPlaidIdentity)}>
                {`See Identity`}
              </Button>

              {metaDataPlaidIdentity && <pre>{JSON.stringify(JSON.parse(props.plaidData.metaDataPlaidIdentity), null, 4)}</pre>}
            </Paper>
          </div>
        </Grid>{' '}
        <Grid item xs={12} sm={6} className="">
          <div className="paperOut">
            <Paper className="paperIn">
              <div>
                <GetPlaidTransactions plaidData={props.plaidData} />
              </div>
              <Button
                variant="outlined"
                color={'primary'}
                onClick={() => setMetaDataPlaidTransactions(!metaDataPlaidTransactions)}>
                {`See transactions`}
              </Button>

              {metaDataPlaidTransactions && (
                <pre>{JSON.stringify(JSON.parse(props.plaidData.metaDataPlaidTransactions), null, 4)}</pre>
              )}
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className="">
          <div className="paperOut">
            <Paper className="paperIn">
              <GetPlaidAuth plaidData={props.plaidData} />
              <LinkPlaidStripe plaidData={props.plaidData} />
              <Link to={'/logs?companieId=' + props.plaidData.companie.id + '&plaidDataId=' + props.plaidData.id}>
                <Button variant="text" color={'primary'}>
                  <Icon className="textSize7">launch</Icon> {`Logs`}
                </Button>
              </Link>
              <DeletePlaidData plaidData={props.plaidData} />

              {props.plaidData.source && (
                <Link className="link" to={'/sources?sourceId=' + props.plaidData.source.id}>
                  <Button variant="text" color={'primary'}>
                    <Icon className="textSize7">launch</Icon>{' '}
                    {`Source ${props.plaidData.source.isDefaultSource ? '(Default)' : ''}`}
                  </Button>
                </Link>
              )}
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} className="">
          <div className="paperOut">
            <Paper className="paperIn">
              <div>
                dateBalanceRequested: <DateComponent date={props.plaidData.dateBalanceRequested} />
              </div>

              <PlaidBalanceHistoricalQueryLight
                page={1}
                variables={{
                  first: 1,
                  where: {
                    testMode: context.testMode,
                    mask: props.plaidData.mask ? props.plaidData.mask : undefined,
                    companie: {
                      id: props.plaidData.companie.id,
                    },
                  },
                }}
              />
              <GetPlaidBalance plaidData={props.plaidData} />

              <Link to={'/plaidBalanceHistorical?companieId=' + props.plaidData.companie.id + '&last4=' + props.plaidData.mask}>
                <Button variant="outlined" color={'primary'}>
                  <Icon className="textSize7">launch</Icon> {`See all balances`}
                </Button>
              </Link>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default SinglePlaidDataAdminAction
