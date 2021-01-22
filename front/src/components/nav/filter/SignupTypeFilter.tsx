import React from 'react'
import { History } from '../../History.type'
import { Location } from '../../Location.type'
import { withRouter } from 'react-router'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import { flowRight as compose } from 'lodash'

const queryString = require('query-string')

type State = {
  currency: string
}

type Props = {
  showCurrency: boolean
  history: History
  location: Location
  currenciesQuery: any
}

class SignupTypeFilter extends React.Component<Props, State> {
  render() {
    const parsed = queryString.parse(this.props.location.search)
    const signupType = parsed.signupType ? parsed.signupType : 'ALL'

    return (
      <>
        <Grid item xs={12} md={3} className="tal">
          <FormControl className="inputWidth">
            <InputLabel htmlFor="signupType">signupType</InputLabel>
            <Select
              id="signupType"
              value={signupType}
              onChange={(e) => {
                let parsed = queryString.parse(this.props.location.search)
                parsed.signupType = e.target.value
                delete parsed.page
                this.props.history.push('?' + queryString.stringify(parsed))
              }}>
              <MenuItem value={'MEMBER_INVITATION'}>MEMBER_INVITATION (user inviting member)</MenuItem>
              <MenuItem value={'SELLERFORM'}>SELLERFORM (User Self serve seller signup)</MenuItem>
              <MenuItem value={'ADMINFORMSELLER'}>ADMINFORMSELLER (NN appAdmin invites sellers)</MenuItem>
              <MenuItem value={'ADMINFORM'}>ADMINFORM (NN app admin invites buyer)</MenuItem>
              <MenuItem value={'USER_FORM_SELLER'}>USER_FORM_SELLER (NN User invite External seller)</MenuItem>
              <MenuItem value={'AFFILIATEFORM'}>AFFILIATEFORM (NN affiliate invites external user)</MenuItem>
              <MenuItem value={'USERFORM'}>USERFORM (NN User invite External buyer)</MenuItem>
              <MenuItem value={'FORM'}>FORM (Buyer Self serve signup)</MenuItem>
              <MenuItem value={'FORM_SLACK'}>FORM from SLACK</MenuItem>
              <MenuItem value={'FORM_LINK_INVITATION'}>FORM with a token in the URL to get the inviter</MenuItem>

              <MenuItem value={'ALL'}>ALL</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </>
    )
  }
}

export default compose(withRouter)(SignupTypeFilter)
