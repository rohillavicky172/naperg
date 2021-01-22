import React from 'react'
import { AppContext } from '../../AppContext'
import CompanieName from '../../companie/single/CompanieName'
import UserName from '../../nav/layout/titlePage/UserName'
import Paper from '@material-ui/core/Paper'
import UseWindowDimensions from '../../UseWindowDimensions'
import IssuedCardDetailsAdmin from './IssuedCardDetailsAdmin'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { Context } from '../../Context.type'
import utils from '../../utils'
import { IssuedCard } from '../IssuedCard.type'
import NameDevice from '../../authDevice/single/NameDevice'
import IssuedCardDescriptionSection from './section/IssuedCardDescriptionSection'
import IssuedCardApprovedSection from './section/IssuedCardApprovedSection'
import IssuedCardAurhorizationSection from './section/IssuedCardAurhorizationSection'
import IssuedCardLimitPerTransactionSection from './section/IssuedCardLimitPerTransactionSection'
import IssuedCardFirstSection from './section/IssuedCardFirstSection'
import InvoicesGraph from '../../invoice/list/graph/InvoicesGraph'
import StatusIssuedCard from './StatusIssuedCard'
import IssuedCardPhysical from './IssuedCardPhysical'
import IssuedCardDateManagement from './dateManagement/IssuedCardDateManagement'
import IssuedCardWarnings from './IssuedCardWarnings'
import HowToRedeemPromotions from '../../promotion/redeem/HowToRedeemPromotions'
import SubscriptionListQueryLight from '../../subscription/list/el/SubscriptionListQueryLight'
import InvoicesLightQuery from '../../invoice/list/InvoicesLightQuery'
import IssuedCardAddress from './IssuedCardAddress'
import NotificationUserIssuedCards from '../../notificationUserIssuedCard/NotificationUserIssuedCards'
import AdminNotificationUserIssuedCards from '../../notificationUserIssuedCard/AdminNotificationUserIssuedCards'
import CardholderLogic from '../form/CardholderLogic'
// import GoToVendorWebsite from './GoToVendorWebsite'
// import GoToVendorWebsite from './GoToVendorWebsite'
// import ImageTemplate from '../../nav/ImageTemplate'

type Props = {
  issuedCard: IssuedCard
}

