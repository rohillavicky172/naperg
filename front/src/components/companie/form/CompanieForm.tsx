import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { Companie } from '../Companie.type'
import CreateCompanie from './CreateCompanie'
import UpdateCompanie from './UpdateCompanie'
import FormHelperText from '@material-ui/core/FormHelperText'

type Props = {
  showCancelButton: boolean
  redirectAfter: boolean
  userId: string
  onCancel: () => void
  onUpdate: () => void
  companie: Companie
}

const CompanieForm = (props: Props) => {
  const [companie, setCompanie] = React.useState(props.companie)
  const [companieNameValidate, setCompanieNameValidate] = React.useState(true)

  return (
    <>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="name">{`Company/Group name`}</InputLabel>
          <Input
            id="name"
            error={!companieNameValidate}
            type="text"
            value={companie.name}
            onChange={(e) => {
              setCompanie({
                ...companie,
                name: e.target.value,
              })
              setCompanieNameValidate(e.target.value.length ? true : false)
            }}
          />
          {!companieNameValidate && <FormHelperText error>{`Company name cannot be empty`}</FormHelperText>}
        </FormControl>
      </div>

      <div style={{ height: '20px' }} />

      <div>
        {companie.id ? (
          <UpdateCompanie
            disabled={false}
            showCancelButton={props.showCancelButton}
            textButton={'Update'}
            textCancelButton={'Cancel'}
            onUpdate={() => props.onUpdate()}
            onCancel={() => props.onCancel()}
            companie={companie}
          />
        ) : (
          <CreateCompanie
            redirectAfter={props.redirectAfter}
            userId={props.userId}
            showCancelButton={props.showCancelButton}
            onCancel={() => props.onCancel()}
            companie={companie}
          />
        )}
      </div>
    </>
  )
}

export default CompanieForm
