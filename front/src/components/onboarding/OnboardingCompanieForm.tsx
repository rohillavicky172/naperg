import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import { Companie } from '../companie/Companie.type'
import UpdateCompanie from '../companie/form/UpdateCompanie'
import FormHelperText from '@material-ui/core/FormHelperText'
import utils from '../utils'
import { BankTypeBusinessStructure } from './BankTypeBusinessStructure'

type State = {
  companie: Companie
  companieNameValide: boolean
  registrationNumberValide: boolean
  typeBusinessStructureValide: boolean
  websiteValide: boolean
  registeredBusinessNameValide: boolean
}
type Props = {
  showCancelButton: boolean
  textCancelButton: string
  textButton: string
  onCancel: () => void
  onUpdate: () => void
  companie: Companie
}

class OnboardingCompanieForm extends React.Component<Props, State> {
  state = {
    companie: this.props.companie,
    companieNameValide: true,
    registrationNumberValide: true,
    websiteValide: true,
    typeBusinessStructureValide: true,
    registeredBusinessNameValide: true
  }
  // cleanFields() {
  //   this.setState({
  //     companie: companieClass
  //   })
  // }

  isFormValide = () => {
    return (
      this.state.companieNameValide &&
      this.state.registrationNumberValide &&
      this.state.typeBusinessStructureValide &&
      this.state.registeredBusinessNameValide &&
      this.state.companie.registeredBusinessName &&
      // this.state.companie.registeredBusinessName.length &&
      this.state.companie.name &&
      this.state.companie.name.length &&
      // this.state.companie.typeBusinessStructure &&
      // this.state.companie.typeBusinessStructure.length &&
      // this.state.companie.registrationNumber &&
      // this.state.companie.registrationNumber.length &&
      // this.state.companie.website &&
      // this.state.companie.website.length &&
      this.state.websiteValide
    )
  }

  render() {
    return (
      <>
        <div>
          <FormControl className="width100per">
            <InputLabel htmlFor="name">{`Company Name`}</InputLabel>
            <Input
              id="name"
              error={!this.state.companieNameValide}
              type="text"
              value={this.state.companie.name}
              onChange={e =>
                this.setState({
                  companie: {
                    ...this.state.companie,
                    name: e.target.value
                  },
                  companieNameValide: e.target.value.length ? true : false
                })
              }
            />
            {!this.state.companieNameValide && <FormHelperText error>{`Company name cannot be empty`}</FormHelperText>}
          </FormControl>
        </div>

        <div>
          <FormControl className="width100per">
            <InputLabel htmlFor="registeredBusinessName">{`Legal Business Name`}</InputLabel>
            <Input
              id="registeredBusinessName"
              error={!this.state.registeredBusinessNameValide}
              type="text"
              value={this.state.companie.registeredBusinessName}
              onChange={e =>
                this.setState({
                  companie: {
                    ...this.state.companie,
                    registeredBusinessName: e.target.value
                  },
                  registeredBusinessNameValide: e.target.value.length ? true : false
                })
              }
            />
            {!this.state.registeredBusinessNameValide && (
              <FormHelperText error>{`'Legal Business Name cannot be empty`}</FormHelperText>
            )}
          </FormControl>
        </div>

        <div>
          <FormControl className="width100per">
            <InputLabel htmlFor="website">{`Website (Optional)`}</InputLabel>
            <Input
              id="website"
              placeholder={'http://'}
              error={!this.state.websiteValide}
              type="text"
              value={this.state.companie.website}
              onChange={e =>
                this.setState({
                  companie: {
                    ...this.state.companie,
                    website: e.target.value
                  },
                  websiteValide: utils.isURL(e.target.value) || e.target.value === ''
                })
              }
            />
          </FormControl>
        </div>
        <div>
          <FormControl className="width100per">
            <InputLabel htmlFor="type">{`Type of Business (Optional)`}</InputLabel>
            <Select
              className="tal"
              id="type"
              error={!this.state.typeBusinessStructureValide}
              value={this.state.companie.typeBusinessStructure}
              onChange={(e: any) =>
                this.setState({
                  companie: {
                    ...this.state.companie,
                    typeBusinessStructure: e.target.value
                  },
                  typeBusinessStructureValide: e.target.value.length > 0 || e.target.value === ''
                })
              }>
              {BankTypeBusinessStructure.map(bankTypeBusinessStructureSingle => (
                <MenuItem key={bankTypeBusinessStructureSingle.value} value={bankTypeBusinessStructureSingle.value}>
                  {bankTypeBusinessStructureSingle.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl className="width100per">
            <InputLabel htmlFor="registrationNumber">{`EIN number (Optional)`}</InputLabel>
            <Input
              id="registrationNumber"
              type="text"
              error={!this.state.registrationNumberValide}
              value={this.state.companie.registrationNumber}
              onChange={e =>
                this.setState({
                  companie: {
                    ...this.state.companie,
                    registrationNumber: e.target.value
                  },
                  registrationNumberValide:
                    (e.target.value.length && /^[aA-zZ0-9- ]+$/g.test(e.target.value)) || e.target.value === ''
                })
              }
            />
          </FormControl>
        </div>

        <div style={{ height: '20px' }} />

        <div>
          <UpdateCompanie
            disabled={!this.isFormValide()}
            showCancelButton={this.props.showCancelButton}
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

export default OnboardingCompanieForm
