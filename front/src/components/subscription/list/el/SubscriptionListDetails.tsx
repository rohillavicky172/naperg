import { withContext } from './../../../withContext'
import { Context } from './../../../Context.type'
import React from 'react'
import Paper from '@material-ui/core/Paper'
// import SingleSubscriptionListMobile from '../../single/listSingle/SingleSubscriptionListMobile'
import SingleSubscriptionListDesktop from '../../single/listSingle/SingleSubscriptionListDesktop'

type State = {}

type Props = {
  edges: any
  context: Context
  hideIfNoData: boolean
  title: string
}

class SubscriptionListDetails extends React.Component<Props, State> {
  render() {
    if (!this.props.edges.length) {
      return (
        <div className="paperOut">
          <Paper className="paperIn ">
            <div className="responsiveMargin2 tac textSize11">{`You will see all your subscriptions listed here once the vendors charge your NachoCards.`}</div>
          </Paper>
        </div>
      )
    }

    return (
      <>
        {this.props.edges &&
          this.props.edges.map((subscription) => (
            <div key={subscription.node.id} className="paperOut">
              <Paper className="paperIn bgHover">
                <SingleSubscriptionListDesktop subscription={subscription.node} />
              </Paper>
            </div>
          ))}
      </>
    )
  }
}

export default withContext(SubscriptionListDetails)
