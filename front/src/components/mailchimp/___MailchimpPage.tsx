import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import Grid from '@material-ui/core/Grid'
import { REFRESH_SENGRID_MUTATION } from './GraphQL'
import Paper from '@material-ui/core/Paper'
import ButtonLoadingAfterClick from '../nav/ButtonLoadingAfterClick'
import { withContext } from '../withContext'
import { Context } from '../Context.type'
import { Client } from '../Client.type'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
// import UpdateUser from './UpdateUser'

type State = {
  show: string
  page: number
  isPersonal: boolean
  loading: boolean
  sengridData: string
  // user: User,
  // errorMessage: string
}

type Props = {
  refreshMailchimp: any
  context: Context
  client: Client
  // user: User,
  // updateUser: any,
}

class mailchimpPage extends React.Component<Props, State> {
  state = {
    loading: false,
    isPersonal: false,
    sengridData: '',
    first: 200,
    page: 1,
    show: '',
    // user: this.props.user,
    // errorMessage: ''
  }

  render() {
    let sengridData

    if (this.state.sengridData) {
      sengridData = JSON.parse(this.state.sengridData)
    }

    // console.log(this.state.sengridData)
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <h2>Mailchimp</h2>

          <Grid container>
            <Grid item xs={12} sm={12} className="marginAuto">
              <FormControl>
                <InputLabel htmlFor="page">{`Page`}</InputLabel>
                <Input
                  id="page"
                  type="number"
                  value={this.state.page}
                  onChange={(e: any) =>
                    this.setState({
                      page: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} className="marginAuto">
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.isPersonal}
                    onChange={(e: any) =>
                      this.setState({
                        isPersonal: e.target.checked,
                      })
                    }
                    value={true}
                  />
                }
                label="isPersonal"
              />
            </Grid>
            <Grid item xs={12} sm={12} className="marginAuto">
              <ButtonLoadingAfterClick
                id={'idButton'}
                size={'medium'}
                icon={''}
                disabled={false}
                buttonText={`Refresh ${this.state.first} contacts in Mailchimp`}
                buttonLoadingText={`Setting up...`}
                variant="outlined"
                loading={this.state.loading}
                color={'secondary'}
                onClick={this.refreshMailchimp}
              />{' '}
            </Grid>
            <Grid item xs={12} sm={12} className="marginAuto">
              {sengridData && (
                <>
                  <h2>{sengridData.countUsers} contacts uploaded</h2>
                  <Button variant="outlined" color={'primary'} onClick={() => this.setState({ show: 'input' })}>
                    Show Input
                  </Button>{' '}
                  <Button variant="outlined" color={'primary'} onClick={() => this.setState({ show: 'output' })}>
                    Show Output
                  </Button>
                  {this.state.show === 'input' && <pre>{JSON.stringify(sengridData.input, null, 2)}</pre>}
                  {this.state.show === 'output' && <pre>{JSON.stringify(sengridData.output, null, 2)}</pre>}
                </>
              )}
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }

  refreshMailchimp = async () => {
    // if (this.props.user.email !== this.props.user.email) {
    //   this.props.context.openSnackBar(true, `Confirm your new email from your inbox. (Don't forget to check your spam folder)`, 'message')
    // }
    // console.log('updateUser')
    this.setState({ loading: true })
    let data
    try {
      data = await this.props.refreshMailchimp({
        variables: {
          first: this.state.first,
          skip: (this.state.page - 1) * this.state.first,
          where: {
            // firstName_contains: 'alan',
            // userRoleCompanies_some: {
            //   companie: {
            //     isPersonal: this.state.isPersonal
            //   }
            // }
          },
          isPersonal: this.state.isPersonal,
        },
      })
    } catch (e) {
      // console.log(e)
      this.setState({ loading: false })
      if (e.graphQLErrors.length) {
        this.props.context.openSnackBar(true, e.graphQLErrors[0].message, 'error')
        // this.setState({ errorMessage: e.graphQLErrors[0].message })
      }
      // this.setState
    }
    // console.log(data)
    this.setState({ loading: false })
    // console.log(data)
    this.setState({ sengridData: data.data.refreshSendgrid })
    // this.props.context.openSnackBar(true, `Done.`, 'message')
  }
}

export default compose(
  graphql(REFRESH_SENGRID_MUTATION, {
    name: 'refreshMailchimp',
  }),
  // withRouter,
  withContext,
  withApollo
)(mailchimpPage)
