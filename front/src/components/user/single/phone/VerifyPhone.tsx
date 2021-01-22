import React from 'react'

import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { VERIFY_PHONE_MUTATION } from './GraphQL'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withContext } from '../../../withContext'
import { User } from '../../User.type'
import { Context } from '../../../Context.type'
import VerifyPhoneForm from './VerifyPhoneForm'
// import UpdateIsPhoneValidationRequired from '../action/___UpdateIsPhoneValidationRequired'

type State = {
  loading: boolean
  errorMessage: string
}

type Props = {
  context: Context
  user: User
  updatePhone: any
  onUpdate: () => void
  onCancel: () => void
}

class VerifyPhone extends React.Component<Props, State> {
  state = {
    loading: false,
    errorMessage: '',
  }

  render() {
    return (
      <>
        <VerifyPhoneForm onVerify={(phoneValidationToken) => this.updatePhone(phoneValidationToken)} />
        <div style={{ height: '10px' }} />
        <div>{this.state.errorMessage && <span className="secondary">{this.state.errorMessage}</span>}</div>
        <div style={{ height: '10px' }} />
        <div>
          <Grid container>
            <Grid item xs={12} sm={4} className="tal">
              <Button
                onClick={() => {
                  this.props.onCancel()
                }}>{`Back`}</Button>
            </Grid>
            <Grid item xs={12} sm={8} className="tar">
              {/* {this.props.user.isPhoneValidationRequired && <UpdateIsPhoneValidationRequired user={this.props.user} />} */}
              <a href="https://nachonacho.com/contact">
                <Button color={'primary'} variant={undefined}>
                  {`Contact us if you don't get the SMS`}
                </Button>
              </a>
            </Grid>{' '}
          </Grid>
        </div>
      </>
    )
  }

  updatePhone = async (phoneValidationToken: string) => {
    this.setState({ loading: true })
    let data
    try {
      data = await this.props.updatePhone({
        variables: {
          where: { id: this.props.user.id },
          data: {
            phoneValidationToken,
          },
        },
      })
    } catch (e) {
      this.setState({ loading: false })
      // console.log(e)
      if (e.graphQLErrors.length) {
        this.setState({ errorMessage: e.graphQLErrors[0].message })
      }
      // this.setState
    }
    if (data) {
      console.log(data)
      this.setState({ loading: false })
      this.props.context.openSnackBar(true, 'Phone Verified!', 'message', 2000)
      this.props.onUpdate()
    }
  }
}

export default compose(
  graphql(VERIFY_PHONE_MUTATION, {
    name: 'updatePhone',
  }),
  // withRouter,
  withContext
  // withApollo
)(VerifyPhone)
