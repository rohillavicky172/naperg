import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { UPDATE_CATEGORY_SELLER_MUTATION, CATEGORIES_SINGLE_PRODUCTS_QUERY } from '../GraphQL'
import { withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import { CategorieProduct } from '../CategorieProduct.type'
import UploadFile from '../../nav/file/UploadFile'
// import CategorieProductDuplicate from './CategorieProductDuplicate'
// import CategorieProductDelete from './CategorieProductDelete'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'

type State = {
  categorieSingleProducts: CategorieProduct
}

type Props = {
  context: Context
  categorieSingleProducts: CategorieProduct
  updateCategorieProduct: any
  client: any
}

class CategorieProductEdit extends React.Component<Props, State> {
  state = {
    categorieSingleProducts: this.props.categorieSingleProducts,
  }

  render() {
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <h2>{`Edit Category`}</h2>

          <FormControl className="width100per">
            <InputLabel htmlFor="name">{`Name`}</InputLabel>
            <Input
              id="name"
              value={this.state.categorieSingleProducts.name}
              onChange={(e) =>
                this.setState({
                  categorieSingleProducts: {
                    ...this.state.categorieSingleProducts,
                    name: e.target.value,
                  },
                })
              }
              type="text"
            />
          </FormControl>
          <FormControl className="width100per">
            <InputLabel htmlFor="description">{`description`}</InputLabel>
            <Input
              id="description"
              value={this.state.categorieSingleProducts.description}
              onChange={(e) =>
                this.setState({
                  categorieSingleProducts: {
                    ...this.state.categorieSingleProducts,
                    description: e.target.value,
                  },
                })
              }
              type="text"
            />
          </FormControl>
          <FormControl className="width100per">
            <InputLabel htmlFor="urlName">{`URL Name`}</InputLabel>
            <Input
              id="urlName"
              value={this.state.categorieSingleProducts.urlName}
              onChange={(e) =>
                this.setState({
                  categorieSingleProducts: {
                    ...this.state.categorieSingleProducts,
                    urlName: e.target.value,
                  },
                })
              }
              type="text"
            />
          </FormControl>
          <FormControl className="width100per">
            <InputLabel htmlFor="orderByInt">{`orderByInt`}</InputLabel>
            <Input
              id="orderByInt"
              value={this.state.categorieSingleProducts.orderByInt}
              onChange={(e: any) =>
                this.setState({
                  categorieSingleProducts: {
                    ...this.state.categorieSingleProducts,
                    orderByInt: e.target.value,
                  },
                })
              }
              type="number"
            />
          </FormControl>
          <FormControl className="width100per">
            <InputLabel htmlFor="visibility">{`visibility`}</InputLabel>
            <Select
              id="visibility"
              value={this.state.categorieSingleProducts.visibility}
              onChange={(e: any) =>
                this.setState({
                  categorieSingleProducts: {
                    ...this.state.categorieSingleProducts,
                    visibility: e.target.value,
                  },
                })
              }>
              <MenuItem value={'BTOBE'}>{`BTOBE`}</MenuItem>
              <MenuItem value={'HIDDEN'}>{`HIDDEN`}</MenuItem>
              <MenuItem value={'COLLECTION'}>{`COLLECTION`}</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <Grid container>
            {/* <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Paper className="paperIn">
              <h4>{`Image desktop(1280x500=>ratio: 2.56)`}</h4>
              <UploadFile
                uploadImageText={`Upload image`}
                deleteImageText={`Delete image`}
                isEditMode={true}
                nameFile={this.state.categorieSingleProducts.nameFile}
                onSelectFile={nameFile =>
                  this.setState({
                    categorieSingleProducts: {
                      ...this.state.categorieSingleProducts,
                      nameFile: nameFile
                    }
                  })
                }
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Paper className="paperIn">
              <h4>{`Image mobile (720x300=>ratio: 2.25)`}</h4>
              <UploadFile
                uploadImageText={`Upload image`}
                deleteImageText={`Delete image`}
                isEditMode={true}
                nameFile={this.state.categorieSingleProducts.nameFileMobile}
                onSelectFile={nameFileMobile =>
                  this.setState({
                    categorieSingleProducts: {
                      ...this.state.categorieSingleProducts,
                      nameFileMobile: nameFileMobile
                    }
                  })
                }
              />
            </Paper>
          </Grid> */}
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Paper className="paperIn">
                <h4>{`Category Icon`}</h4>
                <UploadFile
                  format="FREE"
                  deleteImageText={`Delete image`}
                  nameFile={this.state.categorieSingleProducts.nameFileIcon}
                  onSelectFile={(nameFileIcon) =>
                    this.setState({
                      categorieSingleProducts: {
                        ...this.state.categorieSingleProducts,
                        nameFileIcon: nameFileIcon,
                      },
                    })
                  }
                />
              </Paper>
            </Grid>
          </Grid>
          <br />
          <Button color="primary" variant="outlined" onClick={this.updateCategorieProduct}>{`Update Category`}</Button>
          {/* <CategorieProductDuplicate categorieProduct={this.state.categorieSingleProducts} /> */}
        </Paper>
      </div>
    )
  }

  updateCategorieProduct = async () => {
    let categorieProduct
    try {
      categorieProduct = await this.props.updateCategorieProduct({
        variables: {
          where: { id: this.state.categorieSingleProducts.id },
          data: {
            name: this.state.categorieSingleProducts.name,
            description: this.state.categorieSingleProducts.description,
            nameFile: this.state.categorieSingleProducts.nameFile,
            visibility: this.state.categorieSingleProducts.visibility,
            orderByInt: this.state.categorieSingleProducts.orderByInt * 1,
            nameFileMobile: this.state.categorieSingleProducts.nameFileMobile,
            nameFileIcon: this.state.categorieSingleProducts.nameFileIcon,
            urlName: this.state.categorieSingleProducts.urlName,
          },
        },
      })
    } catch (e) {
      this.props.context.openSnackBar(true, e.graphQLErrors[0].message, 'error')
    }
    if (categorieProduct) {
      this.props.context.openSnackBar(true, `Updated!`, 'message')
      this.props.client.clearStore()
    }
  }
}

export default compose(
  graphql(UPDATE_CATEGORY_SELLER_MUTATION, {
    name: 'updateCategorieProduct',
    options: (props: Props) => ({
      refetchQueries: [
        {
          query: CATEGORIES_SINGLE_PRODUCTS_QUERY,
          variables: { urlName: props.categorieSingleProducts.urlName },
        },
      ],
    }),
  }),
  withRouter,
  withApollo,
  withContext
)(CategorieProductEdit)
