import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { CREATE_CATEGORY_SELLER_MUTATION, CATEGORIES_PRODUCTS_QUERY } from '../GraphQL'
import { withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { CategorieProduct } from '../CategorieProduct.type'

type State = {
  categorieProduct: CategorieProduct
}

type Props = {
  createCategorieProduct: any
  openSnackBar: (message: string) => void
  context: Context
}

class CategorieProductCreate extends React.Component<Props, State> {
  state = {
    categorieProduct: {
      id: '',
      isFeatured: false,
      name: '',
      description: '',
      visibility: 'BTOBE',
      urlName: '',
      nameFile: '',
      nameFileMobile: '',
      nameFileIcon: '',
      orderByInt: 50,
      orderByHomeInt: 50,
      positionProducts: [],
    },
  }

  render() {
    return (
      <Paper className="paperIn">
        <div>
          <FormControl>
            <InputLabel htmlFor="name">{`Name`}</InputLabel>
            <Input
              id="name"
              onChange={(e) =>
                this.setState({
                  categorieProduct: {
                    ...this.state.categorieProduct,
                    name: e.target.value,
                  },
                })
              }
              type="text"
              value={this.state.categorieProduct.name}
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor="urlName">{`URLname (No spaces)`}</InputLabel>
            <Input
              id="urlName"
              onChange={(e) =>
                this.setState({
                  categorieProduct: {
                    ...this.state.categorieProduct,
                    urlName: e.target.value,
                  },
                })
              }
              type="text"
              value={this.state.categorieProduct.urlName}
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor="orderByInt">orderByInt</InputLabel>
            <Input
              id="orderByInt"
              onChange={(e: any) =>
                this.setState({
                  categorieProduct: {
                    ...this.state.categorieProduct,
                    orderByInt: e.target.value,
                  },
                })
              }
              type="number"
              value={this.state.categorieProduct.orderByInt}
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor="visibility">{`visibility`}</InputLabel>
            <Select
              id="visibility"
              value={this.state.categorieProduct.visibility}
              onChange={(e: any) =>
                this.setState({
                  categorieProduct: {
                    ...this.state.categorieProduct,
                    visibility: e.target.value,
                  },
                })
              }>
              <MenuItem value={'BTOBE'}>{`BTOBE`}</MenuItem>
              <MenuItem value={'HIDDEN'}>{`HIDDEN`}</MenuItem>
              <MenuItem value={'COLLECTION'}>{`COLLECTION`}</MenuItem>
            </Select>
          </FormControl>
        </div>
        <br />
        <br />
        <Button onClick={this.createCategorieProduct}>{`Create Category`}</Button>
      </Paper>
    )
  }

  createCategorieProduct = async () => {
    const {
      name,
      nameFile,
      urlName,
      nameFileMobile,
      nameFileIcon,
      orderByInt,
      visibility,
      description,
    } = this.state.categorieProduct
    let newCreateCategorieProduct
    try {
      newCreateCategorieProduct = await this.props.createCategorieProduct({
        variables: {
          data: {
            name,
            nameFile,
            nameFileMobile,
            nameFileIcon,
            urlName,
            description,
            visibility,
            orderByInt: orderByInt * 1,
          },
        },
      })
    } catch (e) {
      this.props.context.openSnackBar(true, e.graphQLErrors[0].message, 'error')
    }
    if (newCreateCategorieProduct) {
      this.props.context.openSnackBar(true, 'Created!', 'message')
    }
  }
}

export default compose(
  graphql(CREATE_CATEGORY_SELLER_MUTATION, {
    name: 'createCategorieProduct',
    options: {
      refetchQueries: [
        {
          query: CATEGORIES_PRODUCTS_QUERY,
        },
      ],
    },
  }),
  withRouter,
  withContext,
  withApollo
)(CategorieProductCreate)
