import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { SIGNUP_INVITE_SELLER_MUTATION } from '../GraphQL'
import EmailElement from '../EmailElement'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import { withRouter } from 'react-router'
import { Client } from '../../../Client.type'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { Location } from '../../../Location.type'

import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'

const queryString = require('query-string')

type State = {
  email: string
  lastNameValidation: boolean
  companieNameValidate: boolean
  productNameValidate: boolean
  firstNameValide: boolean
  emailValidation: boolean
  showCreateCompanie: boolean
  inputValidation2: boolean
  loading: boolean
  firstName: string
  lastName: string
  idUser: string
  companieName: string
  productName: string
}

type Props = {
  client: Client
  signupInviteSeller: any
  context: Context
  history: any
  location: Location
}

class SignupInviteSeller extends React.Component<Props, State> {
  state = {
    loading: false,
    showCreateCompanie: false,
    email: queryString.parse(this.props.location.search).email ? queryString.parse(this.props.location.search).email : '',
    lastNameValidation: true,
    firstNameValide: true,
    productNameValidate: true,
    companieNameValidate: true,
    emailValidation: true,
    inputValidation2: true,

    firstName: '',
    lastName: '',
    idUser: '',
    companieName: '',
    productName: '',
  }

  resetFields = () => {
    this.setState({
      ...this.state,
      showCreateCompanie: false,
      firstName: '',
      lastName: '',
      email: '',
      companieName: '',
      productName: '',
    })
  }

  onChangeEmail(stateEmail) {
    this.setState({
      email: stateEmail.email,
      emailValidation: stateEmail.inputValidation2,
    })
  }
  onChangeLastName(lastName: string) {
    this.setState({
      lastName,
      lastNameValidation: this.validateLastName(lastName),
    })
  }
  onChangeFirstName(firstName: string) {
    this.setState({
      firstName,
      firstNameValide: this.validateFirstName(firstName),
    })
  }

  validateFirstName(input: string) {
    return input.length > 0
  }
  validatePhone(input: string) {
    return input.length > 0
  }
  validateLastName(input: string) {
    return input.length > 0
  }

  render() {
    return (
      <div className="responsiveMargin2">
        <div className="paperOut">
          <Paper className="paperIn">
            <div className="tac">
              <h3>Invite Seller</h3>

              <div className="">
                <br />
                <div>
                  <FormControl>
                    <InputLabel htmlFor="firstName">{`First Name`}</InputLabel>
                    <Input
                      id="firstName"
                      className="inputResponsive"
                      error={!this.state.firstNameValide}
                      value={this.state.firstName}
                      onChange={(e) => this.onChangeFirstName(e.target.value)}
                      type="text"
                    />
                    {!this.state.firstNameValide && <FormHelperText error>{`Cannot be empty`}</FormHelperText>}
                  </FormControl>
                </div>
                <div>
                  <FormControl>
                    <InputLabel htmlFor="lastName">{`Last Name`}</InputLabel>
                    <Input
                      id="lastName"
                      className="inputResponsive"
                      value={this.state.lastName}
                      error={!this.state.lastNameValidation}
                      onChange={(e) => this.onChangeLastName(e.target.value)}
                      type="text"
                    />
                    {!this.state.lastNameValidation && <FormHelperText error>{`Cannot be empty`}</FormHelperText>}
                  </FormControl>
                </div>

                <div>
                  <EmailElement
                    className="inputResponsive"
                    handleNext={() => {}}
                    email={this.state.email}
                    onChange2={this.onChangeEmail.bind(this)}
                  />
                </div>

                <div>
                  <FormControl>
                    <InputLabel htmlFor="companieName">{`Company Name`}</InputLabel>
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
                    <InputLabel htmlFor="productName">{`Product Name`}</InputLabel>
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
            </div>
          </Paper>
        </div>
      </div>
    )
  }

  isFormValidation = () => {
    return (
      this.state.lastNameValidation &&
      this.state.firstNameValide &&
      this.state.emailValidation &&
      this.state.companieNameValidate &&
      this.state.email.length > 1 &&
      this.state.inputValidation2
    )
  }

  _confirm = async () => {
    if (!this.isFormValidation()) {
      this.props.context.openSnackBar(true, 'Error', 'message')
      return
    }

    this.setState({ loading: true })

    let result
    try {
      result = await this.props.signupInviteSeller({
        variables: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          invitedByCompanieId: this.props.context.userRoleCompanie.companie.id,

          companieName: this.state.companieName,
          productName: this.state.productName,
        },
      })
    } catch (e) {
      this.setState({ loading: false })
      if (e.graphQLErrors.length) {
        this.props.context.openSnackBar(true, e.graphQLErrors[0].message, 'message')
      } else {
        this.props.context.openSnackBar(true, `An unexpected error has occurred. Please try again or contact us.`, 'error')
      }
      throw e
    }
    if (result.data.signupInviteSeller) {
      this.setState({ loading: false })
      this.resetFields()
      this.props.context.openSnackBar(true, `Invitation sent`, 'message')
    }
  }
}

export default compose(
  withApollo,
  withRouter,
  withContext,
  graphql(SIGNUP_INVITE_SELLER_MUTATION, { name: 'signupInviteSeller' })
)(SignupInviteSeller)
