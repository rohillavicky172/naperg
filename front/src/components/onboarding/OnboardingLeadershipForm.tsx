
import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { Companie } from '../companie/Companie.type'
import UpdateCompanie from '../companie/form/UpdateCompanie'
// import Button from '@material-ui/core/Button'
import PhoneForm from '../user/single/phone/PhoneForm'
const validator = require('email-validator')

type State = {
  companie: Companie
  // companieNameValidate: boolean,
  leadershipFirstNameValide: boolean
  leadershipLastNameValide: boolean
  leadershipEmailValide: boolean
  leadershipTitleValide: boolean
  leadershipPhoneCodeValide: boolean
  leadershipPhoneValide: boolean
}
type Props = {
  onCancel: () => void
  onUpdate: () => void
  textButton: string
  textCancelButton: string

  companie: Companie
}

class OnboardingleadershipNameForm extends React.Component<Props, State> {
  state = {
    companie: this.props.companie,
    leadershipEmailValide: true,
    leadershipFirstNameValide: true,
    leadershipLastNameValide: true,
    leadershipTitleValide: true,
    leadershipPhoneCodeValide: true,
    leadershipPhoneValide: true
  }

  isFormValide = () => {
    return (
      this.state.leadershipEmailValide &&
      this.state.companie.leadershipEmail &&
      this.state.companie.leadershipEmail.length &&
      this.state.leadershipFirstNameValide &&
      this.state.companie.leadershipFirstName &&
      this.state.companie.leadershipFirstName.length &&
      this.state.leadershipLastNameValide &&
      this.state.companie.leadershipLastName &&
      this.state.companie.leadershipLastName.length &&
      this.state.leadershipTitleValide &&
      this.state.companie.leadershipTitle &&
      this.state.companie.leadershipTitle.length &&
      this.state.leadershipPhoneCodeValide &&
      this.state.companie.leadershipPhoneCode &&
      this.state.companie.leadershipPhoneCode.length &&
      this.state.leadershipPhoneValide &&
      this.state.companie.leadershipPhone &&
      this.state.companie.leadershipPhone.length
    )
  }

  render() {
    return (
      <>
        <div>
          <FormControl className="width100per">
            <InputLabel htmlFor="leadershipFirstName">{`First name`}</InputLabel>
            <Input
              id="leadershipFirstName"
              type="text"
              error={!this.state.leadershipFirstNameValide}
              value={this.state.companie.leadershipFirstName}
              onChange={e =>
                this.setState({
                  companie: {
                    ...this.state.companie,
                    leadershipFirstName: e.target.value
                  },
                  leadershipFirstNameValide: e.target.value.length > 0
                })
              }
            />
          </FormControl>
        </div>

        <div>
          <FormControl className="width100per">
            <InputLabel htmlFor="leadershipLastName">{`Last name`}</InputLabel>
            <Input
              id="leadershipLastName"
              type="text"
              error={!this.state.leadershipLastNameValide}
              value={this.state.companie.leadershipLastName}
              onChange={e =>
                this.setState({
                  companie: {
                    ...this.state.companie,
                    leadershipLastName: e.target.value
                  },
                  leadershipLastNameValide: e.target.value.length > 0
                })
              }
            />
          </FormControl>
        </div>
        <div>
          <FormControl className="width100per">
            <InputLabel htmlFor="leadershipTitle">{`Role`}</InputLabel>
            <Input
              id="leadershipTitle"
              type="text"
              value={this.state.companie.leadershipTitle}
              onChange={e =>
                this.setState({
                  companie: {
                    ...this.state.companie,
                    leadershipTitle: e.target.value
                  },
                  leadershipTitleValide: e.target.value.length > 0
                })
              }
            />
          </FormControl>
        </div>
        <div>
          <PhoneForm
            phone={this.state.companie.leadershipPhone}
            phoneCode={this.state.companie.leadershipPhoneCode}
            onChangePhone={phone =>
              this.setState({
                companie: {
                  ...this.state.companie,
                  leadershipPhone: phone
                },
                leadershipPhoneValide: phone.length
              })
            }
            onChangePhoneCode={phoneCode =>
              this.setState({
                companie: {
                  ...this.state.companie,
                  leadershipPhoneCode: phoneCode
                },
                leadershipPhoneCodeValide: phoneCode.length
              })
            }
            onKeyPress={() => {}}
          />
        </div>

        <div>
          <FormControl className="width100per">
            <InputLabel htmlFor="leadershipEmail">{`Email`}</InputLabel>
            <Input
              id="leadershipEmail"
              type="text"
              error={!this.state.leadershipEmailValide}
              value={this.state.companie.leadershipEmail}
              onChange={e =>
                this.setState({
                  companie: {
                    ...this.state.companie,
                    leadershipEmail: e.target.value
                  },
                  leadershipEmailValide: validator.validate(e.target.value)
                })
              }
            />
          </FormControl>
        </div>

        <div style={{ height: '20px' }} />

        <div>
          <UpdateCompanie
            disabled={!this.isFormValide()}
            showCancelButton={true}
            textButton={this.props.textButton}
            textCancelButton={this.props.textCancelButton}
            onUpdate={() => this.props.onUpdate()}
            onCancel={() => this.props.onCancel()}
            companie={this.state.companie}
          />
        </div>
      </>
    )
  }
}

export default OnboardingleadershipNameForm
