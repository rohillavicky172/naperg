import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import { useHistory, useLocation } from 'react-router-dom'

const CanCreatePhysicalIssuedCardFilter = () => {
  const queryString = require('query-string')
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const canCreatePhysicalIssuedCard = parsed.canCreatePhysicalIssuedCard ? parsed.canCreatePhysicalIssuedCard : ''
  const history = useHistory()

  return (
    <>
      <Grid item xs={12} md={3} className="tal">
        <FormControl className="inputWidth">
          <InputLabel htmlFor="canCreatePhysicalIssuedCard">canCreatePhysicalIssuedCard</InputLabel>
          <Select
            id="canCreatePhysicalIssuedCard"
            value={canCreatePhysicalIssuedCard}
            onChange={e => {
              const parsed = queryString.parse(location.search)
              delete parsed.page
              parsed.canCreatePhysicalIssuedCard = e.target.value
              history.push('?' + queryString.stringify(parsed))
            }}>
            <MenuItem value={''}>{`All`}</MenuItem>
            <MenuItem value={'TRUE'}>{`True`}</MenuItem>
            <MenuItem value={'FALSE'}>{`False`}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  )
}

export default CanCreatePhysicalIssuedCardFilter

// import React from 'react'
// import { History } from '../../History.type'
// import { Location } from '../../Location.type'
// import { withRouter } from 'react-router'
// import FormControl from '@material-ui/core/FormControl'
// import InputLabel from '@material-ui/core/InputLabel'
// import Select from '@material-ui/core/Select'
// import MenuItem from '@material-ui/core/MenuItem'

// const queryString = require('query-string')

// type State = {}

// type Props = {
//   history: History,
//   showIsVerified: boolean,
//   location: Location
// }

// class CanCreatePhysicalIssuedCardFilter extends React.Component<Props, State> {
//   render() {
//     const canCreatePhysicalIssuedCard = queryString.parse(this.props.location.search).canCreatePhysicalIssuedCard

//     return (
//       <>
//         <FormControl className="inputWidth">
//           <InputLabel htmlFor="canCreatePhysicalIssuedCard">canCreatePhysicalIssuedCard</InputLabel>
//           <Select
//             id="canCreatePhysicalIssuedCard"
//             value={canCreatePhysicalIssuedCard}
//             onChange={e => {
//               const parsed = queryString.parse(this.props.location.search)
//               delete parsed.page
//               parsed.canCreatePhysicalIssuedCard = e.target.value
//               this.props.history.push('?' + queryString.stringify(parsed))
//             }}>
//             <MenuItem value={'ALL'}>{`All`}</MenuItem>
//             <MenuItem value={'TRUE'}>{`True`}</MenuItem>
//             <MenuItem value={'FALSE'}>{`False`}</MenuItem>
//           </Select>
//         </FormControl>
//       </>
//     )
//   }
// }

// export default withRouter(CanCreatePhysicalIssuedCardFilter)
