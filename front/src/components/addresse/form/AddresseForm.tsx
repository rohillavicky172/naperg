import React from 'react'
import { FormControl, Button, InputLabel, Input, MenuItem, Select } from '@material-ui/core/'
import { Addresse } from '../Addresse.type'
import CreateAddresse from './CreateAddresse'
import UpdateAddresse from './UpdateAddresse'
import SelectCountryForm from './SelectCountryForm'
import SelectStateForm from './SelectStateForm'
import { bankCountries } from '../BankAddress'

type Props = {
  className: string
  onUpdate: () => void
  onCancel: () => void
  onCreate: () => void
  textButtonCreate: string
  textButtonUpdate: string
  textButtonCancel: string
  companieId: string
  userId: string
  addresse: Addresse
}

export const AddresseForm = (props: Props) => {
  const [addresse, setAddresse] = React.useState(props.addresse)
  const [valide, setValide] = React.useState({
    zipValidate: true,
    address1Valide: true,
    cityValide: true,
    stateValide: true,
    nameValide: true,
  })

  const onChangeZip = (zip: string) => {
    setAddresse({ ...addresse, zip })
    setValide({ ...valide, zipValidate: zip.length ? true : false })
  }

  const onChangeCountry = (country: string) => {
    setAddresse({ ...addresse, country, state: '' })
  }
  const onChangeState = (state: string) => {
    setAddresse({ ...addresse, state })
    setValide({ ...valide, stateValide: state.length ? true : false })
  }

  // const computeValideForm = () => {
  //   setValide({
  //     ...valide,
  //     address1Valide: addresse.address1.length ? true : false,
  //     stateValide: addresse.state.length ? true : false,
  //     zipValidate: addresse.zip.length ? true : false,
  //     cityValide: addresse.city.length ? true : false,
  //   })
  // }
  const isFormValid = () => {
    return (
      valide.zipValidate &&
      valide.nameValide &&
      valide.address1Valide &&
      valide.cityValide &&
      valide.stateValide &&
      addresse.zip.length &&
      addresse.address1.length &&
      addresse.city.length &&
      addresse.state.length
    )
  }

  return (
    <>
      {addresse.type === 'SHIPPING' && (
        <div>
          <FormControl className={props.className}>
            <InputLabel htmlFor="name">{`Name`}</InputLabel>
            <Input
              id="name"
              type="text"
              error={!valide.nameValide}
              value={addresse.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAddresse({ ...addresse, name: e.target.value })
                setValide({ ...valide, nameValide: e.target.value.length ? true : false })
              }}
            />
          </FormControl>
        </div>
      )}

      <div>
        <FormControl className={props.className}>
          <InputLabel htmlFor="address1">{`Address line 1`}</InputLabel>
          <Input
            id="address1"
            type="text"
            error={!valide.address1Valide}
            value={addresse.address1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAddresse({ ...addresse, address1: e.target.value })
              setValide({ ...valide, address1Valide: e.target.value.length ? true : false })
            }}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className={props.className}>
          <InputLabel htmlFor="address2">{`Address line 2 (optional)`}</InputLabel>
          <Input
            id="authorizedAmount"
            type="text"
            value={addresse.address2}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddresse({ ...addresse, address2: e.target.value })}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className={props.className}>
          <InputLabel htmlFor="city">{`City`}</InputLabel>
          <Input
            id="city"
            error={!valide.cityValide}
            type="text"
            value={addresse.city}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAddresse({ ...addresse, city: e.target.value })
              setValide({ ...valide, cityValide: e.target.value.length ? true : false })
            }}
          />
        </FormControl>
      </div>

      <div>
        <SelectStateForm
          className={props.className}
          state={addresse.state}
          error={!valide.stateValide}
          country={addresse.country}
          onUpdate={(state: string) => onChangeState(state)}
        />
      </div>

      <div>
        <FormControl className={props.className}>
          <InputLabel htmlFor="zip">{`Zip/Postal code`}</InputLabel>
          <Input
            id="zip"
            error={!valide.zipValidate}
            type="text"
            value={addresse.zip}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeZip(e.target.value)}
          />
        </FormControl>
      </div>

      <div>
        {addresse.type === 'BILLING' && (
          <SelectCountryForm className={props.className} country={addresse.country} onUpdate={onChangeCountry} />
        )}
        {addresse.type === 'SHIPPING' && (
          <FormControl className={props.className}>
            <InputLabel htmlFor="country">{`Country`}</InputLabel>
            <Select id="country" value={addresse.country} onChange={(e: any) => onChangeCountry(e.target.value)}>
              <MenuItem value={'US'}>{`United States`}</MenuItem>
              <MenuItem value={'CA'}>{`Canada`}</MenuItem>
            </Select>
          </FormControl>
        )}
        {addresse.type === 'MAILING' && (
          <>
            <div>
              <FormControl className={props.className}>
                <InputLabel htmlFor="country">{`Country`}</InputLabel>
                <Input
                  id="country"
                  type="text"
                  value={bankCountries.filter((country) => addresse.country === country.code)[0].label}
                />
              </FormControl>
            </div>
          </>
        )}
      </div>
      <br />
      {addresse.type === 'BILLING' && <div>{`This Billing Address will get linked to all NachoCards in your account.`}</div>}
      <br />
      <div>
        <Button onClick={props.onCancel}>{props.textButtonCancel}</Button>{' '}
        <>
          {addresse.id ? (
            <UpdateAddresse
              textButton={props.textButtonUpdate}
              onUpdate={props.onUpdate}
              disabled={!isFormValid()}
              addresse={addresse}
            />
          ) : (
            <CreateAddresse
              textButton={props.textButtonCreate}
              disabled={!isFormValid()}
              userId={props.userId}
              onCreate={() => props.onCreate()}
              companieId={props.companieId}
              cleanFields={() => {}}
              addresse={addresse}
            />
          )}
        </>
      </div>
    </>
  )
}

export default AddresseForm
