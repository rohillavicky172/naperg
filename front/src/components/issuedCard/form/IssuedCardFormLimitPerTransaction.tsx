import React from 'react'
import { withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'

import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Product } from '../../product/Product.type'
import { IssuedCard } from '../IssuedCard.type'
import UpdateIssuedCard from '../action/UpdateIssuedCard'

type State = {
  issuedCard: IssuedCard
  product: Product | null
}

type Props = {
  context: Context
  userId: string
  onCancel: () => void
  onUpdated: () => void
  onUpdate: () => void
  issuedCard: IssuedCard
  redirectTo: string
  showIssuedCardCode: boolean
  showDescription: boolean
}

class IssuedCardFormLimitPerTransaction extends React.Component<Props, State> {
  state = {
    issuedCard: this.props.issuedCard,
    product: this.props.issuedCard.initProduct,
  }

  // onChangeAuthorizationType = issuedCard => {
  //   this.setState({ issuedCard })
  // }

  onChangeReferenceCode = (e) => {
    let issuedCardCode = e.target.value

    issuedCardCode = issuedCardCode.replace(/[^a-zA-Z0-9 ]/g, '')

    if (issuedCardCode.length <= 4) {
      this.setState({
        issuedCard: {
          ...this.state.issuedCard,
          issuedCardCode,
        },
      })
    }
  }
  onChange = (issuedCard: IssuedCard, product) => {
    this.setState({
      issuedCard,
      product,
    })
  }

  render() {
    if (!this.props.context.userRoleCompanie.companie) {
      return null
    }
    return (
      <Grid container>
        <Grid item xs={12} sm={8} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="limitPerTransaction">{`Maximum Transaction Size`}</InputLabel>
            <Input
              id="limitPerTransaction"
              onChange={(e) =>
                this.setState({
                  ...this.state,
                  issuedCard: {
                    ...this.state.issuedCard,
                    limitPerTransaction: Number(e.target.value),
                  },
                })
              }
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              type="number"
              value={this.state.issuedCard.limitPerTransaction}
            />
          </FormControl>

          <div style={{ height: '10px' }} />

          <UpdateIssuedCard
            onUpdated={this.props.onUpdated}
            disabled={this.state.issuedCard.name.length < 3}
            titleButton={'Save'}
            onCancel={this.props.onCancel}
            issuedCard={this.state.issuedCard}
            product={this.state.product}
          />
        </Grid>
      </Grid>
    )
  }
}

export default compose(withContext, withApollo)(IssuedCardFormLimitPerTransaction)
