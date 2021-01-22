import React from 'react'
import { Paper, Card, Grid, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Context } from '../../../Context.type'
import { AppContext } from '../../../AppContext'
import ImageTemplate from '../../../nav/ImageTemplate'
import { Subscription } from '../../Subscription.type'
import InvoicesGraph from '../../../invoice/list/graph/InvoicesGraph'
import InvoiceListQueryProduct from '../../../invoice/list/InvoiceListQueryProduct'
import IssuedCardDesignSmall from '../../../issuedCard/single/IssuedCardDesignSmall'
import PaymentMethodFormatIssuedCard from '../../../card/single/PaymentMethodFormatIssuedCard'
import ManageFile from '../../../file/ManageFile'
import ManageDataProduct from '../../../dataProduct/ManageDataProduct'
import utils from '../../../utils'
import UseWindowDimensions from '../../../UseWindowDimensions'
import SubsriptionDetailAdmin from './SubsriptionDetailAdmin'
import ReviewBanner from '../../../review/ReviewBanner'
// import DateComponent from '../../../nav/DateComponent'

type Props = {
  subscription: Subscription
}

const SubsriptionDetail = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const isMySubscription = props.subscription.user.id === context.me.id

  const subscriptionName = utils.getSubscriptionName(
    props.subscription.product.name,
    props.subscription.issuedCard.last4.toString(),
    props.subscription.user.firstName,
    props.subscription.user.lastName
  )
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <div className="paperOut">
        <h2>Subscription ID: {props.subscription.id}</h2>

        <Paper className="paperIn">
          {/* <Grid container spacing={1}>
            <Grid item xs={12} md={3} className="marginAuto">
              <h3>Subscription ID:</h3>
            </Grid>
            <Grid item xs={6} md={3} className="marginAuto">
              <img alt="subscription" src={'/icon/subscriptionIcon.png'} className="verySmallImg" />
            </Grid>
            <Grid item xs={6} md={6} className="marginAuto">
              {subscriptionName}
            </Grid>
          </Grid> */}
          <Grid container spacing={1}>
            <Grid item xs={12} md={3} className="marginAuto">
              <h3>Product:</h3>
            </Grid>
            <Grid item xs={6} md={3} className="marginAuto">
              <ImageTemplate format={'verySmall'} nameFile={props.subscription.product.nameFile} />
            </Grid>
            <Grid item xs={6} md={6} className="marginAuto">
              <Link className="link" to={'/productActivity/' + props.subscription.product.id}>
                {props.subscription.product.name}
              </Link>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12} md={3} className="marginAuto">
              {isMobile && <Divider />}
              <h3>Member:</h3>
            </Grid>
            <Grid item xs={6} md={3} className="marginAuto">
              <ImageTemplate format={'avatar'} nameFile={props.subscription.user.nameFile} />
            </Grid>
            <Grid item xs={6} md={6} className="marginAuto">
              <Link className="link" to={'/user/' + props.subscription.user.id}>
                {props.subscription.user.firstName} {props.subscription.user.lastName}
              </Link>
            </Grid>
          </Grid>

          {(context.userRoleCompanie.permissions.includes('canSeeIssuedCardsInCompanie') || isMySubscription) && (
            <Grid container spacing={1}>
              <Grid item xs={12} md={3} className="marginAuto">
                {isMobile && <Divider />}
                <h3>NachoCard:</h3>
              </Grid>
              <Grid item xs={6} md={3} className="marginAuto">
                <IssuedCardDesignSmall issuedCard={props.subscription.issuedCard} />
              </Grid>
              <Grid item xs={6} md={6} className="marginAuto">
                <Link className="link" to={'/issuedCard/' + props.subscription.issuedCard.id}>
                  <PaymentMethodFormatIssuedCard showIcon={false} source={props.subscription.issuedCard.issuedCardStripe} />{' '}
                  {`("`}
                  {props.subscription.issuedCard.name}
                  {`")`}
                </Link>
              </Grid>
            </Grid>
          )}
        </Paper>
      </div>

      {(context.userRoleCompanie.permissions.includes('canSeeInvoicesInCompanie') || isMySubscription) && (
        <div className="paperOut">
          <Card className="paperIn bgGrey">
            <div style={{ height: isMobile ? '250px' : '350px' }}>
              <InvoicesGraph
                title={`Monthly totals for Subscription: ${subscriptionName}`}
                showIsCumulative={true}
                showTotal={false}
                variables={{
                  side: 'ISSUING',
                  includesRefund: true,
                  where: {
                    companie: {
                      id: props.subscription.companie.id,
                    },

                    subscription: {
                      id: props.subscription.id,
                    },
                  },
                }}
              />
            </div>
          </Card>
        </div>
      )}

      {(context.userRoleCompanie.permissions.includes('canSeeInvoicesInCompanie') || isMySubscription) && (
        <div className="paperOut">
          <Paper className="paperIn">
            <h3>{`Recent transactions for Subscription: ${subscriptionName}`}</h3>
            <div>
              <InvoiceListQueryProduct
                linkSeeMore={`/invoicesCompany/${props.subscription.companie.id}?subscriptionId=${props.subscription.id}`}
                textSeeMore={`See all`}
                // companie={context.userRoleCompanie.companie}
                // product={props.subscription.product}
                variables={{
                  first: 4,
                  orderBy: 'createdAt_DESC',
                  where: {
                    subscription: {
                      id: props.subscription.id,
                    },

                    companie: {
                      id: props.subscription.companie.id,
                    },
                  },
                }}
              />
            </div>
          </Paper>
        </div>
      )}

      {props.subscription.product?.showMarketplace && (
        <div className="paperOut">
          <Paper className="paperIn">
            <ReviewBanner product={props.subscription.product} userId={context.me.id} />
          </Paper>
        </div>
      )}
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Subscription Details`}</h3>

          {/* <Grid container>
            <Grid item xs={12} md={3} className="bold">
              Last payment:
            </Grid>

            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

              <DateComponent  date={props.subscription.lastInvoiceDate} />
            </Grid>
          </Grid> */}

          <div className="paperOut">
            <Paper className="paperIn">
              <ManageDataProduct
                // productId={this.props.product.id}
                subscriptionId={props.subscription.id}
                userId={props.subscription.user.id}
                companieId={props.subscription.companie.id}
              />
            </Paper>
          </div>
          <div className="paperOut">
            <Paper className="paperIn">
              <h4>{`Attachments`}</h4>
              <div>
                <ManageFile
                  typeFile={'SUBSCRIPTION'}
                  subscriptionId={props.subscription.id}
                  onCreate={() => {}}
                  companieId={props.subscription.companie.id}
                  showDownload={true}
                />
              </div>
            </Paper>
          </div>
        </Paper>
      </div>
      {context.me.role === 'ADMIN' && <SubsriptionDetailAdmin subscription={props.subscription} />}
    </>
  )
}

export default SubsriptionDetail
