import React from 'react'
// import BalancesStepper from '../../../balance/BalancesStepper'
// import { Balance } from '../.../../../balance/___BalancesStepper
// import WarningNoBalanceIssuedCardMessage from '../../../balance/WizardBannerBalances'
type State = {
  // balances: Balance[]
  show: boolean
}

type Props = {
  companieId: string
}

class WarningNoBalanceIssuedCard extends React.Component<Props, State> {
  state = {
    show: false,
    balances: []
  }

  // onBalances = (balances: Balance[]) => {
  //   // this.setState({  show: true })
  //   if (balances !== this.state.balances) {
  //     this.setState({ balances, show: true })
  //   }
  // }

  render() {
    return (
      <>
        {/* <BalancesStepper onBalances={this.onBalances} companieId={this.props.companieId} />
        {this.state.show && (
          <>
            {this.state.balances.length === 0 && <WarningNoBalanceIssuedCardMessage companieId={this.props.companieId} />}
            {this.state.balances.map((balance: Balance) => (
              <div key={balance.id}>
                {balance.valueBalance === 0 && <WarningNoBalanceIssuedCardMessage companieId={this.props.companieId} />}
              </div>
            ))}
          </>
        )} */}
      </>
    )
  }
}

export default WarningNoBalanceIssuedCard
