import React from 'react'
import { useHistory } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const TypeCreationFilter = () => {
  const location = useLocation()
  const history = useHistory()

  const typeCreation =
    typeof queryString.parse(location.search).typeCreation === 'string'
      ? [queryString.parse(location.search).typeCreation]
      : typeof queryString.parse(location.search).typeCreation === 'object'
      ? queryString.parse(location.search).typeCreation
      : []

  return (
    <div>
      <FormControl className="inputWidth">
        <InputLabel htmlFor="typeCreation">TypeCreation</InputLabel>
        <Select
          id="typeCreation"
          multiple
          renderValue={(selected: any) => selected.length + ' Selected'}
          value={typeCreation ? typeCreation : []}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = queryString.parse(location.search)
            parsed.typeCreation = e.target.value
            delete parsed.page
            history.push('?' + queryString.stringify(parsed))
          }}>
          <MenuItem value={'SIGNUP'}>
            <Checkbox checked={typeCreation.indexOf('SIGNUP') > -1} />
            SIGNUP
          </MenuItem>
          <MenuItem value={'SIGNUP_ADMIN'}>
            <Checkbox checked={typeCreation.indexOf('SIGNUP_ADMIN') > -1} />
            SIGNUP_ADMIN
          </MenuItem>
          <MenuItem value={'SIGNUP_ADMIN_SELLER'}>
            <Checkbox checked={typeCreation.indexOf('SIGNUP_ADMIN_SELLER') > -1} />
            SIGNUP_ADMIN_SELLER
          </MenuItem>
          <MenuItem value={'SIGNUP_INVITE_SELLER'}>
            <Checkbox checked={typeCreation.indexOf('SIGNUP_INVITE_SELLER') > -1} />
            SIGNUP_INVITE_SELLER
          </MenuItem>
          <MenuItem value={'SIGNUP_SELLER'}>
            <Checkbox checked={typeCreation.indexOf('SIGNUP_SELLER') > -1} />
            SIGNUP_SELLER
          </MenuItem>
          <MenuItem value={'USER_SELLER_CREATION'}>
            <Checkbox checked={typeCreation.indexOf('USER_SELLER_CREATION') > -1} />
            USER_SELLER_CREATION
          </MenuItem>
          <MenuItem value={'USER_AFFILIATE_CREATION'}>
            <Checkbox checked={typeCreation.indexOf('USER_AFFILIATE_CREATION') > -1} />
            USER_AFFILIATE_CREATION
          </MenuItem>
          <MenuItem value={'USER_INVITATION'}>
            <Checkbox checked={typeCreation.indexOf('USER_INVITATION') > -1} />
            USER_INVITATION
          </MenuItem>
          <MenuItem value={'USER_CREATION'}>
            <Checkbox checked={typeCreation.indexOf('USER_CREATION') > -1} />
            USER_CREATION
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default TypeCreationFilter
