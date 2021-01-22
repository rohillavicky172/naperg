
import React from 'react'

type State = {}
type Props = {
  authorizedAmountUnit: string
}

class MappingAuthorizedAmountUnit extends React.Component<Props, State> {
  render() {
    return (
      <>
        {this.props.authorizedAmountUnit === 'NONE' && <span>{`no limit`}</span>}
        {this.props.authorizedAmountUnit === 'PER_MONTH' && <span>{`per month`}</span>}
        {this.props.authorizedAmountUnit === 'PER_YEAR' && <span>{`per year`}</span>}
        {this.props.authorizedAmountUnit === 'TOTAL' && <span>{`cumulative`}</span>}
      </>
    )
  }
}

export default MappingAuthorizedAmountUnit