const IssuedCardDetails = (props: Props) => {
  const isMobile = UseWindowDimensions.isMobile()
  const { context }: { context: Context } = React.useContext(AppContext)
  const isMyCard = context.me.id === props.issuedCard.user.id

  const canCreateCard =
    (context.userRoleCompanie.permissions.includes('canCreateMyIssuedCards') && isMyCard) ||
    (context.userRoleCompanie.permissions.includes('canCreateIssuedCardsInCompanie') && !isMyCard)
      ? true
      : false

  return (
    <div>
      <IssuedCardWarnings issuedCard={props.issuedCard} />

      <IssuedCardPhysical issuedCard={props.issuedCard} />

      <div className="paperOut">
        <Paper className="paperIn">
          <h3>
            NachoCard setup for <UserName userId={props.issuedCard.user.id} /> (
            <CompanieName companieId={props.issuedCard.companie.id} />)
          </h3>
          <div className="margin1">
            <Divider />
          </div>
          <Grid container>
            <Grid item xs={12} className="tar">
              <StatusIssuedCard issuedCard={props.issuedCard} />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={6} className="">
              <IssuedCardFirstSection issuedCard={props.issuedCard} />
            </Grid>
            <Grid item xs={12} sm={6} className="marginAuto">
              {props.issuedCard.initProduct && (
                <div className={isMobile ? 'tal margin4' : 'tal'}>
                  <HowToRedeemPromotions issuedCard={props.issuedCard} productId={props.issuedCard.initProduct.id} />
                </div>
              )}
            </Grid>
          </Grid>
        </Paper>
      </div>

      {context.userRoleCompanie.permissions.includes('canApproveIssueCardInCompanie') && (
        <>
          {props.issuedCard.isRequested && (
            <div className="paperOut">
              <Paper className="paperIn">
                <IssuedCardApprovedSection issuedCard={props.issuedCard} />
              </Paper>
            </div>
          )}
        </>
      )}

      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`NachoCard details`}</h3>

          <IssuedCardAddress isStripeDisabled={false} issuedCard={props.issuedCard} />
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn">
          <IssuedCardDescriptionSection issuedCard={props.issuedCard} canCreateCard={canCreateCard} showEditButton={true} />
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn">
          <NotificationUserIssuedCards issuedCard={props.issuedCard} />
        </Paper>
      </div>

      {context.me.role === 'ADMIN' && (
        <div className="paperOut">
          <Paper className="paperIn">
            <h3>CardholderLogic Admin</h3>
            <CardholderLogic canCreateCard={canCreateCard} issuedCard={props.issuedCard} />
          </Paper>
        </div>
      )}
      {context.me.role === 'ADMIN' && (
        <div className="paperOut">
          <Paper className="paperIn">
            <h3>Admin notifications</h3>
            <AdminNotificationUserIssuedCards issuedCard={props.issuedCard} />
          </Paper>
        </div>
      )}

      <div className="paperOut">
        <Paper className="paperIn">
          {props.issuedCard.status !== 'canceled' && (
            <div>
              <IssuedCardAurhorizationSection issuedCard={props.issuedCard} canCreateCard={canCreateCard} />
              <div className="margin1">
                <Divider />
              </div>

              <IssuedCardDateManagement issuedCard={props.issuedCard} />
            </div>
          )}
          {context.me.role === 'ADMIN' && (
            <>
              <div className="margin1">
                <Divider />
              </div>

              <IssuedCardLimitPerTransactionSection
                issuedCard={props.issuedCard}
                canCreateCard={canCreateCard}
                showEditButton={true}
              />
            </>
          )}
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn">
          <div style={{ height: '200px' }}>
            <InvoicesGraph
              showIsCumulative={true}
              showTotal={false}
              variables={{
                side: 'ISSUING',
                includesRefund: true,
                where: {
                  companie: {
                    id: props.issuedCard.companie.id,
                  },

                  subscription: {
                    issuedCard: {
                      id: props.issuedCard.id,
                    },
                  },
                },
              }}
            />
          </div>
        </Paper>
      </div>

      {context.userRoleCompanie.permissions.includes('canSeeAuthDevicesInCompanie') && (
        <>
          {props.issuedCard.authDevice && (
            <div className="paperOut">
              <Paper className="paperIn">
                <h4>
                  {props.issuedCard.createdBy && <>Created by {utils.getNameOrEmail(props.issuedCard.createdBy, 'both')} </>}
                  {props.issuedCard.city ? `in ${props.issuedCard.city}` : ''} using this device:
                </h4>
                <NameDevice authDevice={props.issuedCard.authDevice} />
              </Paper>
            </div>
          )}
        </>
      )}

      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Subscriptions for NachoCard: "${props.issuedCard.name}"`}</h3>
          <div>
            <SubscriptionListQueryLight
              linkSeeMore={
                '/subscriptionsCompany/' +
                props.issuedCard.companie.id +
                '?issuedCardId=' +
                props.issuedCard.id +
                '&userId=' +
                props.issuedCard.user.id
              }
              textSeeMore={`See all subscriptions for the NachoCard "${props.issuedCard.name}"`}
              variables={{
                first: 4,
                orderBy: 'lastInvoiceDate_DESC',
                where: {
                  companie: {
                    id: props.issuedCard.companie.id,
                  },
                  issuedCard: {
                    id: props.issuedCard.id,
                  },
                  user: {
                    id: props.issuedCard.user.id,
                  },
                },
              }}
            />
          </div>
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Transactions for NachoCard: "${props.issuedCard.name}"`}</h3>
          <div>
            <InvoicesLightQuery
              linkSeeMore={
                '/invoicesCompany/' +
                props.issuedCard.companie.id +
                '?issuedCardId=' +
                props.issuedCard.id +
                '&userId=' +
                props.issuedCard.user.id
              }
              textSeeMore={`See all transactions for NachoCard "${props.issuedCard.name}"`}
              variables={{
                first: 4,
                orderBy: 'createdAt_DESC',
                where: {
                  companie: {
                    id: props.issuedCard.companie.id,
                  },

                  subscription: {
                    issuedCard: {
                      id: props.issuedCard.id,
                    },
                  },
                  user: {
                    id: props.issuedCard.user.id,
                  },
                },
              }}
            />
          </div>
        </Paper>
      </div>

      {context.me.role === 'ADMIN' && <IssuedCardDetailsAdmin issuedCard={props.issuedCard} />}
    </div>
  )
}

export default IssuedCardDetails
