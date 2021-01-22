import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import { MerchantData } from '../MerchantData.type'
import { Product } from '../../product/Product.type'
import CreateMerchantData from './CreateMerchantData'
import UpdateMerchantData from './UpdateMerchantData'
type State = {
  merchantData: MerchantData
}
type Props = {
  onCancel: () => void
  product: Product
  merchantData: MerchantData
}

class MerchantDataForm extends React.Component<Props, State> {
  state = {
    merchantData: this.props.merchantData,
  }
  cleanFields() {}

  render() {
    return (
      <>
        <div>
          <FormControl>
            <InputLabel htmlFor="category">{`category`}</InputLabel>
            <Input
              id="category"
              type="text"
              value={this.state.merchantData.category}
              onChange={(e) =>
                this.setState({
                  merchantData: {
                    ...this.state.merchantData,
                    category: e.target.value,
                  },
                })
              }
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor="city">{`city`}</InputLabel>
            <Input
              id="city"
              type="text"
              value={this.state.merchantData.city}
              onChange={(e) =>
                this.setState({
                  merchantData: {
                    ...this.state.merchantData,
                    city: e.target.value,
                  },
                })
              }
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor="country">{`country`}</InputLabel>
            <Input
              id="country"
              type="text"
              value={this.state.merchantData.country}
              onChange={(e) =>
                this.setState({
                  merchantData: {
                    ...this.state.merchantData,
                    country: e.target.value,
                  },
                })
              }
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor="name">{`name`}</InputLabel>
            <Input
              id="name"
              type="text"
              value={this.state.merchantData.name}
              onChange={(e) =>
                this.setState({
                  merchantData: {
                    ...this.state.merchantData,
                    name: e.target.value,
                  },
                })
              }
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor="network_id">{`network_id`}</InputLabel>
            <Input
              id="network_id"
              type="text"
              value={this.state.merchantData.network_id}
              onChange={(e) =>
                this.setState({
                  merchantData: {
                    ...this.state.merchantData,
                    network_id: e.target.value,
                  },
                })
              }
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor="postal_code">{`postal_code`}</InputLabel>
            <Input
              id="postal_code"
              type="text"
              value={this.state.merchantData.postal_code}
              onChange={(e) =>
                this.setState({
                  merchantData: {
                    ...this.state.merchantData,
                    postal_code: e.target.value,
                  },
                })
              }
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor="state">{`state`}</InputLabel>
            <Input
              id="state"
              type="text"
              value={this.state.merchantData.state}
              onChange={(e) =>
                this.setState({
                  merchantData: {
                    ...this.state.merchantData,
                    state: e.target.value,
                  },
                })
              }
            />
          </FormControl>
        </div>
        {/* <div>
          <FormControl>
            <InputLabel htmlFor="productId">{`productId`}</InputLabel>
            <Input
              id="productId"
              type="text"
              value={this.state.merchantData.product.id}
              onChange={e =>
                this.setState({
                  merchantData: {
                    ...this.state.merchantData,
                    product: {
                      ...this.state.merchantData.product,
                      id: e.target.value
                    }
                  }
                })
              }
            />
          </FormControl>
        </div> */}

        <div>
          {this.state.merchantData.id ? (
            <UpdateMerchantData merchantData={this.state.merchantData} />
          ) : (
            <CreateMerchantData
              cleanFields={() => this.cleanFields()}
              merchantData={this.state.merchantData}
              product={this.props.product}
            />
          )}{' '}
          <Button
            onClick={() => {
              this.props.onCancel()
            }}>
            {`Cancel`}
          </Button>
        </div>
      </>
    )
  }
}

export default MerchantDataForm
