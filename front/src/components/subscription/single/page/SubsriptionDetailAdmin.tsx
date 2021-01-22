import React from 'react'
import { Paper, Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import UpdateSubscriptionProduct from '../action/UpdateSubscriptionProduct'
import UpdateSubscription from '../action/UpdateSubscription'
import { Subscription } from '../../Subscription.type'
import PromotionsLight from '../../../promotion/list/PromotionsLight'
import CashbackSubscriptionManagements from '../../../subscriptionManagement/list/CashbackSubscriptionManagements'
import RevshareSubscriptionManagements from '../../../subscriptionManagement/list/RevshareSubscriptionManagements'
import AddPromotionToSubscription from '../action/AddPromotionToSubscription'
import LinkPromotionsToSubscription from '../action/LinkPromotionsToSubscription'

type Props = {
  subscription: Subscription
}

const SubsriptionDetailAdmin = (props: Props) => {
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Admin`}</h3>
          <div>
            <Link className="link" to={`/logs?subscriptionId=${props.subscription.id}`}>
              <Button color="primary" variant="outlined">
                Logs
              </Button>
            </Link>
          </div>
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn">
          <Grid container>
            <Grid item xs={12}>
              <h3>{`Promotions`}</h3>
            </Grid>
            <Grid item xs={12} sm={6} className="">
              <CashbackSubscriptionManagements subscriptionId={props.subscription.id} />
            </Grid>
            <Grid item xs={12} sm={6} className="">
              <RevshareSubscriptionManagements subscriptionId={props.subscription.id} />
            </Grid>
            <Grid item xs={12}>
              <Link to={'/admin/computeInvoicesPromotion?subscriptionId=' + props.subscription.id}>
                <Button variant="outlined" color={'primary'}>
                  Compute promotions for all invoices in this subscription
                </Button>
              </Link>
            </Grid>{' '}
          </Grid>
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Admin UpdateSubscriptionProduct`}</h3>
          <UpdateSubscriptionProduct subscription={props.subscription} />
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Admin`}</h3>
          <UpdateSubscription subscription={props.subscription} />
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Promotions`}</h3>
          <AddPromotionToSubscription subscription={props.subscription} />
          <div>
            <LinkPromotionsToSubscription subscription={props.subscription} />
          </div>
          <PromotionsLight
            subscriptionId={props.subscription.id}
            variables={{
              where: {
                subscriptions_some: {
                  id: props.subscription.id,
                },
              },
            }}
          />
        </Paper>
      </div>
    </>
  )
}

export default SubsriptionDetailAdmin
