import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { CREATE_SELLER_COMPANIE_MUTATION } from '../GraphQL'
import { Link } from 'react-router-dom'
import { Paper, Button, Input, InputLabel, FormHelperText, FormControl } from '@material-ui/core/'

import { withRouter } from 'react-router'
import { Client } from '../../Client.type'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Companie, companieClass } from '../Companie.type'
import { Location } from '../../Location.type'

import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

// const queryString = require('query-string')

type State = {
  newCompanie: Companie
  companieNameValidate: boolean
  productNameValidate: boolean
  loading: boolean
  companieName: string
  productName: string
}

type Props = {
  client: Client
  userId: string
  createSellerCompanie: any
  context: Context
  history: any
  location: Location
}

class CreateSellerCompanie extends React.Component<Props, State> {
  state = {
    loading: false,
    newCompanie: companieClass,
    productNameValidate: true,
    companieNameValidate: true,

    companieName: '',
    productName: '',
  }

  resetFields = () => {
    this.setState({
      ...this.state,

      companieName: '',
      productName: '',
    })
  }

  render() {
    return (
      // <div className="responsiveMargin2">
      <div className="paperOut">
        <Paper className="paperIn">
          <div className="tac">
            <h3>Seller Account</h3>

            {this.state.newCompanie.id ? (
              <p>
                Account {this.state.newCompanie.name} successfully created.{' '}
                <Link className="link" to={`/?companyContext=${this.state.newCompanie.id}`}>
                  <Button color="primary" variant="contained">
                    Go to new Seller Account
                  </Button>
                </Link>
              </p>
            ) : (
              <>
                <p>
                  A Seller Account is used by vendors of subscriptions. Vendors list their products on NachoNacho Seller Station
                  to get exposure to thousands of businesses and acquire subscribers at significantly reduced costs.
                </p>
                <div className="">
                  <div>
                    <FormControl>
                      <InputLabel htmlFor="companieName">{`Legal name of company`}</InputLabel>
                      <Input
                        id="companieName"
                        className="inputResponsive"
                        value={this.state.companieName}
                        error={!this.state.companieNameValidate}
                        onChange={(e) => {
                          this.setState({
                            companieName: e.target.value,
                            companieNameValidate: e.target.value.length > 1 ? true : false,
                          })
                        }}
                        type="text"
                      />
                      {!this.state.companieNameValidate && <FormHelperText error>{`Cannot be empty`}</FormHelperText>}
                    </FormControl>
                  </div>
                  <div>
                    <FormControl>
                      <InputLabel htmlFor="productName">{`Brand Name`}</InputLabel>
                      <Input
                        id="productName"
                        className="inputResponsive"
                        value={this.state.productName}
                        error={!this.state.productNameValidate}
                        onChange={(e) => {
                          this.setState({
                            productName: e.target.value,
                            productNameValidate: true,
                          })
                        }}
                        type="text"
                      />
                      {!this.state.productNameValidate && <FormHelperText error>{`Cannot be empty`}</FormHelperText>}
                      <FormHelperText>{`Name of product as displayed in marketplace`}</FormHelperText>
                    </FormControl>
                  </div>
                  <br />
                  <div>
                    <ButtonLoadingAfterClick
                      id={'idButton'}
                      icon={''}
                      color={'secondary'}
                      disabled={!this.isFormValidation()}
                      variant={'outlined'}
                      size={'medium'}
                      buttonText={`Submit`}
                      buttonLoadingText={`Setting up...`}
                      onClick={() => {
                        this._confirm()
                      }}
                      loading={this.state.loading}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </Paper>
      </div>
      // </div>
    )
  }

  isFormValidation = () => {
    return this.state.productNameValidate && this.state.companieNameValidate
  }

  _confirm = async () => {
    this.setState({ loading: true })

    let result
    try {
      result = await this.props.createSellerCompanie({
        variables: {
          companieName: this.state.companieName,
          productName: this.state.productName,
          userId: this.props.userId,
        },
      })
    } catch (e) {
      this.setState({ loading: false })
      e.graphQLErrors.some((graphQLError) => this.props.context.openSnackBar(true, graphQLError.message, 'message'))
      throw e
    }

    if (result.data.createSellerCompanie) {
      this.setState({
        newCompanie: result.data.createSellerCompanie,
        loading: false,
      })
      this.resetFields()
    }
  }
}

export default compose(
  withApollo,
  withRouter,
  withContext,
  graphql(CREATE_SELLER_COMPANIE_MUTATION, { name: 'createSellerCompanie' })
)(CreateSellerCompanie)
