
import React from 'react'
import { withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import Button from '@material-ui/core/Button'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { IssuedCard } from '../IssuedCard.type'

type State = {
  issuedCard: IssuedCard
}

type Props = {
  context: Context,
  userId: string,
  onSelect: (phone: string) => void,
  issuedCard: IssuedCard
}

class SelectPhoneCardholder extends React.Component<Props, State> {
  render() {
    if (!this.props.issuedCard.user.phone) {
      return null
    }
    // console.log(this.state.issuedCard)
    const phone = this.props.issuedCard.user.phoneCode + this.props.issuedCard.user.phone
    if (phone === this.props.issuedCard.issuedCardStripe.cardholder.phone_number) {
      return null
    }
    return (
      <>
        <Button color="primary" variant="outlined" onClick={() => this.props.onSelect(phone)}>
          Use phone: {phone}
        </Button>
      </>
    )
  }
}

export default compose(
  withContext,
  withApollo
)(SelectPhoneCardholder)
