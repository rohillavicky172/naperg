import React from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import UpdatePasswordForm from './UpdatePasswordForm'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import UseWindowDimensions from '../../UseWindowDimensions'

type State = {
  isEditMode: boolean
}

type Props = { context: Context }

class UpdatePassword extends React.Component<Props, State> {
  state = {
    isEditMode: false,
  }

  render() {
    const isMobile = UseWindowDimensions.isMobile()
    return (
      <>
        <div className="paperOut">
          <h3>{`Password`}</h3>
          <Paper className="paperIn">
            {this.state.isEditMode ? (
              <UpdatePasswordForm
                onCancel={() => this.setState({ isEditMode: false })}
                onUpdate={() => this.setState({ isEditMode: false })}
              />
            ) : (
              <>
                <div className="tar">
                  <Button
                    color={'primary'}
                    variant="outlined"
                    size="small"
                    onClick={() => this.setState({ isEditMode: !this.state.isEditMode })}>
                    {`Edit`}
                  </Button>
                </div>
                <Grid container alignItems="flex-end">
                  <Grid item xs={12} md={4} className="bold">
                    {`Password:`}
                  </Grid>

                  <Grid item xs={12} md={8}>
                    {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                    *************
                  </Grid>
                </Grid>
              </>
            )}
          </Paper>
        </div>
      </>
    )
  }
}

export default withContext(UpdatePassword)
