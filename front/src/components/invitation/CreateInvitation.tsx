import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { CREATE_INVITATION_MUTATION } from './GraphQL'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Paper from '@material-ui/core/Paper'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import { Client } from '../Client.type'
import { withContext } from '../withContext'
import { Context } from '../Context.type'
import { Event } from '../Event.type'
import utils from '../utils'
import ButtonLoadingAfterClick from '../nav/ButtonLoadingAfterClick'
import CustomTooltip from '../nav/customTooltip/CustomTooltip'

var validator = require('email-validator')

type State = {
  companieRole: string
  email: string
  isEmailValidated: boolean
  showAddUser: boolean
  loading: boolean
}
type Props = {
  context: Context
  companieId: string
  event: Event
  client: Client
  createInvitation: any
}

class CreateInvitation extends React.Component<Props, State> {
  state = {
    loading: false,
    showAddUser: false,
    email: '',
    companieRole: 'PURCHASER',
    isEmailValidated: true
  }

  handleChange = (event: Event) => {
    this.setState({ companieRole: event.target.value })
  }
  onChangeEmail = e => {
    this.setState({
      email: e.target.value,
      isEmailValidated: validator.validate(e.target.value)
    })
  }

  render() {
    return (
      <>
        {!this.state.showAddUser ? (
          <div className="tar">
            {this.props.context.userRoleCompanie.permissions &&
              this.props.context.userRoleCompanie.permissions.includes('canAddUserInCompanie') && (
                <>
                  <CustomTooltip
                    placementDesktop={'left-start'}
                    type={'inviteMembersTooltip'}
                    userId={this.props.context.me.id}
                    text={`Invite members of your group and allocate NachoCards to them`}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => this.setState({ showAddUser: !this.state.showAddUser })}>{`+ Members`}</Button>
                  </CustomTooltip>
                </>
              )}
          </div>
        ) : (
          <div className="paperOut">
            <Paper className="paperIn">
              <Grid container>
                <Grid item xs={12} sm={12} className="tal">
                  <div>
                    <FormControl component="fieldset">
                      <RadioGroup name="companieRole1" value={this.state.companieRole} onChange={this.handleChange}>
                        <FormControlLabel
                          value="ADMIN"
                          control={<Radio />}
                          label={
                            <div>
                              Admin{' '}
                              <span className="textSize6 grey">{`(Can add payment source, create NachoCards, set budgets, invite members, assign roles)`}</span>
                            </div>
                          }
                        />

                        <FormControlLabel
                          value="PURCHASER"
                          control={<Radio />}
                          label={
                            <div>
                              Purchaser <span className="textSize6 grey">{`(Can use NachoCards created by Admins)`}</span>
                            </div>
                          }
                        />

                        <FormControlLabel
                          value="ANALYST"
                          control={<Radio />}
                          label={
                            <div>
                              Analyst <span className="textSize6 grey">{`(Can view everything, cannot use NachoCards)`}</span>
                            </div>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <div>
                    <FormControl>
                      <InputLabel htmlFor="email">{`Member's email address`}</InputLabel>
                      <Input
                        id="email"
                        error={!this.state.isEmailValidated}
                        className="inputResponsive"
                        onChange={this.onChangeEmail}
                        type="text"
                        value={this.state.email}
                      />
                    </FormControl>
                  </div>
                  <div style={{ height: '10px' }} />
                  <div>
                    <ButtonLoadingAfterClick
                      id={'idButton'}
                      icon={''}
                      color={'primary'}
                      variant={'outlined'}
                      disabled={!(this.state.companieRole && this.state.email && this.state.isEmailValidated)}
                      size={'medium'}
                      buttonText={`Invite`}
                      buttonLoadingText={`Setting up...`}
                      onClick={() => {
                        this.createInvitation()
                      }}
                      loading={this.state.loading}
                    />{' '}
                    {/* <Button
                      disabled={!(this.state.companieRole && this.state.email && this.state.isEmailValidated)}
                      color="primary"
                      variant="outlined"
                      onClick={() => this.createInvitation()}>{`Invite`}</Button>{' '}*/}
                    <Button onClick={() => this.setState({ showAddUser: !this.state.showAddUser })}>{`Cancel`}</Button>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </div>
        )}
      </>
    )
  }

  createInvitation = async () => {
    this.setState({ loading: true })
    let invitation
    try {
      invitation = await this.props.createInvitation({
        variables: {
          email: this.state.email,
          companieRole: this.state.companieRole,
          companieId: this.props.companieId,
          timeZone: utils.getUserTimeZone()
        }
      })
    } catch (e) {
      this.setState({ loading: false })
      console.log(e)
      e.graphQLErrors.some(graphQLError => this.props.context.openSnackBar(true, graphQLError.message, 'message'))
    }
    this.setState({ loading: false })
    if (invitation) {
      this.props.client.resetStore()
      this.setState({
        showAddUser: false,
        email: '',
        isEmailValidated: true
      })
    }
  }
}

export default compose(
  graphql(CREATE_INVITATION_MUTATION, {
    name: 'createInvitation'
  }),
  withRouter,
  withContext,
  withApollo
)(CreateInvitation)
