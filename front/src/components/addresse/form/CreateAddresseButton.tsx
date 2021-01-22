import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Paper } from '@material-ui/core/'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import AddAddresseContainer from '../AddAddresseContainer'

type State = {
  isShow: boolean
}
type Props = {
  title: string
  type: string
  context: Context
  companieId: string
  userId: string
}

class CreateAddresseButton extends React.Component<Props, State> {
  state = {
    isShow: false,
  }
  render() {
    return (
      <>
        {!this.state.isShow ? (
          <div className="paperOut">
            <Paper className="paperIn">
              <Grid container>
                <Grid item xs={6} sm={6} className="">
                  <h3>{this.props.title}</h3>
                </Grid>
                <Grid item xs={6} sm={6} className="tar">
                  {this.props.context.userRoleCompanie.permissions.includes('canEditBillingAddress') && (
                    <Button
                      variant="outlined"
                      color="primary"
                      id={`edit_address_${this.props.type}`}
                      onClick={() => {
                        this.setState({ isShow: !this.state.isShow })
                      }}>
                      {`Edit`}
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </div>
        ) : (
          <>
            <div className="paperOut">
              <Paper className="paperIn">
                <AddAddresseContainer
                  companieId={this.props.companieId}
                  type={this.props.type}
                  userId={this.props.userId}
                  onCancel={() => this.setState({ isShow: false })}
                />
              </Paper>
            </div>
          </>
        )}
      </>
    )
  }
}

export default withContext(CreateAddresseButton)
