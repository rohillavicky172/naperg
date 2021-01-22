
import React from 'react'
import { withContext } from './../../../withContext'
import { Context } from './../../../Context.type'
import SingleSubscriptionListLight from '../../single/listSingle/SingleSubscriptionListLight'

type State = {}

type Props = {
  edges: any,
  context: Context,
  hideIfNoData: boolean,
  title: string
}

class SubscriptionListDetailsLight extends React.Component<Props, State> {
  render() {
    if (!this.props.edges.length) {
      return (
        <div className="paperOut">
          {/* <Paper className="paperIn "> */}
          <div className="responsiveMargin2 tac textSize11">{`You will see all your subscriptions listed here once the vendors charge your NachoCards.`}</div>
          {/* </Paper> */}
        </div>
      )
    }

    return (
      <>
        {this.props.edges &&
          this.props.edges.map(subscription => (
            <div key={subscription.node.id} className="paperOut">
              <div className="paperIn bgHover">
                <SingleSubscriptionListLight subscription={subscription.node} />
              </div>
            </div>
          ))}
      </>
    )
  }
}

export default withContext(SubscriptionListDetailsLight)
