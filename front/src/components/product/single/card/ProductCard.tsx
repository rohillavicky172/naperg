import React from 'react'
import Card from '@material-ui/core/Card'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { Product } from '../../Product.type'
import ImageTemplate from '../../../nav/ImageTemplate'
import './Style.css'

type State = {}

type Props = {
  product: Product
  context: Context
}

class ProductCard extends React.Component<Props, State> {
  render() {
    return (
      <Card className="card">
        <ImageTemplate format={'medium'} nameFile={this.props.product.nameFile} />

        <div className="contentText">
          <h3 className="fontWeight12 textSize11 margin1 tac black">
            <span itemProp="name">{this.props.product.name}</span>
          </h3>
          <div className="shortDescriptionDiv tac">
            <p className="textSize7 grey6 margin1">
              <span itemProp="description">{this.props.product.shortDescription}</span>
            </p>
          </div>

          {this.props.context.me && this.props.context.me.role === 'ADMIN' && <div className="black textSize5 width100per"></div>}
          {/* <BuyingButtonProductCard product={this.props.product} /> */}
        </div>
      </Card>
    )
  }
}

export default withContext(ProductCard)
