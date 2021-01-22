import React from 'react'
import { withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { IssuedCard, Dob } from '../IssuedCard.type'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import UseWindowDimensions from '../../UseWindowDimensions'

type State = {
  birthdayErrorMessage: string
}

type Props = {
  context: Context
  userId: string
  onCancel: () => void
  onUpdate: (dob: Dob) => void
  issuedCard: IssuedCard
  dob: Dob
}

class DobCardholder extends React.Component<Props, State> {
  state = {
    birthdayErrorMessage: '',
  }

  render() {
    const isMobile = UseWindowDimensions.isMobile()
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          className="width100per"
          id={'birthday'}
          openTo="year"
          format="MM/dd/yyyy"
          label={isMobile ? 'DOB (mm/dd/yyyy)' : 'Date of birth (mm/dd/yyyy)'}
          onError={(birthdayErrorMessage: string) => {
            if (this.state.birthdayErrorMessage !== birthdayErrorMessage) {
              this.setState({ birthdayErrorMessage })
            }
          }}
          value={this.props.dob ? new Date(this.props.dob.year, this.props.dob.month - 1, this.props.dob.day) : null}
          onChange={(birthday: Date) => {
            if (birthday) {
              this.props.onUpdate({
                year: birthday.getFullYear(),
                month: birthday.getMonth() + 1,
                day: birthday.getDate(),
              })
            }
          }}
        />
      </MuiPickersUtilsProvider>
    )
  }
}

export default compose(withContext, withApollo)(DobCardholder)
