
import React from 'react'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import { Location } from '../../../Location.type'
import { History } from '../../../History.type'
const queryString = require('query-string')
// import Icon from '@material-ui/core/Icon'
// import { withContext } from '../../../withContext'
// import { Context } from '../../../Context.type'
// import { Product } from '../../../product/Product.type'
// import { Addresse } from '../../../addresse/Addresse.type'
// import { Companie } from '../../../companie/Companie.type'
// import { User } from '../../../user/User.type'

type State = {}
type Props = {
  history: History,
  // context: Context,
  // product: Product,
  // companie: Companie,
  // userStripe: UserStripe,
  companieId: string,
  userId: string,
  location: Location
  // sources: [],
  // issuedCard: IssuedCard,
  // addresses: Addresse[],
  // user: User
}

class NavigateButtonTypeCard extends React.Component<Props, State> {
  render() {
    const parsed = queryString.parse(this.props.location.search)
    // const { productId } = parsed
    // console.log(parsed)

    return (
      <>
        {parsed.type !== 'physical' ? (
          <>
            {/* <Tooltip title={'Physical?'}> */}
            <Button
              variant="outlined"
              color={'primary'}
              onClick={() => {
                const parsed = queryString.parse(this.props.location.search)
                parsed.type = 'physical'
                this.props.history.push('?' + queryString.stringify(parsed))
              }}>
              Order Physical Card
              {/* <Icon color="primary">card_travel</Icon> */}
            </Button>
            {/* </Tooltip> */}
          </>
        ) : (
          <>
            <Tooltip title={'Virtual?'}>
              <Button
                variant="outlined"
                color={'primary'}
                onClick={() => {
                  const parsed = queryString.parse(this.props.location.search)
                  parsed.type = ''
                  this.props.history.push('?' + queryString.stringify(parsed))
                }}>
                Generate Virtual Card
              </Button>
            </Tooltip>
          </>
        )}
      </>
    )
  }
}

export default compose(
  withRouter
  // withContext
)(NavigateButtonTypeCard)
