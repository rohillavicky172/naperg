import React from 'react'
import { flowRight as compose } from 'lodash'
import AuthorizationForm from '../authorization/AuthorizationForm'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { User } from '../../../user/User.type'
import { withRouter } from 'react-router'
import { IssuedCard } from '../../IssuedCard.type'
import { Companie } from '../../../companie/Companie.type'
import CreateIssuedCard from './CreateIssuedCard'
import AddressesQuery from '../../../addresse/list/AddressesQuery'
import { Location } from '../../../Location.type'
import { History } from '../../../History.type'
import ShippingAddressesIssuedCard from '../../../addresse/list/ShippingAddressesIssuedCard'
const queryString = require('query-string')

type State = {
  mode: string
  loading: boolean
  nameValide: boolean
  issuedCard: IssuedCard
}

type Props = {
  companie: Companie
  user: User
  location: Location
  variables: any
  client: any
  history: History
  onCancel: any
  disabled: boolean
  onUpdate: any

  createIssuedCard: any
  issuedCard: IssuedCard
}

class CreateIssuedCardFunctionPhysical extends React.Component<Props, State> {
  state = {
    loading: false,
    mode: 'presentation',
    issuedCard: this.props.issuedCard,
    nameValide: true,
  }

  onChange = (issuedCard: IssuedCard, product) => {
    this.setState({
      issuedCard,
    })
    const parsed = queryString.parse(this.props.location.search)
    if (product) {
      parsed.productId = product.id

      this.props.history.push('?' + queryString.stringify(parsed))
    } else {
      if (parsed.productId) {
        delete parsed.productId
        this.props.history.push('?' + queryString.stringify(parsed))
      }
    }
  }
  isFormAuthorizationValid = () => {
    if (this.state.issuedCard.authorizedAmountUnit === 'NONE') {
      return true
    } else {
      if (this.state.issuedCard.authorizedAmount > 0) {
        return true
      }
    }
    return false
  }

  render() {
    return (
      <>
        {this.state.mode === 'presentation' && (
          <>
            <p>Each physical card order costs $15.00.</p>
            <p>This amount will be invoiced to you after you finish your order.</p>

            <Button variant="outlined" color="primary" onClick={() => this.setState({ mode: 'name' })}>
              Proceed
            </Button>
          </>
        )}
        {this.state.mode === 'name' && (
          <>
            <div>
              <FormControl className={'width100per'}>
                <InputLabel htmlFor="address1">{`Name of the card`}</InputLabel>
                <Input
                  id={'name'}
                  type={'text'}
                  error={!this.state.nameValide}
                  value={this.state.issuedCard.name}
                  onChange={(e) =>
                    this.setState({
                      issuedCard: {
                        ...this.state.issuedCard,
                        name: e.target.value,
                      },
                      nameValide: e.target.value.length ? true : false,
                    })
                  }
                />
              </FormControl>
            </div>
            <div style={{ height: '10px' }} />
            <div>
              <Button
                onClick={() =>
                  this.setState({
                    mode: 'presentation',
                  })
                }>
                Back
              </Button>{' '}
              <Button
                color="primary"
                disabled={!this.state.issuedCard.name.length}
                variant="outlined"
                onClick={() => this.setState({ mode: 'shippingAddress' })}>
                Next
              </Button>
            </div>
          </>
        )}
        {this.state.mode === 'shippingAddress' && (
          <>
            <h3>Shipping Address</h3>
            <p>Please make sure you can receive physical mail at this address securely.</p>
            <ShippingAddressesIssuedCard
              onCancel={() => this.setState({ mode: 'name' })}
              onUpdate={() => this.setState({ mode: 'authorization' })}
              onCreate={() => this.setState({ mode: 'authorization' })}
              companieId={this.props.companie.id}
              userId={this.props.user.id}
            />
          </>
        )}
        {this.state.mode === 'authorization' && (
          <>
            <h3>Add a Spending Limit</h3>
            <AuthorizationForm
              issuedCard={this.state.issuedCard}
              onUpdate={(issuedCard) =>
                this.setState({
                  issuedCard: issuedCard,
                })
              }
            />
            <div style={{ height: '10px' }} />
            <Button onClick={() => this.setState({ mode: 'shippingAddress' })}>Back</Button>{' '}
            <Button
              disabled={!this.isFormAuthorizationValid()}
              variant="outlined"
              color="primary"
              onClick={() => this.setState({ mode: 'summary' })}>
              Next
            </Button>
          </>
        )}

        {this.state.mode === 'summary' && (
          <>
            <h2>Review your order</h2>
            <div>Name of the card: {this.state.issuedCard.name}</div>
            <div>
              User of the card: {this.props.user.firstName} {this.props.user.lastName}
            </div>
            <div>Price: $15</div>

            <div>
              <AddressesQuery
                title={'Shipping Address'}
                canDelete={false}
                canCreateIfMoreThanOne={false}
                type="SHIPPING"
                userId={this.props.user.id}
                variables={{
                  where: {
                    companie: {
                      id: this.props.companie.id,
                    },
                    user: {
                      id: this.props.user.id,
                    },
                    type: 'SHIPPING',
                  },
                }}
              />
            </div>
            <div>
              <h3>Spending Limit </h3>
              No limit
              {/* {utils.priceFormated(Number(this.state.issuedCard.authorizedAmount), 'usd')}{' '}
              <MappingAuthorizedAmountUnit authorizedAmountUnit={this.state.issuedCard.authorizedAmountUnit} /> */}
            </div>
            <div style={{ height: '15px' }} />
            <div>
              <Button onClick={() => this.setState({ mode: 'authorization' })}>Back</Button>{' '}
              <CreateIssuedCard
                disabled={false}
                productId={''}
                buttonText={'Ship it'}
                type="physical"
                issuedCard={this.state.issuedCard}
                userId={this.props.user.id}
                companieId={this.props.companie.id}
                onCreate={(issuedCard) => this.props.history.replace(`/issuedCard/${issuedCard.id}?isNewCard=true`)}
              />
            </div>
          </>
        )}
      </>
    )
  }
}

export default compose(
  // graphql(CREATE_ISSUED_CARD, {
  //   name: 'createIssuedCard'
  // }),
  // withContext,
  withRouter
  // withApollo
)(CreateIssuedCardFunctionPhysical)
