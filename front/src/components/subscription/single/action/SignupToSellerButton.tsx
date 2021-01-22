import React from 'react'
import { Link } from 'react-router-dom'
import { Subscription } from '../../Subscription.type'
import Button from '@material-ui/core/Button'
import { Context } from '../../../Context.type'
import { withContext } from '../../../withContext'

type State = {}

type Props = {
  context: Context
  subscription: Subscription
}

class SignupToSellerButton extends React.Component<Props, State> {
  render() {
    return (
      <>
        {/* {this.props.subscription.product.communicationWithSellerType === 'SELLER_API' ? ( */}
        <Link to={'/subscription/signUp/' + this.props.subscription.id}>
          <Button color="primary" size="small" variant="contained">
            {`Sign Up`}
          </Button>
        </Link>
        {/* ) : (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={utils.getAugmentedSignupLink(this.props.subscription, this.props.context.testMode)}>
          <Button color="primary" size="small" variant="contained">
            {`Sign up`}
          </Button>
        </a>
      )} */}
      </>
    )
  }
}

export default withContext(SignupToSellerButton)
