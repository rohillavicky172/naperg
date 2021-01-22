import React from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { flowRight as compose } from 'lodash'
import { withRouter, Link } from 'react-router-dom'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { History } from '../../History.type'
import { Companie } from '../Companie.type'

type State = {}

type Props = {
  context: Context,
  companie: Companie,
  history: History,
  location: Location
}

class CompanieAccountType extends React.Component<Props, State> {
  render() {
    return (
      <>
        <div className="paperOut">
          <h3>Account Type</h3>

          <div className="paperOut">
            <Paper className="paperIn">
              <FormControl disabled component="fieldset">
                <RadioGroup name="isVerified" value={this.props.companie.isTrustedPayment} onChange={() => {}}>
                  <FormControlLabel value={true} control={<Radio />} label={'Pay-As-You-Go'} />
                  <FormControlLabel value={false} control={<Radio />} label={'Prepaid'} />
                </RadioGroup>
              </FormControl>
              <div style={{ height: '10px' }} />
              <div>
                NachoNacho has two types of accounts:
                <ul>
                  <li>Prepaid Account: you need to load funds into your NachoNacho account before you can use your NachoCards</li>
                  <li>
                    Pay-As-You-Go Account: we draw funds from your Payment Source simultaneously when your NachoCards are used
                  </li>
                </ul>
              </div>

              {!this.props.companie.isTrustedPayment && (
                <p>
                  <Link to={'/onboarding'}>
                    <Button color={'primary'} variant="outlined">
                      Apply for Pay-As-You-Go Account
                    </Button>
                  </Link>
                </p>
              )}
            </Paper>
          </div>
        </div>
      </>
    )
  }
}

export default compose(
  withRouter,
  withContext
)(CompanieAccountType)
