import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { CREATE_AFFILIATE_COMPANIE_MUTATION } from '../../GraphQL'
import Paper from '@material-ui/core/Paper'
import { withRouter } from 'react-router'
import { Client } from '../../../Client.type'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { Companie, companieClass } from '../../Companie.type'
import { Location } from '../../../Location.type'

import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'

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
  createAffiliateCompanie: any
  context: Context
  history: any
  location: Location
}

class CreateAffiliateCompanie extends React.Component<Props, State> {
  state = {
    loading: false,
    newCompanie: companieClass,
    productNameValidate: true,
    companieNameValidate: true,

    companieName: '',
    productName: ''
  }

  render() {
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <div className="tac">
            <h3>Create Affiliate Account</h3>

            <div className="">
              <div>
                <ButtonLoadingAfterClick
                  id={'idButton'}
                  icon={''}
                  color={'secondary'}
                  disabled={false}
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

              {this.state.newCompanie.id && <p>{this.state.newCompanie.name} successfully created. </p>}
            </div>
          </div>
        </Paper>
      </div>
    )
  }

  _confirm = async () => {
    this.setState({ loading: true })

    let result
    try {
      result = await this.props.createAffiliateCompanie({
        variables: {
          companieName: this.state.companieName,
          productName: this.state.productName,
          userId: this.props.userId
        }
      })
    } catch (e) {
      this.setState({ loading: false })
      e.graphQLErrors.some(graphQLError => this.props.context.openSnackBar(true, graphQLError.message, 'message'))
      throw e
    }

    if (result.data.createAffiliateCompanie) {
      this.setState({
        newCompanie: result.data.createAffiliateCompanie,
        loading: false
      })
    }
  }
}

export default compose(
  withApollo,
  withRouter,
  withContext,
  graphql(CREATE_AFFILIATE_COMPANIE_MUTATION, { name: 'createAffiliateCompanie' })
)(CreateAffiliateCompanie)
