import React from 'react'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import DeletePromotion from './DeletePromotion'
import { Promotion } from './Promotion.type'
import PromotionForm from './form/PromotionForm'
import { Product } from '../product/Product.type'
import DateComponent from '../nav/DateComponent'
import { Link } from 'react-router-dom'
// import utils from '../utils'

type State = {}
type Props = {
  promotion: Promotion
  product: Product
}

class SinglePromotion extends React.Component<Props, State> {
  state = {
    isEditMode: false,
  }

  render() {
    return (
      <>
        <Button onClick={() => this.setState({ isEditMode: true })}>
          <Icon>border_color</Icon>
        </Button>

        {this.state.isEditMode ? (
          <PromotionForm
            onUpdate={() => this.setState({ isEditMode: false })}
            onCancel={() => this.setState({ isEditMode: false })}
            product={this.props.product}
            promotion={this.props.promotion}
          />
        ) : (
          <>
            <DeletePromotion promotionId={this.props.promotion.id} />

            <h3>
              {`type:`} {this.props.promotion.type}
            </h3>

            <div>
              {'CreatedAt: '}
              <DateComponent date={this.props.promotion.createdAt} />
            </div>
            <div>
              {'startAt: '}
              <DateComponent date={this.props.promotion.startAt} />
            </div>
            <div>
              {'endAt: '}
              <DateComponent date={this.props.promotion.endAt} />
            </div>
            <div>
              {`id:`} {this.props.promotion.id}
            </div>
            <div>
              {`Discount:`} {this.props.promotion.discount}%
            </div>
            <div>
              {`Window:`} {this.props.promotion.window} Days
            </div>

            <div>
              {`text1:`} {this.props.promotion.text1}
            </div>
            <div>
              {`text2:`} {this.props.promotion.text2}
            </div>
            <div>
              {`text3:`} {this.props.promotion.text3}
            </div>
            <div>
              <Link className="link" to={`/adminInvoices/?promotionId=${this.props.promotion.id}`}>
                See Invoices
              </Link>
            </div>
            <div>
              <Link className="link" to={`/logs?promotionId=${this.props.promotion.id}`}>
                logs
              </Link>
            </div>
            <div>
              <Link className="link" to={`/promotions?promotionId=${this.props.promotion.id}`}>
                promotion
              </Link>
            </div>
            {/* <div>{this.props.promotion.isPromotionLive && <span className="secondary">LIVE</span>}</div> */}
          </>
        )}

        <Divider />
      </>
    )
  }
}

export default SinglePromotion
