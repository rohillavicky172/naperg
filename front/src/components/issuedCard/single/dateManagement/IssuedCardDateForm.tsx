import React from 'react'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { IssuedCard } from '../../IssuedCard.type'
import UpdateIssuedCard from '../../action/UpdateIssuedCard'

type Props = {
  onCancel: () => void

  onUpdate: () => void
  issuedCard: IssuedCard
}

// class IssuedCardDateForm extends React.Component<Props, State> {
const IssuedCardDateForm = (props: Props) => {
  const [issuedCard, setIssuedCard] = React.useState(props.issuedCard)

  console.log(issuedCard)
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <DatePicker
                autoOk
                format="MMMM dd, yyyy"
                variant="inline"
                label="Valid From"
                value={issuedCard.dateValidFrom}
                onChange={(dateValidFrom: Date) => {
                  setIssuedCard({
                    ...issuedCard,
                    dateValidFrom,
                  })
                }}
                maxDate={issuedCard.dateValidTo ? issuedCard.dateValidTo : undefined}
              />
              {issuedCard.dateValidFrom && (
                <Icon
                  className="cursor iconAlignTextBottom"
                  onClick={() => {
                    setIssuedCard({
                      ...issuedCard,
                      dateValidFrom: null,
                    })
                  }}>
                  clear
                </Icon>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                autoOk
                format="MMMM dd, yyyy"
                variant="inline"
                label="Valid To"
                value={issuedCard.dateValidTo}
                minDate={issuedCard.dateValidFrom ? issuedCard.dateValidFrom : undefined}
                onChange={(dateValidTo: Date) => {
                  setIssuedCard({
                    ...issuedCard,
                    dateValidTo,
                  })
                }}
                minDateMessage="Date should not be before minimal date"
              />
              {issuedCard.dateValidTo && (
                <Icon
                  className="cursor iconAlignTextBottom"
                  onClick={() => {
                    setIssuedCard({
                      ...issuedCard,
                      dateValidTo: null,
                    })
                  }}>
                  clear
                </Icon>
              )}
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
        <div style={{ height: '20px' }} />
        {issuedCard.id && (
          <UpdateIssuedCard
            product={null}
            onUpdated={props.onUpdate}
            disabled={
              !(
                !issuedCard.dateValidFrom ||
                !issuedCard.dateValidTo ||
                new Date(issuedCard.dateValidFrom) <= new Date(issuedCard.dateValidTo)
              )
            }
            titleButton="Save"
            onCancel={props.onCancel}
            issuedCard={issuedCard}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default IssuedCardDateForm
