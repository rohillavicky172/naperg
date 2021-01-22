import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Invoice } from '../../Invoice.type'
import { Link } from 'react-router-dom'
import DateComponent from '../../../nav/DateComponent'
import '../Style.css'
import ImageInvoice from './ImageInvoice'
import utils from '../../../utils'
// import CashbackLine from './CashbackLine'

type Props = {
  invoice: Invoice
}

const SingleInvoiceList = (props: Props) => {
  return (
    <Link to={'/invoice/' + props.invoice.id} className="black">
      <div className="paperOut">
        <Paper className="paperIn bgHover">
          <Grid container>
            <Grid item xs={12} sm={2} className="marginAuto">
              <ImageInvoice format="verySmall" invoice={props.invoice} />
            </Grid>

            <Grid item xs={12} sm={2} className="marginAuto">
              {props.invoice.product && <span>{props.invoice.product.name}</span>}
              {(props.invoice.type === 'TOP_UP' ||
                props.invoice.type === 'AUTO_TOP_UP' ||
                props.invoice.type === 'REFUND_CASH_OUT') && <span>{utils.mappingTypeInvoice(props.invoice.type)}</span>}
              {props.invoice.type === 'PLATFORM_FEES' && <span>NachoNacho</span>}

              {props.invoice.type === 'PHYSICAL_CARD_FEES' && <span>NachoNacho</span>}
            </Grid>
            <Grid item xs={12} sm={2} className="marginAuto">
              <DateComponent date={props.invoice.dateInvoice} />
            </Grid>
            <Grid item xs={12} sm={2} className="marginAuto">
              <div>{utils.mappingTypeInvoice(props.invoice.type)}</div>
              <div>{utils.mappingStatusInvoice(props.invoice.status)}</div>
            </Grid>
            <Grid item xs={12} sm={2} className="marginAuto">
              <div>
                {`Amount: `}
                {props.invoice.statusIssuing === 'reversed' ? (
                  <>{utils.priceFormated(props.invoice.productCostLocal, props.invoice.currency)}</>
                ) : (
                  <>
                    {props.invoice.currency === 'usd' ? (
                      <>{utils.priceFormated(props.invoice.productCostLocal, props.invoice.currency)}</>
                    ) : (
                      <>{utils.priceFormated(props.invoice.productCostLocalInitial, props.invoice.currency)}</>
                    )}
                  </>
                )}
              </div>
              {props.invoice.cashback > 0 && (
                <div className="reward">
                  {`Cashback: `} {utils.priceFormated(props.invoice.cashback, props.invoice.currency)}
                </div>
              )}
            </Grid>

            <Grid item xs={12} sm={2} className="marginAuto">
              {props.invoice.user ? (
                <span>
                  {props.invoice.user.firstName} {props.invoice.user.lastName}
                </span>
              ) : (
                <>
                  {props.invoice.companie &&
                    props.invoice.companie.userRoleCompanies &&
                    props.invoice.companie.userRoleCompanies
                      .filter((userRoleCompanie) => userRoleCompanie.companieRole === 'OWNER')
                      .map((userRoleCompanie) => (
                        <span key={userRoleCompanie.id}>
                          {userRoleCompanie.user.firstName} {userRoleCompanie.user.lastName}
                          <>{!props.invoice.companie.isPersonal && <> {'(Owner)'}</>}</>
                        </span>
                      ))}
                </>
              )}{' '}
              <span>({props.invoice.companie.name})</span>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Link>
  )
}

export default SingleInvoiceList
