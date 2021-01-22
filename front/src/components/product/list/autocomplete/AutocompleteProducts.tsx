import React from 'react'
import { withRouter } from 'react-router'
import TextField from '@material-ui/core/TextField'
import ProductsQueryAutocomplete from '../../../product/list/autocomplete/ProductsQueryAutocomplete'
import { Product } from '../../../product/Product.type'
// import './Autocomplete.css'

type State = {
  queryAutocomplete: string
  orderBy: string
}

type Props = {
  onElemSelected: (elem: Product) => void
}

class AutocompleteProducts extends React.Component<Props, State> {
  state = {
    queryAutocomplete: '',
    orderBy: 'name_ASC',
  }

  elemClicked(elem: Product) {
    this.setState({
      queryAutocomplete: '',
    })
    this.props.onElemSelected(elem)
  }

  render() {
    return (
      <div>
        <TextField
          value={this.state.queryAutocomplete}
          onChange={(e) =>
            this.setState({
              queryAutocomplete: e.target.value,
            })
          }
          type="text"
          label={`Search Product`}
        />
        <br />
        {this.state.queryAutocomplete && (
          <>
            <ProductsQueryAutocomplete
              onClick={this.elemClicked.bind(this)}
              isActionClickIsLink={true}
              page={1}
              variables={{
                first: 5,
                where: {
                  // communicationWithSellerType: 'ISSUING_CARD',
                  name: { contains: this.state.queryAutocomplete },
                  visibility: 'PUBLIC',
                },
              }}
            />
          </>
        )}
      </div>
    )
  }
}

export default withRouter(AutocompleteProducts)
