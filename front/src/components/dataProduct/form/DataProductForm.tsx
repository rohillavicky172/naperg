import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

import Input from '@material-ui/core/Input'
import { DataProduct } from '../DataProduct.type'
import { Event } from '../../Event.type'
import { DataProductValidation } from '../DataProductValidation.type'

type State = {
  dataProduct: DataProduct
  validation: DataProductValidation
}
type Props = {
  onChangeValidation: (validation: DataProductValidation) => void
  onChange: (dataProduct: DataProduct) => void
  dataProduct: DataProduct
  validation: DataProductValidation
}

class DataProductForm extends React.Component<Props, State> {
  isFormValidate = (newValidation: DataProductValidation) => {
    return !!(newValidation.websiteValidate && newValidation.productNameValidate && newValidation.noteValidate)
  }

  onChangeNote = (e: Event) => {
    const note = e.target.value
    const noteValidate = true

    this.props.onChange({
      ...this.props.dataProduct,
      note,
    })

    const newValidation = {
      ...this.props.validation,
      noteValidate,
    }

    this.props.onChangeValidation({
      ...newValidation,
      formValidate: this.isFormValidate(newValidation),
    })
  }

  render() {
    return (
      <>
        <div>
          <FormControl className="width100per">
            <InputLabel htmlFor="note">{`Enter text for your own reference`}</InputLabel>
            <Input id="note" type="text" value={this.props.dataProduct.note} onChange={this.onChangeNote} />
          </FormControl>
        </div>
      </>
    )
  }
}

export default DataProductForm
