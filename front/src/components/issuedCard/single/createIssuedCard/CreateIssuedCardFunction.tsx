import React from 'react'
import { flowRight as compose } from 'lodash'
import AutocompleteProductsIssuedCard from '../../../product/list/autocomplete/AutocompleteProductsIssuedCard'
import AuthorizationForm from '../authorization/AuthorizationForm'
import Button from '@material-ui/core/Button'
import ProductIdFilter from '../../../nav/filter/chip/ProductIdFilter'
import { withRouter } from 'react-router'
import { IssuedCard } from '../../IssuedCard.type'
import { Companie } from '../../../companie/Companie.type'
import CreateIssuedCard from './CreateIssuedCard'
import { Location } from '../../../Location.type'
import { History } from '../../../History.type'
import UserName from '../../../nav/layout/titlePage/UserName'
import CompanieName from '../../../companie/single/CompanieName'
const queryString = require('query-string')

type State = {
  mode: string
  loading: boolean
  issuedCard: IssuedCard
  // product: Product
}

type Props = {
  companie: Companie
  // context: Context,
  location: Location
  variables: any
  client: any
  history: History
  onCancel: any
  disabled: boolean
  onUpdate: any
  userId: string

  createIssuedCard: any
  issuedCard: IssuedCard
}

class CreateIssuedCardFunction extends React.Component<Props, State> {
  state = {
    loading: false,
    mode: 'name',
    issuedCard: this.props.issuedCard,
    // product: productClass
  }
  // componentDidMount = () => {
  //   this.createdIssuedCard()
  // }

  onChange = (issuedCard: IssuedCard, product) => {
    this.setState({
      issuedCard,
      // product
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
  isFormValid = () => {
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
    const parsed = queryString.parse(this.props.location.search)
    const productId = parsed.productId
    return (
      <>
        <h3>
          NachoCard {this.state.issuedCard.name && `"${this.state.issuedCard.name}"`} setup for{' '}
          <UserName userId={this.props.userId} /> (
          <CompanieName companieId={this.props.companie.id} />)
        </h3>
        {this.state.mode === 'name' && (
          <>
            <div>
              {productId ? (
                <ProductIdFilter />
              ) : (
                <AutocompleteProductsIssuedCard issuedCard={this.state.issuedCard} onChange={this.onChange} />
              )}
            </div>
            <div style={{ height: '10px' }} />
            <div>
              <Button
                color="primary"
                disabled={!(this.state.issuedCard.name.length || productId)}
                variant="outlined"
                onClick={() => this.setState({ mode: 'authorization' })}>
                Next
              </Button>
            </div>
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
            {/* <ButtonLoadingAfterClick id={'idButton'}
              icon={''}
              color={'primary'}
              variant={'outlined'}
              size={'medium'}
              disabled={!this.isFormValid()}
              buttonText={'Done'}
              buttonLoadingText={`Setting up...`}
              onClick={() => {
                this.createdIssuedCard()
              }}
              loading={this.state.loading}
            /> */}
            <Button onClick={() => this.setState({ mode: 'name' })}>Back</Button>{' '}
            <CreateIssuedCard
              disabled={!this.isFormValid()}
              productId={productId}
              buttonText={'Done'}
              type="virtual"
              issuedCard={this.state.issuedCard}
              userId={this.props.userId}
              companieId={this.props.companie.id}
              onCreate={(issuedCard) => this.props.history.replace(`/issuedCard/${issuedCard.id}?isNewCard=true`)}
            />
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
)(CreateIssuedCardFunction)
