
import React from 'react'

type State = {
  statusLabel: string
}

type Props = {
  status: string
}

class MappingStatus extends React.Component<Props, State> {
  render() {
    return (
      <>
        {this.props.status === 'CANCELLED' && 'Cancelled'}
        {this.props.status === 'ACTIVE_ISSUED_CARD' && 'Active'}
      </>
    )
  }
}

export default MappingStatus
