import React from 'react'
import { withRouter } from 'react-router'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import ProductsQueryAutocompleteLight from '../../../product/list/autocomplete/ProductsQueryAutocompleteLight'
import { Product } from '../../../product/Product.type'
// import { IssuedCard } from '../../../issuedCard/IssuedCard.type'
// import './Autocomplete.css'

type State = {
  name: string
  showResults: boolean
}

type Props = {
  onClick: (product: Product) => void
  onChange: (name: string) => void
}

class AutocompleteSearchProducts extends React.Component<Props, State> {
  state = {
    name: '',
    showResults: false,
  }

  onClick = (product: Product) => {
    // const issuedCard = {
    //   ...this.state.issuedCard,
    //   // initProduct: product,
    //   name: product.name
    // }
    this.setState({
      name: '',
      showResults: false,
    })
    // this.props.onChange(product.name, product)
    this.props.onClick(product)
  }

  onChange = (e: any) => {
    if (e.target.value.length <= 20) {
      // const issuedCard = {
      //   ...this.state.issuedCard,
      //   // initProduct: null,
      //   name: e.target.value
      // }
      this.setState({
        name: e.target.value,
        showResults: true,
      })
      this.props.onChange(e.target.value)
    }
  }

  handleKey = (data) => {
    if (data.charCode === 13) {
      this.setState({ showResults: false })
    }
  }

  render() {
    return (
      <>
        <FormControl className="width100per">
          <InputLabel htmlFor="productName_nn">{`Product Name`}</InputLabel>
          <Input id="productName_nn" onKeyPress={this.handleKey} onChange={this.onChange} type="text" value={this.state.name} />
        </FormControl>

        <br />
        {this.state.name && this.state.showResults && (
          <>
            <ProductsQueryAutocompleteLight
              onClick={this.onClick.bind(this)}
              page={1}
              variables={{
                first: 4,
                orderBy: 'name_ASC',
                where: {
                  visibility: 'PUBLIC',
                  // communicationWithSellerType: 'ISSUING_CARD',
                  name: { contains: this.state.name },
                },
              }}
            />
          </>
        )}
      </>
    )
  }
}

export default withRouter(AutocompleteSearchProducts)
