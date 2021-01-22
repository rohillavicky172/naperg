import React from 'react'
import { Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { SubscriptionManagement } from '../SubscriptionManagement.type'
// import UpdateSubscriptionManagement from '../___UpdateSubscriptionManagement'
// import DeleteSubscriptionManagement from '../DeleteSubscriptionManagement'
// import { Link } from 'react-router-dom'
// import IsValidated from '../../user/single/profile/sectionDetails/IsValidated'
// import Link from '@material-ui/core/Link'
// import SubscriptionManagementForm from '../SubscriptionManagementForm'
// import gql from 'graphql-tag'
// import { useQuery } from '@apollo/react-hooks'
// import Loading from '../../nav/error/Loading'
// import Error from '../../nav/error/Error'
// import CreateSubscriptionManagement from '../CreateSubscriptionManagement'
// import DeleteSubscriptionManagement from './DeleteSubscriptionManagement'
// import SendSubscriptionManagementToChannel from './SendSubscriptionManagementToChannel'
// import { AppContext } from '../../AppContext'
// import { Context } from '../../Context.type'
import { Grid } from '@material-ui/core'
import DateComponent from '../../nav/DateComponent'

type Props = {
  subscriptionManagement: SubscriptionManagement
}

const SingleSubscriptionManagement = (props: Props) => {
  // console.log(props)
  // const [subscriptionManagement, setSubscriptionManagement] = React.useState(props.subscriptionManagement)
  // const [show, setShow] = React.useState(false)
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={4} className="">
            <DateComponent date={props.subscriptionManagement.dateStatus} />
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <Link className="link" to={'/user/' + props.subscriptionManagement.user.id}>
              {props.subscriptionManagement.user.firstName}
              {props.subscriptionManagement.user.lastName}
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} className="">
            subscription:{' '}
            <Link className="link" to={'/subscription/' + props.subscriptionManagement.subscription.id}>
              {props.subscriptionManagement.subscription.id}
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} className="">
            <div>statusSubscriptionManagement: {props.subscriptionManagement.statusSubscriptionManagement}</div>
            <div>typeSubscriptionManagement: {props.subscriptionManagement.typeSubscriptionManagement}</div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default SingleSubscriptionManagement
