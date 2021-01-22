
import React from 'react'
import AddresseForm from './form/AddresseForm'
import { addressClass } from '../addresse/Addresse.type'

type State = {}

type Props = {
  onCancel: () => void,
  userId: string,
  companieId: string,
  type: string
}

class AddAddresseContainer extends React.Component<Props, State> {
  render() {
    return (
      <>
        <AddresseForm
          className="width100per"
          textButtonUpdate={'Update'}
          textButtonCreate={'Save'}
          textButtonCancel={'Cancel'}
          onCreate={() => {}}
          onCancel={this.props.onCancel}
          userId={this.props.userId}
          onUpdate={() => {}}
          companieId={this.props.companieId}
          addresse={{
            ...addressClass,
            type: this.props.type,
            country: 'US'
          }}
        />
      </>
    )
  }
}

export default AddAddresseContainer
