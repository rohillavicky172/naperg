
import React from 'react'
import { withContext } from './../../../withContext'
import { Subscription } from './../../../subscription/Subscription.type'
import Grid from '@material-ui/core/Grid'
import ImageTemplate from '../../../nav/ImageTemplate'
// import { Link } from 'react-router-dom'
// import ActionSubscription from './ActionSubscription'
// import DateComponent from '../../../nav/DateComponent'

type State = {}

type Props = {
  // edges: any,
  // context: Context,
  // hideIfNoData: boolean,
  // title: string
  subscription: Subscription
}

class SubscriptionDashboard extends React.Component<Props, State> {
  render() {
    // console.log(this.props)
    return (
      <Grid container>
        <Grid item xs={6} sm={6} className="">
          <div className="imageSubcription">
            <ImageTemplate format={'verySmall'} nameFile={this.props.subscription.product.nameFile} />
          </div>
        </Grid>
        <Grid item xs={6} sm={6} className="marginAuto">
          {this.props.subscription.product.name}
        </Grid>
      </Grid>
    )
  }
}

export default withContext(SubscriptionDashboard)
