

import React from 'react'
import Button from '@material-ui/core/Button'
import { Subscription } from '../../subscription/Subscription.type'
import Addresses from './Addresses'
// import AddAddresseContainer from '../AddAddresseContainer'
// import CreateAddresseButton from '../form/CreateAddresseButton'

type State = {
  seeAddresses: boolean
}
type Props = {
  issuedCardId: string,
  subscription: Subscription
}

class ButtonSeeAddresses extends React.Component<Props, State> {
  state = {
    seeAddresses: false
  }

  render() {
    return (
      <>
        <Button
          color="default"
          variant="text"
          onClick={() => this.setState({ seeAddresses: !this.state.seeAddresses })}>{`Addresses`}</Button>
        {this.state.seeAddresses && (
          <>
            <Addresses
              title={''}
              variables={{
                where: {
                  issuedCard: {
                    id: this.props.issuedCardId
                  }
                }
              }}
            />
          </>
        )}
      </>
    )
  }
}

export default ButtonSeeAddresses
