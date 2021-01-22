
import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { COMPANIE_QUERY } from '../GraphQL'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import OnboardingLeadershipForm from '../../onboarding/OnboardingLeadershipForm'
import BusinessLeadershipView from './BusinessLeadershipView'

type State = {
  editMode: boolean
}
type Props = {
  companieId: string
  context: Context
  companieQuery: any
}

class BusinessLeadership extends React.Component<Props, State> {
  state = {
    editMode: false
  }

  render() {
    if (this.props.companieQuery.error) {
      return (
        <Error
          message={this.props.companieQuery.error.graphQLErrors.length && this.props.companieQuery.error.graphQLErrors[0].message}
        />
      )
    }
    if (this.props.companieQuery.loading) {
      return <Loading />
    }
    if (!this.props.companieQuery) {
      return <NotFound />
    }

    return (
      <>
        <div className="paperOut">
          <Paper className="paperIn">
            {this.state.editMode ? (
              <OnboardingLeadershipForm
                textButton={'Save'}
                textCancelButton={'Cancel'}
                onUpdate={() => this.setState({ editMode: false })}
                onCancel={() => this.setState({ editMode: false })}
                companie={this.props.companieQuery.companie}
              />
            ) : (
              <div>
                <div className="tar">
                  {this.props.context.userRoleCompanie.permissions &&
                    this.props.context.userRoleCompanie.permissions.includes('canEditCompanie') && (
                      <Button variant="outlined" color={'primary'} onClick={() => this.setState({ editMode: true })}>
                        {`Edit`}
                      </Button>
                    )}
                </div>
                <BusinessLeadershipView companie={this.props.companieQuery.companie} />
              </div>
            )}
          </Paper>
        </div>
      </>
    )
  }
}

export default compose(
  graphql(COMPANIE_QUERY, {
    name: 'companieQuery',
    options: (props: Props) => ({
      variables: {
        where: {
          id: props.companieId
        }
      }
    })
  }),
  withRouter,
  withContext
)(BusinessLeadership)
