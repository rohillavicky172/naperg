import React from 'react'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import DateComponent from '../../nav/DateComponent'
import { Link } from 'react-router-dom'
import { Log } from '../Log.type'

type Props = {
  log: Log
}

const SingleLog = (props: Props) => {
  let messages = props.log.message ? props.log.message.split('|') : []

  return (
    <>
      <Grid container>
        {/* <Grid item xs={12} sm={1} className=''>
            <DeleteLog logId={props.log.id} />{' '}
          </Grid> */}
        <Grid item xs={12} sm={2} className="">
          <DateComponent date={props.log.date} />
          {/* {props.log.date} */}
        </Grid>

        <Grid item xs={12} sm={2} className="">
          {props.log.event}
        </Grid>
        <Grid item xs={12} sm={1} className="">
          {props.log.invoice && props.log.invoice.id && (
            <>
              <Tooltip title="Transaction">
                <Link className="link" to={'/invoice/' + props.log.invoice.id}>
                  T
                </Link>
              </Tooltip>{' '}
            </>
          )}
          {props.log.source && props.log.source.id && (
            <>
              <Tooltip title="Source">
                <Link className="link" to={'/sources?sourceId=' + props.log.source.id}>
                  S
                </Link>
              </Tooltip>{' '}
            </>
          )}
          {props.log.authDevice && props.log.authDevice.id && (
            <>
              <Tooltip title="Device">
                <Link className="link" to={'/authDevices?authDeviceId=' + props.log.authDevice.id}>
                  D
                </Link>
              </Tooltip>{' '}
            </>
          )}
          {props.log.cardholder && props.log.cardholder.id && (
            <>
              <Tooltip title="Cardholder">
                <Link className="link" to={'/cardholders?cardholderId=' + props.log.cardholder.id}>
                  C
                </Link>
              </Tooltip>{' '}
            </>
          )}
          {props.log.campaign && props.log.campaign.id && (
            <>
              <Tooltip title="campaign">
                <Link className="link" to={'/admin/campaigns?campaignId=' + props.log.campaign.id}>
                  C
                </Link>
              </Tooltip>{' '}
            </>
          )}
          {props.log.subscriptionManagement && props.log.subscriptionManagement.id && (
            <>
              <Tooltip title="SubscriptionManagement">
                <Link className="link" to={''}>
                  S
                </Link>
              </Tooltip>{' '}
            </>
          )}
          {props.log.charge && props.log.charge.id && (
            <>
              <Tooltip title={`Charge ${props.log.charge.id}`}>
                <span>c</span>
              </Tooltip>{' '}
            </>
          )}
          {props.log.ruleMerchantData && props.log.ruleMerchantData.id && (
            <>
              <Tooltip title={`RuleMerchantData ${props.log.ruleMerchantData.id}`}>
                <span>R</span>
              </Tooltip>{' '}
            </>
          )}
          {props.log.plaidData && props.log.plaidData.id && (
            <>
              <Tooltip title="plaid">
                <Link className="link" to={'/plaids?plaidDataId=' + props.log.plaidData.id}>
                  P
                </Link>
              </Tooltip>{' '}
            </>
          )}
          {props.log.sellerBalance && props.log.sellerBalance.id && (
            <>
              <Tooltip title="sellerBalance">
                <Link className="link" to={''}>
                  P
                </Link>
              </Tooltip>{' '}
            </>
          )}

          {props.log.issuedCard && props.log.issuedCard.id && (
            <>
              <Tooltip title="NachoCard">
                <Link className="link" to={'/issuedCard/' + props.log.issuedCard.id}>
                  N
                </Link>
              </Tooltip>{' '}
            </>
          )}
          {props.log.balance && props.log.balance.id && (
            <>
              <Tooltip title="Balance">
                <Link className="link" to={'/balance/' + props.log.balance.id}>
                  B
                </Link>
              </Tooltip>{' '}
            </>
          )}
          {props.log.companie && props.log.companie.id && (
            <>
              <Tooltip title={'Companie'}>
                <Link className="link" to={'/company/' + props.log.companie.id}>
                  C
                </Link>
              </Tooltip>{' '}
            </>
          )}
          {props.log.subscription && props.log.subscription.id && (
            <>
              <Tooltip title="Subscription">
                <Link className="link" to={''}>
                  S
                </Link>
              </Tooltip>{' '}
            </>
          )}
          {props.log.product && props.log.product.id && (
            <>
              <Tooltip title={'Product'}>
                <Link className="link" to={'/product/' + props.log.product.id}>
                  P
                </Link>
              </Tooltip>{' '}
            </>
          )}

          {props.log.user && props.log.user.id && (
            <>
              <Tooltip title={`User ${props.log.user.firstName} ${props.log.user.lastName} `}>
                <Link className="link" to={'/user/' + props.log.user.id}>
                  U
                </Link>
              </Tooltip>{' '}
            </>
          )}

          {props.log.user && props.log.user.id && (
            <div>
              <Link className="link" to={'/user/' + props.log.user.id}>
                {`User ${props.log.user.firstName} ${props.log.user.lastName} `}
              </Link>
            </div>
          )}
        </Grid>

        <Grid item xs={12} sm={7}>
          {messages.map((message, i) => (
            <div key={'message_' + i}>{message}</div>
          ))}
          <div style={{ height: '20px' }} />
          <pre>{props.log.json && JSON.stringify(JSON.parse(props.log.json), null, 4)}</pre>
          <pre>{props.log.jsonError && JSON.stringify(JSON.parse(props.log.jsonError), null, 4)}</pre>
        </Grid>
      </Grid>
    </>
  )
}

export default SingleLog
