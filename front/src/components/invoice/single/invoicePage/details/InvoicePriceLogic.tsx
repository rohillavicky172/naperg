import React from 'react'
import { Invoice } from '../../../Invoice.type'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import utils from '../../../../utils'
// import { Link } from 'react-router-dom'
import UseWindowDimensions from '../../../../UseWindowDimensions'
import SupportLink from '../../../../nav/SupportLink'

type Props = {
  invoice: Invoice
}

const InvoicePriceLogic = (props: Props) => {
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      {props.invoice.currency === 'usd' && (
        <>
          {props.invoice.type === 'REFUND' || props.invoice.type === 'REFUND_CASH_OUT' ? (
            <>
              <Grid container>
                <Grid item xs={12} md={3} className="bold">
                  {`Amount:`}
                </Grid>
                <Grid item xs={12} md={9}>
                  {' '}
                  {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                  {utils.priceFormated(props.invoice.productCostLocal, props.invoice.currency)}
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              {props.invoice.productCostInitial !== props.invoice.productCost && (
                <>
                  <Grid container>
                    <Grid item xs={12} md={3} className="bold">
                      {`Initial Authorization:`}
                    </Grid>
                    <Grid item xs={12} md={9}>
                      {' '}
                      {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                      {utils.priceFormated(props.invoice.productCostLocalInitial, props.invoice.currency)}
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={12} md={3} className="bold">
                      <>{`Final Cost:`}</>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      {' '}
                      {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                      {utils.priceFormated(props.invoice.productCostLocal, props.invoice.currency)}
                    </Grid>
                  </Grid>
                </>
              )}

              {props.invoice.productCostInitial === props.invoice.productCost && (
                <>
                  <Grid container>
                    <Grid item xs={12} md={3} className="bold">
                      <>{`Authorization:`}</>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      {' '}
                      {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                      {utils.priceFormated(props.invoice.productCostLocal, props.invoice.currency)}
                    </Grid>
                  </Grid>
                </>
              )}
            </>
          )}
        </>
      )}

      {props.invoice.currency !== 'usd' && (
        <>
          {props.invoice.type === 'REFUND' || props.invoice.type === 'REFUND_CASH_OUT' ? (
            <>
              <Grid container>
                <Grid item xs={12} md={3} className="bold">
                  {`Amount:`}
                </Grid>
                <Grid item xs={12} md={9}>
                  {' '}
                  {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                  {utils.priceFormated(props.invoice.productCostLocal, props.invoice.currency)}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={3} className="bold">
                  {`Amount in US$:`}
                </Grid>
                <Grid item xs={12} md={9}>
                  {' '}
                  {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                  {utils.priceFormated(props.invoice.productCost, 'usd')}
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              {/* {props.invoice.productCostInitial !== props.invoice.productCost && ( */}
              {/* <> */}
              <Grid container>
                <Grid item xs={12} md={3} className="bold">
                  {`Initial Authorization:`}
                </Grid>
                <Grid item xs={12} md={9}>
                  {' '}
                  {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                  {utils.priceFormated(props.invoice.productCostLocalInitial, props.invoice.currency)}
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={12} md={3} className="bold">
                  <>{`Initial Authorization in US$:`}</>
                </Grid>
                <Grid item xs={12} md={9}>
                  {' '}
                  {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                  {utils.priceFormated(props.invoice.productCostInitial, 'usd')}
                </Grid>
              </Grid>

              {props.invoice.statusIssuing === 'closed' && (
                <Grid container>
                  <Grid item xs={12} md={3} className="bold">
                    <>{`Final Cost in US$:`}</>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    {' '}
                    {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                    {utils.priceFormated(props.invoice.productCost, 'usd')}
                  </Grid>
                </Grid>
              )}
            </>
          )}
        </>
      )}

      <Grid container>
        <Grid item xs={12} md={3} className="bold">
          {`Processing Fees:`}{' '}
          {props.invoice.crossBorderFee + props.invoice.foreignExchangeFee < 0 && (
            <SupportLink url="https://support.nachonacho.com/saas-transactions-subscriptions-management-questions/what-is-the-processing-fee-on-my-transaction/" />
          )}
        </Grid>

        <Grid item xs={12} md={9}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          {utils.priceFormated(props.invoice.crossBorderFee + props.invoice.foreignExchangeFee, 'usd')}
        </Grid>
      </Grid>

      {props.invoice.incomingPaymentFee < 0 && (
        <Grid container>
          <Grid item xs={12} md={3} className="bold">
            {`Incoming Payment Fees:`}
          </Grid>

          <Grid item xs={12} md={9}>
            {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

            {utils.priceFormated(props.invoice.incomingPaymentFee, 'usd')}
          </Grid>
        </Grid>
      )}

      <Grid container>
        <Grid item xs={12} md={3} className="bold">
          {`Payment:`}
        </Grid>

        <Grid item xs={12} md={9}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {utils.priceFormated(props.invoice.buyerFinalPrice, 'usd')}
        </Grid>
      </Grid>
    </>
  )
}

export default InvoicePriceLogic
