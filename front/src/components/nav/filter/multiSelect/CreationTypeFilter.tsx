import React from 'react'
import { useHistory } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const CreationTypeFilter = () => {
  const location = useLocation()
  const history = useHistory()

  const creationType =
    typeof queryString.parse(location.search).creationType === 'string'
      ? [queryString.parse(location.search).creationType]
      : typeof queryString.parse(location.search).creationType === 'object'
      ? queryString.parse(location.search).creationType
      : []

  return (
    <div>
      <FormControl className="inputWidth">
        <InputLabel htmlFor="creationType">Creation Type</InputLabel>
        <Select
          id="creationType"
          multiple
          renderValue={(selected: any) => selected.length + ' Selected'}
          value={creationType ? creationType : []}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = queryString.parse(location.search)
            parsed.creationType = e.target.value
            delete parsed.page
            history.push('?' + queryString.stringify(parsed))
          }}>
          <MenuItem value={'CREATED_BY_USER'}>
            <Checkbox checked={creationType.indexOf('CREATED_BY_USER') > -1} />
            CREATED_BY_USER
          </MenuItem>
          <MenuItem value={'CREATED_BY_ADMIN'}>
            <Checkbox checked={creationType.indexOf('CREATED_BY_ADMIN') > -1} />
            CREATED_BY_ADMIN
          </MenuItem>
          <MenuItem value={'CREATED_BY_ISSUED_CARD'}>
            <Checkbox checked={creationType.indexOf('CREATED_BY_ISSUED_CARD') > -1} />
            CREATED_BY_ISSUED_CARD
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default CreationTypeFilter

// import React from 'react'
// import FormControl from '@material-ui/core/FormControl'
// import InputLabel from '@material-ui/core/InputLabel'
// import Select from '@material-ui/core/Select'
// import MenuItem from '@material-ui/core/MenuItem'
// import Grid from '@material-ui/core/Grid'
// import { useHistory, useLocation } from 'react-router-dom'

// const CreationTypeFilter = () => {
//   const queryString = require('query-string')
//   const location = useLocation()
//   const parsed = queryString.parse(location.search)
//   const creationType = parsed.creationType ? parsed.creationType : 'ALL'
//   const history = useHistory()

//   return (
//     <>
//       <Grid item xs={12} md={3} className="tal">
//         <FormControl className="inputWidth">
//           <InputLabel htmlFor="creationType">CreationType</InputLabel>
//           <Select
//             id="creationType"
//             value={creationType}
//             onChange={e => {
//               const parsed = queryString.parse(location.search)
//               delete parsed.page
//               parsed.creationType = e.target.value
//               history.push('?' + queryString.stringify(parsed))
//             }}>
//             <MenuItem value={'ALL'}>{`All`}</MenuItem>

//             <MenuItem value={'BTOB'}>{`BTOB`}</MenuItem>
//             <MenuItem value={'CONSUMER'}>{`CONSUMER`}</MenuItem>
//             <MenuItem value={'BTOB_AND_CONSUMER'}>{`BTOB_AND_CONSUMER`}</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
//     </>
//   )
// }

// export default CreationTypeFilter

// import React from 'react'
// import FormControl from '@material-ui/core/FormControl'
// import InputLabel from '@material-ui/core/InputLabel'
// import Select from '@material-ui/core/Select'
// import MenuItem from '@material-ui/core/MenuItem'
// import Grid from '@material-ui/core/Grid'
// import { useHistory, useLocation } from 'react-router-dom'

// const CreationTypeFilter = () => {
//   const queryString = require('query-string')
//   const location = useLocation()
//   const parsed = queryString.parse(location.search)
//   const creationType = parsed.creationType ? parsed.creationType : 'ALL'
//   const history = useHistory()

//   return (
//     <>
//       <Grid item xs={12} md={3} className="tal">
//         <FormControl className="inputWidth">
//           <InputLabel htmlFor="creationType">CreationType</InputLabel>
//           <Select
//             id="creationType"
//             value={creationType}
//             onChange={e => {
//               const parsed = queryString.parse(location.search)
//               delete parsed.page
//               parsed.creationType = e.target.value
//               history.push('?' + queryString.stringify(parsed))
//             }}>
//             <MenuItem value={'ALL'}>{`All`}</MenuItem>

//             <MenuItem value={'CREATED_BY_USER'}>{`CREATED_BY_USER`}</MenuItem>
//             <MenuItem value={'CREATED_BY_ADMIN'}>{`CREATED_BY_ADMIN`}</MenuItem>
//             <MenuItem value={'CREATED_BY_ISSUED_CARD'}>{`CREATED_BY_ISSUED_CARD`}</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
//     </>
//   )
// }

// export default CreationTypeFilter
