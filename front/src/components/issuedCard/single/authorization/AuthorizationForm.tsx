import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MappingAuthorizedAmountUnit from './MappingAuthorizedAmountUnit'
import { IssuedCard } from '../../IssuedCard.type'

type State = {}
type Props = {
  issuedCard: IssuedCard
  onUpdate: (issuedCard: IssuedCard) => void
}

class AuthorizationForm extends React.Component<Props, State> {
  render() {
    return (
      <>
        <div>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="authorizedAmountUnit"
              name="authorizedAmountUnit"
              value={this.props.issuedCard.authorizedAmountUnit}
              onChange={event =>
                this.props.onUpdate({
                  ...this.props.issuedCard,
                  authorizedAmountUnit: event.target.value
                })
              }>
              <FormControlLabel
                value="NONE"
                control={<Radio />}
                label={<MappingAuthorizedAmountUnit authorizedAmountUnit={'NONE'} />}
              />
              <FormControlLabel
                value="PER_MONTH"
                control={<Radio />}
                label={<MappingAuthorizedAmountUnit authorizedAmountUnit={'PER_MONTH'} />}
              />
              <FormControlLabel
                value="PER_YEAR"
                control={<Radio />}
                label={<MappingAuthorizedAmountUnit authorizedAmountUnit={'PER_YEAR'} />}
              />
              <FormControlLabel
                value="TOTAL"
                control={<Radio />}
                label={<MappingAuthorizedAmountUnit authorizedAmountUnit={'TOTAL'} />}
              />
            </RadioGroup>
          </FormControl>
        </div>
        {this.props.issuedCard.authorizedAmountUnit !== 'NONE' && (
          <div>
            <FormControl>
              <InputLabel htmlFor="authorizedAmount">{`Authorized amount`}</InputLabel>
              <Input
                id="authorizedAmount"
                classes={{ input: 'inputNumber' }}
                type="number"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                className="inputResponsive"
                value={this.props.issuedCard.authorizedAmount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  // let authorizedAmount = Number(e.target.value)
                  // if (authorizedAmount < 0) {
                  //   authorizedAmount = authorizedAmount * -1
                  // }
                  // authorizedAmount = e.target.value === '' ? '' : Number(e.target.value)
                  this.props.onUpdate({
                    ...this.props.issuedCard,
                    authorizedAmount:
                      e.target.value === ''
                        ? ''
                        : Number(e.target.value) < 0
                        ? Number(e.target.value) * -1
                        : Number(e.target.value)
                  })
                  // this.setState({
                  //   authorization: {
                  //     ...this.state.authorization,
                  //     authorizedAmount: authorizedAmount.toString()
                  //   }
                  // })
                }}
              />
            </FormControl>
          </div>
        )}

        {/* <div>
          {this.state.authorization.id ? (
            <UpdateAuthorization
              onUpdate={this.props.onUpdate}
              updateTextButton={this.props.updateTextButton}
              cleanFields={() => {}}
              authorization={this.state.authorization}
            />
          ) : (
            <CreateAuthorization
              onUpdate={this.props.onUpdate}
              userId={this.props.userId}
              companieId={this.props.companieId}
              issuedCardId={this.props.issuedCardId}
              authorization={this.state.authorization}
            />
          )}
          <Button onClick={this.props.onCancel}> {`Cancel`}</Button>
        </div> */}
      </>
    )
  }
}

export default AuthorizationForm
